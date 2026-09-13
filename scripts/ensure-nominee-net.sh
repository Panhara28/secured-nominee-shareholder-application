#!/usr/bin/env bash
# Ensures the UAT frontend and API containers are both attached to the
# shared `nominee-net` custom Docker network so they can resolve each other
# by container name.
#
# Why this exists: the frontend's API_BASE_URL env var points at the API
# container by name (http://secured-nominee-shareholder-api-uat:8080).
# Docker's default `bridge` network - what a plain `docker run` with no
# --network flag attaches to, which is what pongreay's deploy script does -
# does NOT support container-name DNS resolution (only user-defined
# networks do). Without this step, the frontend's proxy calls to the API
# fail with `getaddrinfo ENOTFOUND secured-nominee-shareholder-api-uat`,
# even though the containers can reach each other fine by raw IP.
#
# `pongreay` (the deploy CLI used for this project) has no --network config
# option and no post-deploy hook, so this runs as this project's own
# `postdeploy:uat` npm script instead - see package.json.
#
# Safe to run any number of times: `docker network connect` on a container
# already on the network just errors, which we ignore.
set -uo pipefail

SERVER="sysapp01@172.20.15.41"
NETWORK="nominee-net"
CONTAINERS=(
  "secured-nominee-shareholder-api-uat"
  "secured-nominee-shareholder-uat"
)

# SSH to this host is intermittently flaky (VPN/network blips lasting up to
# a few minutes have been observed) - retry a handful of times rather than
# letting a transient connection failure fail the whole deploy.
ssh_with_retry() {
  local attempts=5
  local delay=10
  local i
  for ((i = 1; i <= attempts; i++)); do
    if ssh -o ConnectTimeout=10 -o BatchMode=yes "$SERVER" "$1"; then
      return 0
    fi
    echo "  ssh attempt $i/$attempts failed, retrying in ${delay}s..." >&2
    sleep "$delay"
  done
  return 1
}

status=0
for c in "${CONTAINERS[@]}"; do
  if ssh_with_retry "docker network connect $NETWORK $c 2>/dev/null || true"; then
    echo "Ensured $c is attached to $NETWORK"
  else
    echo "WARNING: could not reach $SERVER to attach $c to $NETWORK after retries" >&2
    status=1
  fi
done

exit "$status"
