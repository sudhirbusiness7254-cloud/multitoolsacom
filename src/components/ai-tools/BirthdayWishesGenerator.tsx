import { useState, useRef, useCallback } from "react";
import { 
  Cake, Download, Loader2, Upload, RefreshCw, Sparkles, 
  X, PartyPopper, Heart, Users, Baby,
  Briefcase, Laugh, Check
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
  gradientAngle: number;
  frameStyle: "circle" | "rounded" | "diamond" | "heart" | "star" | "hexagon";
  decorations: string[];
  fontStyle: "elegant" | "fun" | "modern" | "script" | "bold";
}

const templates: Record<Category, Template[]> = {
  professional: [
    { id: "elegant-gold", name: "Elegant Gold", preview: "🏆", colors: ["#1a1a1a", "#2d2d2d", "#FFD700"], gradientAngle: 135, frameStyle: "circle", decorations: ["✨", "⭐", "🌟"], fontStyle: "elegant" },
    { id: "corporate-blue", name: "Corporate Blue", preview: "💼", colors: ["#1e3a5f", "#2c5282", "#4299e1"], gradientAngle: 180, frameStyle: "rounded", decorations: ["🎊", "✨"], fontStyle: "modern" },
    { id: "rose-gold", name: "Rose Gold", preview: "🌹", colors: ["#B76E79", "#E8B4B8", "#FFD1D1"], gradientAngle: 45, frameStyle: "circle", decorations: ["🌹", "💕", "✨"], fontStyle: "script" },
    { id: "marble-luxury", name: "Marble Luxury", preview: "🏛️", colors: ["#f5f5f5", "#e0e0e0", "#D4AF37"], gradientAngle: 90, frameStyle: "rounded", decorations: ["💎", "✨", "👑"], fontStyle: "elegant" },
    { id: "midnight-stars", name: "Midnight Stars", preview: "✨", colors: ["#0f0c29", "#302b63", "#24243e"], gradientAngle: 135, frameStyle: "circle", decorations: ["⭐", "✨", "🌙", "💫"], fontStyle: "elegant" },
    { id: "champagne-toast", name: "Champagne Toast", preview: "🥂", colors: ["#F7E7CE", "#DDD5C5", "#C9B896"], gradientAngle: 180, frameStyle: "rounded", decorations: ["🥂", "🍾", "✨"], fontStyle: "script" },
    { id: "silver-anniversary", name: "Silver Elegance", preview: "💎", colors: ["#C0C0C0", "#D8D8D8", "#EBEBEB"], gradientAngle: 45, frameStyle: "circle", decorations: ["💎", "⚪", "✨"], fontStyle: "elegant" },
    { id: "royal-purple", name: "Royal Purple", preview: "👑", colors: ["#2d1b4e", "#4B0082", "#6B238E"], gradientAngle: 135, frameStyle: "circle", decorations: ["👑", "💜", "✨"], fontStyle: "elegant" },
    { id: "pearl-white", name: "Pearl White", preview: "🦪", colors: ["#FDEEF4", "#FFF5F7", "#FFE4EC"], gradientAngle: 90, frameStyle: "circle", decorations: ["🦪", "💕", "✨"], fontStyle: "script" },
    { id: "black-tie", name: "Black Tie", preview: "🎩", colors: ["#1a1a1a", "#2d2d2d", "#404040"], gradientAngle: 180, frameStyle: "rounded", decorations: ["🎩", "🎀", "✨"], fontStyle: "modern" },
  ],
  comedy: [
    { id: "party-explosion", name: "Party Explosion", preview: "🎉", colors: ["#FF1493", "#FF6B6B", "#FFBE0B"], gradientAngle: 45, frameStyle: "star", decorations: ["🎉", "🎊", "🥳", "🎈", "🎁"], fontStyle: "bold" },
    { id: "emoji-madness", name: "Emoji Madness", preview: "😂", colors: ["#FFCC00", "#FF9500", "#FF6B6B"], gradientAngle: 135, frameStyle: "circle", decorations: ["😂", "🤣", "😜", "🎂", "🎈"], fontStyle: "fun" },
    { id: "retro-80s", name: "Retro 80s", preview: "🕹️", colors: ["#FF00FF", "#00FFFF", "#FF1493"], gradientAngle: 45, frameStyle: "diamond", decorations: ["🕹️", "📼", "🎮", "⚡"], fontStyle: "bold" },
    { id: "pizza-party", name: "Pizza Party", preview: "🍕", colors: ["#FF6347", "#FFA500", "#FFD700"], gradientAngle: 180, frameStyle: "circle", decorations: ["🍕", "🍔", "🎉", "🥤"], fontStyle: "fun" },
    { id: "meme-style", name: "Meme Style", preview: "🤣", colors: ["#1a1a1a", "#333333", "#FF4500"], gradientAngle: 90, frameStyle: "rounded", decorations: ["🤣", "💀", "🔥", "😎"], fontStyle: "bold" },
    { id: "disco-ball", name: "Disco Ball", preview: "🪩", colors: ["#9400D3", "#FF00FF", "#00CED1"], gradientAngle: 45, frameStyle: "circle", decorations: ["🪩", "💃", "🕺", "✨"], fontStyle: "fun" },
    { id: "taco-tuesday", name: "Taco Fiesta", preview: "🌮", colors: ["#228B22", "#FFA500", "#FF6347"], gradientAngle: 135, frameStyle: "circle", decorations: ["🌮", "🌯", "🎉", "🥳"], fontStyle: "fun" },
    { id: "unicorn-sparkle", name: "Unicorn Sparkle", preview: "🦄", colors: ["#FFB6C1", "#E6E6FA", "#98FB98"], gradientAngle: 45, frameStyle: "star", decorations: ["🦄", "🌈", "✨", "💖"], fontStyle: "fun" },
    { id: "dad-jokes", name: "Dad Jokes", preview: "👔", colors: ["#C3B091", "#8B7355", "#D2B48C"], gradientAngle: 180, frameStyle: "rounded", decorations: ["👔", "🤓", "😄", "👍"], fontStyle: "fun" },
    { id: "cat-lover", name: "Cat Lover", preview: "🐱", colors: ["#FFE4E1", "#DDA0DD", "#FFB6C1"], gradientAngle: 90, frameStyle: "heart", decorations: ["🐱", "😺", "🐾", "💕"], fontStyle: "fun" },
  ],
  friends: [
    { id: "bestie-vibes", name: "Bestie Vibes", preview: "👯", colors: ["#FF7F50", "#20B2AA", "#FFD700"], gradientAngle: 45, frameStyle: "heart", decorations: ["👯", "💕", "✨", "🎉"], fontStyle: "fun" },
    { id: "coffee-date", name: "Coffee Date", preview: "☕", colors: ["#6F4E37", "#8B7355", "#D2B48C"], gradientAngle: 180, frameStyle: "circle", decorations: ["☕", "🧁", "💕", "✨"], fontStyle: "modern" },
    { id: "road-trip", name: "Road Trip", preview: "🚗", colors: ["#87CEEB", "#98FB98", "#FFD700"], gradientAngle: 135, frameStyle: "rounded", decorations: ["🚗", "🗺️", "🌄", "✨"], fontStyle: "fun" },
    { id: "squad-goals", name: "Squad Goals", preview: "💅", colors: ["#FFB6C1", "#E6E6FA", "#98FB98"], gradientAngle: 45, frameStyle: "star", decorations: ["💅", "👑", "✨", "💕"], fontStyle: "fun" },
    { id: "beach-party", name: "Beach Party", preview: "🏖️", colors: ["#00CED1", "#87CEEB", "#FFD700"], gradientAngle: 90, frameStyle: "circle", decorations: ["🏖️", "🌴", "🌊", "☀️"], fontStyle: "fun" },
    { id: "gaming-buddy", name: "Gaming Buddy", preview: "🎮", colors: ["#1a1a1a", "#39FF14", "#9400D3"], gradientAngle: 135, frameStyle: "hexagon", decorations: ["🎮", "🕹️", "🏆", "⚡"], fontStyle: "bold" },
    { id: "brunch-squad", name: "Brunch Squad", preview: "🥑", colors: ["#9ACD32", "#FFD700", "#FFA500"], gradientAngle: 45, frameStyle: "circle", decorations: ["🥑", "🥞", "🍳", "☕"], fontStyle: "fun" },
    { id: "festival-vibes", name: "Festival Vibes", preview: "🎪", colors: ["#FF6347", "#00FFFF", "#FF00FF"], gradientAngle: 180, frameStyle: "star", decorations: ["🎪", "🎡", "🎶", "✨"], fontStyle: "fun" },
    { id: "wine-time", name: "Wine Time", preview: "🍷", colors: ["#722F37", "#8B0000", "#C41E3A"], gradientAngle: 135, frameStyle: "circle", decorations: ["🍷", "🍇", "✨", "💕"], fontStyle: "elegant" },
    { id: "hiking-adventure", name: "Hiking Adventure", preview: "⛰️", colors: ["#228B22", "#4682B4", "#87CEEB"], gradientAngle: 90, frameStyle: "rounded", decorations: ["⛰️", "🥾", "🌲", "🌄"], fontStyle: "modern" },
  ],
  family: [
    { id: "mom-flowers", name: "Mom's Flowers", preview: "🌸", colors: ["#FFB6C1", "#FFC0CB", "#FFE4E1"], gradientAngle: 45, frameStyle: "heart", decorations: ["🌸", "🌷", "💐", "💕"], fontStyle: "script" },
    { id: "dad-hero", name: "Dad Hero", preview: "🦸", colors: ["#DC143C", "#4169E1", "#FFD700"], gradientAngle: 135, frameStyle: "star", decorations: ["🦸", "💪", "⭐", "🏆"], fontStyle: "bold" },
    { id: "sister-bond", name: "Sister Bond", preview: "👭", colors: ["#FFB6C1", "#E6E6FA", "#98FB98"], gradientAngle: 90, frameStyle: "heart", decorations: ["👭", "💕", "✨", "🎀"], fontStyle: "script" },
    { id: "brother-cool", name: "Brother Cool", preview: "😎", colors: ["#4169E1", "#1E90FF", "#00CED1"], gradientAngle: 180, frameStyle: "rounded", decorations: ["😎", "🤙", "⚡", "🎉"], fontStyle: "modern" },
    { id: "grandma-love", name: "Grandma Love", preview: "🧶", colors: ["#DDA0DD", "#E6E6FA", "#FFF0F5"], gradientAngle: 45, frameStyle: "heart", decorations: ["🧶", "🍪", "💕", "🌸"], fontStyle: "script" },
    { id: "grandpa-wisdom", name: "Grandpa Wisdom", preview: "📚", colors: ["#1e3a5f", "#2c5282", "#8B4513"], gradientAngle: 135, frameStyle: "circle", decorations: ["📚", "🎩", "⭐", "💙"], fontStyle: "elegant" },
    { id: "family-tree", name: "Family Tree", preview: "🌳", colors: ["#228B22", "#2E8B57", "#8B4513"], gradientAngle: 90, frameStyle: "circle", decorations: ["🌳", "🍃", "💚", "🏡"], fontStyle: "modern" },
    { id: "home-sweet", name: "Home Sweet", preview: "🏠", colors: ["#DEB887", "#F5DEB3", "#FAEBD7"], gradientAngle: 180, frameStyle: "rounded", decorations: ["🏠", "❤️", "🌻", "✨"], fontStyle: "script" },
    { id: "generations", name: "Generations", preview: "👨‍👩‍👧‍👦", colors: ["#D2B48C", "#DEB887", "#F5DEB3"], gradientAngle: 45, frameStyle: "circle", decorations: ["👨‍👩‍👧‍👦", "❤️", "🏠", "✨"], fontStyle: "elegant" },
    { id: "parent-love", name: "Parent Love", preview: "💕", colors: ["#FFB6C1", "#FF69B4", "#FF1493"], gradientAngle: 135, frameStyle: "heart", decorations: ["💕", "💖", "💗", "✨"], fontStyle: "script" },
  ],
  kids: [
    { id: "dinosaur-roar", name: "Dinosaur Roar", preview: "🦖", colors: ["#228B22", "#32CD32", "#90EE90"], gradientAngle: 45, frameStyle: "star", decorations: ["🦖", "🦕", "🌋", "🌿"], fontStyle: "bold" },
    { id: "princess-castle", name: "Princess Castle", preview: "👸", colors: ["#FFB6C1", "#FF69B4", "#DA70D6"], gradientAngle: 135, frameStyle: "heart", decorations: ["👸", "🏰", "👑", "✨"], fontStyle: "script" },
    { id: "superhero-kid", name: "Superhero Kid", preview: "🦸‍♂️", colors: ["#DC143C", "#4169E1", "#FFD700"], gradientAngle: 90, frameStyle: "star", decorations: ["🦸‍♂️", "💥", "⚡", "🌟"], fontStyle: "bold" },
    { id: "space-explorer", name: "Space Explorer", preview: "🚀", colors: ["#191970", "#0000CD", "#4169E1"], gradientAngle: 180, frameStyle: "circle", decorations: ["🚀", "🌙", "⭐", "🛸"], fontStyle: "bold" },
    { id: "rainbow-magic", name: "Rainbow Magic", preview: "🌈", colors: ["#FF6B6B", "#FFD93D", "#6BCB77"], gradientAngle: 45, frameStyle: "star", decorations: ["🌈", "⭐", "✨", "🦋"], fontStyle: "fun" },
    { id: "animal-safari", name: "Animal Safari", preview: "🦁", colors: ["#F0E68C", "#DAA520", "#228B22"], gradientAngle: 135, frameStyle: "circle", decorations: ["🦁", "🐘", "🦒", "🌴"], fontStyle: "fun" },
    { id: "mermaid-ocean", name: "Mermaid Ocean", preview: "🧜‍♀️", colors: ["#40E0D0", "#00CED1", "#20B2AA"], gradientAngle: 90, frameStyle: "heart", decorations: ["🧜‍♀️", "🐚", "🌊", "✨"], fontStyle: "script" },
    { id: "pirate-treasure", name: "Pirate Treasure", preview: "🏴‍☠️", colors: ["#1a1a1a", "#8B4513", "#FFD700"], gradientAngle: 180, frameStyle: "diamond", decorations: ["🏴‍☠️", "⚓", "💎", "🗺️"], fontStyle: "bold" },
    { id: "candy-land", name: "Candy Land", preview: "🍭", colors: ["#FF69B4", "#FFB6C1", "#00BFFF"], gradientAngle: 45, frameStyle: "star", decorations: ["🍭", "🍬", "🧁", "🎂"], fontStyle: "fun" },
    { id: "robot-future", name: "Robot Future", preview: "🤖", colors: ["#708090", "#B0C4DE", "#4682B4"], gradientAngle: 135, frameStyle: "hexagon", decorations: ["🤖", "⚡", "🔧", "💡"], fontStyle: "modern" },
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

  const getTemplateById = (id: string): Template | null => {
    for (const cat of Object.values(templates)) {
      const found = cat.find(t => t.id === id);
      if (found) return found;
    }
    return null;
  };

  const generateBirthdayMessage = async (): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke("generate-birthday-wish", {
        body: {
          imageBase64: "placeholder", // Just need the message
          templateId: selectedTemplate,
          category: selectedCategory,
          recipientName: recipientName || undefined,
          senderName: senderName || undefined,
          customMessage: customMessage || undefined,
          messageOnly: true,
        }
      });

      if (error || data?.error) {
        throw new Error(data?.error || error?.message);
      }

      return data?.message || "Happy Birthday! Wishing you a day filled with joy and laughter! 🎂";
    } catch {
      // Fallback messages by category
      const fallbackMessages: Record<Category, string[]> = {
        professional: [
          "Wishing you a year of success, health, and happiness. Happy Birthday!",
          "May this birthday bring you closer to all your dreams and aspirations.",
          "Celebrating you today and all the remarkable things you do. Happy Birthday!"
        ],
        comedy: [
          "Another year older, but still not grown up! Happy Birthday! 🎉",
          "They say age is just a number... yours is just really, really high! 😂",
          "Happy Birthday! You're not old, you're vintage! 🎂"
        ],
        friends: [
          "To my favorite person - Happy Birthday! Let's make more memories this year! 🎉",
          "Happy Birthday bestie! Here's to another year of adventures together! 💕",
          "Cheers to you on your special day! You make every day brighter! ✨"
        ],
        family: [
          "Happy Birthday with all my love! You mean the world to me. 💕",
          "Wishing the most amazing birthday to the most amazing family member! 🎂",
          "May your special day be as wonderful as you are to our family! ❤️"
        ],
        kids: [
          "Happy Birthday superstar! May all your wishes come true today! 🌟",
          "Hooray! It's your birthday! Time for cake, fun, and lots of presents! 🎁",
          "Happy Birthday champion! You're growing up to be amazing! 🎈"
        ]
      };
      const messages = fallbackMessages[selectedCategory];
      return messages[Math.floor(Math.random() * messages.length)];
    }
  };

  const createBirthdayCard = async () => {
    if (!originalImage || !selectedTemplate || !canvasRef.current) {
      toast.error("Please upload a photo and select a template");
      return;
    }

    setIsProcessing(true);
    setProgress(10);

    try {
      const template = getTemplateById(selectedTemplate);
      if (!template) throw new Error("Template not found");

      setProgress(20);

      // Generate birthday message
      const message = await generateBirthdayMessage();
      setGeneratedMessage(message);
      setProgress(40);

      // Load the original image
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = originalImage;
      });

      setProgress(60);

      // Set canvas size (4K quality - 2048x2048 for square, or maintain aspect ratio)
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas context");

      const size = 2048;
      canvas.width = size;
      canvas.height = size;

      // Draw gradient background
      const gradient = ctx.createLinearGradient(
        0, 0,
        size * Math.cos(template.gradientAngle * Math.PI / 180),
        size * Math.sin(template.gradientAngle * Math.PI / 180)
      );
      template.colors.forEach((color, i) => {
        gradient.addColorStop(i / (template.colors.length - 1), color);
      });
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // Add subtle pattern overlay
      ctx.globalAlpha = 0.05;
      for (let i = 0; i < size; i += 40) {
        for (let j = 0; j < size; j += 40) {
          ctx.beginPath();
          ctx.arc(i, j, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Calculate photo placement (centered, with padding for decorations)
      const padding = size * 0.15;
      const photoSize = size * 0.5;
      const photoX = (size - photoSize) / 2;
      const photoY = size * 0.22;

      // Draw frame/border
      ctx.save();
      const frameMargin = 15;
      
      // Draw glow effect
      ctx.shadowColor = template.colors[template.colors.length - 1];
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Frame background
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      drawFrame(ctx, photoX - frameMargin, photoY - frameMargin, photoSize + frameMargin * 2, photoSize + frameMargin * 2, template.frameStyle);
      
      ctx.restore();

      // Clip to frame shape for photo
      ctx.save();
      ctx.beginPath();
      drawFramePath(ctx, photoX, photoY, photoSize, photoSize, template.frameStyle);
      ctx.clip();

      // Draw the original photo (maintaining aspect ratio, cover mode)
      const imgAspect = img.width / img.height;
      let drawWidth, drawHeight, drawX, drawY;
      
      if (imgAspect > 1) {
        drawHeight = photoSize;
        drawWidth = photoSize * imgAspect;
        drawX = photoX - (drawWidth - photoSize) / 2;
        drawY = photoY;
      } else {
        drawWidth = photoSize;
        drawHeight = photoSize / imgAspect;
        drawX = photoX;
        drawY = photoY - (drawHeight - photoSize) / 2;
      }
      
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();

      // Draw frame border
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      drawFramePath(ctx, photoX, photoY, photoSize, photoSize, template.frameStyle);
      ctx.stroke();

      setProgress(75);

      // Draw decorations around the photo
      const decorations = template.decorations;
      const decorationPositions = [
        { x: 0.08, y: 0.08, size: 80 },
        { x: 0.92, y: 0.08, size: 80 },
        { x: 0.08, y: 0.35, size: 60 },
        { x: 0.92, y: 0.35, size: 60 },
        { x: 0.15, y: 0.55, size: 50 },
        { x: 0.85, y: 0.55, size: 50 },
        { x: 0.05, y: 0.78, size: 70 },
        { x: 0.95, y: 0.78, size: 70 },
      ];

      ctx.font = "80px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      decorationPositions.forEach((pos, i) => {
        const decoration = decorations[i % decorations.length];
        ctx.font = `${pos.size}px Arial`;
        ctx.fillText(decoration, size * pos.x, size * pos.y);
      });

      // Draw "Happy Birthday" text at top
      const titleY = size * 0.1;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Text shadow
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      
      // Choose font based on style
      const fontMap: Record<string, string> = {
        elegant: "Georgia, serif",
        fun: "Comic Sans MS, cursive",
        modern: "Arial, sans-serif",
        script: "cursive",
        bold: "Impact, sans-serif"
      };
      
      ctx.font = `bold 100px ${fontMap[template.fontStyle]}`;
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "rgba(0,0,0,0.2)";
      ctx.lineWidth = 4;
      ctx.strokeText("Happy Birthday!", size / 2, titleY);
      ctx.fillText("Happy Birthday!", size / 2, titleY);

      // Draw recipient name if provided
      if (recipientName) {
        ctx.font = `bold 70px ${fontMap[template.fontStyle]}`;
        ctx.fillText(recipientName, size / 2, size * 0.17);
      }

      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Draw message at bottom
      ctx.font = `32px ${fontMap[template.fontStyle]}`;
      ctx.fillStyle = "#ffffff";
      const maxWidth = size * 0.8;
      const messageY = size * 0.82;
      wrapText(ctx, message, size / 2, messageY, maxWidth, 44);

      // Draw sender name if provided
      if (senderName) {
        ctx.font = `italic 36px ${fontMap[template.fontStyle]}`;
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fillText(`— ${senderName}`, size / 2, size * 0.94);
      }

      // Add cake emoji at bottom center
      ctx.font = "100px Arial";
      ctx.fillText("🎂", size / 2, size * 0.75);

      setProgress(90);

      // Convert canvas to image
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      setGeneratedImage(dataUrl);
      setProgress(100);
      setStep(3);
      toast.success("Birthday card created successfully!");

    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create birthday card");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // Helper function to draw frame path
  const drawFramePath = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, style: string) => {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const r = Math.min(w, h) / 2;

    switch (style) {
      case "circle":
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        break;
      case "rounded":
        const radius = 40;
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        break;
      case "diamond":
        ctx.moveTo(cx, y);
        ctx.lineTo(x + w, cy);
        ctx.lineTo(cx, y + h);
        ctx.lineTo(x, cy);
        ctx.closePath();
        break;
      case "heart":
        // Simplified heart shape
        ctx.moveTo(cx, y + h * 0.85);
        ctx.bezierCurveTo(x, y + h * 0.4, x, y, cx, y + h * 0.3);
        ctx.bezierCurveTo(x + w, y, x + w, y + h * 0.4, cx, y + h * 0.85);
        break;
      case "star":
        const spikes = 5;
        const outerRadius = r;
        const innerRadius = r * 0.5;
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes - Math.PI / 2;
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      case "hexagon":
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 - Math.PI / 2;
          const px = cx + Math.cos(angle) * r;
          const py = cy + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      default:
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
    }
  };

  // Helper to draw filled frame
  const drawFrame = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, style: string) => {
    ctx.beginPath();
    drawFramePath(ctx, x, y, w, h, style);
    ctx.fill();
  };

  // Helper to wrap text
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let testLine = '';
    let lineCount = 0;
    const maxLines = 3;

    for (let n = 0; n < words.length; n++) {
      testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
        line = words[n] + ' ';
        lineCount++;
        if (lineCount >= maxLines) break;
      } else {
        line = testLine;
      }
    }
    if (lineCount < maxLines) {
      ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage) return;

    try {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `birthday-card-${selectedTemplate}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
              <p className="text-sm text-muted-foreground">Create stunning birthday cards with your photo</p>
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
                  <p className="text-xs text-muted-foreground mt-2">Your photo will be preserved exactly as uploaded</p>
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
                      className="w-full h-full object-cover"
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
                  <X className="w-4 h-4" />
                  Start Over
                </Button>
                <Button
                  onClick={createBirthdayCard}
                  disabled={!selectedTemplate || isProcessing}
                  className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Create Birthday Card
                    </>
                  )}
                </Button>
              </div>

              {/* Progress */}
              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    Creating your birthday card...
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
                    <Label className="text-sm font-medium text-muted-foreground">Message on card:</Label>
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
