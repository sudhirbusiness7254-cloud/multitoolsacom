import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "word_counter",
  title: "Word Counter",
  description: "Count words, characters (with and without spaces), sentences, and paragraphs in text.",
  inputSchema: {
    text: z.string().min(1).describe("Text to analyze."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ text }) => {
    const words = (text.trim().match(/\S+/g) || []).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).length;
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
    const readingTimeMinutes = Math.max(1, Math.round(words / 200));
    const stats = { words, characters, charactersNoSpaces, sentences, paragraphs, readingTimeMinutes };
    return {
      content: [{ type: "text", text: JSON.stringify(stats, null, 2) }],
      structuredContent: stats,
    };
  },
});
