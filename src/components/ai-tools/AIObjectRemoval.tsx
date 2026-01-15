import { useState, useRef, useCallback } from "react";
import { Eraser, Download, Loader2, Upload, RefreshCw, Zap, Image as ImageIcon, X, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type OutputFormat = "png" | "jpg" | "webp";

const AIObjectRemoval = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [isDragging, setIsDragging] = useState(false);
  const [brushSize, setBrushSize] = useState(30);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setMaskImage(null);
      setResultImage(null);
      
      // Initialize mask canvas when image loads
      const img = new Image();
      img.onload = () => {
        if (maskCanvasRef.current) {
          maskCanvasRef.current.width = img.naturalWidth;
          maskCanvasRef.current.height = img.naturalHeight;
          const ctx = maskCanvasRef.current.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
          }
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const getMousePos = (e: React.MouseEvent) => {
    const canvas = maskCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return { x: 0, y: 0 };

    const rect = container.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !maskCanvasRef.current) return;
    
    const ctx = maskCanvasRef.current.getContext("2d");
    if (!ctx) return;

    const pos = getMousePos(e);
    
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, brushSize * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Update mask preview
    setMaskImage(maskCanvasRef.current.toDataURL());
  };

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearMask = () => {
    if (maskCanvasRef.current && imageRef.current) {
      const ctx = maskCanvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, maskCanvasRef.current.width, maskCanvasRef.current.height);
        setMaskImage(null);
      }
    }
  };

  const removeObject = async () => {
    if (!originalImage) {
      toast.error("Please upload an image first");
      return;
    }

    if (!maskCanvasRef.current) {
      toast.error("Please mark the area to remove");
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    setResultImage(null);

    try {
      setProgress(30);
      
      const maskDataUrl = maskCanvasRef.current.toDataURL("image/png");
      
      const { data, error } = await supabase.functions.invoke("ai-enhance-image", {
        body: { 
          imageBase64: originalImage,
          maskImage: maskDataUrl,
          operation: "object-removal"
        }
      });

      setProgress(80);

      if (error) {
        throw new Error(error.message || "Failed to remove object");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setResultImage(data.imageUrl);
        setProgress(100);
        toast.success("Object removed successfully!");
      } else {
        throw new Error("No result image was returned");
      }
    } catch (error) {
      console.error("Object removal error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to remove object");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadImage = async () => {
    if (!resultImage || !canvasRef.current) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = resultImage;
      });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) throw new Error("Failed to get canvas context");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      if (outputFormat === "jpg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);

      const mimeTypes: Record<OutputFormat, string> = {
        png: "image/png",
        jpg: "image/jpeg",
        webp: "image/webp"
      };

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to convert image"));
          },
          mimeTypes[outputFormat],
          0.95
        );
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `object-removed.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Image downloaded as ${outputFormat.toUpperCase()}!`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const reset = () => {
    setOriginalImage(null);
    setMaskImage(null);
    setResultImage(null);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <canvas ref={canvasRef} className="hidden" />
      <canvas ref={maskCanvasRef} className="hidden" />
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-red-500/5 to-pink-500/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
              <Eraser className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Object Removal</h3>
              <p className="text-sm text-muted-foreground">Remove unwanted objects from photos using AI</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Area */}
          {!originalImage && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                isDragging 
                  ? "border-red-500 bg-red-500/5" 
                  : "border-border hover:border-red-500/50 hover:bg-secondary/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">Drop your image here or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WebP</p>
                </div>
              </div>
            </div>
          )}

          {/* Image Editor */}
          {originalImage && !resultImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Label className="text-sm font-medium">Brush the area to remove</Label>
                  <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-1.5">
                    <MousePointer className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Draw over objects</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={reset} className="text-xs gap-1.5 h-7">
                  <X className="w-3 h-3" />
                  Remove
                </Button>
              </div>

              {/* Brush Size */}
              <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl">
                <Label className="text-sm font-medium whitespace-nowrap">Brush Size</Label>
                <Slider
                  value={[brushSize]}
                  onValueChange={([v]) => setBrushSize(v)}
                  min={10}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">{brushSize}px</span>
                <Button variant="outline" size="sm" onClick={clearMask}>
                  Clear
                </Button>
              </div>
              
              {/* Drawing Canvas */}
              <div 
                ref={containerRef}
                className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              >
                <img
                  ref={imageRef}
                  src={originalImage}
                  alt="Original"
                  className="w-full h-auto"
                />
                {maskImage && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url(${maskImage})`,
                      backgroundSize: '100% 100%',
                      mixBlendMode: 'multiply',
                      opacity: 0.5
                    }}
                  />
                )}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: maskImage ? `url(${maskImage})` : 'none',
                    backgroundSize: '100% 100%',
                    mixBlendMode: 'screen',
                    opacity: 0.3,
                    filter: 'invert(1) hue-rotate(90deg)'
                  }}
                />
              </div>
            </div>
          )}

          {/* Processing / Result */}
          {(isProcessing || resultImage) && (
            <div className="space-y-4">
              <Label className="text-sm font-medium">Result</Label>
              <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 flex items-center justify-center">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-4 p-12">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse" />
                      <Zap className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="text-center w-full max-w-[200px]">
                      <p className="font-medium text-sm mb-2">Removing object...</p>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                ) : resultImage ? (
                  <img src={resultImage} alt="Result" className="w-full h-auto" />
                ) : null}
              </div>
            </div>
          )}

          {/* Actions */}
          {originalImage && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label className="block text-sm font-medium mb-2">Output Format</Label>
                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as OutputFormat)}>
                  <SelectTrigger className="w-full bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="png">PNG (Best Quality)</SelectItem>
                    <SelectItem value="jpg">JPG (Smaller Size)</SelectItem>
                    <SelectItem value="webp">WebP (Web Optimized)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-2">
                {!resultImage ? (
                  <Button
                    onClick={removeObject}
                    disabled={isProcessing || !maskImage}
                    className="gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Eraser className="w-4 h-4" />
                        Remove Object
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <Button onClick={downloadImage} className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button variant="outline" onClick={reset} className="gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Start Over
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIObjectRemoval;
