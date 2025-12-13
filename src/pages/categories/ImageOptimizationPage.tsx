import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageOptimization from "@/components/UniversalImageOptimization";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const ImageOptimizationPage = () => {
  const category = getCategoryBySlug("image-optimization")!;
  const seoContent = getCategorySEOContent("image-optimization")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalImageOptimization />
    </CategoryPageLayout>
  );
};

export default ImageOptimizationPage;
