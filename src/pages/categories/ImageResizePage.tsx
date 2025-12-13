import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageResizer from "@/components/UniversalImageResizer";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const ImageResizePage = () => {
  const category = getCategoryBySlug("image-resize")!;
  const seoContent = getCategorySEOContent("image-resize")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalImageResizer />
    </CategoryPageLayout>
  );
};

export default ImageResizePage;
