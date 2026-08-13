#!/usr/bin/env bash
set -euo pipefail

# Redeploy secured-nominee-shareholder to the UAT server by building the
# Docker image directly on the remote host, instead of pongreay's default
# build-locally-then-scp-the-image flow. Only the source tree (a few MB)
# crosses the network; the ~2GB built image never does. Use this when the
# link to sysapp01 is slow — otherwise `pongreay uat --skip-tests` works
# the same way pongreay.config.yml describes.
#
# Keep these in sync with pongreay.config.yml's `uat` environment.
SERVER="sysapp01@172.20.15.41"
APP_NAME="secured-nominee-shareholder-uat"
IMAGE_NAME="secured-nominee-shareholder"
CONTAINER_PORT=3000
HOST_PORT=3030
ENV_FILE_ON_SERVER="/etc/pongreay/secured-nominee-shareholder/uat.env"
HEALTH_PATH="/en/portal/login"
REMOTE_BUILD_DIR="/home/sysapp01/deploy-nominee-uat"
# Shared network so this container can reach the API container by its Docker
# container name (Docker's hairpin-NAT limitation means the host's own
# published port isn't reliably reachable from inside another container on
# this same host). Must match the network the API container joins in its own
# deploy - see secured-nominee-shareholder-api/pongreay.config.yml.
DOCKER_NETWORK="nominee-net"

cd "$(git rev-parse --show-toplevel)"

if [ -n "$(git status --short)" ]; then
  echo "Error: working tree is not clean. Commit or stash changes first." >&2
  exit 1
fi

COMMIT=$(git rev-parse --short HEAD)
IMAGE_TAG="${IMAGE_NAME}:uat-${COMMIT}"
TMP_TAR="$(mktemp -t nominee-src-XXXXXX).tar.gz"
trap 'rm -f "$TMP_TAR"' EXIT

echo "==> Packaging source at $COMMIT"
git archive --format=tar HEAD | gzip > "$TMP_TAR"

echo "==> Uploading source ($(du -h "$TMP_TAR" | cut -f1))"
ssh "$SERVER" "mkdir -p $REMOTE_BUILD_DIR"
scp -q "$TMP_TAR" "$SERVER:$REMOTE_BUILD_DIR/src.tar.gz"

echo "==> Building image on server"
ssh "$SERVER" "
  set -e
  cd $REMOTE_BUILD_DIR
  rm -rf src && mkdir src
  tar -xzf src.tar.gz -C src
  cd src
  docker build --build-arg NEXT_PUBLIC_SHOW_DEMO_TOOLS=true -t $IMAGE_TAG .
"

echo "==> Starting new container (old one kept as rollback target)"
ssh "$SERVER" "
  set -e
  APP_NAME=$APP_NAME
  IMAGE_TAG=$IMAGE_TAG
  HOST_PORT=$HOST_PORT
  CONTAINER_PORT=$CONTAINER_PORT
  ENV_FILE=$ENV_FILE_ON_SERVER
  HEALTH_URL='http://127.0.0.1:$HOST_PORT$HEALTH_PATH'
  DOCKER_NETWORK=$DOCKER_NETWORK

  OLD_IMAGE=\$(docker inspect --format='{{.Config.Image}}' \"\$APP_NAME\" 2>/dev/null || true)

  docker stop \"\$APP_NAME\" 2>/dev/null || true
  docker rm \"\$APP_NAME\" 2>/dev/null || true

  docker run -d \\
    --name \"\$APP_NAME\" \\
    --restart unless-stopped \\
    --cap-drop ALL \\
    --security-opt no-new-privileges \\
    --read-only \\
    --tmpfs /tmp:rw,noexec,nosuid,size=64m \\
    --env-file \"\$ENV_FILE\" \\
    --network \"\$DOCKER_NETWORK\" \\
    --label pongreay.environment=uat \\
    --label pongreay.previous-image=\"\$OLD_IMAGE\" \\
    -p \"\$HOST_PORT:\$CONTAINER_PORT\" \\
    \"\$IMAGE_TAG\"

  echo 'Checking health...'
  SUCCESS=false
  for i in \$(seq 1 10); do
    if curl -fsS \"\$HEALTH_URL\" > /dev/null; then
      SUCCESS=true
      break
    fi
    echo \"Health check failed. Retry \$i...\"
    sleep 3
  done

  if [ \"\$SUCCESS\" != true ]; then
    echo 'Deployment failed. Rolling back...'
    docker stop \"\$APP_NAME\" 2>/dev/null || true
    docker rm \"\$APP_NAME\" 2>/dev/null || true
    if [ -n \"\$OLD_IMAGE\" ] && [ \"\$OLD_IMAGE\" != '<no value>' ]; then
      docker run -d \\
        --name \"\$APP_NAME\" \\
        --restart unless-stopped \\
        --cap-drop ALL \\
        --security-opt no-new-privileges \\
        --read-only \\
        --tmpfs /tmp:rw,noexec,nosuid,size=64m \\
        --env-file \"\$ENV_FILE\" \\
        --network \"\$DOCKER_NETWORK\" \\
        --label pongreay.environment=uat \\
        -p \"\$HOST_PORT:\$CONTAINER_PORT\" \\
        \"\$OLD_IMAGE\"
    fi
    exit 1
  fi

  echo 'Deployment healthy.'
  rm -rf $REMOTE_BUILD_DIR

  docker images \"$IMAGE_NAME\" --format '{{.Repository}}:{{.Tag}}' \\
    | grep ':uat-' \\
    | tail -n +6 \\
    | xargs -r docker rmi 2>/dev/null || true
"

echo "==> Done. $APP_NAME is live on port $HOST_PORT (https://demo-nominee.moc.gov.kh)"
