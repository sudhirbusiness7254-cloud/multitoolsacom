import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-loaded routes — keeps initial JS small for mobile performance.
const TagExtractorPage = lazy(() => import("./pages/TagExtractorPage"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ImageToolsPage = lazy(() => import("./pages/ImageToolsPage"));
const ImageConverterPage = lazy(() => import("./pages/ImageConverterPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AllToolsPage = lazy(() => import("./pages/AllToolsPage"));
const DynamicToolPage = lazy(() => import("./pages/tools/DynamicToolPage"));

// Category Pages
const ImageCompressionPage = lazy(() => import("./pages/categories/ImageCompressionPage"));
const ImageToDocumentPage = lazy(() => import("./pages/categories/ImageToDocumentPage"));
const ImageResizePage = lazy(() => import("./pages/categories/ImageResizePage"));
const ImageCropPage = lazy(() => import("./pages/categories/ImageCropPage"));
const ImageRotateFlipPage = lazy(() => import("./pages/categories/ImageRotateFlipPage"));
const FormatUtilitiesPage = lazy(() => import("./pages/categories/FormatUtilitiesPage"));
const PhotoFiltersPage = lazy(() => import("./pages/categories/PhotoFiltersPage"));
const WatermarkToolsPage = lazy(() => import("./pages/categories/WatermarkToolsPage"));
const ImageCombinePage = lazy(() => import("./pages/categories/ImageCombinePage"));
const ImageMetadataPage = lazy(() => import("./pages/categories/ImageMetadataPage"));
const ImageOptimizationPage = lazy(() => import("./pages/categories/ImageOptimizationPage"));
const ImageDrawingPage = lazy(() => import("./pages/categories/ImageDrawingPage"));
const ImageSecurityPage = lazy(() => import("./pages/categories/ImageSecurityPage"));
const ImageQRPage = lazy(() => import("./pages/categories/ImageQRPage"));
const PDFToolsPage = lazy(() => import("./pages/categories/PDFToolsPage"));
const SEOToolsPage = lazy(() => import("./pages/categories/SEOToolsPage"));

const ImageEditorPage = lazy(() => import("./pages/ImageEditorPage"));
const PDFToolPage = lazy(() => import("./pages/tools/PDFToolPage"));
const SupportChat = lazy(() => import("./components/SupportChat"));

// Educational & Trust Pages
const HowToolsWorkPage = lazy(() => import("./pages/HowToolsWorkPage"));
const AdvertiserDisclosurePage = lazy(() => import("./pages/AdvertiserDisclosurePage"));
const ImageFormatsGuidePage = lazy(() => import("./pages/ImageFormatsGuidePage"));
const DMCAPage = lazy(() => import("./pages/DMCAPage"));
const DisclaimerPage = lazy(() => import("./pages/DisclaimerPage"));
const AdPlacementGuidePage = lazy(() => import("./pages/AdPlacementGuidePage"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div
    role="status"
    aria-label="Loading page"
    className="min-h-[60vh] flex items-center justify-center"
  >
    <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<RouteFallback />}>
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
              <Route path="/seo-tools" element={<SEOToolsPage />} />

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
          </Suspense>
          <Suspense fallback={null}>
            <SupportChat />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
