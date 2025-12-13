import { useState } from "react";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageCropper from "@/components/UniversalImageCropper";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

type CropMode = "free" | "1:1" | "4:3" | "16:9" | "3:2" | "9:16" | "circle";

const ImageCropPage = () => {
  const category = getCategoryBySlug("image-crop")!;
  const seoContent = getCategorySEOContent("image-crop")!;
  const [selectedMode, setSelectedMode] = useState<CropMode>("free");
  const [key, setKey] = useState(0);

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalImageCropper key={key} initialMode={selectedMode} />
    </CategoryPageLayout>
  );
};

export default ImageCropPage;
