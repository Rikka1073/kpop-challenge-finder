import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const nextConfig = {
  images: {
    domains: ["i.ytimg.com"],
  },
};

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
