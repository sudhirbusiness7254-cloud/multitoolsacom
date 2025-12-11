import ToolPageLayout from "@/components/ToolPageLayout";
import DragDropUpload from "@/components/DragDropUpload";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

const ImageToPdfPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setFiles(prev => [...prev, file]);
    setPdfBlob(null);
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPdfBlob(null);
  };

  const convertToPdf = async () => {
    if (files.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsProcessing(true);
    try {
      const pdf = new jsPDF();
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imgData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });

        const img = new Image();
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = imgData;
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        const imgRatio = img.width / img.height;
        const pageRatio = pageWidth / pageHeight;
        
        let finalWidth, finalHeight;
        if (imgRatio > pageRatio) {
          finalWidth = pageWidth - 20;
          finalHeight = finalWidth / imgRatio;
        } else {
          finalHeight = pageHeight - 20;
          finalWidth = finalHeight * imgRatio;
        }

        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
      }

      const blob = pdf.output('blob');
      setPdfBlob(blob);
      toast.success("PDF created successfully!");
    } catch (error) {
      toast.error("Failed to create PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-images.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPageLayout
      title="Image to PDF Converter"
      metaTitle="Image to PDF Converter - Convert JPG, PNG to PDF Free Online"
      metaDescription="Free online image to PDF converter. Convert multiple JPG, PNG, WebP images to a single PDF document. Fast, secure, browser-based conversion."
      keywords={["image to pdf", "jpg to pdf", "png to pdf", "convert image to pdf", "free pdf converter", "online pdf creator"]}
      introduction="Transform your images into professional PDF documents with our free online converter. Upload multiple images to create a multi-page PDF, perfect for portfolios, presentations, or document archiving."
      features={["Convert multiple images to single PDF", "Automatic page sizing", "Maintains image quality", "Support for JPG, PNG, WebP, GIF", "Drag and drop interface", "Instant download"]}
      benefits={["No software installation", "100% free and secure", "Works on all devices", "No watermarks added", "Fast processing", "Privacy protected"]}
      howToUse={["Drag and drop images or click to browse", "Add multiple images if needed", "Click 'Convert to PDF' button", "Download your PDF file"]}
      article="Converting images to PDF is essential for creating professional documents, portfolios, and archives. Our tool processes everything locally in your browser, ensuring your images remain private and secure."
      useCases={["Creating photo portfolios", "Archiving receipts and documents", "Making presentations", "Sharing multiple images as one file", "Creating printable albums"]}
      faqs={[
        { question: "How many images can I convert?", answer: "You can add as many images as you need. Each image becomes a page in the PDF." },
        { question: "Will image quality be reduced?", answer: "No, we maintain the original image quality in the PDF output." },
        { question: "What image formats are supported?", answer: "We support JPG, PNG, WebP, GIF, BMP, and most common image formats." }
      ]}
    >
      <div className="space-y-6">
        <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
        
        {files.length > 0 && (
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Images to Convert ({files.length})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                    <span className="text-sm truncate flex-1">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={convertToPdf} disabled={isProcessing} className="flex-1">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Convert to PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {pdfBlob && (
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-primary" />
            <p className="text-lg font-semibold mb-2">PDF Ready!</p>
            <p className="text-muted-foreground mb-4">
              Size: {(pdfBlob.size / 1024).toFixed(2)} KB
            </p>
            <Button onClick={handleDownload} size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageToPdfPage;
