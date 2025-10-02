import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    hmr: {
      overlay: false,
    },
    allowedHosts: [
      "3442e0f1-c40d-4507-b097-574ac344832f-00-12czkyn9vc8r5.sisko.replit.dev"
    ]
  }
});
