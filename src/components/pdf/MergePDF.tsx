import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, X, FileText, Download, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PDFFile {
  id: string;
  file: File;
  name: string;
  pages: number;
}

const MergePDF = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdf, setMergedPdf] = useState<Blob | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File): Promise<PDFFile | null> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      return {
        id: crypto.randomUUID(),
        file,
        name: file.name,
        pages: pdfDoc.getPageCount(),
      };
    } catch (error) {
      toast.error(`Failed to load ${file.name}. Make sure it's a valid PDF.`);
      return null;
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf"
    );
    
    if (droppedFiles.length === 0) {
      toast.error("Please drop PDF files only");
      return;
    }

    const processedFiles = await Promise.all(droppedFiles.map(processFile));
    const validFiles = processedFiles.filter((f): f is PDFFile => f !== null);
    setFiles((prev) => [...prev, ...validFiles]);
    setMergedPdf(null);
  }, []);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const pdfFiles = Array.from(selectedFiles).filter(
      (f) => f.type === "application/pdf"
    );

    const processedFiles = await Promise.all(pdfFiles.map(processFile));
    const validFiles = processedFiles.filter((f): f is PDFFile => f !== null);
    setFiles((prev) => [...prev, ...validFiles]);
    setMergedPdf(null);
    e.target.value = "";
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setMergedPdf(null);
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newFiles = [...files];
    const [movedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, movedFile);
    setFiles(newFiles);
    setMergedPdf(null);
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast.error("Please add at least 2 PDF files to merge");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const mergedDoc = await PDFDocument.create();
      
      for (let i = 0; i < files.length; i++) {
        const arrayBuffer = await files[i].file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedDoc.addPage(page));
        setProgress(((i + 1) / files.length) * 100);
      }

      const mergedBytes = await mergedDoc.save();
      const blob = new Blob([new Uint8Array(mergedBytes)], { type: "application/pdf" });
      setMergedPdf(blob);
      toast.success("PDFs merged successfully!");
    } catch (error) {
      console.error("Merge error:", error);
      toast.error("Failed to merge PDFs. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!mergedPdf) return;
    const url = URL.createObjectURL(mergedPdf);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged-document.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Area */}
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
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <p className="text-lg font-semibold mb-1">
              {isDragging ? "Drop your PDFs here" : "Drag & Drop PDF files"}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse from your device
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Add multiple PDFs in the order you want them merged
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Selected Files ({files.length})
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag to reorder
            </p>
          </div>
          
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={file.id}
                className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3"
              >
                <button
                  className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                  onMouseDown={() => {}}
                >
                  <GripVertical className="w-5 h-5" />
                </button>
                
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.pages} page{file.pages !== 1 ? "s" : ""}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveFile(index, index - 1)}
                    >
                      ↑
                    </Button>
                  )}
                  {index < files.length - 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveFile(index, index + 1)}
                    >
                      ↓
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
        {!mergedPdf ? (
          <Button
            onClick={mergePDFs}
            disabled={files.length < 2 || isProcessing}
            size="lg"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Merging PDFs...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 mr-2" />
                Merge {files.length} PDFs
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleDownload}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Merged PDF
          </Button>
        )}
      </div>
    </div>
  );
};

export default MergePDF;
