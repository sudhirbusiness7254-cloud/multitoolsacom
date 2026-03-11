import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Type, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    const lines = text.trim() ? text.split("\n").length : 0;

    // Reading time (avg 200 wpm)
    const readingTime = Math.max(1, Math.ceil(words / 200));
    // Speaking time (avg 130 wpm)
    const speakingTime = Math.max(1, Math.ceil(words / 130));

    // Average word length
    const avgWordLength = words > 0 ? (charsNoSpaces / words).toFixed(1) : "0";
    // Average sentence length
    const avgSentenceLength = sentences > 0 ? Math.round(words / sentences) : 0;

    return { chars, charsNoSpaces, words, sentences, paragraphs, lines, readingTime, speakingTime, avgWordLength, avgSentenceLength };
  }, [text]);

  const handleCopy = () => {
    const summary = `Words: ${stats.words}\nCharacters: ${stats.chars}\nCharacters (no spaces): ${stats.charsNoSpaces}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}\nReading Time: ${stats.readingTime} min\nSpeaking Time: ${stats.speakingTime} min`;
    navigator.clipboard.writeText(summary);
    toast.success("Stats copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Type className="w-5 h-5 text-primary" />
            Word Counter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Start typing or paste your text here to count words, characters, sentences, and more..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[250px]"
          />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setText("")}>
              <Trash2 className="w-4 h-4 mr-1" /> Clear
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-1" /> Copy Stats
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.chars },
          { label: "No Spaces", value: stats.charsNoSpaces },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
        ].map((item) => (
          <Card key={item.label} className="border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Lines", value: stats.lines },
          { label: "Reading Time", value: `${stats.readingTime} min` },
          { label: "Speaking Time", value: `${stats.speakingTime} min` },
          { label: "Avg Word Length", value: `${stats.avgWordLength} chars` },
        ].map((item) => (
          <Card key={item.label} className="border-border">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-foreground">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WordCounter;
