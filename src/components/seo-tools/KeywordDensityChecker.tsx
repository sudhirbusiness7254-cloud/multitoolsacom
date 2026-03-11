import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

const KeywordDensityChecker = () => {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    if (!text.trim()) return null;

    const words = text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
    const totalWords = words.length;
    if (totalWords === 0) return null;

    // Stop words to exclude
    const stopWords = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "from", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "can", "shall", "it", "its", "this", "that", "these", "those", "i", "you", "he", "she", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "our", "their", "not", "no", "so", "if", "as"]);

    // Single word frequency
    const wordFreq: Record<string, number> = {};
    words.forEach(w => {
      if (!stopWords.has(w) && w.length > 2) {
        wordFreq[w] = (wordFreq[w] || 0) + 1;
      }
    });

    // Two-word phrases
    const phraseFreq: Record<string, number> = {};
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      if (!stopWords.has(words[i]) || !stopWords.has(words[i + 1])) {
        phraseFreq[phrase] = (phraseFreq[phrase] || 0) + 1;
      }
    }

    const sortedWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalWords) * 100).toFixed(2),
      }));

    const sortedPhrases = Object.entries(phraseFreq)
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([phrase, count]) => ({
        word: phrase,
        count,
        density: ((count / totalWords) * 100).toFixed(2),
      }));

    return { totalWords, sortedWords, sortedPhrases };
  }, [text]);

  const getDensityColor = (density: string) => {
    const d = parseFloat(density);
    if (d > 3) return "destructive";
    if (d > 1.5) return "default";
    return "secondary";
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="w-5 h-5 text-primary" />
            Keyword Density Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your article or content here to analyze keyword density..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px]"
          />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setText("")}>
              <Trash2 className="w-4 h-4 mr-1" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                Summary — {analysis.totalWords} words analyzed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{analysis.totalWords}</div>
                  <div className="text-xs text-muted-foreground">Total Words</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{analysis.sortedWords.length}</div>
                  <div className="text-xs text-muted-foreground">Unique Keywords</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{analysis.sortedPhrases.length}</div>
                  <div className="text-xs text-muted-foreground">Repeated Phrases</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Top Keywords (Single Words)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.sortedWords.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/30">
                      <span className="text-foreground font-medium">{item.word}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">×{item.count}</span>
                        <Badge variant={getDensityColor(item.density)}>{item.density}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Top Phrases (2 Words)</CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.sortedPhrases.length > 0 ? (
                  <div className="space-y-2">
                    {analysis.sortedPhrases.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/30">
                        <span className="text-foreground font-medium">{item.word}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">×{item.count}</span>
                          <Badge variant={getDensityColor(item.density)}>{item.density}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No repeated phrases found. Add more content to see phrase analysis.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default KeywordDensityChecker;
