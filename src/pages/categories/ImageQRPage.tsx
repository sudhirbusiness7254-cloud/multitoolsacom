import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalQRTools from "@/components/UniversalQRTools";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const ImageQRPage = () => {
  const category = getCategoryBySlug("image-qr")!;
  const seoContent = getCategorySEOContent("image-qr")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalQRTools />
    </CategoryPageLayout>
  );
};

export default ImageQRPage;
