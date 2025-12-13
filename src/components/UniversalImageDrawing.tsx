import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import DragDropUpload from "@/components/DragDropUpload";
import { Download, RotateCcw, Pencil, Square, Circle, Type, Undo2, Eraser } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type DrawingTool = "pen" | "line" | "rectangle" | "circle" | "text" | "eraser";

interface UniversalImageDrawingProps {
  initialTool?: DrawingTool;
}

const drawingTools = [
  { id: "pen" as DrawingTool, name: "Pen", icon: <Pencil className="w-4 h-4" /> },
  { id: "rectangle" as DrawingTool, name: "Rectangle", icon: <Square className="w-4 h-4" /> },
  { id: "circle" as DrawingTool, name: "Circle", icon: <Circle className="w-4 h-4" /> },
  { id: "text" as DrawingTool, name: "Text", icon: <Type className="w-4 h-4" /> },
  { id: "eraser" as DrawingTool, name: "Eraser", icon: <Eraser className="w-4 h-4" /> },
];

const UniversalImageDrawing = ({ initialTool = "pen" }: UniversalImageDrawingProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tool, setTool] = useState<DrawingTool>(initialTool);
  const [color, setColor] = useState("#ff0000");
  const [brushSize, setBrushSize] = useState(5);
  const [text, setText] = useState("Text");
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
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
        // Save initial state
        setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  const saveState = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory((prev) => [...prev, imageData]);
  };

  const undo = () => {
    if (history.length <= 1 || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    
    const newHistory = [...history];
    newHistory.pop();
    const lastState = newHistory[newHistory.length - 1];
    ctx.putImageData(lastState, 0, 0);
    setHistory(newHistory);
  };

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

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getCanvasCoords(e);
    startPos.current = pos;
    setIsDrawing(true);

    if (tool === "pen" || tool === "eraser") {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    if (tool === "text") {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.font = `${brushSize * 4}px Arial`;
      ctx.fillStyle = color;
      ctx.fillText(text, pos.x, pos.y);
      saveState();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const pos = getCanvasCoords(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (tool === "pen") {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === "eraser") {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = brushSize * 2;
      ctx.lineCap = "round";
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const pos = getCanvasCoords(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (tool === "rectangle") {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      const width = pos.x - startPos.current.x;
      const height = pos.y - startPos.current.y;
      ctx.strokeRect(startPos.current.x, startPos.current.y, width, height);
    } else if (tool === "circle") {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      const radius = Math.sqrt(
        Math.pow(pos.x - startPos.current.x, 2) + Math.pow(pos.y - startPos.current.y, 2)
      );
      ctx.beginPath();
      ctx.arc(startPos.current.x, startPos.current.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    saveState();
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `drawn-${file?.name || "image.png"}`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    toast({ title: "Download started", description: "Your annotated image is being downloaded." });
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl(null);
    setHistory([]);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      {!file ? (
        <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
      ) : (
        <div className="space-y-6">
          {/* Tool Selection */}
          <div className="flex flex-wrap justify-center gap-2">
            {drawingTools.map((t) => (
              <Button
                key={t.id}
                variant={tool === t.id ? "default" : "outline"}
                onClick={() => setTool(t.id)}
                className="flex items-center gap-2"
              >
                {t.icon}
                {t.name}
              </Button>
            ))}
            <Button variant="outline" onClick={undo} disabled={history.length <= 1}>
              <Undo2 className="w-4 h-4 mr-2" />
              Undo
            </Button>
          </div>

          {/* Settings */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Brush Size: {brushSize}</label>
              <Slider
                value={[brushSize]}
                onValueChange={(v) => setBrushSize(v[0])}
                min={1}
                max={50}
                step={1}
              />
            </div>
            {tool === "text" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Text</label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text"
                />
              </div>
            )}
          </div>

          {/* Canvas */}
          <div className="relative bg-secondary/50 rounded-xl overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="max-w-full max-h-[500px] cursor-crosshair"
              style={{ touchAction: "none" }}
            />
          </div>

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

export default UniversalImageDrawing;
