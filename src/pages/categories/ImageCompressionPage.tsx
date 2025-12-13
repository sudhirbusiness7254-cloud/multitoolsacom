import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageCompressor from "@/components/UniversalImageCompressor";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const ImageCompressionPage = () => {
  const category = getCategoryBySlug("image-compression")!;
  const seoContent = getCategorySEOContent("image-compression")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalImageCompressor />
    </CategoryPageLayout>
  );
};

export default ImageCompressionPage;
