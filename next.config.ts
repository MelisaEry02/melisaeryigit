import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  // Local env/DB/uploads Vercel upload’a gitmesin; NFT bunları izlemesin
  outputFileTracingExcludes: {
    "*": [
      "./.env*",
      "./data/**",
      "./uploads/**",
      "./public/uploads/**",
    ],
  },
};

export default nextConfig;
