import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import DragDropUpload from "@/components/DragDropUpload";
import { Download, RotateCcw, Eye, EyeOff, Lock, Unlock, Grid, Loader2, Shield } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { createEncryptedCanvas, decryptCanvasImage } from "@/lib/imageCrypto";

type SecurityMode = "blur" | "pixelate" | "hide" | "encrypt" | "decrypt";

interface UniversalImageSecurityProps {
  initialMode?: SecurityMode;
}

const securityModes = [
  { id: "blur" as SecurityMode, name: "Blur", icon: <Eye className="w-4 h-4" /> },
  { id: "pixelate" as SecurityMode, name: "Pixelate", icon: <Grid className="w-4 h-4" /> },
  { id: "hide" as SecurityMode, name: "Hide", icon: <EyeOff className="w-4 h-4" /> },
  { id: "encrypt" as SecurityMode, name: "Encrypt", icon: <Lock className="w-4 h-4" /> },
  { id: "decrypt" as SecurityMode, name: "Decrypt", icon: <Unlock className="w-4 h-4" /> },
];

const UniversalImageSecurity = ({ initialMode = "blur" }: UniversalImageSecurityProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<SecurityMode>(initialMode);
  const [intensity, setIntensity] = useState(20);
  const [hideColor, setHideColor] = useState("#000000");
  const [password, setPassword] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selection, setSelection] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
    setSelection(null);
  };

  useEffect(() => {
    if (imageUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        originalImageRef.current = img;
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  const getCanvasCoords = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const startSelection = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (mode === "encrypt" || mode === "decrypt") return;

      canvasRef.current?.setPointerCapture(e.pointerId);
      const pos = getCanvasCoords(e);
      startPos.current = pos;
      setIsDrawing(true);
    },
    [mode, getCanvasCoords]
  );

  const updateSelection = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!isDrawing) return;

      const pos = getCanvasCoords(e);
      const x = Math.min(startPos.current.x, pos.x);
      const y = Math.min(startPos.current.y, pos.y);
      const w = Math.abs(pos.x - startPos.current.x);
      const h = Math.abs(pos.y - startPos.current.y);
      setSelection({ x, y, w, h });

      // Redraw image and selection box
      if (canvasRef.current && originalImageRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(originalImageRef.current, 0, 0);
        ctx.strokeStyle = "#ff0000";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(x, y, w, h);
        ctx.setLineDash([]);
      }
    },
    [isDrawing, getCanvasCoords]
  );

  const endSelection = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    canvasRef.current?.releasePointerCapture(e.pointerId);
    setIsDrawing(false);
  }, []);

  const applyEffect = useCallback(async () => {
    if (!canvasRef.current || !originalImageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // For non-encrypt/decrypt modes, redraw original first
    if (mode !== "encrypt" && mode !== "decrypt") {
      ctx.drawImage(originalImageRef.current, 0, 0);
    }

    if (mode === "encrypt") {
      if (!password) {
        toast({ title: "Password required", description: "Please enter a password to encrypt.", variant: "destructive" });
        return;
      }
      if (password.length < 8) {
        toast({ title: "Weak password", description: "Please use at least 8 characters for better security.", variant: "destructive" });
        return;
      }
      
      setIsProcessing(true);
      try {
        // Redraw original before encrypting
        ctx.drawImage(originalImageRef.current, 0, 0);
        await createEncryptedCanvas(canvas, password);
        toast({ 
          title: "Image encrypted securely", 
          description: "AES-256-GCM encryption applied. Download and use the same password to decrypt." 
        });
      } catch (error) {
        console.error("Encryption error:", error);
        toast({ 
          title: "Encryption failed", 
          description: "An error occurred during encryption.", 
          variant: "destructive" 
        });
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    if (mode === "decrypt") {
      if (!password) {
        toast({ title: "Password required", description: "Please enter the password to decrypt.", variant: "destructive" });
        return;
      }
      
      setIsProcessing(true);
      try {
        await decryptCanvasImage(canvas, password);
        toast({ 
          title: "Image decrypted successfully", 
          description: "Original image has been restored." 
        });
      } catch (error) {
        console.error("Decryption error:", error);
        toast({ 
          title: "Decryption failed", 
          description: "Wrong password or corrupted data. Please check your password and try again.", 
          variant: "destructive" 
        });
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    if (!selection) {
      toast({ title: "No area selected", description: "Draw a rectangle over the area to protect.", variant: "destructive" });
      return;
    }

    const { x, y, w, h } = selection;
    
    // Ensure we have valid dimensions
    if (w < 2 || h < 2) {
      toast({ title: "Selection too small", description: "Please draw a larger selection area.", variant: "destructive" });
      return;
    }

    if (mode === "blur") {
      // Manual blur implementation using pixel averaging
      const imageData = ctx.getImageData(x, y, w, h);
      const data = imageData.data;
      const blurRadius = Math.max(1, Math.floor(intensity / 3));
      
      // Create a copy of the data for reading
      const originalData = new Uint8ClampedArray(data);
      
      for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
          let r = 0, g = 0, b = 0, count = 0;
          
          // Sample surrounding pixels
          for (let dy = -blurRadius; dy <= blurRadius; dy++) {
            for (let dx = -blurRadius; dx <= blurRadius; dx++) {
              const nx = px + dx;
              const ny = py + dy;
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                const idx = (ny * w + nx) * 4;
                r += originalData[idx];
                g += originalData[idx + 1];
                b += originalData[idx + 2];
                count++;
              }
            }
          }
          
          const idx = (py * w + px) * 4;
          data[idx] = r / count;
          data[idx + 1] = g / count;
          data[idx + 2] = b / count;
        }
      }
      
      ctx.putImageData(imageData, x, y);
    } else if (mode === "pixelate") {
      const pixelSize = Math.max(4, intensity);
      const imageData = ctx.getImageData(x, y, w, h);
      const data = imageData.data;
      
      for (let py = 0; py < h; py += pixelSize) {
        for (let px = 0; px < w; px += pixelSize) {
          const idx = (py * w + px) * 4;
          const r = data[idx], g = data[idx + 1], b = data[idx + 2];
          
          for (let dy = 0; dy < pixelSize && py + dy < h; dy++) {
            for (let dx = 0; dx < pixelSize && px + dx < w; dx++) {
              const i = ((py + dy) * w + (px + dx)) * 4;
              data[i] = r;
              data[i + 1] = g;
              data[i + 2] = b;
            }
          }
        }
      }
      ctx.putImageData(imageData, x, y);
    } else if (mode === "hide") {
      ctx.fillStyle = hideColor;
      ctx.fillRect(x, y, w, h);
    }

    setSelection(null);
    toast({ title: "Effect applied", description: "The selected area has been protected." });
  }, [mode, selection, intensity, hideColor, password]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `secured-${file?.name || "image.png"}`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl(null);
    setSelection(null);
    setPassword("");
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
      {!file ? (
        <>
          <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
          {/* Native Banner Ad - Below upload area */}
          <div className="hidden lg:block mt-4">
            <NativeBannerAd />
          </div>
          <MobileNativeAd className="mt-4" />
        </>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* Mode Selection */}
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {securityModes.map((m) => (
              <Button
                key={m.id}
                variant={mode === m.id ? "default" : "outline"}
                onClick={() => setMode(m.id)}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                size="sm"
              >
                {m.icon}
                <span className="hidden xs:inline sm:inline">{m.name}</span>
              </Button>
            ))}
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {(mode === "blur" || mode === "pixelate") && (
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">Intensity: {intensity}</label>
                <Slider
                  value={[intensity]}
                  onValueChange={(v) => setIntensity(v[0])}
                  min={5}
                  max={50}
                  step={1}
                />
              </div>
            )}
            {mode === "hide" && (
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">Hide Color</label>
                <Input
                  type="color"
                  value={hideColor}
                  onChange={(e) => setHideColor(e.target.value)}
                  className="h-10 cursor-pointer"
                />
              </div>
            )}
            {(mode === "encrypt" || mode === "decrypt") && (
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium">Password (min 8 characters)</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter encryption password"
                  minLength={8}
                />
                <div className="flex items-start gap-2 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md p-2 mt-2">
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Secure Encryption:</strong> Uses AES-256-GCM with PBKDF2 key derivation.
                  </span>
                </div>
              </div>
            )}
          </div>

          {mode !== "encrypt" && mode !== "decrypt" && (
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              Draw a rectangle over the area you want to protect
            </p>
          )}

          {/* Canvas */}
          <div className="relative bg-secondary/50 rounded-xl overflow-hidden flex items-center justify-center touch-none">
              <canvas
                ref={canvasRef}
                onPointerDown={startSelection}
                onPointerMove={updateSelection}
                onPointerUp={endSelection}
                onPointerCancel={endSelection}
                onPointerLeave={endSelection}
                className="max-w-full max-h-[400px] sm:max-h-[500px] cursor-crosshair"
                style={{ touchAction: "none" }}
              />
            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="text-sm font-medium">
                    {mode === "encrypt" ? "Encrypting..." : "Decrypting..."}
                  </span>
                </div>
              </div>
            )}
          </div>

          <Button onClick={applyEffect} className="w-full" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>Apply {mode === "blur" ? "Blur" : mode === "pixelate" ? "Pixelate" : mode === "hide" ? "Hide" : mode === "encrypt" ? "Encrypt" : "Decrypt"}</>
            )}
          </Button>

          {/* Actions */}
          <div className="flex justify-center gap-2 sm:gap-3">
            <Button variant="outline" onClick={handleReset} size="sm" className="text-xs sm:text-sm">
              <RotateCcw className="w-4 h-4 mr-1 sm:mr-2" />
              Reset
            </Button>
            <Button onClick={handleDownload} size="sm" className="text-xs sm:text-sm">
              <Download className="w-4 h-4 mr-1 sm:mr-2" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalImageSecurity;
