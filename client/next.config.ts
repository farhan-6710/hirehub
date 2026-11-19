import path from "node:path";
import type { NextConfig } from "next";

// Repo root, so the client can import shared/brand/*.json
const REPO_ROOT = path.join(__dirname, "..");

const nextConfig: NextConfig = {
  turbopack: { root: REPO_ROOT },
  outputFileTracingRoot: REPO_ROOT,
};

export default nextConfig;
