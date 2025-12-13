import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageSecurity from "@/components/UniversalImageSecurity";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const ImageSecurityPage = () => {
  const category = getCategoryBySlug("image-security")!;
  const seoContent = getCategorySEOContent("image-security")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalImageSecurity />
    </CategoryPageLayout>
  );
};

export default ImageSecurityPage;
