import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mcpPlugin(), mode === "development" && componentTagger()].filter(Boolean),

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
        // Only split self-contained heavy libraries. A catch-all "vendor" chunk
        // creates circular chunk imports that crash at startup ("Cannot access X before initialization").
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return;
          if (id.includes("pdf-lib") || id.includes("pdfjs") || id.includes("jspdf")) return "pdf";
          if (id.includes("docx") || id.includes("pptxgen") || id.includes("xlsx")) return "docs";
        },
      },
    },
  },
}));
