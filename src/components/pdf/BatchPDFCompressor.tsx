import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, Loader2, FileText, Trash2, ArrowRight, TrendingDown, FileCheck, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import JSZip from "jszip";

interface PDFFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  compressedBlob?: Blob;
  compressedSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

const BatchPDFCompressor = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState([70]);
  const [currentProcessing, setCurrentProcessing] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = (fileList: FileList) => {
    const pdfFiles = Array.from(fileList).filter(f => f.type === "application/pdf");
    
    if (pdfFiles.length === 0) {
      toast.error("Please select PDF files");
      return;
    }

    const newFiles: PDFFile[] = pdfFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      name: file.name,
      originalSize: file.size,
      status: 'pending' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`Added ${pdfFiles.length} PDF${pdfFiles.length > 1 ? 's' : ''}`);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  }, []);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const compressSinglePDF = async (pdfFile: PDFFile): Promise<Blob> => {
    const arrayBuffer = await pdfFile.file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

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

    return new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" });
  };

  const compressAllPDFs = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setCurrentProcessing(0);

    const updatedFiles = [...files];

    for (let i = 0; i < updatedFiles.length; i++) {
      setCurrentProcessing(i + 1);
      updatedFiles[i].status = 'processing';
      setFiles([...updatedFiles]);

      try {
        const compressedBlob = await compressSinglePDF(updatedFiles[i]);
        updatedFiles[i].compressedBlob = compressedBlob;
        updatedFiles[i].compressedSize = compressedBlob.size;
        updatedFiles[i].status = 'completed';
      } catch (error) {
        console.error(`Error compressing ${updatedFiles[i].name}:`, error);
        updatedFiles[i].status = 'error';
      }

      setFiles([...updatedFiles]);
    }

    setIsProcessing(false);
    
    const successCount = updatedFiles.filter(f => f.status === 'completed').length;
    if (successCount > 0) {
      toast.success(`Compressed ${successCount} PDF${successCount > 1 ? 's' : ''} successfully!`);
    }
  };

  const downloadSingle = (pdfFile: PDFFile) => {
    if (!pdfFile.compressedBlob) return;
    const url = URL.createObjectURL(pdfFile.compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${pdfFile.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllAsZip = async () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.compressedBlob);
    if (completedFiles.length === 0) return;

    const zip = new JSZip();
    
    for (const pdfFile of completedFiles) {
      if (pdfFile.compressedBlob) {
        zip.file(`compressed-${pdfFile.name}`, pdfFile.compressedBlob);
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed-pdfs.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalOriginalSize = files.reduce((acc, f) => acc + f.originalSize, 0);
  const totalCompressedSize = files.reduce((acc, f) => acc + (f.compressedSize || 0), 0);
  const completedFiles = files.filter(f => f.status === 'completed');
  const hasCompressedFiles = completedFiles.length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50 hover:bg-card/50"
        )}
      >
        <input
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <p className="text-lg font-semibold mb-1">
              {isDragging ? "Drop your PDFs here" : "Drag & Drop multiple PDF files"}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse from your device
            </p>
          </div>
          
          {files.length > 0 && (
            <p className="text-sm text-primary font-medium">
              {files.length} file{files.length > 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Package className="w-4 h-4" />
              {files.length} PDF{files.length > 1 ? 's' : ''} ({formatSize(totalOriginalSize)})
            </h3>
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4 mr-1" /> Clear All
            </Button>
          </div>

          {/* Quality Slider */}
          <div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
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
              disabled={isProcessing}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Maximum Compression</span>
              <span>Best Quality</span>
            </div>
          </div>

          {/* File Items */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {files.map((pdfFile) => (
              <div
                key={pdfFile.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-all",
                  pdfFile.status === 'completed' ? "bg-green-500/5 border-green-500/20" :
                  pdfFile.status === 'processing' ? "bg-primary/5 border-primary/20" :
                  pdfFile.status === 'error' ? "bg-destructive/5 border-destructive/20" :
                  "bg-secondary/30 border-transparent"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  pdfFile.status === 'completed' ? "bg-green-500/10" :
                  pdfFile.status === 'processing' ? "bg-primary/10" :
                  "bg-muted"
                )}>
                  {pdfFile.status === 'processing' ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : pdfFile.status === 'completed' ? (
                    <FileCheck className="w-5 h-5 text-green-500" />
                  ) : (
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{pdfFile.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatSize(pdfFile.originalSize)}</span>
                    {pdfFile.compressedSize && (
                      <>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-green-500 font-medium">
                          {formatSize(pdfFile.compressedSize)}
                        </span>
                        <span className="text-green-500">
                          (-{((pdfFile.originalSize - pdfFile.compressedSize) / pdfFile.originalSize * 100).toFixed(1)}%)
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {pdfFile.status === 'completed' && pdfFile.compressedBlob && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => downloadSingle(pdfFile)}
                      className="h-8 w-8"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                  {!isProcessing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(pdfFile.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processing Progress */}
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Compressing PDFs...</span>
            <span className="text-muted-foreground">{currentProcessing} / {files.length}</span>
          </div>
          <Progress value={(currentProcessing / files.length) * 100} className="h-2" />
        </div>
      )}

      {/* Overall Comparison */}
      {hasCompressedFiles && !isProcessing && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <FileCheck className="w-4 h-4 text-green-500" />
            Batch Compression Complete
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center p-4 bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl border border-border">
            {/* Original */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Package className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Original</p>
                  <p className="text-lg font-bold">{formatSize(totalOriginalSize)}</p>
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
                  <Package className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Compressed</p>
                  <p className="text-lg font-bold text-green-500">{formatSize(totalCompressedSize)}</p>
                </div>
              </div>
              <Progress 
                value={(totalCompressedSize / totalOriginalSize) * 100} 
                className="h-2 bg-muted [&>div]:bg-green-500" 
              />
            </div>
          </div>
          
          {/* Savings Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm text-muted-foreground">Total Space Saved:</span>
              <span className="text-2xl font-bold text-primary">
                {((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1)}%
              </span>
              <span className="text-sm text-green-500 font-medium">
                ({formatSize(totalOriginalSize - totalCompressedSize)})
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {files.length > 0 && !hasCompressedFiles && (
          <Button
            onClick={compressAllPDFs}
            disabled={isProcessing}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Compressing {currentProcessing}/{files.length}...
              </>
            ) : (
              <>
                Compress All PDFs
              </>
            )}
          </Button>
        )}
        
        {hasCompressedFiles && (
          <Button
            onClick={downloadAllAsZip}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <Download className="w-5 h-5 mr-2" />
            Download All as ZIP
          </Button>
        )}
      </div>
    </div>
  );
};

export default BatchPDFCompressor;