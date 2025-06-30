import type { Plugin } from "vite";

export function manifestPlugin(): Plugin {
  return {
    name: "manifest-plugin",
    generateBundle(options) {
      // Only run during production build
      if (options.dir) {
        const manifestContent = {
          name: "RK Prasad - Front-End Developer",
          short_name: "RK Prasad",
          description:
            "Creative front-end developer specializing in React, TypeScript, and modern web technologies.",
          start_url: "/protfolio-rk/",
          scope: "/protfolio-rk/",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#000000",
          icons: [
            {
              src: "/protfolio-rk/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/protfolio-rk/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        };

        // Emit the manifest file
        this.emitFile({
          type: "asset",
          fileName: "manifest.json",
          source: JSON.stringify(manifestContent, null, 2),
        });
      }
    },
    configureServer(server) {
      // For development, serve the dev manifest
      server.middlewares.use("/manifest.json", (_req, res) => {
        const devManifest = {
          name: "RK Prasad - Front-End Developer",
          short_name: "RK Prasad",
          description:
            "Creative front-end developer specializing in React, TypeScript, and modern web technologies.",
          start_url: "/",
          scope: "/",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#000000",
          icons: [
            {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        };

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(devManifest, null, 2));
      });
    },
  };
}
