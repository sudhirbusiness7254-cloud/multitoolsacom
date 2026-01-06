import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Download, Loader2, Sparkles, Eye, Droplets, Wand2, Clock, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const enhancementModes = [
  { 
    id: "full-enhance", 
    name: "Full Enhancement", 
    icon: Sparkles, 
    description: "Complete face & skin perfection",
    gradient: "from-violet-500 to-purple-600"
  },
  { 
    id: "skin-smooth", 
    name: "Skin Smoothing", 
    icon: Droplets, 
    description: "Natural skin texture refinement",
    gradient: "from-rose-400 to-pink-500"
  },
  { 
    id: "eye-enhance", 
    name: "Eye Enhancement", 
    icon: Eye, 
    description: "Brighten & enhance eyes",
    gradient: "from-cyan-400 to-blue-500"
  },
  { 
    id: "hd-restore", 
    name: "HD/4K Restore", 
    icon: Wand2, 
    description: "Upscale to high resolution",
    gradient: "from-emerald-400 to-teal-500"
  },
  { 
    id: "anti-aging", 
    name: "Anti-Aging", 
    icon: Clock, 
    description: "Reduce wrinkles & refresh",
    gradient: "from-amber-400 to-orange-500"
  },
  { 
    id: "glamour", 
    name: "Glamour Mode", 
    icon: Star, 
    description: "Magazine-cover quality",
    gradient: "from-fuchsia-500 to-pink-600"
  },
];

export default function AIFaceEnhance() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMode, setSelectedMode] = useState("full-enhance");
  const [compareMode, setCompareMode] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
      setPreviewUrl(URL.createObjectURL(file));
      setEnhancedUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setEnhancedUrl(null);
    }
  };

  const handleEnhance = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        
        const { data, error } = await supabase.functions.invoke("ai-face-enhance", {
          body: { imageBase64: base64, enhancementMode: selectedMode },
        });

        if (error) {
          console.error("Enhancement error:", error);
          toast.error("Failed to enhance face. Please try again.");
          setIsProcessing(false);
          return;
        }

        if (data?.error) {
          toast.error(data.error);
          setIsProcessing(false);
          return;
        }

        if (data?.imageUrl) {
          setEnhancedUrl(data.imageUrl);
          toast.success("Face enhanced successfully!");
        }
        setIsProcessing(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!enhancedUrl) return;
    const link = document.createElement("a");
    link.href = enhancedUrl;
    link.download = `enhanced-portrait-${Date.now()}.png`;
    link.click();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setEnhancedUrl(null);
    setCompareMode(false);
  };

  const selectedModeInfo = enhancementModes.find(m => m.id === selectedMode);

  return (
    <div className="space-y-6">
      {/* Enhancement Mode Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {enhancementModes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`p-4 rounded-xl border-2 transition-all text-center group ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              }`}
            >
              <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${mode.gradient} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="font-medium text-xs">{mode.name}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{mode.description}</div>
            </button>
          );
        })}
      </div>

      {/* Upload Area */}
      {!previewUrl ? (
        <Card
          className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <CardContent className="p-12">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <p className="text-lg font-medium mb-2">Upload Portrait Photo</p>
              <p className="text-sm text-muted-foreground mb-4">
                For best results, use a clear front-facing portrait
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPG, PNG, WebP (max 10MB)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Selected Mode Banner */}
          {selectedModeInfo && (
            <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedModeInfo.gradient} text-white`}>
              <div className="flex items-center gap-3">
                <selectedModeInfo.icon className="h-6 w-6" />
                <div>
                  <p className="font-semibold">{selectedModeInfo.name}</p>
                  <p className="text-sm opacity-90">{selectedModeInfo.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Image Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-3 bg-secondary/50 border-b border-border">
                  <h3 className="font-medium text-center text-sm">Original</h3>
                </div>
                <div className="p-4">
                  <img
                    src={previewUrl}
                    alt="Original"
                    className="w-full rounded-lg object-contain max-h-[400px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-b border-border">
                  <h3 className="font-medium text-center text-sm">Enhanced</h3>
                </div>
                <div className="p-4">
                  {enhancedUrl ? (
                    <img
                      src={enhancedUrl}
                      alt="Enhanced"
                      className="w-full rounded-lg object-contain max-h-[400px]"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] bg-muted/30 rounded-lg">
                      {isProcessing ? (
                        <>
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 animate-pulse">
                            <Sparkles className="h-8 w-8 text-white" />
                          </div>
                          <p className="text-muted-foreground">Enhancing your portrait...</p>
                          <p className="text-xs text-muted-foreground mt-1">This may take a moment</p>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-12 w-12 text-muted-foreground/50 mb-3" />
                          <p className="text-muted-foreground">Click enhance to see the magic</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={handleReset} variant="outline">
              Upload New Photo
            </Button>
            <Button 
              onClick={handleEnhance} 
              disabled={isProcessing}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Enhance Portrait
                </>
              )}
            </Button>
            {enhancedUrl && (
              <Button onClick={handleDownload} variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Download HD
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
