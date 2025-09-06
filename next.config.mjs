import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@react-three/fiber", "@react-three/drei"],
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // three v0.163 doesn't export './webgpu' via package exports; alias to a local shim
      "three/webgpu": path.resolve(__dirname, "./shims/three-webgpu.js"),
      "three/tsl": path.resolve(__dirname, "./shims/three-tsl.js"),
      // Ensure Next.js bundles a single copy of React to avoid issues with internal React state
      // (e.g. "ReactCurrentOwner" undefined) when libraries like @react-three/fiber expect the same React instance.
      // react: path.resolve(__dirname, "node_modules/react"),
      // "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    };
    return config;
  },
};

export default nextConfig;
