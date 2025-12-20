import { useState, useCallback } from "react";
import { FileText, Minimize2, FileUp, Image, Scissors, Upload, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import MergePDF from "./MergePDF";
import CompressPDF from "./CompressPDF";
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
  acceptedFiles: string;
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
    acceptedFiles: ".pdf",
    component: MergePDF
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    slug: "compress-pdf",
    description: "Reduce PDF file size",
    icon: <Minimize2 className="w-6 h-6" />,
    color: "from-orange-500 to-orange-600",
    acceptedFiles: ".pdf",
    component: CompressPDF
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    slug: "word-to-pdf",
    description: "Convert Word documents to PDF",
    icon: <FileUp className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    acceptedFiles: ".doc,.docx",
    component: WordToPDF
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    slug: "image-to-pdf",
    description: "Convert images to PDF",
    icon: <Image className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    acceptedFiles: "image/*",
    component: ImageToPDFTool
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    slug: "split-pdf",
    description: "Extract pages from PDF",
    icon: <Scissors className="w-6 h-6" />,
    color: "from-pink-500 to-pink-600",
    acceptedFiles: ".pdf",
    component: SplitPDF
  },
];

interface UniversalPDFToolsProps {
  defaultTool?: string;
}

const UniversalPDFTools = ({ defaultTool }: UniversalPDFToolsProps) => {
  const [selectedTool, setSelectedTool] = useState<string>(defaultTool || "");
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const file = files[0];
    const fileName = file.name.toLowerCase();
    
    // Auto-detect tool based on file type
    if (fileName.endsWith('.pdf')) {
      if (files.length > 1) {
        setSelectedTool("merge-pdf");
      } else {
        // Default to compress for single PDF
        setSelectedTool("compress-pdf");
      }
    } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      setSelectedTool("word-to-pdf");
    } else if (file.type.startsWith('image/')) {
      setSelectedTool("image-to-pdf");
    }
  }, []);

  const activeTool = pdfTools.find(t => t.id === selectedTool);

  if (selectedTool && activeTool) {
    const ToolComponent = activeTool.component;
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
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
        
        <ToolComponent />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Universal Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-300
          ${isDragging 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
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
            <p className="text-muted-foreground max-w-md mx-auto">
              Drop a PDF to merge, compress, or split. Drop Word documents to convert to PDF. Drop images to create a PDF.
            </p>
          </div>
        </div>
      </div>

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
