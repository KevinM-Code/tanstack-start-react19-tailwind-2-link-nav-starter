import { defineConfig } from "@tanstack/start/config";

export default defineConfig({
    server: {
      prerender: {
        routes: ['/about'],
        crawlLinks: true,
      },
    },
  });
