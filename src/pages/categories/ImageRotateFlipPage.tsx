import { useState } from "react";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalRotateFlip from "@/components/UniversalRotateFlip";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

type TransformMode = "rotate-90" | "rotate-180" | "rotate-270" | "custom" | "flip-h" | "flip-v";

const ImageRotateFlipPage = () => {
  const category = getCategoryBySlug("image-rotate-flip")!;
  const seoContent = getCategorySEOContent("image-rotate-flip")!;
  const [selectedMode, setSelectedMode] = useState<TransformMode>("rotate-90");
  const [key, setKey] = useState(0);

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalRotateFlip key={key} initialMode={selectedMode} />
    </CategoryPageLayout>
  );
};

export default ImageRotateFlipPage;
