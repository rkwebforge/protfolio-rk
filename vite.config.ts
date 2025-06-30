import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { cspPlugin } from "./vite-plugins/csp";
import { manifestPlugin } from "./vite-plugins/manifest";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), cspPlugin(), manifestPlugin()],
  base: mode === "production" ? "/protfolio-rk/" : "/", // Conditional base path
  // Public directory for static assets
  publicDir: "public",

  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
    headers: {
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'unsafe-hashes'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' ws: wss: http: https:; object-src 'none'; base-uri 'self'",
    },
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },

  // Optimization configuration
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "lucide-react"],
  },

  // Build configuration
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: mode === "development",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "vendor";
          }
          if (id.includes("node_modules/react-router-dom")) {
            return "router";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
          if (id.includes("node_modules/framer-motion")) {
            return "animation";
          }
          if (id.includes("node_modules")) {
            return "vendor-libs";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          // Keep images in their original structure
          if (
            assetInfo.name &&
            /\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)
          ) {
            return "assets/[name]-[hash].[ext]";
          }
          return "assets/[name]-[hash].[ext]";
        },
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Increase max file count and inline limit for better asset handling
    assetsInlineLimit: 0, // Don't inline any assets to avoid CSP issues
  },
}));
