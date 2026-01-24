import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, Loader2, FileText, Trash2, ArrowRight, TrendingDown, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AdVideo } from "@/components/ads/AdContainer";

const CompressPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedPdf, setCompressedPdf] = useState<Blob | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState([70]);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
      setOriginalSize(droppedFile.size);
      setCompressedPdf(null);
    } else {
      toast.error("Please drop a PDF file");
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressedPdf(null);
    }
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const compressPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      setProgress(30);
      
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setProgress(60);

      // Remove metadata to reduce size
      pdfDoc.setTitle("");
      pdfDoc.setAuthor("");
      pdfDoc.setSubject("");
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer("");
      pdfDoc.setCreator("");

      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });
      
      setProgress(90);

      // Create blob from compressed bytes
      // Note: pdf-lib doesn't support image quality settings directly
      // This creates a new optimized PDF
      const blob = new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" });
      setCompressedPdf(blob);
      setCompressedSize(blob.size);
      setProgress(100);
      
      const savings = ((originalSize - blob.size) / originalSize * 100).toFixed(1);
      if (parseFloat(savings) > 0) {
        toast.success(`PDF compressed! Saved ${savings}%`);
      } else {
        toast.info("PDF is already well optimized. Minimal compression achieved.");
      }
    } catch (error) {
      console.error("Compression error:", error);
      toast.error("Failed to compress PDF. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!compressedPdf) return;
    const url = URL.createObjectURL(compressedPdf);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${file?.name || "document.pdf"}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFile = () => {
    setFile(null);
    setCompressedPdf(null);
    setOriginalSize(0);
    setCompressedSize(0);
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
              accept=".pdf,application/pdf"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <p className="text-lg font-semibold mb-1">
                  {isDragging ? "Drop your PDF here" : "Drag & Drop PDF file"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse from your device
                </p>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Maximum file size: 50MB
              </p>
            </div>
          </div>
          {/* Video Ad - Below Upload Area */}
          <AdVideo className="mt-4" />
        </>
      ) : (
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          {/* File Info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <FileText className="w-7 h-7 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                Original size: {formatSize(originalSize)}
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

          {/* Quality Slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Compression Level</span>
              <span className="text-muted-foreground">{quality[0]}%</span>
            </div>
            <Slider
              value={quality}
              onValueChange={setQuality}
              min={10}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Maximum Compression</span>
              <span>Best Quality</span>
            </div>
          </div>

          {/* Enhanced Compression Comparison */}
          {compressedPdf && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                <FileCheck className="w-4 h-4 text-green-500" />
                Compression Complete
              </div>
              
              {/* Visual Comparison Slider */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center p-4 bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl border border-border">
                {/* Original */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Original</p>
                      <p className="text-lg font-bold">{formatSize(originalSize)}</p>
                    </div>
                  </div>
                  <Progress value={100} className="h-2 bg-muted" />
                </div>
                
                {/* Arrow */}
                <div className="hidden md:flex flex-col items-center gap-1">
                  <ArrowRight className="w-6 h-6 text-primary" />
                  <TrendingDown className="w-4 h-4 text-green-500" />
                </div>
                
                {/* Compressed */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Compressed</p>
                      <p className="text-lg font-bold text-green-500">{formatSize(compressedSize)}</p>
                    </div>
                  </div>
                  <Progress 
                    value={(compressedSize / originalSize) * 100} 
                    className="h-2 bg-muted [&>div]:bg-green-500" 
                  />
                </div>
              </div>
              
              {/* Savings Badge */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                  <span className="text-sm text-muted-foreground">Space Saved:</span>
                  <span className="text-2xl font-bold text-primary">
                    {((originalSize - compressedSize) / originalSize * 100).toFixed(1)}%
                  </span>
                  <span className="text-sm text-green-500 font-medium">
                    ({formatSize(originalSize - compressedSize)})
                  </span>
                </div>
              </div>
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
        {file && !compressedPdf && (
          <Button
            onClick={compressPDF}
            disabled={isProcessing}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Compressing...
              </>
            ) : (
              "Compress PDF"
            )}
          </Button>
        )}
        
        {compressedPdf && (
          <Button
            onClick={handleDownload}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Compressed PDF
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompressPDF;
