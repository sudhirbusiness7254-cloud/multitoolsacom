import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageDrawing from "@/components/UniversalImageDrawing";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const ImageDrawingPage = () => {
  const category = getCategoryBySlug("image-drawing")!;
  const seoContent = getCategorySEOContent("image-drawing")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalImageDrawing />
    </CategoryPageLayout>
  );
};

export default ImageDrawingPage;
