import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // // চাইলে keep করুন
    // domains: ["res.cloudinary.com"],
    remotePatterns: [
      // https সব ডোমেইন (আপনার আগেরটাই)
      { protocol: "https", hostname: "**" },
      // dev/local ইমেজের জন্য
      { protocol: "http", hostname: "localhost", port: "3000" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

export default nextConfig;
