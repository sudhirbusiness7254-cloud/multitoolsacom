import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const CASES = ["upper", "lower", "title", "sentence", "camel", "snake", "kebab"] as const;

function toTitle(s: string) {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}
function toSentence(s: string) {
  const lower = s.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
}
function toCamel(s: string) {
  const parts = s.toLowerCase().match(/[a-z0-9]+/g) || [];
  return parts.map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1))).join("");
}
function toSnake(s: string) {
  return (s.toLowerCase().match(/[a-z0-9]+/g) || []).join("_");
}
function toKebab(s: string) {
  return (s.toLowerCase().match(/[a-z0-9]+/g) || []).join("-");
}

export default defineTool({
  name: "text_case_converter",
  title: "Text Case Converter",
  description: "Convert text between UPPER, lower, Title Case, Sentence case, camelCase, snake_case, or kebab-case.",
  inputSchema: {
    text: z.string().min(1).describe("Text to convert."),
    target: z.enum(CASES).describe("Target case."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ text, target }) => {
    let out = text;
    switch (target) {
      case "upper": out = text.toUpperCase(); break;
      case "lower": out = text.toLowerCase(); break;
      case "title": out = toTitle(text); break;
      case "sentence": out = toSentence(text); break;
      case "camel": out = toCamel(text); break;
      case "snake": out = toSnake(text); break;
      case "kebab": out = toKebab(text); break;
    }
    return { content: [{ type: "text", text: out }], structuredContent: { result: out, target } };
  },
});
