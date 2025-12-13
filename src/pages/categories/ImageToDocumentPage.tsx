import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalDocumentConverter from "@/components/UniversalDocumentConverter";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const ImageToDocumentPage = () => {
  const category = getCategoryBySlug("image-to-document")!;
  const seoContent = getCategorySEOContent("image-to-document")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalDocumentConverter />
    </CategoryPageLayout>
  );
};

export default ImageToDocumentPage;
