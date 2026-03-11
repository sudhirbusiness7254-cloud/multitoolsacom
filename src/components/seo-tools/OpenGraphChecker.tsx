import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const OpenGraphChecker = () => {
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogUrl, setOgUrl] = useState("");
  const [ogSiteName, setOgSiteName] = useState("");
  const [copied, setCopied] = useState(false);

  const issues: string[] = [];
  if (ogTitle && ogTitle.length > 60) issues.push("Title is too long (max 60 chars recommended)");
  if (ogTitle && ogTitle.length < 15) issues.push("Title is too short (min 15 chars recommended)");
  if (ogDescription && ogDescription.length > 160) issues.push("Description is too long (max 160 chars recommended)");
  if (ogDescription && ogDescription.length < 50) issues.push("Description is too short (min 50 chars recommended)");
  if (!ogImage) issues.push("Missing OG Image — social shares won't have a preview image");
  if (!ogUrl) issues.push("Missing canonical URL");

  const generatedTags = `<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDescription}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:url" content="${ogUrl}" />
${ogSiteName ? `<meta property="og:site_name" content="${ogSiteName}" />\n` : ""}<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${ogTitle}" />
<meta name="twitter:description" content="${ogDescription}" />
<meta name="twitter:image" content="${ogImage}" />`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    toast.success("OG tags copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Share2 className="w-5 h-5 text-primary" />
            Open Graph Tag Checker & Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">OG Title</label>
            <Input placeholder="Your page title for social media" value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} />
            <p className={`text-xs mt-1 ${ogTitle.length > 60 ? "text-destructive" : "text-muted-foreground"}`}>{ogTitle.length}/60</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">OG Description</label>
            <Textarea placeholder="Description for social media previews..." value={ogDescription} onChange={(e) => setOgDescription(e.target.value)} className="min-h-[80px]" />
            <p className={`text-xs mt-1 ${ogDescription.length > 160 ? "text-destructive" : "text-muted-foreground"}`}>{ogDescription.length}/160</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">OG Image URL</label>
              <Input placeholder="https://yoursite.com/og-image.png" value={ogImage} onChange={(e) => setOgImage(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Page URL</label>
              <Input placeholder="https://yoursite.com/page" value={ogUrl} onChange={(e) => setOgUrl(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Site Name</label>
            <Input placeholder="My Website" value={ogSiteName} onChange={(e) => setOgSiteName(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Facebook Preview */}
      <Card className="border-border">
        <CardHeader><CardTitle className="text-lg text-foreground">Facebook / LinkedIn Preview</CardTitle></CardHeader>
        <CardContent>
          <div className="max-w-lg border border-border rounded-xl overflow-hidden bg-card">
            {ogImage && (
              <div className="aspect-[1.91/1] bg-secondary flex items-center justify-center overflow-hidden">
                <img src={ogImage} alt="OG Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
            {!ogImage && <div className="aspect-[1.91/1] bg-secondary/50 flex items-center justify-center text-muted-foreground text-sm">No image provided</div>}
            <div className="p-3">
              <div className="text-xs text-muted-foreground uppercase">{ogSiteName || ogUrl || "yoursite.com"}</div>
              <div className="text-foreground font-semibold mt-1 line-clamp-2">{ogTitle || "Page Title"}</div>
              <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{ogDescription || "Page description"}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues */}
      {issues.length > 0 && (ogTitle || ogDescription) && (
        <Card className="border-destructive/50">
          <CardHeader><CardTitle className="text-lg text-destructive">Issues Found ({issues.length})</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {issues.map((issue, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-destructive">⚠</span> {issue}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Generated Code */}
      {ogTitle && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground">Generated OG Tags</CardTitle>
              <Button onClick={handleCopy} size="sm" variant="outline">
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-secondary/50 p-4 rounded-xl overflow-x-auto text-sm text-foreground whitespace-pre-wrap">
              <code>{generatedTags}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OpenGraphChecker;
