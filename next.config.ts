import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  serverExternalPackages: ["sone", "skia-canvas"],
  allowedDevOrigins: ["10.100.11.153"],
};

export default withNextIntl(nextConfig);
