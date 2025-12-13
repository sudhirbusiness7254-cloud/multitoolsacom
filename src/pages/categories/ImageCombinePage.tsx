import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageCombine from "@/components/UniversalImageCombine";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const ImageCombinePage = () => {
  const category = getCategoryBySlug("image-combine")!;
  const seoContent = getCategorySEOContent("image-combine")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalImageCombine />
    </CategoryPageLayout>
  );
};

export default ImageCombinePage;
