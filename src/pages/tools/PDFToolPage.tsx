import { useParams, Navigate } from "react-router-dom";
import SEOToolPage from "@/components/SEOToolPage";
import { getPDFToolSEO } from "@/data/pdfToolsSEOData";
import MergePDF from "@/components/pdf/MergePDF";
import CompressPDF from "@/components/pdf/CompressPDF";
import WordToPDF from "@/components/pdf/WordToPDF";
import ImageToPDFTool from "@/components/pdf/ImageToPDFTool";
import SplitPDF from "@/components/pdf/SplitPDF";

const pdfComponents: Record<string, React.ComponentType> = {
  "merge-pdf": MergePDF,
  "compress-pdf": CompressPDF,
  "word-to-pdf": WordToPDF,
  "image-to-pdf": ImageToPDFTool,
  "split-pdf": SplitPDF,
};

const PDFToolPage = () => {
  const { toolSlug } = useParams<{ toolSlug: string }>();
  
  if (!toolSlug) return <Navigate to="/pdf-tools" replace />;
  
  const seoContent = getPDFToolSEO(toolSlug);
  const ToolComponent = pdfComponents[toolSlug];
  
  if (!seoContent || !ToolComponent) return null;
  
  return (
    <SEOToolPage seoContent={seoContent}>
      <ToolComponent />
    </SEOToolPage>
  );
};

export default PDFToolPage;
