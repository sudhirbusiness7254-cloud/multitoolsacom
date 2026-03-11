import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CaseSensitive, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

type CaseType = "upper" | "lower" | "title" | "sentence" | "capitalize" | "alternating" | "inverse";

const TextCaseConverter = () => {
  const [text, setText] = useState("");

  const convert = (type: CaseType): string => {
    switch (type) {
      case "upper": return text.toUpperCase();
      case "lower": return text.toLowerCase();
      case "title": return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      case "sentence": return text.toLowerCase().replace(/(^\w|[.!?]\s+\w)/g, c => c.toUpperCase());
      case "capitalize": return text.replace(/\b\w/g, c => c.toUpperCase());
      case "alternating": return text.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("");
      case "inverse": return text.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
      default: return text;
    }
  };

  const applyCase = (type: CaseType) => {
    setText(convert(type));
    toast.success("Text converted!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const buttons: { label: string; type: CaseType; example: string }[] = [
    { label: "UPPERCASE", type: "upper", example: "HELLO WORLD" },
    { label: "lowercase", type: "lower", example: "hello world" },
    { label: "Title Case", type: "title", example: "Hello World" },
    { label: "Sentence case", type: "sentence", example: "Hello world. This is text." },
    { label: "Capitalize Each Word", type: "capitalize", example: "Hello World" },
    { label: "aLtErNaTiNg", type: "alternating", example: "hElLo WoRlD" },
    { label: "InVeRsE", type: "inverse", example: "hELLO wORLD" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CaseSensitive className="w-5 h-5 text-primary" />
            Text Case Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type or paste your text here, then click a button below to convert the case..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px]"
          />

          <div className="flex flex-wrap gap-2">
            {buttons.map((btn) => (
              <Button key={btn.type} variant="outline" size="sm" onClick={() => applyCase(btn.type)} disabled={!text.trim()}>
                {btn.label}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setText("")}>
              <Trash2 className="w-4 h-4 mr-1" /> Clear
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!text.trim()}>
              <Copy className="w-4 h-4 mr-1" /> Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {text.trim() && (
        <Card className="border-border">
          <CardHeader><CardTitle className="text-lg text-foreground">Quick Stats</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
              <div className="p-3 bg-secondary/50 rounded-xl">
                <div className="text-xl font-bold text-primary">{text.trim().split(/\s+/).length}</div>
                <div className="text-xs text-muted-foreground">Words</div>
              </div>
              <div className="p-3 bg-secondary/50 rounded-xl">
                <div className="text-xl font-bold text-primary">{text.length}</div>
                <div className="text-xs text-muted-foreground">Characters</div>
              </div>
              <div className="p-3 bg-secondary/50 rounded-xl">
                <div className="text-xl font-bold text-primary">{text.split(/[.!?]+/).filter(s => s.trim()).length}</div>
                <div className="text-xs text-muted-foreground">Sentences</div>
              </div>
              <div className="p-3 bg-secondary/50 rounded-xl">
                <div className="text-xl font-bold text-primary">{text.split("\n").length}</div>
                <div className="text-xs text-muted-foreground">Lines</div>
              </div>
              <div className="p-3 bg-secondary/50 rounded-xl">
                <div className="text-xl font-bold text-primary">{text.replace(/\s/g, "").length}</div>
                <div className="text-xs text-muted-foreground">No Spaces</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TextCaseConverter;
