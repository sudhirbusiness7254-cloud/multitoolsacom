import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default defineTool({
  name: "meta_tag_generator",
  title: "Meta Tag Generator",
  description: "Generate SEO meta tags (title, description, Open Graph, Twitter Card) for a web page.",
  inputSchema: {
    title: z.string().min(1).describe("Page title (recommended under 60 characters)."),
    description: z.string().min(1).describe("Meta description (recommended under 160 characters)."),
    url: z.string().url().optional().describe("Canonical page URL."),
    image: z.string().url().optional().describe("Social preview image URL (1200x630 recommended)."),
    siteName: z.string().optional().describe("Site name for og:site_name."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ title, description, url, image, siteName }) => {
    const lines = [
      `<title>${esc(title)}</title>`,
      `<meta name="description" content="${esc(description)}" />`,
      url ? `<link rel="canonical" href="${esc(url)}" />` : null,
      `<meta property="og:title" content="${esc(title)}" />`,
      `<meta property="og:description" content="${esc(description)}" />`,
      `<meta property="og:type" content="website" />`,
      url ? `<meta property="og:url" content="${esc(url)}" />` : null,
      image ? `<meta property="og:image" content="${esc(image)}" />` : null,
      siteName ? `<meta property="og:site_name" content="${esc(siteName)}" />` : null,
      `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />`,
      `<meta name="twitter:title" content="${esc(title)}" />`,
      `<meta name="twitter:description" content="${esc(description)}" />`,
      image ? `<meta name="twitter:image" content="${esc(image)}" />` : null,
    ].filter(Boolean);
    const html = lines.join("\n");
    const warnings: string[] = [];
    if (title.length > 60) warnings.push(`Title is ${title.length} chars (recommended ≤60).`);
    if (description.length > 160) warnings.push(`Description is ${description.length} chars (recommended ≤160).`);
    return {
      content: [{ type: "text", text: html + (warnings.length ? `\n\nWarnings:\n- ${warnings.join("\n- ")}` : "") }],
      structuredContent: { html, warnings },
    };
  },
});
