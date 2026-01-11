import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageResizer from "@/components/UniversalImageResizer";
import BatchImageResizer from "@/components/BatchImageResizer";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Layers } from "lucide-react";

const ImageResizePage = () => {
  const [activeTab, setActiveTab] = useState("single");
  const category = getCategoryBySlug("image-resize")!;
  const seoContent = getCategorySEOContent("image-resize")!;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Resizer",
            "description": "Resize images online for free with multiple modes: exact dimensions, percentage, fit to width/height.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Exact dimension resizing",
              "Percentage-based scaling",
              "Fit to width/height",
              "Aspect ratio preservation",
              "Batch processing",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="single" className="gap-2">
              <Image className="w-4 h-4" />
              Single Image
            </TabsTrigger>
            <TabsTrigger value="batch" className="gap-2">
              <Layers className="w-4 h-4" />
              Batch Mode
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="mt-0">
            <UniversalImageResizer />
          </TabsContent>
          
          <TabsContent value="batch" className="mt-0">
            <BatchImageResizer />
          </TabsContent>
        </Tabs>
      </CategoryPageLayout>
    </>
  );
};

export default ImageResizePage;
