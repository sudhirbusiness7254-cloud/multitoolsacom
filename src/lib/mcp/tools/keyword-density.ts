import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STOP = new Set([
  "the","a","an","and","or","but","if","then","of","in","on","at","to","for","with",
  "is","are","was","were","be","been","being","have","has","had","do","does","did",
  "will","would","should","could","can","may","might","this","that","these","those",
  "i","you","he","she","it","we","they","me","him","her","us","them","my","your",
  "his","its","our","their","as","by","from","not","no","so","too","very","just",
]);

export default defineTool({
  name: "keyword_density",
  title: "Keyword Density",
  description: "Compute keyword density (top single words) from a block of text. Stop words are filtered out.",
  inputSchema: {
    text: z.string().min(1).describe("Text to analyze."),
    top: z.number().int().min(1).max(50).optional().describe("How many top keywords to return (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ text, top }) => {
    const limit = top ?? 10;
    const tokens = (text.toLowerCase().match(/[a-z0-9']+/g) || []).filter(
      (t) => t.length > 2 && !STOP.has(t),
    );
    const total = tokens.length;
    const counts = new Map<string, number>();
    for (const t of tokens) counts.set(t, (counts.get(t) || 0) + 1);
    const ranked = [...counts.entries()]
      .map(([word, count]) => ({ word, count, density: total ? +((count / total) * 100).toFixed(2) : 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
    return {
      content: [{ type: "text", text: JSON.stringify({ totalWords: total, keywords: ranked }, null, 2) }],
      structuredContent: { totalWords: total, keywords: ranked },
    };
  },
});
