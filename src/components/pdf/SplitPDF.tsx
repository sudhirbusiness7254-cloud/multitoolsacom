import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, Loader2, FileText, Trash2, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitPdfs, setSplitPdfs] = useState<{ name: string; blob: Blob }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [splitMode, setSplitMode] = useState<"all" | "range" | "custom">("all");
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(1);
  const [customPages, setCustomPages] = useState("");
  const [progress, setProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      await loadPDF(droppedFile);
    } else {
      toast.error("Please drop a PDF file");
    }
  }, []);

  const loadPDF = async (pdfFile: File) => {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPageCount();
      setFile(pdfFile);
      setPageCount(pages);
      setRangeEnd(pages);
      setSplitPdfs([]);
    } catch (error) {
      toast.error("Failed to load PDF. Please ensure it's a valid PDF file.");
    }
  };

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      await loadPDF(selectedFile);
    }
  }, []);

  const parseCustomPages = (input: string): number[] => {
    const pages: number[] = [];
    const parts = input.split(",").map((p) => p.trim());
    
    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end && i <= pageCount; i++) {
            if (i >= 1 && !pages.includes(i)) {
              pages.push(i);
            }
          }
        }
      } else {
        const num = Number(part);
        if (!isNaN(num) && num >= 1 && num <= pageCount && !pages.includes(num)) {
          pages.push(num);
        }
      }
    }
    
    return pages.sort((a, b) => a - b);
  };

  const splitPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setSplitPdfs([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const results: { name: string; blob: Blob }[] = [];

      let pagesToExtract: number[] = [];

      if (splitMode === "all") {
        // Extract each page as a separate PDF
        for (let i = 0; i < pageCount; i++) {
          pagesToExtract.push(i + 1);
        }
        
        for (let i = 0; i < pagesToExtract.length; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(copiedPage);
          const pdfBytes = await newPdf.save();
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
          results.push({
            name: `page-${i + 1}.pdf`,
            blob,
          });
          setProgress(((i + 1) / pagesToExtract.length) * 100);
        }
      } else if (splitMode === "range") {
        // Extract a range of pages as a single PDF
        const newPdf = await PDFDocument.create();
        for (let i = rangeStart - 1; i < rangeEnd; i++) {
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(copiedPage);
          setProgress(((i - rangeStart + 2) / (rangeEnd - rangeStart + 1)) * 100);
        }
        const pdfBytes = await newPdf.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
        results.push({
          name: `pages-${rangeStart}-to-${rangeEnd}.pdf`,
          blob,
        });
      } else if (splitMode === "custom") {
        // Extract custom pages as separate PDFs
        pagesToExtract = parseCustomPages(customPages);
        
        if (pagesToExtract.length === 0) {
          toast.error("Please enter valid page numbers");
          setIsProcessing(false);
          return;
        }

        for (let i = 0; i < pagesToExtract.length; i++) {
          const pageNum = pagesToExtract[i];
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]);
          newPdf.addPage(copiedPage);
          const pdfBytes = await newPdf.save();
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
          results.push({
            name: `page-${pageNum}.pdf`,
            blob,
          });
          setProgress(((i + 1) / pagesToExtract.length) * 100);
        }
      }

      setSplitPdfs(results);
      toast.success(`PDF split into ${results.length} file(s)!`);
    } catch (error) {
      console.error("Split error:", error);
      toast.error("Failed to split PDF. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadFile = (result: { name: string; blob: Blob }) => {
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    for (const result of splitPdfs) {
      downloadFile(result);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  const clearFile = () => {
    setFile(null);
    setSplitPdfs([]);
    setPageCount(0);
    setCustomPages("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {!file ? (
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
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
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          {/* File Info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center">
              <FileText className="w-7 h-7 text-pink-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {pageCount} page{pageCount !== 1 ? "s" : ""}
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

          {/* Split Options */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Split Mode</Label>
            <RadioGroup value={splitMode} onValueChange={(v) => setSplitMode(v as typeof splitMode)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">Extract all pages (one PDF per page)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="range" id="range" />
                <Label htmlFor="range">Extract page range</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Extract specific pages</Label>
              </div>
            </RadioGroup>

            {splitMode === "range" && (
              <div className="flex gap-4 items-center pt-2">
                <div className="flex items-center gap-2">
                  <Label>From page</Label>
                  <Input
                    type="number"
                    min={1}
                    max={pageCount}
                    value={rangeStart}
                    onChange={(e) => setRangeStart(Math.max(1, Math.min(pageCount, Number(e.target.value))))}
                    className="w-20"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label>to</Label>
                  <Input
                    type="number"
                    min={rangeStart}
                    max={pageCount}
                    value={rangeEnd}
                    onChange={(e) => setRangeEnd(Math.max(rangeStart, Math.min(pageCount, Number(e.target.value))))}
                    className="w-20"
                  />
                </div>
              </div>
            )}

            {splitMode === "custom" && (
              <div className="pt-2">
                <Label>Enter page numbers (e.g., 1, 3, 5-7)</Label>
                <Input
                  value={customPages}
                  onChange={(e) => setCustomPages(e.target.value)}
                  placeholder="1, 3, 5-7, 10"
                  className="mt-2"
                />
              </div>
            )}
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

      {/* Split Results */}
      {splitPdfs.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Split Files ({splitPdfs.length})
            </h3>
            <Button
              onClick={downloadAll}
              variant="outline"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {splitPdfs.map((result, index) => (
              <button
                key={index}
                onClick={() => downloadFile(result)}
                className="p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <FileText className="w-6 h-6 text-pink-500 mb-2" />
                <p className="text-sm font-medium truncate">{result.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      {file && splitPdfs.length === 0 && (
        <div className="flex justify-center">
          <Button
            onClick={splitPDF}
            disabled={isProcessing}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Splitting...
              </>
            ) : (
              <>
                <Scissors className="w-5 h-5 mr-2" />
                Split PDF
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SplitPDF;
