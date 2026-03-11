import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import TagExtractorPage from "./pages/TagExtractorPage";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQPage from "./pages/FAQPage";
import ImageToolsPage from "./pages/ImageToolsPage";
import ImageConverterPage from "./pages/ImageConverterPage";
import NotFound from "./pages/NotFound";
import AllToolsPage from "./pages/AllToolsPage";
import DynamicToolPage from "./pages/tools/DynamicToolPage";

// Category Pages
import ImageCompressionPage from "./pages/categories/ImageCompressionPage";
import ImageToDocumentPage from "./pages/categories/ImageToDocumentPage";
import ImageResizePage from "./pages/categories/ImageResizePage";
import ImageCropPage from "./pages/categories/ImageCropPage";
import ImageRotateFlipPage from "./pages/categories/ImageRotateFlipPage";
import FormatUtilitiesPage from "./pages/categories/FormatUtilitiesPage";
import PhotoFiltersPage from "./pages/categories/PhotoFiltersPage";
import WatermarkToolsPage from "./pages/categories/WatermarkToolsPage";
import ImageCombinePage from "./pages/categories/ImageCombinePage";
import ImageMetadataPage from "./pages/categories/ImageMetadataPage";
import ImageOptimizationPage from "./pages/categories/ImageOptimizationPage";
import ImageDrawingPage from "./pages/categories/ImageDrawingPage";
import ImageSecurityPage from "./pages/categories/ImageSecurityPage";
import ImageQRPage from "./pages/categories/ImageQRPage";
import PDFToolsPage from "./pages/categories/PDFToolsPage";
import SEOToolsPage from "./pages/categories/SEOToolsPage";

import ImageEditorPage from "./pages/ImageEditorPage";
import PDFToolPage from "./pages/tools/PDFToolPage";
import SupportChat from "./components/SupportChat";


// Educational & Trust Pages
import HowToolsWorkPage from "./pages/HowToolsWorkPage";
import AdvertiserDisclosurePage from "./pages/AdvertiserDisclosurePage";
import ImageFormatsGuidePage from "./pages/ImageFormatsGuidePage";
import DMCAPage from "./pages/DMCAPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import AdPlacementGuidePage from "./pages/AdPlacementGuidePage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/all-tools" element={<AllToolsPage />} />
            <Route path="/tag-extractor" element={<TagExtractorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/how-tools-work" element={<HowToolsWorkPage />} />
            <Route path="/advertiser-disclosure" element={<AdvertiserDisclosurePage />} />
            <Route path="/image-formats-guide" element={<ImageFormatsGuidePage />} />
            <Route path="/ad-placement-guide" element={<AdPlacementGuidePage />} />
            <Route path="/dmca" element={<DMCAPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            
            {/* Image Tools Landing Page */}
            <Route path="/image-tools" element={<ImageToolsPage />} />
            <Route path="/image-editor" element={<ImageEditorPage />} />
            <Route path="/image-converter" element={<ImageConverterPage />} />
            
            {/* Category Pages */}
            <Route path="/image-compression" element={<ImageCompressionPage />} />
            <Route path="/image-to-document" element={<ImageToDocumentPage />} />
            <Route path="/image-resize" element={<ImageResizePage />} />
            <Route path="/image-crop" element={<ImageCropPage />} />
            <Route path="/image-rotate-flip" element={<ImageRotateFlipPage />} />
            <Route path="/image-format-utilities" element={<FormatUtilitiesPage />} />
            <Route path="/photo-filters" element={<PhotoFiltersPage />} />
            <Route path="/watermark-tools" element={<WatermarkToolsPage />} />
            <Route path="/image-combine" element={<ImageCombinePage />} />
            <Route path="/image-metadata" element={<ImageMetadataPage />} />
            <Route path="/image-optimization" element={<ImageOptimizationPage />} />
            <Route path="/image-drawing" element={<ImageDrawingPage />} />
            <Route path="/image-security" element={<ImageSecurityPage />} />
            <Route path="/image-qr" element={<ImageQRPage />} />
            <Route path="/pdf-tools" element={<PDFToolsPage />} />
            
            {/* PDF Tool Pages */}
            <Route path="/merge-pdf" element={<PDFToolPage />} />
            <Route path="/compress-pdf" element={<PDFToolPage />} />
            <Route path="/word-to-pdf" element={<PDFToolPage />} />
            <Route path="/image-to-pdf" element={<PDFToolPage />} />
            <Route path="/split-pdf" element={<PDFToolPage />} />
            
            {/* Dynamic Tool Pages - SEO optimized individual tool pages */}
            <Route path="/:toolSlug" element={<DynamicToolPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SupportChat />
          
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
