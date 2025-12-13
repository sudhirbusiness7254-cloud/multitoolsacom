import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalPhotoFilters from "@/components/UniversalPhotoFilters";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

const PhotoFiltersPage = () => {
  const category = getCategoryBySlug("photo-filters")!;
  const seoContent = getCategorySEOContent("photo-filters")!;

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalPhotoFilters />
    </CategoryPageLayout>
  );
};

export default PhotoFiltersPage;
