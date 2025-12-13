import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import DragDropUpload from "@/components/DragDropUpload";
import { Download, RotateCcw, Eye, EyeOff, Lock, Unlock, Grid } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type SecurityMode = "blur" | "pixelate" | "hide" | "encrypt" | "decrypt";

interface UniversalImageSecurityProps {
  initialMode?: SecurityMode;
}

const securityModes = [
  { id: "blur" as SecurityMode, name: "Blur Area", icon: <Eye className="w-4 h-4" /> },
  { id: "pixelate" as SecurityMode, name: "Pixelate", icon: <Grid className="w-4 h-4" /> },
  { id: "hide" as SecurityMode, name: "Hide Area", icon: <EyeOff className="w-4 h-4" /> },
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

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startSelection = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode === "encrypt" || mode === "decrypt") return;
    const pos = getCanvasCoords(e);
    startPos.current = pos;
    setIsDrawing(true);
  };

  const updateSelection = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
  };

  const endSelection = () => {
    setIsDrawing(false);
  };

  const applyEffect = useCallback(() => {
    if (!canvasRef.current || !originalImageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Redraw original
    ctx.drawImage(originalImageRef.current, 0, 0);

    if (mode === "encrypt") {
      // Simple XOR encryption for demo
      if (!password) {
        toast({ title: "Password required", description: "Please enter a password to encrypt.", variant: "destructive" });
        return;
      }
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i++) {
        data[i] ^= password.charCodeAt(i % password.length);
      }
      ctx.putImageData(imageData, 0, 0);
      toast({ title: "Image encrypted", description: "Use the same password to decrypt." });
      return;
    }

    if (mode === "decrypt") {
      if (!password) {
        toast({ title: "Password required", description: "Please enter the password to decrypt.", variant: "destructive" });
        return;
      }
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i++) {
        data[i] ^= password.charCodeAt(i % password.length);
      }
      ctx.putImageData(imageData, 0, 0);
      toast({ title: "Image decrypted", description: "If password is correct, image is restored." });
      return;
    }

    if (!selection) {
      toast({ title: "No area selected", description: "Draw a rectangle over the area to protect.", variant: "destructive" });
      return;
    }

    const { x, y, w, h } = selection;

    if (mode === "blur") {
      // Apply blur using canvas filter
      ctx.filter = `blur(${intensity}px)`;
      ctx.drawImage(canvas, x, y, w, h, x, y, w, h);
      ctx.filter = "none";
    } else if (mode === "pixelate") {
      const pixelSize = Math.max(2, intensity);
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
    <div className="bg-card rounded-2xl border border-border p-6">
      {!file ? (
        <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
      ) : (
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="flex flex-wrap justify-center gap-2">
            {securityModes.map((m) => (
              <Button
                key={m.id}
                variant={mode === m.id ? "default" : "outline"}
                onClick={() => setMode(m.id)}
                className="flex items-center gap-2"
              >
                {m.icon}
                {m.name}
              </Button>
            ))}
          </div>

          {/* Settings */}
          <div className="grid sm:grid-cols-2 gap-4">
            {(mode === "blur" || mode === "pixelate") && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Intensity: {intensity}</label>
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
                <label className="text-sm font-medium">Hide Color</label>
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
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter encryption password"
                />
                <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-2 mt-2">
                  ⚠️ <strong>Demo Only:</strong> This encryption uses a simple visual scrambling technique for demonstration purposes. It is NOT cryptographically secure and should NOT be used to protect sensitive information.
                </p>
              </div>
            )}
          </div>

          {mode !== "encrypt" && mode !== "decrypt" && (
            <p className="text-sm text-muted-foreground text-center">
              Draw a rectangle over the area you want to protect
            </p>
          )}

          {/* Canvas */}
          <div className="relative bg-secondary/50 rounded-xl overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              onMouseDown={startSelection}
              onMouseMove={updateSelection}
              onMouseUp={endSelection}
              onMouseLeave={endSelection}
              className="max-w-full max-h-[500px] cursor-crosshair"
              style={{ touchAction: "none" }}
            />
          </div>

          <Button onClick={applyEffect} className="w-full">
            Apply {mode === "blur" ? "Blur" : mode === "pixelate" ? "Pixelate" : mode === "hide" ? "Hide" : mode === "encrypt" ? "Encrypt" : "Decrypt"}
          </Button>

          {/* Actions */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalImageSecurity;
