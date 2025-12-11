import ToolPageLayout from "@/components/ToolPageLayout";
import DragDropUpload from "@/components/DragDropUpload";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Image, Code, Download } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImageToHtmlPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [altText, setAltText] = useState("Image");
  const [cssClass, setCssClass] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [outputType, setOutputType] = useState<"inline" | "external" | "responsive">("inline");

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setCopied(false);
    setAltText(selectedFile.name.split('.')[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      setBase64(dataUrl);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const getHtmlOutput = () => {
    if (!base64 && !file) return "";
    
    const src = outputType === "external" ? `images/${file?.name || 'image.png'}` : base64;
    const classAttr = cssClass ? ` class="${cssClass}"` : "";
    const widthAttr = width ? ` width="${width}"` : "";
    const heightAttr = height ? ` height="${height}"` : "";
    
    switch (outputType) {
      case "inline":
        return `<img src="${src}" alt="${altText}"${classAttr}${widthAttr}${heightAttr} />`;
      case "external":
        return `<img src="${src}" alt="${altText}"${classAttr}${widthAttr}${heightAttr} loading="lazy" />`;
      case "responsive":
        return `<picture>
  <source srcset="${src}" type="${file?.type || 'image/png'}">
  <img 
    src="${src}" 
    alt="${altText}"
    ${cssClass ? `class="${cssClass}"` : 'class="img-fluid"'}
    style="max-width: 100%; height: auto;"
    loading="lazy"
    decoding="async"
  />
</picture>`;
      default:
        return "";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getHtmlOutput());
    setCopied(true);
    toast.success("HTML copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${altText}</title>
  <style>
    body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f5f5f5; }
    img { max-width: 100%; height: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  ${getHtmlOutput()}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.split('.')[0] || 'image'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPageLayout
      title="Image to HTML Converter"
      metaTitle="Image to HTML Converter - Generate HTML Image Tags Free"
      metaDescription="Free online image to HTML converter. Generate img tags with alt text, classes, and responsive picture elements. Instant HTML code generation."
      keywords={["image to html", "generate img tag", "html image code", "responsive image html", "picture element generator"]}
      introduction="Convert your images to ready-to-use HTML code with customizable alt text, CSS classes, dimensions, and responsive picture elements."
      features={["Generate inline BASE64 img tags", "External image path references", "Responsive picture elements", "Custom alt text and classes", "Width and height attributes", "Download complete HTML file"]}
      benefits={["Copy-paste ready code", "SEO-friendly alt text", "Responsive design support", "Clean semantic HTML", "Works with any image format", "No server required"]}
      howToUse={["Upload your image", "Customize HTML options", "Select output type", "Copy HTML or download file"]}
      article="Proper HTML image markup is essential for web accessibility and SEO. Our tool generates semantic HTML with alt attributes, lazy loading, and responsive picture elements."
      useCases={["Adding images to websites", "Creating email templates", "Building documentation", "Generating responsive images", "Quick prototyping"]}
      faqs={[
        { question: "What's the difference between inline and external?", answer: "Inline embeds the image as BASE64, external references a file path you need to provide." },
        { question: "Should I use picture element?", answer: "Picture elements are best for responsive designs where you need different images for different screen sizes." }
      ]}
    >
      <div className="space-y-6">
        <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />

        {file && preview && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-4 border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary" />
                  Preview
                </h3>
                <img src={preview} alt="Preview" className="max-w-full max-h-48 mx-auto rounded-lg" />
              </div>

              <div className="bg-card rounded-xl p-4 border border-border space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  HTML Options
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "inline", label: "Inline (BASE64)" },
                    { key: "external", label: "External Path" },
                    { key: "responsive", label: "Responsive" },
                  ].map((type) => (
                    <Button
                      key={type.key}
                      variant={outputType === type.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOutputType(type.key as typeof outputType)}
                      className={type.key === "responsive" ? "col-span-2" : ""}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="altText">Alt Text</Label>
                    <Input id="altText" value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Image description" />
                  </div>
                  <div>
                    <Label htmlFor="cssClass">CSS Class</Label>
                    <Input id="cssClass" value={cssClass} onChange={(e) => setCssClass(e.target.value)} placeholder="e.g., img-fluid shadow" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="width">Width</Label>
                      <Input id="width" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g., 800" />
                    </div>
                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Input id="height" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Generated HTML
              </h3>
              <div className="relative">
                <pre className="w-full h-64 p-4 text-xs font-mono bg-muted rounded-lg border overflow-auto whitespace-pre-wrap">
                  {getHtmlOutput()}
                </pre>
                <Button onClick={handleCopy} size="sm" className="absolute top-2 right-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleCopy} className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy HTML
                </Button>
                <Button onClick={handleDownloadHtml} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download .html
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageToHtmlPage;
