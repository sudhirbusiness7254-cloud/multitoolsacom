import { defineMcp } from "@lovable.dev/mcp-js";
import listTools from "./tools/list-tools";
import wordCounter from "./tools/word-counter";
import keywordDensity from "./tools/keyword-density";
import textCase from "./tools/text-case";
import metaTagGenerator from "./tools/meta-tag-generator";

export default defineMcp({
  name: "multitoolsa-mcp",
  title: "MultiToolsA MCP",
  version: "0.1.0",
  instructions:
    "MultiToolsA MCP server. Tools for SEO text analysis (word counting, keyword density, text case conversion, meta tag generation) and discovery of the 100+ free tools available at multitoolsa.com. All tools operate on public text input and require no authentication.",
  tools: [listTools, wordCounter, keywordDensity, textCase, metaTagGenerator],
});
