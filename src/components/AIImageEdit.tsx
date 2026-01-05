import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Download, Wand2, Upload, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const exampleEdits = [
  "Make it look like a painting in the style of Van Gogh",
  "Add a sunset sky in the background",
  "Change the color scheme to blue and purple tones",
  "Make it look like a vintage photograph",
  "Add falling snow to the scene",
  "Turn this into a pencil sketch",
];

const AIImageEdit = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editPrompt, setEditPrompt] = useState("");

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
      setEditedImage(null);
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
      setEditedImage(null);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      toast.error("Please drop a valid image file");
    }
  }, []);

  const handleEdit = async () => {
    if (!previewUrl) {
      toast.error("Please upload an image first");
      return;
    }
    if (!editPrompt.trim()) {
      toast.error("Please describe how you want to edit the image");
      return;
    }

    setIsProcessing(true);
    setEditedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke("ai-image-edit", {
        body: { imageBase64: previewUrl, editPrompt: editPrompt.trim() },
      });

      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);

      if (data.imageUrl) {
        setEditedImage(data.imageUrl);
        toast.success("Image edited successfully!");
      } else {
        throw new Error("No edited image returned");
      }
    } catch (error) {
      console.error("Error editing image:", error);
      toast.error(error instanceof Error ? error.message : "Failed to edit image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!editedImage) return;
    const link = document.createElement("a");
    link.href = editedImage;
    link.download = `ai-edited-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setEditedImage(null);
    setEditPrompt("");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Wand2 className="w-8 h-8 text-primary" />
          <CardTitle className="text-2xl sm:text-3xl">AI Image Editor</CardTitle>
        </div>
        <CardDescription className="text-base">
          Edit your images with natural language instructions
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
              id="ai-edit-upload"
            />
            <label htmlFor="ai-edit-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Drop your image here or click to upload</p>
              <p className="text-sm text-muted-foreground">Upload an image to start editing with AI</p>
            </label>
          </div>
        )}

        {/* Edit Prompt Input */}
        {previewUrl && !editedImage && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Describe your edit</label>
            <Textarea
              placeholder="E.g., Make it look like a watercolor painting..."
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={isProcessing}
            />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {exampleEdits.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1.5 px-2"
                    onClick={() => setEditPrompt(example)}
                    disabled={isProcessing}
                  >
                    {example.slice(0, 30)}...
                  </Button>
                ))}
              </div>
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
              <p className="text-sm font-medium text-center">Edited</p>
              <div className="rounded-xl overflow-hidden border border-border min-h-[200px] flex items-center justify-center bg-muted/30">
                {isProcessing ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Applying your edits...</p>
                  </div>
                ) : editedImage ? (
                  <img src={editedImage} alt="Edited" className="w-full h-auto max-h-[400px] object-contain" />
                ) : (
                  <p className="text-muted-foreground text-sm">Edited image will appear here</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {previewUrl && (
          <div className="flex flex-wrap gap-3 justify-center">
            {!editedImage ? (
              <Button onClick={handleEdit} disabled={isProcessing || !editPrompt.trim()} size="lg" className="min-w-[200px]">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Apply Edit
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button onClick={handleDownload} size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download Edited
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

export default AIImageEdit;
