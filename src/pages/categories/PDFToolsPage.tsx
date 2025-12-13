import { getCategorySEOContent } from "@/data/categorySEOData";
import { getCategoryBySlug } from "@/data/toolsData";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import { Navigate } from "react-router-dom";

const PDFToolsPage = () => {
  const category = getCategoryBySlug("pdf-tools");
  const seoContent = getCategorySEOContent("pdf-tools");

  if (!category || !seoContent) {
    return <Navigate to="/404" replace />;
  }

  return <CategoryPageLayout category={category} seoContent={seoContent} />;
};

export default PDFToolsPage;
