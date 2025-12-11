import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import DragDropUpload from "./DragDropUpload";
import { Download, FileText, File, Presentation, Code, Binary } from "lucide-react";
import jsPDF from "jspdf";

type DocumentFormat = "pdf" | "html" | "base64";

interface FormatOption {
  id: DocumentFormat;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const formatOptions: FormatOption[] = [
  { id: "pdf", label: "PDF", icon: <FileText className="w-5 h-5" />, description: "Portable Document" },
  { id: "html", label: "HTML", icon: <Code className="w-5 h-5" />, description: "Web Page" },
  { id: "base64", label: "Base64", icon: <Binary className="w-5 h-5" />, description: "Text Encoding" },
];

const UniversalDocumentConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<DocumentFormat>("pdf");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ data: string; filename: string } | null>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setProgress(0);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const convertToPdf = async (imageDataUrl: string): Promise<{ data: string; filename: string }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const pdf = new jsPDF({
          orientation: img.width > img.height ? "landscape" : "portrait",
          unit: "px",
          format: [img.width, img.height],
        });
        
        pdf.addImage(imageDataUrl, "JPEG", 0, 0, img.width, img.height);
        const pdfData = pdf.output("datauristring");
        resolve({ data: pdfData, filename: `${file?.name?.split('.')[0] || 'image'}.pdf` });
      };
      img.src = imageDataUrl;
    });
  };

  const convertToHtml = async (imageDataUrl: string): Promise<{ data: string; filename: string }> => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${file?.name || 'Image'}</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #1a1a2e;
            font-family: system-ui, -apple-system, sans-serif;
        }
        .container {
            text-align: center;
            background: #16213e;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            color: #e94560;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${file?.name || 'Converted Image'}</h1>
        <img src="${imageDataUrl}" alt="Converted Image" />
    </div>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const dataUrl = URL.createObjectURL(blob);
    return { data: dataUrl, filename: `${file?.name?.split('.')[0] || 'image'}.html` };
  };

  const convertToBase64 = async (imageDataUrl: string): Promise<{ data: string; filename: string }> => {
    const base64Content = imageDataUrl;
    const textContent = `Image Base64 Encoding
=====================

File: ${file?.name || 'image'}
Generated: ${new Date().toLocaleString()}

Base64 Data URL:
----------------
${base64Content}

Pure Base64 (without prefix):
-----------------------------
${base64Content.split(',')[1] || base64Content}

CSS Usage:
----------
background-image: url('${base64Content}');

HTML Usage:
-----------
<img src="${base64Content}" alt="Encoded Image" />
`;
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const dataUrl = URL.createObjectURL(blob);
    return { data: dataUrl, filename: `${file?.name?.split('.')[0] || 'image'}_base64.txt` };
  };

  const handleConvert = async () => {
    if (!file || !preview) {
      toast.error("Please upload an image first");
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setResult(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 15, 85));
      }, 100);

      let conversionResult: { data: string; filename: string };

      switch (selectedFormat) {
        case "pdf":
          conversionResult = await convertToPdf(preview);
          break;
        case "html":
          conversionResult = await convertToHtml(preview);
          break;
        case "base64":
          conversionResult = await convertToBase64(preview);
          break;
        default:
          throw new Error("Unsupported format");
      }

      clearInterval(progressInterval);
      setProgress(100);
      setResult(conversionResult);
      toast.success(`Converted to ${selectedFormat.toUpperCase()} successfully!`);
    } catch (error) {
      toast.error("Conversion failed. Please try again.");
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const link = document.createElement("a");
    link.href = result.data;
    link.download = result.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download started!");
  };

  const resetConverter = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Format Selection */}
      <div className="flex flex-wrap justify-center gap-3">
        {formatOptions.map((format) => (
          <button
            key={format.id}
            onClick={() => {
              setSelectedFormat(format.id);
              setResult(null);
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              selectedFormat === format.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {format.icon}
            <div className="text-left">
              <div className="font-semibold">{format.label}</div>
              <div className="text-xs opacity-70">{format.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Upload Area */}
      {!file ? (
        <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
      ) : (
        <div className="space-y-4">
          {/* Preview */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {preview && (
                <div className="relative w-full md:w-1/3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded-lg bg-muted"
                  />
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-semibold text-foreground mb-2">{file.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Size: {(file.size / 1024).toFixed(2)} KB → {selectedFormat.toUpperCase()}
                </p>
                
                {/* Progress Bar */}
                {isConverting && (
                  <div className="mb-4">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Converting... {progress}%</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {!result ? (
                    <Button
                      onClick={handleConvert}
                      disabled={isConverting}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isConverting ? "Converting..." : `Convert to ${selectedFormat.toUpperCase()}`}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download {result.filename}
                    </Button>
                  )}
                  <Button variant="outline" onClick={resetConverter}>
                    Upload Another
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Result Info */}
          {result && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-medium">
                ✓ Conversion complete! Click download to save your {selectedFormat.toUpperCase()} file.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversalDocumentConverter;
