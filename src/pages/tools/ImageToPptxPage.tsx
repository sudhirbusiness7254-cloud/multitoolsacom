import ToolPageLayout from "@/components/ToolPageLayout";
import DragDropUpload from "@/components/DragDropUpload";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, Presentation, Loader2, Trash2, Image } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImageToPptxPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [title, setTitle] = useState("My Presentation");

  const handleFileSelect = useCallback((file: File) => {
    setFiles(prev => [...prev, file]);
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertToPptx = async () => {
    if (files.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsProcessing(true);
    try {
      // Create slides HTML that can be opened in presentation software
      const slidesHtml = await Promise.all(files.map(async (file, index) => {
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        return `
        <div class="slide" style="page-break-after: always; height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
          <img src="${dataUrl}" style="max-width: 90%; max-height: 90%; object-fit: contain; box-shadow: 0 20px 60px rgba(0,0,0,0.5); border-radius: 8px;" />
        </div>`;
      }));

      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; }
    .title-slide {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      page-break-after: always;
    }
    .title-slide h1 { font-size: 4rem; font-weight: 300; margin-bottom: 1rem; }
    .title-slide p { font-size: 1.5rem; opacity: 0.8; }
    .slide { page-break-after: always; }
    @media print {
      .slide { page-break-after: always; height: 100vh; }
    }
  </style>
</head>
<body>
  <div class="title-slide">
    <h1>${title}</h1>
    <p>${files.length} Slides</p>
  </div>
${slidesHtml.join('\n')}
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-presentation.html`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success("Presentation created! Open in browser and print to PDF, or import to PowerPoint");
    } catch (error) {
      toast.error("Failed to create presentation");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="Image to PowerPoint Converter"
      metaTitle="Image to PPTX Converter - Create PowerPoint from Images Free"
      metaDescription="Free online image to PowerPoint converter. Convert multiple images to a slideshow presentation. Professional styling, instant creation."
      keywords={["image to pptx", "image to powerpoint", "create slideshow", "image presentation", "photo slideshow maker"]}
      introduction="Transform your images into a beautiful slideshow presentation. Perfect for photo galleries, portfolios, and visual presentations."
      features={["Create slides from images", "Professional gradient backgrounds", "Custom presentation title", "Title slide included", "Responsive design", "Print-friendly format"]}
      benefits={["Quick slideshow creation", "No PowerPoint needed", "Browser-based viewer", "Export to PDF", "Import to PowerPoint", "Free and instant"]}
      howToUse={["Upload your images in order", "Set a presentation title", "Click 'Create Presentation'", "Open in browser or import to PowerPoint"]}
      article="Creating presentations from images is perfect for photo galleries, product showcases, or any visual content that needs to be presented professionally."
      useCases={["Photo slideshows", "Product presentations", "Portfolio showcases", "Event galleries", "Visual reports", "Training materials"]}
      faqs={[
        { question: "How do I use this in PowerPoint?", answer: "Open the HTML file in Chrome, print to PDF, then import the PDF into PowerPoint. Or copy images directly from the presentation." },
        { question: "Can I add text to slides?", answer: "The output is HTML-based. You can edit the file in any text editor to add titles or captions to each slide." }
      ]}
    >
      <div className="space-y-6">
        <div className="bg-card rounded-xl p-4 border border-border">
          <Label htmlFor="title" className="flex items-center gap-2 mb-2">
            <Presentation className="w-4 h-4 text-primary" />
            Presentation Title
          </Label>
          <Input 
            id="title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter presentation title"
          />
        </div>

        <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
        
        {files.length > 0 && (
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                Slides ({files.length})
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {files.map((file, index) => (
                  <div key={index} className="relative flex-shrink-0 group">
                    <div className="w-32 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-1">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={file.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <span className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={convertToPptx} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Presentation...
                </>
              ) : (
                <>
                  <Presentation className="w-5 h-5 mr-2" />
                  Create Presentation
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageToPptxPage;
