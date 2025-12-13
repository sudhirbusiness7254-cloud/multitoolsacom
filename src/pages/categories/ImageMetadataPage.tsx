import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageMetadata from "@/components/UniversalImageMetadata";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const ImageMetadataPage = () => {
  const category = getCategoryBySlug("image-metadata")!;
  const seoContent = getCategorySEOContent("image-metadata")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalImageMetadata />
    </CategoryPageLayout>
  );
};

export default ImageMetadataPage;
