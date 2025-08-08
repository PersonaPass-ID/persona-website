/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    // Disable strict ESLint rules for demo integration
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow some TypeScript errors during build for demo
    ignoreBuildErrors: false,
  },
};

export default config;
