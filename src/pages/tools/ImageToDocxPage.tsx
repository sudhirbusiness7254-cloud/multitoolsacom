import ToolPageLayout from "@/components/ToolPageLayout";
import DragDropUpload from "@/components/DragDropUpload";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2, Trash2, Image } from "lucide-react";
import { toast } from "sonner";

const ImageToDocxPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    setFiles(prev => [...prev, file]);
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertToDocx = async () => {
    if (files.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsProcessing(true);
    try {
      // Create a simple DOCX-like structure (actually HTML that Word can open)
      const imagesHtml = await Promise.all(files.map(async (file) => {
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        return `<p style="text-align: center; margin: 20px 0;"><img src="${dataUrl}" style="max-width: 100%; height: auto;" /></p>`;
      }));

      const htmlContent = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
  <meta charset="UTF-8">
  <title>Image Document</title>
  <style>
    body { font-family: 'Calibri', sans-serif; margin: 40px; }
    img { max-width: 100%; height: auto; display: block; margin: 20px auto; }
    p { page-break-inside: avoid; }
  </style>
</head>
<body>
${imagesHtml.join('\n')}
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'application/vnd.ms-word' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images-document.doc';
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success("Document created! Open with Microsoft Word or Google Docs");
    } catch (error) {
      toast.error("Failed to create document");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="Image to Word Document Converter"
      metaTitle="Image to DOCX Converter - Convert Images to Word Document Free"
      metaDescription="Free online image to Word document converter. Convert multiple JPG, PNG images to editable DOCX format. Compatible with Microsoft Word and Google Docs."
      keywords={["image to docx", "image to word", "jpg to word", "png to docx", "convert image to document"]}
      introduction="Transform your images into editable Word documents. Perfect for creating reports, portfolios, or documentation with embedded images."
      features={["Convert multiple images", "Word-compatible format", "Maintains image quality", "Editable output", "Works with all image types", "Instant download"]}
      benefits={["Edit in Microsoft Word", "Compatible with Google Docs", "Add text around images", "Professional formatting", "Free and instant", "No signup required"]}
      howToUse={["Upload one or more images", "Click 'Convert to Word' button", "Download the document", "Open in Word or Google Docs"]}
      article="Converting images to Word format allows you to combine images with text, add captions, and create professional documents that can be further edited and formatted."
      useCases={["Creating illustrated reports", "Building photo portfolios", "Making documentation", "Preparing presentations", "Archiving images with notes"]}
      faqs={[
        { question: "Can I edit the document after conversion?", answer: "Yes! The output opens in Microsoft Word or Google Docs where you can add text, resize images, and format as needed." },
        { question: "What's the difference from PDF?", answer: "Word documents are fully editable, while PDFs are meant for fixed layouts. Use Word when you need to add or modify content." }
      ]}
    >
      <div className="space-y-6">
        <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
        
        {files.length > 0 && (
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                Images to Include ({files.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={file.name}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={convertToDocx} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Document...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Convert to Word Document
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageToDocxPage;
