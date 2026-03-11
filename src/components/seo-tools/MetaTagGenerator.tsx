import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const MetaTagGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [author, setAuthor] = useState("");
  const [copied, setCopied] = useState(false);

  const generatedCode = `<!-- Primary Meta Tags -->
<title>${title || "Your Page Title"}</title>
<meta name="title" content="${title || "Your Page Title"}" />
<meta name="description" content="${description || "Your page description here"}" />
${keywords ? `<meta name="keywords" content="${keywords}" />\n` : ""}${author ? `<meta name="author" content="${author}" />\n` : ""}<meta name="robots" content="index, follow" />
<link rel="canonical" href="${url || "https://yoursite.com"}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url || "https://yoursite.com"}" />
<meta property="og:title" content="${title || "Your Page Title"}" />
<meta property="og:description" content="${description || "Your page description here"}" />
${ogImage ? `<meta property="og:image" content="${ogImage}" />\n` : ""}${siteName ? `<meta property="og:site_name" content="${siteName}" />\n` : ""}
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${url || "https://yoursite.com"}" />
<meta name="twitter:title" content="${title || "Your Page Title"}" />
<meta name="twitter:description" content="${description || "Your page description here"}" />
${ogImage ? `<meta name="twitter:image" content="${ogImage}" />` : ""}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    toast.success("Meta tags copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Code className="w-5 h-5 text-primary" />
            Meta Tag Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Page Title *</label>
              <Input
                placeholder="My Awesome Page"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={60}
              />
              <p className={`text-xs mt-1 ${title.length > 60 ? "text-destructive" : "text-muted-foreground"}`}>
                {title.length}/60 characters {title.length > 60 && "— Too long!"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Page URL</label>
              <Input
                placeholder="https://yoursite.com/page"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Meta Description *</label>
            <Textarea
              placeholder="A compelling description of your page for search engines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={160}
              className="min-h-[80px]"
            />
            <p className={`text-xs mt-1 ${description.length > 160 ? "text-destructive" : "text-muted-foreground"}`}>
              {description.length}/160 characters {description.length > 160 && "— Too long!"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Keywords (comma separated)</label>
              <Input
                placeholder="keyword1, keyword2, keyword3"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Author</label>
              <Input
                placeholder="John Doe"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Site Name</label>
              <Input
                placeholder="My Website"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">OG Image URL</label>
              <Input
                placeholder="https://yoursite.com/image.png"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-foreground">Google Search Preview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-card border border-border rounded-xl p-4 max-w-xl">
            <div className="text-sm text-muted-foreground">{url || "https://yoursite.com"}</div>
            <div className="text-lg text-primary font-medium hover:underline cursor-pointer mt-1">
              {title || "Your Page Title"}
            </div>
            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description || "Your page description will appear here. Write a compelling description to increase click-through rates from search results."}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Code */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-foreground">Generated HTML Code</CardTitle>
            <Button onClick={handleCopy} size="sm" variant="outline">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="bg-secondary/50 p-4 rounded-xl overflow-x-auto text-sm text-foreground whitespace-pre-wrap">
            <code>{generatedCode}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaTagGenerator;
