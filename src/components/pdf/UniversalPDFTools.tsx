import { useState, useCallback, useRef } from "react";
import { FileText, Minimize2, FileUp, Image, Scissors, Upload, X, ArrowRight, Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { AdVideo } from "@/components/ads/AdContainer";

// Import PDF tool components
import MergePDF from "./MergePDF";
import CompressPDF from "./CompressPDF";
import BatchPDFCompressor from "./BatchPDFCompressor";
import WordToPDF from "./WordToPDF";
import ImageToPDFTool from "./ImageToPDFTool";
import SplitPDF from "./SplitPDF";

interface PDFTool {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  acceptedFiles: string[];
  component: React.ComponentType;
}

const pdfTools: PDFTool[] = [
  {
    id: "merge-pdf",
    name: "Merge PDF",
    slug: "merge-pdf",
    description: "Combine multiple PDF files into one",
    icon: <FileText className="w-6 h-6" />,
    color: "from-red-500 to-red-600",
    acceptedFiles: [".pdf"],
    component: MergePDF
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    slug: "compress-pdf",
    description: "Reduce PDF file size",
    icon: <Minimize2 className="w-6 h-6" />,
    color: "from-orange-500 to-orange-600",
    acceptedFiles: [".pdf"],
    component: CompressPDF
  },
  {
    id: "batch-compress-pdf",
    name: "Batch Compress",
    slug: "batch-compress-pdf",
    description: "Compress multiple PDFs at once",
    icon: <Layers className="w-6 h-6" />,
    color: "from-amber-500 to-amber-600",
    acceptedFiles: [".pdf"],
    component: BatchPDFCompressor
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    slug: "word-to-pdf",
    description: "Convert Word documents to PDF",
    icon: <FileUp className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    acceptedFiles: [".doc", ".docx"],
    component: WordToPDF
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    slug: "image-to-pdf",
    description: "Convert images to PDF",
    icon: <Image className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    acceptedFiles: ["image/*"],
    component: ImageToPDFTool
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    slug: "split-pdf",
    description: "Extract pages from PDF",
    icon: <Scissors className="w-6 h-6" />,
    color: "from-pink-500 to-pink-600",
    acceptedFiles: [".pdf"],
    component: SplitPDF
  },
];

interface UniversalPDFToolsProps {
  defaultTool?: string;
}

const UniversalPDFTools = ({ defaultTool }: UniversalPDFToolsProps) => {
  const [selectedTool, setSelectedTool] = useState<string>(defaultTool || "");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const detectToolFromFiles = (files: File[]): string | null => {
    if (files.length === 0) return null;

    const file = files[0];
    const fileName = file.name.toLowerCase();
    
    // Auto-detect tool based on file type
    if (fileName.endsWith('.pdf')) {
      if (files.length > 1) {
        return "merge-pdf";
      } else {
        return "compress-pdf";
      }
    } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      return "word-to-pdf";
    } else if (file.type.startsWith('image/')) {
      return "image-to-pdf";
    }
    
    return null;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) {
      toast.error("No files detected. Please try again.");
      return;
    }

    const detectedTool = detectToolFromFiles(files);
    
    if (detectedTool) {
      setSelectedTool(detectedTool);
      const toolName = pdfTools.find(t => t.id === detectedTool)?.name || detectedTool;
      toast.success(`Opening ${toolName}. Please upload your file again in the tool below.`);
    } else {
      toast.error("Unsupported file type. Please use PDF, Word documents, or images.");
    }
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const detectedTool = detectToolFromFiles(files);
    
    if (detectedTool) {
      setSelectedTool(detectedTool);
      const toolName = pdfTools.find(t => t.id === detectedTool)?.name || detectedTool;
      toast.success(`Opening ${toolName}. Please upload your file again in the tool below.`);
    } else {
      toast.error("Unsupported file type. Please use PDF, Word documents, or images.");
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const activeTool = pdfTools.find(t => t.id === selectedTool);

  if (selectedTool && activeTool) {
    const ToolComponent = activeTool.component;
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeTool.color} flex items-center justify-center text-white`}>
              {activeTool.icon}
            </div>
            <div>
              <h3 className="font-semibold">{activeTool.name}</h3>
              <p className="text-sm text-muted-foreground">{activeTool.description}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setSelectedTool("")}>
            <X className="w-4 h-4 mr-2" />
            Choose Different Tool
          </Button>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <ToolComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hidden file input for click-to-browse */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInputChange}
        accept=".pdf,.doc,.docx,image/*"
        multiple
        className="hidden"
      />
      
      {/* Universal Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-300 cursor-pointer
          ${isDragging 
            ? 'border-primary bg-primary/10 scale-[1.02]' 
            : 'border-border hover:border-primary/50 hover:bg-secondary/30'
          }
        `}
      >
        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white ${isDragging ? 'animate-bounce' : ''}`}>
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {isDragging ? "Drop your file here!" : "Drop any file to get started"}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Drop a PDF to merge, compress, or split. Drop Word documents to convert to PDF. Drop images to create a PDF.
            </p>
            <Button variant="outline" className="pointer-events-none">
              <Plus className="w-4 h-4 mr-2" />
              Or click to browse files
            </Button>
          </div>
        </div>
      </div>
      
      {/* Video Ad - Below Upload Area */}
      <AdVideo className="mt-4" />

      {/* Tool Selection Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Or select a tool:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {pdfTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className="group bg-card border border-border rounded-xl p-4 text-left hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-3`}>
                {tool.icon}
              </div>
              <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                {tool.name}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {tool.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links to Individual Tools */}
      <div className="bg-secondary/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <div className="flex flex-wrap gap-2">
          {pdfTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/${tool.slug}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full text-sm hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              {tool.name}
              <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversalPDFTools;
