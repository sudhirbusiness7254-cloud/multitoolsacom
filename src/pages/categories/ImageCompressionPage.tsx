import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageCompressor from "@/components/UniversalImageCompressor";
import BatchImageCompressor from "@/components/BatchImageCompressor";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Layers } from "lucide-react";

const ImageCompressionPage = () => {
  const category = getCategoryBySlug("image-compression")!;
  const seoContent = getCategorySEOContent("image-compression")!;
  const [activeTab, setActiveTab] = useState("single");

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Compressor",
            "description": "Compress JPEG, PNG, WebP, GIF, and TIFF images online for free. Reduce file size while maintaining quality.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "JPEG compression",
              "PNG compression", 
              "WebP compression",
              "Adjustable quality",
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
            <UniversalImageCompressor />
          </TabsContent>
          
          <TabsContent value="batch" className="mt-0">
            <BatchImageCompressor />
          </TabsContent>
        </Tabs>
      </CategoryPageLayout>
    </>
  );
};

export default ImageCompressionPage;
