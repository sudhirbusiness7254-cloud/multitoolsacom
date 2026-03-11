import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListOrdered, Trash2 } from "lucide-react";

const HeadingChecker = () => {
  const [html, setHtml] = useState("");

  const analysis = useMemo(() => {
    if (!html.trim()) return null;

    const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
    const headings: { level: number; text: string }[] = [];
    let match;
    while ((match = headingRegex.exec(html)) !== null) {
      headings.push({ level: parseInt(match[1]), text: match[2].replace(/<[^>]*>/g, "").trim() });
    }

    // Also check plain text patterns like "# Heading"
    if (headings.length === 0) {
      const lines = html.split("\n");
      lines.forEach((line) => {
        const mdMatch = line.match(/^(#{1,6})\s+(.+)/);
        if (mdMatch) {
          headings.push({ level: mdMatch[1].length, text: mdMatch[2].trim() });
        }
      });
    }

    const issues: string[] = [];
    const h1Count = headings.filter(h => h.level === 1).length;
    if (h1Count === 0) issues.push("Missing H1 tag — every page should have exactly one H1");
    if (h1Count > 1) issues.push(`Multiple H1 tags found (${h1Count}) — use only one H1 per page`);

    // Check hierarchy
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level > headings[i - 1].level + 1) {
        issues.push(`Skipped heading level: H${headings[i - 1].level} → H${headings[i].level} (should not skip levels)`);
      }
    }

    // Check empty headings
    headings.forEach((h, i) => {
      if (!h.text) issues.push(`Empty H${h.level} heading found at position ${i + 1}`);
    });

    return { headings, issues };
  }, [html]);

  const getLevelColor = (level: number) => {
    const colors: Record<number, string> = { 1: "bg-primary text-primary-foreground", 2: "bg-primary/80 text-primary-foreground", 3: "bg-primary/60 text-primary-foreground", 4: "bg-secondary text-secondary-foreground", 5: "bg-secondary text-secondary-foreground", 6: "bg-muted text-muted-foreground" };
    return colors[level] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <ListOrdered className="w-5 h-5 text-primary" />
            Heading Structure Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={"Paste your HTML or Markdown here to check heading structure...\n\nExample:\n<h1>Main Title</h1>\n<h2>Section 1</h2>\n<h3>Sub Section</h3>\n\nOr Markdown:\n# Main Title\n## Section 1\n### Sub Section"}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          <Button variant="outline" size="sm" onClick={() => setHtml("")}>
            <Trash2 className="w-4 h-4 mr-1" /> Clear
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <>
          {analysis.issues.length > 0 && (
            <Card className="border-destructive/50">
              <CardHeader><CardTitle className="text-lg text-destructive">Issues ({analysis.issues.length})</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.issues.map((issue, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-destructive">⚠</span> {issue}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                Heading Hierarchy ({analysis.headings.length} headings found)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysis.headings.length > 0 ? (
                <div className="space-y-2">
                  {analysis.headings.map((h, i) => (
                    <div key={i} className="flex items-center gap-3" style={{ paddingLeft: `${(h.level - 1) * 20}px` }}>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${getLevelColor(h.level)}`}>
                        H{h.level}
                      </span>
                      <span className="text-foreground text-sm">{h.text || "(empty)"}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No headings found in the provided content.</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default HeadingChecker;
