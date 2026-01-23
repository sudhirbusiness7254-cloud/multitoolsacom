import { useState, useRef, useCallback } from "react";
import { 
  Cake, Download, Loader2, Upload, RefreshCw, Sparkles, 
  Image as ImageIcon, X, PartyPopper, Heart, Users, Baby,
  Briefcase, Laugh, ChevronLeft, ChevronRight, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Category = "professional" | "comedy" | "friends" | "family" | "kids";

interface Template {
  id: string;
  name: string;
  preview: string;
  colors: string[];
}

const templates: Record<Category, Template[]> = {
  professional: [
    { id: "elegant-gold", name: "Elegant Gold", preview: "🏆", colors: ["#FFD700", "#1a1a1a", "#FFFDD0"] },
    { id: "corporate-blue", name: "Corporate Blue", preview: "💼", colors: ["#1e3a5f", "#C0C0C0", "#FFFFFF"] },
    { id: "rose-gold", name: "Rose Gold", preview: "🌹", colors: ["#B76E79", "#FFB6C1", "#FFFDD0"] },
    { id: "marble-luxury", name: "Marble Luxury", preview: "🏛️", colors: ["#FFFFFF", "#D4AF37", "#1a1a1a"] },
    { id: "midnight-stars", name: "Midnight Stars", preview: "✨", colors: ["#191970", "#FFD700", "#C0C0C0"] },
    { id: "champagne-toast", name: "Champagne Toast", preview: "🥂", colors: ["#F7E7CE", "#FFFDD0", "#D4AF37"] },
    { id: "silver-anniversary", name: "Silver Elegance", preview: "💎", colors: ["#C0C0C0", "#E5E4E2", "#FFFFFF"] },
    { id: "royal-purple", name: "Royal Purple", preview: "👑", colors: ["#4B0082", "#FFD700", "#FFFDD0"] },
    { id: "pearl-white", name: "Pearl White", preview: "🦪", colors: ["#FDEEF4", "#FFB6C1", "#D4AF37"] },
    { id: "black-tie", name: "Black Tie", preview: "🎩", colors: ["#1a1a1a", "#FFFFFF", "#C0C0C0"] },
  ],
  comedy: [
    { id: "party-explosion", name: "Party Explosion", preview: "🎉", colors: ["#FF1493", "#00BFFF", "#FFFF00"] },
    { id: "emoji-madness", name: "Emoji Madness", preview: "😂", colors: ["#FFCC00", "#FF6B6B", "#4ECDC4"] },
    { id: "retro-80s", name: "Retro 80s", preview: "🕹️", colors: ["#FF00FF", "#00FFFF", "#FF1493"] },
    { id: "pizza-party", name: "Pizza Party", preview: "🍕", colors: ["#FF6347", "#FFA500", "#FFD700"] },
    { id: "meme-style", name: "Meme Style", preview: "🤣", colors: ["#FFFFFF", "#1a1a1a", "#FF4500"] },
    { id: "disco-ball", name: "Disco Ball", preview: "🪩", colors: ["#C0C0C0", "#FF00FF", "#9400D3"] },
    { id: "taco-tuesday", name: "Taco Fiesta", preview: "🌮", colors: ["#FFA500", "#228B22", "#FFFF00"] },
    { id: "unicorn-sparkle", name: "Unicorn Sparkle", preview: "🦄", colors: ["#FFB6C1", "#E6E6FA", "#98FB98"] },
    { id: "dad-jokes", name: "Dad Jokes", preview: "👔", colors: ["#C3B091", "#8B4513", "#F5F5DC"] },
    { id: "cat-lover", name: "Cat Lover", preview: "🐱", colors: ["#FFE4E1", "#DDA0DD", "#F0E68C"] },
  ],
  friends: [
    { id: "bestie-vibes", name: "Bestie Vibes", preview: "👯", colors: ["#FF7F50", "#20B2AA", "#FFD700"] },
    { id: "coffee-date", name: "Coffee Date", preview: "☕", colors: ["#6F4E37", "#FFFDD0", "#D2B48C"] },
    { id: "road-trip", name: "Road Trip", preview: "🚗", colors: ["#FF6347", "#87CEEB", "#228B22"] },
    { id: "squad-goals", name: "Squad Goals", preview: "💅", colors: ["#FFB6C1", "#98FB98", "#E6E6FA"] },
    { id: "beach-party", name: "Beach Party", preview: "🏖️", colors: ["#00CED1", "#F4A460", "#FF7F50"] },
    { id: "gaming-buddy", name: "Gaming Buddy", preview: "🎮", colors: ["#39FF14", "#9400D3", "#00BFFF"] },
    { id: "brunch-squad", name: "Brunch Squad", preview: "🥑", colors: ["#9ACD32", "#D2691E", "#FFFF00"] },
    { id: "festival-vibes", name: "Festival Vibes", preview: "🎪", colors: ["#FF6347", "#00FFFF", "#FF00FF"] },
    { id: "wine-time", name: "Wine Time", preview: "🍷", colors: ["#722F37", "#9400D3", "#FFFDD0"] },
    { id: "hiking-adventure", name: "Hiking Adventure", preview: "⛰️", colors: ["#228B22", "#4682B4", "#8B4513"] },
  ],
  family: [
    { id: "mom-flowers", name: "Mom's Flowers", preview: "🌸", colors: ["#FFB6C1", "#E6E6FA", "#90EE90"] },
    { id: "dad-hero", name: "Dad Hero", preview: "🦸", colors: ["#DC143C", "#4169E1", "#FFD700"] },
    { id: "sister-bond", name: "Sister Bond", preview: "👭", colors: ["#FFB6C1", "#FFD700", "#FFFDD0"] },
    { id: "brother-cool", name: "Brother Cool", preview: "😎", colors: ["#4169E1", "#808080", "#00CED1"] },
    { id: "grandma-love", name: "Grandma Love", preview: "🧶", colors: ["#DDA0DD", "#FFFDD0", "#E6E6FA"] },
    { id: "grandpa-wisdom", name: "Grandpa Wisdom", preview: "📚", colors: ["#000080", "#8B4513", "#FFD700"] },
    { id: "family-tree", name: "Family Tree", preview: "🌳", colors: ["#8B4513", "#228B22", "#D2B48C"] },
    { id: "home-sweet", name: "Home Sweet", preview: "🏠", colors: ["#DEB887", "#F5DEB3", "#8B4513"] },
    { id: "generations", name: "Generations", preview: "👨‍👩‍👧‍👦", colors: ["#D2B48C", "#F4A460", "#FFFDD0"] },
    { id: "parent-love", name: "Parent Love", preview: "💕", colors: ["#FFD700", "#FFB6C1", "#FFFDD0"] },
  ],
  kids: [
    { id: "dinosaur-roar", name: "Dinosaur Roar", preview: "🦖", colors: ["#228B22", "#FFA500", "#8B4513"] },
    { id: "princess-castle", name: "Princess Castle", preview: "👸", colors: ["#FFB6C1", "#9400D3", "#FFD700"] },
    { id: "superhero-kid", name: "Superhero Kid", preview: "🦸‍♂️", colors: ["#DC143C", "#4169E1", "#FFFF00"] },
    { id: "space-explorer", name: "Space Explorer", preview: "🚀", colors: ["#191970", "#FFD700", "#FF4500"] },
    { id: "rainbow-magic", name: "Rainbow Magic", preview: "🌈", colors: ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#0000FF", "#9400D3"] },
    { id: "animal-safari", name: "Animal Safari", preview: "🦁", colors: ["#F0E68C", "#228B22", "#8B4513"] },
    { id: "mermaid-ocean", name: "Mermaid Ocean", preview: "🧜‍♀️", colors: ["#40E0D0", "#9400D3", "#FFB6C1"] },
    { id: "pirate-treasure", name: "Pirate Treasure", preview: "🏴‍☠️", colors: ["#DC143C", "#1a1a1a", "#FFD700"] },
    { id: "candy-land", name: "Candy Land", preview: "🍭", colors: ["#FF69B4", "#00BFFF", "#FFB6C1"] },
    { id: "robot-future", name: "Robot Future", preview: "🤖", colors: ["#C0C0C0", "#00BFFF", "#4169E1"] },
  ],
};

const categoryInfo: Record<Category, { icon: React.ReactNode; label: string; description: string }> = {
  professional: { icon: <Briefcase className="w-4 h-4" />, label: "Professional", description: "Elegant & Formal" },
  comedy: { icon: <Laugh className="w-4 h-4" />, label: "Comedy", description: "Fun & Funny" },
  friends: { icon: <Users className="w-4 h-4" />, label: "Friends", description: "Casual & Warm" },
  family: { icon: <Heart className="w-4 h-4" />, label: "Family", description: "Heartfelt & Loving" },
  kids: { icon: <Baby className="w-4 h-4" />, label: "Kids", description: "Cartoon & Playful" },
};

const BirthdayWishesGenerator = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("friends");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setGeneratedImage(null);
      setGeneratedMessage("");
      setStep(2);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const generateBirthdayWish = async () => {
    if (!originalImage || !selectedTemplate) {
      toast.error("Please upload a photo and select a template");
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    setGeneratedImage(null);

    try {
      setProgress(30);

      const { data, error } = await supabase.functions.invoke("generate-birthday-wish", {
        body: {
          imageBase64: originalImage,
          templateId: selectedTemplate,
          category: selectedCategory,
          recipientName: recipientName || undefined,
          senderName: senderName || undefined,
          customMessage: customMessage || undefined,
        }
      });

      setProgress(80);

      if (error) {
        throw new Error(error.message || "Failed to generate birthday wish");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setGeneratedMessage(data.message || "");
        setProgress(100);
        setStep(3);
        toast.success("Birthday card generated successfully!");
      } else {
        throw new Error("No birthday card was generated");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate birthday wish");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage || !canvasRef.current) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = generatedImage;
      });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Failed to get canvas context");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to convert image"));
          },
          "image/png",
          1.0
        );
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `birthday-wish-${selectedTemplate}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Birthday card downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const reset = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setGeneratedMessage("");
    setProgress(0);
    setSelectedTemplate("");
    setRecipientName("");
    setSenderName("");
    setCustomMessage("");
    setStep(1);
  };

  const currentTemplates = templates[selectedCategory];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <canvas ref={canvasRef} className="hidden" />

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
              <Cake className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Birthday Wishes Generator</h3>
              <p className="text-sm text-muted-foreground">Create stunning birthday cards with AI-generated designs and messages</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= s 
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white" 
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded ${step > s ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-secondary"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-2 text-xs text-muted-foreground">
            <span>Upload Photo</span>
            <span>Choose Template</span>
            <span>Download</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Step 1: Upload Photo */}
          {step === 1 && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-pink-500 bg-pink-500/5"
                  : "border-border hover:border-pink-500/50 hover:bg-secondary/30"
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
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-pink-500" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Upload Your Photo</p>
                  <p className="text-sm text-muted-foreground mt-1">Drop your photo here or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-2">Supports JPG, PNG, WebP • Max 10MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Choose Template */}
          {step === 2 && originalImage && (
            <div className="space-y-6">
              {/* Photo Preview */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <Label className="text-sm font-medium mb-2 block">Your Photo</Label>
                  <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 aspect-square">
                    <img
                      src={originalImage}
                      alt="Uploaded"
                      className="w-full h-full object-contain"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={reset}
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Personalization */}
                <div className="md:w-2/3 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Recipient Name (Optional)</Label>
                      <Input
                        placeholder="e.g., Sarah"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">From (Optional)</Label>
                      <Input
                        placeholder="e.g., John"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Custom Message Idea (Optional)</Label>
                    <Textarea
                      placeholder="e.g., Include something about her love for traveling..."
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Choose Category</Label>
                <Tabs value={selectedCategory} onValueChange={(v) => {
                  setSelectedCategory(v as Category);
                  setSelectedTemplate("");
                }}>
                  <TabsList className="grid grid-cols-5 w-full h-auto p-1">
                    {(Object.keys(categoryInfo) as Category[]).map((cat) => (
                      <TabsTrigger
                        key={cat}
                        value={cat}
                        className="flex flex-col gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                      >
                        {categoryInfo[cat].icon}
                        <span className="text-xs font-medium">{categoryInfo[cat].label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {(Object.keys(templates) as Category[]).map((cat) => (
                    <TabsContent key={cat} value={cat} className="mt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {templates[cat].map((template) => (
                          <button
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                              selectedTemplate === template.id
                                ? "border-pink-500 bg-pink-500/10 ring-2 ring-pink-500/20"
                                : "border-border hover:border-pink-500/50"
                            }`}
                          >
                            <div className="text-4xl mb-2">{template.preview}</div>
                            <p className="text-xs font-medium truncate">{template.name}</p>
                            <div className="flex justify-center gap-1 mt-2">
                              {template.colors.slice(0, 3).map((color, i) => (
                                <div
                                  key={i}
                                  className="w-3 h-3 rounded-full border border-border/50"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            {selectedTemplate === template.id && (
                              <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {/* Generate Button */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <Button variant="outline" onClick={reset} className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={generateBirthdayWish}
                  disabled={!selectedTemplate || isProcessing}
                  className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Birthday Card
                    </>
                  )}
                </Button>
              </div>

              {/* Progress */}
              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    AI is creating your birthday card...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Result */}
          {step === 3 && generatedImage && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 mb-4">
                  <PartyPopper className="w-5 h-5" />
                  <span className="font-medium">Birthday Card Ready!</span>
                </div>
              </div>

              {/* Generated Card */}
              <div className="max-w-2xl mx-auto">
                <div className="relative rounded-xl overflow-hidden border border-border shadow-lg">
                  <img
                    src={generatedImage}
                    alt="Generated Birthday Card"
                    className="w-full h-auto"
                  />
                </div>

                {/* Generated Message */}
                {generatedMessage && (
                  <div className="mt-4 p-4 bg-secondary/30 rounded-xl border border-border">
                    <Label className="text-sm font-medium text-muted-foreground">Generated Message:</Label>
                    <p className="mt-1 text-sm italic">"{generatedMessage}"</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button onClick={downloadImage} size="lg" className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500">
                  <Download className="w-5 h-5" />
                  Download Card
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setGeneratedImage(null);
                    setStep(2);
                  }}
                  className="gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Different Template
                </Button>
                <Button variant="ghost" size="lg" onClick={reset} className="gap-2">
                  <Upload className="w-5 h-5" />
                  New Photo
                </Button>
              </div>

              {/* Share Tips */}
              <div className="text-center text-sm text-muted-foreground">
                <p>Perfect for sharing on WhatsApp, Instagram, Facebook, or print! 🎂</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdayWishesGenerator;
