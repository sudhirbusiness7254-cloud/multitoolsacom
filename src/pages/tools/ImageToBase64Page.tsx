import ToolPageLayout from "@/components/ToolPageLayout";
import DragDropUpload from "@/components/DragDropUpload";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Image, FileCode } from "lucide-react";
import { toast } from "sonner";

const ImageToBase64Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [outputType, setOutputType] = useState<"raw" | "dataurl" | "css" | "html">("dataurl");

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setCopied(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      setBase64(dataUrl);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const getFormattedOutput = () => {
    if (!base64) return "";
    
    switch (outputType) {
      case "raw":
        return base64.split(",")[1] || base64;
      case "dataurl":
        return base64;
      case "css":
        return `background-image: url('${base64}');`;
      case "html":
        return `<img src="${base64}" alt="Encoded image" />`;
      default:
        return base64;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedOutput());
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="Image to BASE64 Encoder"
      metaTitle="Image to BASE64 Encoder - Convert Images to Base64 String Free"
      metaDescription="Free online image to BASE64 encoder. Convert JPG, PNG, WebP images to base64 strings for HTML, CSS embedding. Instant conversion in browser."
      keywords={["image to base64", "base64 encoder", "convert image to base64", "image to data url", "inline image"]}
      introduction="Encode your images to BASE64 format for direct embedding in web pages, CSS stylesheets, or JSON data. No server upload required - everything happens in your browser."
      features={["Convert any image to BASE64", "Multiple output formats", "One-click copy", "Live preview", "CSS and HTML snippets", "No file size limits"]}
      benefits={["Reduce HTTP requests", "Embed images directly in code", "No external file dependencies", "Works offline", "Instant encoding", "Privacy protected"]}
      howToUse={["Upload an image by dragging or clicking", "Select output format (raw, data URL, CSS, HTML)", "Copy the encoded string", "Paste in your code"]}
      article="BASE64 encoding converts binary image data into ASCII text, allowing images to be embedded directly in HTML, CSS, or JSON. This reduces HTTP requests and ensures images load with your code."
      useCases={["Embedding small icons in CSS", "Email HTML templates", "Single-file web applications", "API responses with images", "Offline web apps"]}
      faqs={[
        { question: "When should I use BASE64 images?", answer: "BASE64 is ideal for small images like icons or logos. For larger images, regular file references are more efficient." },
        { question: "Does BASE64 increase file size?", answer: "Yes, BASE64 encoding increases size by about 33%. Use it for small images under 10KB for best results." }
      ]}
    >
      <div className="space-y-6">
        <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />

        {file && preview && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                Original Image
              </h3>
              <img src={preview} alt="Preview" className="max-w-full max-h-64 mx-auto rounded-lg" />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {file.name} • {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-primary" />
                Output Format
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { key: "dataurl", label: "Data URL" },
                  { key: "raw", label: "Raw BASE64" },
                  { key: "css", label: "CSS" },
                  { key: "html", label: "HTML" },
                ].map((type) => (
                  <Button
                    key={type.key}
                    variant={outputType === type.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOutputType(type.key as typeof outputType)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
              
              <div className="relative">
                <textarea
                  readOnly
                  value={getFormattedOutput()}
                  className="w-full h-40 p-3 text-xs font-mono bg-muted rounded-lg border resize-none"
                />
                <Button
                  onClick={handleCopy}
                  size="sm"
                  className="absolute top-2 right-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                Encoded size: {(getFormattedOutput().length / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageToBase64Page;
