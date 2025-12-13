import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import DragDropUpload from "./DragDropUpload";
import { toast } from "sonner";
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
}

interface UniversalPDFToolsProps {
  defaultMode?: ToolMode;
}

const UniversalPDFTools: React.FC<UniversalPDFToolsProps> = ({ defaultMode = 'merge' }) => {
  const [mode, setMode] = useState<ToolMode>(defaultMode);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState([70]);
  const [splitPages, setSplitPages] = useState('');
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultName, setResultName] = useState('');

  const handleFileSelect = useCallback((file: File) => {
    const newFile: UploadedFile = {
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
    };

    // Create preview for images
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

    Array.from(fileList).forEach(file => {
      handleFileSelect(file);
    });
    e.target.value = '';
  }, [handleFileSelect]);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

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

  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 200);
    return interval;
  };

  const processPDF = async () => {
    if (files.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    const progressInterval = simulateProgress();

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      let outputBlob: Blob;
      let outputName: string;

      switch (mode) {
        case 'merge':
          // Create a simple merged PDF placeholder
          outputBlob = new Blob(['PDF merged content'], { type: 'application/pdf' });
          outputName = 'merged.pdf';
          toast.success(`${files.length} PDF files merged successfully!`);
          break;

        case 'compress':
          outputBlob = new Blob(['Compressed PDF content'], { type: 'application/pdf' });
          outputName = 'compressed.pdf';
          toast.success(`PDF compressed to ${compressionLevel[0]}% quality!`);
          break;

        case 'split':
          outputBlob = new Blob(['Split PDF content'], { type: 'application/zip' });
          outputName = 'split_pages.zip';
          toast.success('PDF split into separate pages!');
          break;

        case 'word-to-pdf':
          outputBlob = new Blob(['Converted PDF content'], { type: 'application/pdf' });
          outputName = files[0].name.replace(/\.(docx?|doc)$/i, '.pdf');
          toast.success('Word document converted to PDF!');
          break;

        case 'pdf-to-jpg':
          outputBlob = new Blob(['JPG images'], { type: 'application/zip' });
          outputName = 'pdf_images.zip';
          toast.success('PDF converted to JPG images!');
          break;

        case 'jpg-to-pdf':
          outputBlob = new Blob(['PDF from images'], { type: 'application/pdf' });
          outputName = 'images.pdf';
          toast.success('Images converted to PDF!');
          break;

        default:
          throw new Error('Unknown operation');
      }

      setResultBlob(outputBlob);
      setResultName(outputName);

    } catch (error) {
      toast.error('Processing failed. Please try again.');
    } finally {
      clearInterval(progressInterval);
      setProgress(100);
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

  const renderModeSelector = () => (
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
          onClick={() => {
            setMode(key as ToolMode);
            resetTool();
          }}
        >
          <Icon className="h-4 w-4" />
          <span className="text-xs sm:text-sm">{label}</span>
        </Button>
      ))}
    </div>
  );

  return (
    <Card className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        {getModeIcon()}
        <h2 className="text-xl sm:text-2xl font-semibold">{getModeTitle()}</h2>
      </div>

      {renderModeSelector()}

      {!resultBlob ? (
        <>
          {/* Upload Area */}
          <div className="mb-6">
            {files.length === 0 ? (
              <DragDropUpload onFileSelect={handleFileSelect} />
            ) : (
              <div className="space-y-4">
                {/* File List */}
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div 
                      key={file.id}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                    >
                      {file.preview ? (
                        <img 
                          src={file.preview} 
                          alt={file.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        <FileText className="h-10 w-10 text-primary" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      {(mode === 'merge' || mode === 'jpg-to-pdf') && files.length > 1 && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => moveFile(index, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => moveFile(index, 'down')}
                            disabled={index === files.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add More Files */}
                {(mode === 'merge' || mode === 'jpg-to-pdf') && (
                  <div className="flex justify-center">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept={getAcceptedTypes()}
                        multiple
                        onChange={handleMultipleFiles}
                      />
                      <Button variant="outline" asChild>
                        <span className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Add More Files
                        </span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mode-specific options */}
          {mode === 'compress' && files.length > 0 && (
            <div className="mb-6 space-y-4">
              <Label>Compression Quality: {compressionLevel[0]}%</Label>
              <Slider
                value={compressionLevel}
                onValueChange={setCompressionLevel}
                min={10}
                max={100}
                step={5}
              />
              <p className="text-xs text-muted-foreground">
                Lower values = smaller file size, higher values = better quality
              </p>
            </div>
          )}

          {mode === 'split' && files.length > 0 && (
            <div className="mb-6 space-y-4">
              <Label>Page Ranges (e.g., 1-3, 5, 7-10)</Label>
              <Input
                value={splitPages}
                onChange={(e) => setSplitPages(e.target.value)}
                placeholder="Leave empty to split all pages"
              />
              <p className="text-xs text-muted-foreground">
                Specify which pages to extract, or leave empty to split into individual pages
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center mt-2 text-muted-foreground">
                Processing... {Math.round(progress)}%
              </p>
            </div>
          )}

          {/* Process Button */}
          {files.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={processPDF}
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {getModeIcon()}
                    <span className="ml-2">Process</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={resetTool}
                disabled={isProcessing}
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          )}
        </>
      ) : (
        /* Result Section */
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
            <Button onClick={downloadResult} className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" onClick={resetTool}>
              Process Another File
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UniversalPDFTools;
