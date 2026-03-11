import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DragDropUpload from "@/components/DragDropUpload";
import { Download, RotateCcw, QrCode, ScanLine } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type QRMode = "generate" | "read";

interface UniversalQRToolsProps {
  initialMode?: QRMode;
}

const UniversalQRTools = ({ initialMode = "generate" }: UniversalQRToolsProps) => {
  const [mode, setMode] = useState<QRMode>(initialMode);
  const [content, setContent] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [decodedContent, setDecodedContent] = useState<string | null>(null);
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = useCallback(() => {
    if (!content.trim()) {
      toast({ title: "Content required", description: "Please enter content to encode.", variant: "destructive" });
      return;
    }

    // Using a public QR code API for demo
    const encodedContent = encodeURIComponent(content);
    const fgColor = foreground.replace("#", "");
    const bgColor = background.replace("#", "");
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedContent}&color=${fgColor}&bgcolor=${bgColor}`;
    setQrImageUrl(qrUrl);
    toast({ title: "QR Code generated!", description: "Your QR code is ready for download." });
  }, [content, size, foreground, background]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    // For demo purposes, we'll show the uploaded image
    // In production, you'd use a QR reading library
    const url = URL.createObjectURL(selectedFile);
    
    // Simulate QR reading (in production use a library like jsQR)
    toast({ 
      title: "QR Scan", 
      description: "QR code reading requires jsQR library. This is a demo placeholder." 
    });
    setDecodedContent("Demo: QR reading requires jsQR library integration");
  };

  const handleDownload = () => {
    if (!qrImageUrl) return;
    
    // Create a canvas to download
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        toast({ title: "Download started", description: "Your QR code is being downloaded." });
      }
    };
    img.src = qrImageUrl;
  };

  const handleReset = () => {
    setContent("https://example.com");
    setQrImageUrl(null);
    setFile(null);
    setDecodedContent(null);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <canvas ref={canvasRef} className="hidden" />

      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex justify-center gap-2">
          <Button
            variant={mode === "generate" ? "default" : "outline"}
            onClick={() => setMode("generate")}
            className="flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            Generate QR
          </Button>
          <Button
            variant={mode === "read" ? "default" : "outline"}
            onClick={() => setMode("read")}
            className="flex items-center gap-2"
          >
            <ScanLine className="w-4 h-4" />
            Read QR
          </Button>
        </div>

        {mode === "generate" ? (
          <>
            {/* Generate Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Content (URL, Text, etc.)</label>
                <Input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter URL or text to encode"
                />
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Size: {size}px</label>
                  <Slider
                    value={[size]}
                    onValueChange={(v) => setSize(v[0])}
                    min={128}
                    max={512}
                    step={32}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Foreground</label>
                  <Input
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="h-10 cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Background</label>
                  <Input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="h-10 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <Button onClick={generateQR} className="w-full">
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>

            {/* QR Preview */}
            {qrImageUrl && (
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-xl">
                  <img src={qrImageUrl} alt="QR Code" className="max-w-full" />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Read QR */}
            <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />

            {decodedContent && (
              <div className="bg-secondary/30 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Decoded Content:</h3>
                <p className="text-sm break-all">{decodedContent}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    navigator.clipboard.writeText(decodedContent);
                    toast({ title: "Copied!", description: "Content copied to clipboard." });
                  }}
                >
                  Copy to Clipboard
                </Button>
              </div>
            )}
          </>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          {mode === "generate" && qrImageUrl && (
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversalQRTools;
