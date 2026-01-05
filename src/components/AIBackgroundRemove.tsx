import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Download, Eraser, Upload, RefreshCw, Square, Circle, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const backgroundOptions = [
  { id: "transparent", name: "Transparent", icon: Square, description: "Remove background completely" },
  { id: "white", name: "White", icon: Circle, description: "Replace with white background" },
  { id: "blur", name: "Blur", icon: Layers, description: "Blur the background" },
  { id: "gradient", name: "Gradient", icon: Square, description: "Add a gradient background" },
];

const AIBackgroundRemove = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("transparent");

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setProcessedImage(null);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setProcessedImage(null);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      toast.error("Please drop a valid image file");
    }
  }, []);

  const handleProcess = async () => {
    if (!previewUrl) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    setProcessedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke("ai-background-remove", {
        body: { imageBase64: previewUrl, backgroundOption: selectedOption },
      });

      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);

      if (data.imageUrl) {
        setProcessedImage(data.imageUrl);
        toast.success("Background removed successfully!");
      } else {
        throw new Error("No processed image returned");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error(error instanceof Error ? error.message : "Failed to remove background");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = `bg-removed-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProcessedImage(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Eraser className="w-8 h-8 text-primary" />
          <CardTitle className="text-2xl sm:text-3xl">AI Background Removal</CardTitle>
        </div>
        <CardDescription className="text-base">
          Remove or replace image backgrounds with AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        {!previewUrl && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="bg-remove-upload"
            />
            <label htmlFor="bg-remove-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Drop your image here or click to upload</p>
              <p className="text-sm text-muted-foreground">Best with images of people, products, or objects</p>
            </label>
          </div>
        )}

        {/* Background Options */}
        {previewUrl && !processedImage && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Background Option</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {backgroundOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  disabled={isProcessing}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    selectedOption === option.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <option.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="font-medium text-sm">{option.name}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preview & Result */}
        {previewUrl && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-center">Original</p>
              <div className="rounded-xl overflow-hidden border border-border">
                <img src={previewUrl} alt="Original" className="w-full h-auto max-h-[400px] object-contain bg-muted" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-center">Result</p>
              <div className="rounded-xl overflow-hidden border border-border min-h-[200px] flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlMGUwZTAiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2UwZTBlMCIvPjxyZWN0IHg9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmZmZmYiLz48cmVjdCB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+')]">
                {isProcessing ? (
                  <div className="text-center py-8 bg-background/80 w-full">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Removing background...</p>
                  </div>
                ) : processedImage ? (
                  <img src={processedImage} alt="Processed" className="w-full h-auto max-h-[400px] object-contain" />
                ) : (
                  <p className="text-muted-foreground text-sm bg-background/80 px-4 py-2 rounded">Result will appear here</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {previewUrl && (
          <div className="flex flex-wrap gap-3 justify-center">
            {!processedImage ? (
              <Button onClick={handleProcess} disabled={isProcessing} size="lg" className="min-w-[200px]">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Eraser className="w-5 h-5 mr-2" />
                    Remove Background
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button onClick={handleDownload} size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download Result
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  New Image
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIBackgroundRemove;
