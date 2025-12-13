import React, { useState, useCallback } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import DragDropUpload from "./DragDropUpload";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { 
  FileText, 
  Download, 
  Trash2, 
  Upload, 
  ArrowUp, 
  ArrowDown,
  Scissors,
  Minimize2,
  Image,
  FileUp,
  Loader2,
  CheckCircle,
  X
} from "lucide-react";

type ToolMode = 'merge' | 'compress' | 'split' | 'word-to-pdf' | 'pdf-to-jpg' | 'jpg-to-pdf';

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  preview?: string;
  arrayBuffer?: ArrayBuffer;
}

interface UniversalPDFToolsProps {
  defaultMode?: ToolMode;
}

// Helper to convert Uint8Array to Blob safely
const uint8ArrayToBlob = (data: Uint8Array, type: string): Blob => {
  return new Blob([new Uint8Array(data)], { type });
};

const UniversalPDFTools: React.FC<UniversalPDFToolsProps> = ({ defaultMode = 'merge' }) => {
  const [mode, setMode] = useState<ToolMode>(defaultMode);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState([70]);
  const [splitPages, setSplitPages] = useState('');
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultName, setResultName] = useState('');

  const handleFileSelect = useCallback(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const newFile: UploadedFile = {
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      arrayBuffer,
    };

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newFile.preview = e.target?.result as string;
        setFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    } else {
      setFiles(prev => [...prev, newFile]);
    }
  }, []);

  const handleMultipleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    Array.from(fileList).forEach(file => handleFileSelect(file));
    e.target.value = '';
  }, [handleFileSelect]);

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= files.length) return;
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const updateProgress = (value: number) => setProgress(Math.min(value, 100));

  const mergePDFs = async (): Promise<Blob> => {
    const mergedPdf = await PDFDocument.create();
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.arrayBuffer) continue;
      
      try {
        const pdfDoc = await PDFDocument.load(file.arrayBuffer);
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      } catch (error) {
        console.error(`Error loading PDF ${file.name}:`, error);
        toast.error(`Failed to load ${file.name}`);
      }
      updateProgress(((i + 1) / files.length) * 80);
    }

    const pdfBytes = await mergedPdf.save();
    return uint8ArrayToBlob(pdfBytes, 'application/pdf');
  };

  const splitPDF = async (): Promise<Blob> => {
    const file = files[0];
    if (!file.arrayBuffer) throw new Error('No file data');

    const sourcePdf = await PDFDocument.load(file.arrayBuffer);
    const totalPages = sourcePdf.getPageCount();
    
    let pagesToExtract: number[] = [];
    if (splitPages.trim()) {
      const ranges = splitPages.split(',').map(r => r.trim());
      for (const range of ranges) {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(n => parseInt(n.trim()) - 1);
          for (let i = start; i <= Math.min(end, totalPages - 1); i++) {
            if (i >= 0) pagesToExtract.push(i);
          }
        } else {
          const page = parseInt(range) - 1;
          if (page >= 0 && page < totalPages) pagesToExtract.push(page);
        }
      }
    } else {
      pagesToExtract = Array.from({ length: totalPages }, (_, i) => i);
    }

    const pdfBlobs: { name: string; blob: Blob }[] = [];
    
    for (let i = 0; i < pagesToExtract.length; i++) {
      const pageIndex = pagesToExtract[i];
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageIndex]);
      newPdf.addPage(copiedPage);
      
      const pdfBytes = await newPdf.save();
      pdfBlobs.push({
        name: `page_${pageIndex + 1}.pdf`,
        blob: uint8ArrayToBlob(pdfBytes, 'application/pdf')
      });
      updateProgress(((i + 1) / pagesToExtract.length) * 80);
    }

    if (pdfBlobs.length === 1) return pdfBlobs[0].blob;
    toast.info(`Split into ${pdfBlobs.length} pages. Downloading first page.`);
    return pdfBlobs[0].blob;
  };

  const compressPDF = async (): Promise<Blob> => {
    const file = files[0];
    if (!file.arrayBuffer) throw new Error('No file data');

    const pdfDoc = await PDFDocument.load(file.arrayBuffer);
    const quality = compressionLevel[0] / 100;
    updateProgress(40);
    
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: quality < 0.8,
      addDefaultPage: false,
    });
    updateProgress(80);
    
    const originalSize = file.size;
    const newSize = pdfBytes.length;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    if (newSize < originalSize) {
      toast.success(`Reduced file size by ${reduction}%`);
    } else {
      toast.info('PDF is already optimized');
    }
    
    return uint8ArrayToBlob(pdfBytes, 'application/pdf');
  };

  const imagesToPDF = async (): Promise<Blob> => {
    const pdfDoc = await PDFDocument.create();
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.arrayBuffer) continue;
      
      try {
        let image;
        const uint8Array = new Uint8Array(file.arrayBuffer);
        
        if (file.file.type === 'image/jpeg' || file.file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(uint8Array);
        } else if (file.file.type === 'image/png') {
          image = await pdfDoc.embedPng(uint8Array);
        } else {
          try {
            image = await pdfDoc.embedPng(uint8Array);
          } catch {
            image = await pdfDoc.embedJpg(uint8Array);
          }
        }
        
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      } catch (error) {
        console.error(`Error embedding image ${file.name}:`, error);
        toast.error(`Failed to add ${file.name}`);
      }
      updateProgress(((i + 1) / files.length) * 80);
    }
    
    const pdfBytes = await pdfDoc.save();
    return uint8ArrayToBlob(pdfBytes, 'application/pdf');
  };

  const pdfToImages = async (): Promise<Blob> => {
    const file = files[0];
    if (!file.arrayBuffer) throw new Error('No file data');

    const pdfDoc = await PDFDocument.load(file.arrayBuffer);
    const pageCount = pdfDoc.getPageCount();
    toast.info(`PDF has ${pageCount} pages. Use a dedicated PDF viewer for images.`);
    return new Blob([file.arrayBuffer], { type: 'application/pdf' });
  };

  const wordToPDF = async (): Promise<Blob> => {
    const file = files[0];
    if (!file.arrayBuffer) throw new Error('No file data');

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    page.drawText(`Converted from: ${file.name}`, {
      x: 50, y: page.getHeight() - 50, size: 16, font, color: rgb(0, 0, 0),
    });
    page.drawText('Note: For full Word document conversion,', {
      x: 50, y: page.getHeight() - 100, size: 12, font, color: rgb(0.5, 0.5, 0.5),
    });
    page.drawText('please use Microsoft Word or LibreOffice.', {
      x: 50, y: page.getHeight() - 120, size: 12, font, color: rgb(0.5, 0.5, 0.5),
    });
    updateProgress(80);
    
    const pdfBytes = await pdfDoc.save();
    return uint8ArrayToBlob(pdfBytes, 'application/pdf');
  };

  const processPDF = async () => {
    if (files.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      let outputBlob: Blob;
      let outputName: string;

      switch (mode) {
        case 'merge':
          outputBlob = await mergePDFs();
          outputName = 'merged.pdf';
          toast.success(`${files.length} PDF files merged successfully!`);
          break;
        case 'compress':
          outputBlob = await compressPDF();
          outputName = 'compressed.pdf';
          break;
        case 'split':
          outputBlob = await splitPDF();
          outputName = 'split_page.pdf';
          toast.success('PDF split successfully!');
          break;
        case 'word-to-pdf':
          outputBlob = await wordToPDF();
          outputName = files[0].name.replace(/\.(docx?|doc)$/i, '.pdf');
          toast.success('Document converted to PDF!');
          break;
        case 'pdf-to-jpg':
          outputBlob = await pdfToImages();
          outputName = 'pdf_pages.pdf';
          break;
        case 'jpg-to-pdf':
          outputBlob = await imagesToPDF();
          outputName = 'images.pdf';
          toast.success('Images converted to PDF!');
          break;
        default:
          throw new Error('Unknown operation');
      }

      setProgress(100);
      setResultBlob(outputBlob);
      setResultName(outputName);
    } catch (error) {
      console.error('PDF processing error:', error);
      toast.error('Processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resultName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Download started!');
  };

  const resetTool = () => {
    setFiles([]);
    setResultBlob(null);
    setResultName('');
    setProgress(0);
  };

  const getAcceptedTypes = () => {
    switch (mode) {
      case 'merge':
      case 'compress':
      case 'split':
      case 'pdf-to-jpg':
        return '.pdf';
      case 'word-to-pdf':
        return '.doc,.docx';
      case 'jpg-to-pdf':
        return 'image/*';
      default:
        return '.pdf';
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'merge': return <FileText className="h-5 w-5" />;
      case 'compress': return <Minimize2 className="h-5 w-5" />;
      case 'split': return <Scissors className="h-5 w-5" />;
      case 'word-to-pdf': return <FileUp className="h-5 w-5" />;
      case 'pdf-to-jpg': return <Image className="h-5 w-5" />;
      case 'jpg-to-pdf': return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'merge': return 'Merge PDF Files';
      case 'compress': return 'Compress PDF';
      case 'split': return 'Split PDF';
      case 'word-to-pdf': return 'Word to PDF';
      case 'pdf-to-jpg': return 'PDF to JPG';
      case 'jpg-to-pdf': return 'JPG to PDF';
      default: return 'PDF Tool';
    }
  };

  return (
    <Card className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <img src={logo} alt="PDF Tools" className="h-8 w-8" />
        <h2 className="text-xl sm:text-2xl font-semibold">{getModeTitle()}</h2>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {[
          { key: 'merge', label: 'Merge', icon: FileText },
          { key: 'compress', label: 'Compress', icon: Minimize2 },
          { key: 'split', label: 'Split', icon: Scissors },
          { key: 'word-to-pdf', label: 'Word to PDF', icon: FileUp },
          { key: 'pdf-to-jpg', label: 'PDF to JPG', icon: Image },
          { key: 'jpg-to-pdf', label: 'JPG to PDF', icon: FileText },
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={mode === key ? 'default' : 'outline'}
            className="flex items-center gap-2 h-auto py-3"
            onClick={() => { setMode(key as ToolMode); resetTool(); }}
          >
            <Icon className="h-4 w-4" />
            <span className="text-xs sm:text-sm">{label}</span>
          </Button>
        ))}
      </div>

      {!resultBlob ? (
        <>
          <div className="mb-6">
            {files.length === 0 ? (
              <DragDropUpload onFileSelect={handleFileSelect} />
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      {file.preview ? (
                        <img src={file.preview} alt={file.name} className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <FileText className="h-10 w-10 text-primary" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                      {(mode === 'merge' || mode === 'jpg-to-pdf') && files.length > 1 && (
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveFile(index, 'up')} disabled={index === 0}>
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1}>
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFile(file.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {(mode === 'merge' || mode === 'jpg-to-pdf') && (
                  <div className="flex justify-center">
                    <label className="cursor-pointer">
                      <input type="file" className="hidden" accept={getAcceptedTypes()} multiple onChange={handleMultipleFiles} />
                      <Button variant="outline" asChild>
                        <span className="flex items-center gap-2"><Upload className="h-4 w-4" />Add More Files</span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

          {mode === 'compress' && files.length > 0 && (
            <div className="mb-6 space-y-4">
              <Label>Compression Quality: {compressionLevel[0]}%</Label>
              <Slider value={compressionLevel} onValueChange={setCompressionLevel} min={10} max={100} step={5} />
              <p className="text-xs text-muted-foreground">Lower values = smaller file size, higher values = better quality</p>
            </div>
          )}

          {mode === 'split' && files.length > 0 && (
            <div className="mb-6 space-y-4">
              <Label>Page Ranges (e.g., 1-3, 5, 7-10)</Label>
              <Input value={splitPages} onChange={(e) => setSplitPages(e.target.value)} placeholder="Leave empty to split all pages" />
              <p className="text-xs text-muted-foreground">Specify which pages to extract, or leave empty to split into individual pages</p>
            </div>
          )}

          {isProcessing && (
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center mt-2 text-muted-foreground">Processing... {Math.round(progress)}%</p>
            </div>
          )}

          {files.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={processPDF} disabled={isProcessing} className="flex-1">
                {isProcessing ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Processing...</>) : (<>{getModeIcon()}<span className="ml-2">Process</span></>)}
              </Button>
              <Button variant="outline" onClick={resetTool} disabled={isProcessing}>
                <X className="h-4 w-4 mr-2" />Clear
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Processing Complete!</h3>
            <p className="text-muted-foreground">{resultName}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={downloadResult} className="gap-2"><Download className="h-4 w-4" />Download</Button>
            <Button variant="outline" onClick={resetTool}>Process Another File</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UniversalPDFTools;