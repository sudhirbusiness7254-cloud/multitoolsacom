import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom") || id.includes("react/") || id.includes("scheduler")) {
            return "react-vendor";
          }
          if (id.includes("react-router")) return "router";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("@tanstack")) return "query";
          if (id.includes("framer-motion") || id.includes("motion")) return "motion";
          if (id.includes("pdf-lib") || id.includes("pdfjs") || id.includes("jspdf")) return "pdf";
          if (id.includes("docx") || id.includes("pptxgen") || id.includes("xlsx")) return "docs";
          if (id.includes("qrcode") || id.includes("jsqr")) return "qr";
          return "vendor";
        },
      },
    },
  },
}));
