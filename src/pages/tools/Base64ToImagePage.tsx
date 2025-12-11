import ToolPageLayout from "@/components/ToolPageLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Image, FileCode, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Base64ToImagePage = () => {
  const [base64Input, setBase64Input] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const decodeBase64 = () => {
    if (!base64Input.trim()) {
      toast.error("Please enter a BASE64 string");
      return;
    }

    setIsProcessing(true);
    try {
      let dataUrl = base64Input.trim();
      
      // If it's raw base64, try to detect format and add prefix
      if (!dataUrl.startsWith("data:")) {
        // Check for common image signatures in base64
        if (dataUrl.startsWith("/9j/")) {
          dataUrl = `data:image/jpeg;base64,${dataUrl}`;
        } else if (dataUrl.startsWith("iVBORw")) {
          dataUrl = `data:image/png;base64,${dataUrl}`;
        } else if (dataUrl.startsWith("R0lGOD")) {
          dataUrl = `data:image/gif;base64,${dataUrl}`;
        } else if (dataUrl.startsWith("UklGR")) {
          dataUrl = `data:image/webp;base64,${dataUrl}`;
        } else {
          // Default to PNG if can't detect
          dataUrl = `data:image/png;base64,${dataUrl}`;
        }
      }

      // Create blob from data URL
      const arr = dataUrl.split(",");
      const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      
      setImageBlob(blob);
      setImageUrl(URL.createObjectURL(blob));
      toast.success("Image decoded successfully!");
    } catch (error) {
      toast.error("Invalid BASE64 string. Please check your input.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!imageBlob || !imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    const ext = imageBlob.type.split("/")[1] || "png";
    a.download = `decoded-image.${ext}`;
    a.click();
  };

  return (
    <ToolPageLayout
      title="BASE64 to Image Decoder"
      metaTitle="BASE64 to Image Decoder - Convert Base64 String to Image Free"
      metaDescription="Free online BASE64 to image decoder. Convert base64 encoded strings back to JPG, PNG images. Instant decoding in browser with download."
      keywords={["base64 to image", "base64 decoder", "decode base64", "convert base64 to image", "data url to image"]}
      introduction="Decode BASE64 encoded strings back to viewable and downloadable images. Supports all common image formats including JPEG, PNG, GIF, and WebP."
      features={["Decode any BASE64 image string", "Auto-detect image format", "Instant preview", "One-click download", "Support data URLs and raw base64", "No file size limits"]}
      benefits={["Extract embedded images", "Debug BASE64 in code", "Convert data URLs to files", "Works offline", "Instant decoding", "Privacy protected"]}
      howToUse={["Paste your BASE64 string in the text area", "Click 'Decode Image' button", "Preview the decoded image", "Download if needed"]}
      article="BASE64 decoding reverses the encoding process, converting ASCII text back to binary image data. This is useful for extracting images from HTML, CSS, or JSON files."
      useCases={["Extracting images from HTML emails", "Debugging embedded images", "Converting data URLs to files", "Recovering images from code", "API response image extraction"]}
      faqs={[
        { question: "What formats can I decode?", answer: "Any BASE64 encoded image including JPEG, PNG, GIF, WebP, and BMP. The tool auto-detects the format." },
        { question: "Do I need the data:image prefix?", answer: "No, the tool works with both raw BASE64 strings and full data URLs." }
      ]}
    >
      <div className="space-y-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-primary" />
            Paste BASE64 String
          </h3>
          <textarea
            value={base64Input}
            onChange={(e) => setBase64Input(e.target.value)}
            placeholder="Paste your BASE64 encoded image string here...&#10;&#10;Examples:&#10;• data:image/png;base64,iVBORw0KGgo...&#10;• iVBORw0KGgoAAAANSUhEUgAAA... (raw base64)"
            className="w-full h-48 p-4 text-sm font-mono bg-muted rounded-lg border resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button 
            onClick={decodeBase64} 
            disabled={isProcessing || !base64Input.trim()} 
            className="mt-4 w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Decoding...
              </>
            ) : (
              <>
                <Image className="w-4 h-4 mr-2" />
                Decode Image
              </>
            )}
          </Button>
        </div>

        {imageUrl && (
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Image className="w-5 h-5 text-primary" />
              Decoded Image
            </h3>
            <div className="bg-[url('/placeholder.svg')] bg-repeat rounded-lg p-4 mb-4">
              <img 
                src={imageUrl} 
                alt="Decoded" 
                className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg"
              />
            </div>
            {imageBlob && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Size: {(imageBlob.size / 1024).toFixed(2)} KB • Type: {imageBlob.type}
                </p>
                <Button onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Image
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default Base64ToImagePage;
