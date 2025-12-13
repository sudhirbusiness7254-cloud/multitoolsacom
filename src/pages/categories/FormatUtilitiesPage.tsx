import { useState } from "react";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalFormatUtility from "@/components/UniversalFormatUtility";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";

type UtilityMode = "grayscale" | "blackwhite" | "add-transparency" | "remove-transparency" | "invert" | "sepia";

const FormatUtilitiesPage = () => {
  const category = getCategoryBySlug("image-format-utilities")!;
  const seoContent = getCategorySEOContent("image-format-utilities")!;
  const [selectedMode, setSelectedMode] = useState<UtilityMode>("grayscale");
  const [key, setKey] = useState(0);

  return (
    <CategoryPageLayout category={category} seoContent={seoContent}>
      <UniversalFormatUtility key={key} initialMode={selectedMode} />
    </CategoryPageLayout>
  );
};

export default FormatUtilitiesPage;
