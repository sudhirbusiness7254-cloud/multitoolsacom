import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalWatermark from "@/components/UniversalWatermark";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const WatermarkToolsPage = () => {
  const category = getCategoryBySlug("watermark-tools")!;
  const seoContent = getCategorySEOContent("watermark-tools")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalWatermark />
    </CategoryPageLayout>
  );
};

export default WatermarkToolsPage;
