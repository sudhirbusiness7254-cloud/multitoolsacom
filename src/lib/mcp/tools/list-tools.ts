import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const TOOLS = [
  { category: "Image", tools: ["compress", "convert", "resize", "crop", "rotate", "flip", "watermark", "filters", "metadata"] },
  { category: "PDF", tools: ["merge", "split", "compress", "image-to-pdf", "word-to-pdf"] },
  { category: "SEO", tools: ["word-counter", "keyword-density", "meta-tag-generator", "open-graph-checker", "heading-checker", "text-case-converter"] },
  { category: "QR", tools: ["generate", "decode"] },
];

export default defineTool({
  name: "list_multitoolsa_tools",
  title: "List Convert Tools",
  description: "List the free online tools available on multitoolsa.com, grouped by category.",
  inputSchema: {
    category: z.string().optional().describe("Optional category filter: Image, PDF, SEO, or QR."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const filtered = category
      ? TOOLS.filter((c) => c.category.toLowerCase() === category.toLowerCase())
      : TOOLS;
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
      structuredContent: { categories: filtered, site: "https://multitoolsa.com" },
    };
  },
});
