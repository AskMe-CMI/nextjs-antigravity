import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "service-worker.js",
  workboxOptions: {
    runtimeCaching: [
      {
        // ดักจับทุก URL (GET Request)
        urlPattern: /.*/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "offline-pages-cache",
          expiration: {
            maxEntries: 200, // เก็บสูงสุด 200 หน้า
            maxAgeSeconds: 24 * 60 * 60, // อายุ Cache 24 ชั่วโมง
          },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "minio",
        port: "9000",
        pathname: "/**",
      }
    ],
  },
};

export default withPWA(nextConfig);
