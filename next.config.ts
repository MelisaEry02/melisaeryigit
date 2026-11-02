import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  // Local env/DB/uploads Vercel upload’a gitmesin; NFT bunları izlemesin
  outputFileTracingExcludes: {
    "*": [
      "./.env*",
      "./data/site.db",
      "./data/site.db-shm",
      "./data/site.db-wal",
      "./uploads/**",
      "./public/uploads/**",
    ],
  },
  // seed.db serverless fonksiyonuna girsin
  outputFileTracingIncludes: {
    "*": ["./data/seed.db"],
  },
};

export default nextConfig;
