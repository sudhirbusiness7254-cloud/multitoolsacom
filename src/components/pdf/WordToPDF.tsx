import { useState, useCallback } from "react";
import mammoth from "mammoth";
import jsPDF from "jspdf";
import { Upload, Download, Loader2, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AdVideo } from "@/components/ads/AdContainer";

const WordToPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedPdf, setConvertedPdf] = useState<Blob | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewText, setPreviewText] = useState<string>("");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const isValidWordFile = (file: File) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    return validTypes.includes(file.type) || file.name.endsWith(".docx") || file.name.endsWith(".doc");
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidWordFile(droppedFile)) {
      setFile(droppedFile);
      setConvertedPdf(null);
      setPreviewText("");
    } else {
      toast.error("Please drop a Word document (.docx or .doc)");
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isValidWordFile(selectedFile)) {
      setFile(selectedFile);
      setConvertedPdf(null);
      setPreviewText("");
    } else if (selectedFile) {
      toast.error("Please select a Word document (.docx or .doc)");
    }
  }, []);

  const convertToPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      setProgress(20);

      // Extract text from Word document
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;
      setProgress(50);
      
      setPreviewText(text.substring(0, 500) + (text.length > 500 ? "..." : ""));

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      const lineHeight = 7;
      let yPosition = margin;

      pdf.setFont("helvetica");
      pdf.setFontSize(12);

      setProgress(70);

      // Split text into lines that fit the page width
      const lines = pdf.splitTextToSize(text, maxWidth);

      lines.forEach((line: string) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      setProgress(90);

      const pdfBlob = pdf.output("blob");
      setConvertedPdf(pdfBlob);
      setProgress(100);
      toast.success("Word document converted to PDF successfully!");
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Failed to convert document. Please ensure it's a valid Word file.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!convertedPdf) return;
    const url = URL.createObjectURL(convertedPdf);
    const a = document.createElement("a");
    a.href = url;
    const fileName = file?.name.replace(/\.(docx?|doc)$/i, ".pdf") || "document.pdf";
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFile = () => {
    setFile(null);
    setConvertedPdf(null);
    setPreviewText("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {!file ? (
        <>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer",
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 hover:bg-card/50"
            )}
          >
            <input
              type="file"
              accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <p className="text-lg font-semibold mb-1">
                  {isDragging ? "Drop your Word file here" : "Drag & Drop Word document"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse from your device
                </p>
              </div>
              
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-secondary rounded">DOCX</span>
                <span className="px-2 py-1 bg-secondary rounded">DOC</span>
              </div>
            </div>
          </div>
          {/* Video Ad - Below Upload Area */}
          <AdVideo className="mt-4" />
        </>
      ) : (
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          {/* File Info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <FileText className="w-7 h-7 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFile}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Preview */}
          {previewText && (
            <div className="p-4 bg-secondary/50 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">Document Preview:</p>
              <p className="text-sm">{previewText}</p>
            </div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      {isProcessing && (
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {file && !convertedPdf && (
          <Button
            onClick={convertToPDF}
            disabled={isProcessing}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              "Convert to PDF"
            )}
          </Button>
        )}
        
        {convertedPdf && (
          <Button
            onClick={handleDownload}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </Button>
        )}
      </div>
    </div>
  );
};

export default WordToPDF;
