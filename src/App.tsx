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
import ImageToolsPage from "./pages/ImageToolsPage";
import ImageConverterPage from "./pages/ImageConverterPage";
import NotFound from "./pages/NotFound";

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

// Compression Tool Pages
import JpegCompressorPage from "./pages/tools/JpegCompressorPage";
import PngCompressorPage from "./pages/tools/PngCompressorPage";
import WebpCompressorPage from "./pages/tools/WebpCompressorPage";
import GifCompressorPage from "./pages/tools/GifCompressorPage";
import TiffCompressorPage from "./pages/tools/TiffCompressorPage";

// Resize Tool Pages
import ExactResizePage from "./pages/tools/ExactResizePage";
import PercentageResizePage from "./pages/tools/PercentageResizePage";
import FitToWidthPage from "./pages/tools/FitToWidthPage";
import FitToHeightPage from "./pages/tools/FitToHeightPage";
import FitToBoxPage from "./pages/tools/FitToBoxPage";
import QualityResizePage from "./pages/tools/QualityResizePage";

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
            <Route path="/tag-extractor" element={<TagExtractorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Image Tools Landing Page */}
            <Route path="/image-tools" element={<ImageToolsPage />} />
            <Route path="/image-converter" element={<ImageConverterPage />} />
            <Route path="/image-converter/:conversion" element={<ImageConverterPage />} />
            
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
            
            {/* Compression Tools */}
            <Route path="/jpeg-compressor" element={<JpegCompressorPage />} />
            <Route path="/png-compressor" element={<PngCompressorPage />} />
            <Route path="/webp-compressor" element={<WebpCompressorPage />} />
            <Route path="/gif-compressor" element={<GifCompressorPage />} />
            <Route path="/tiff-compressor" element={<TiffCompressorPage />} />
            
            {/* Resize Tools */}
            <Route path="/exact-resize" element={<ExactResizePage />} />
            <Route path="/percentage-resize" element={<PercentageResizePage />} />
            <Route path="/fit-to-width" element={<FitToWidthPage />} />
            <Route path="/fit-to-height" element={<FitToHeightPage />} />
            <Route path="/fit-to-box" element={<FitToBoxPage />} />
            <Route path="/resize-without-quality-loss" element={<QualityResizePage />} />
            
            {/* SEO-friendly direct conversion routes */}
            <Route path="/jpg-to-png" element={<ImageConverterPage />} />
            <Route path="/png-to-jpg" element={<ImageConverterPage />} />
            <Route path="/webp-to-jpg" element={<ImageConverterPage />} />
            <Route path="/webp-to-png" element={<ImageConverterPage />} />
            <Route path="/jpg-to-webp" element={<ImageConverterPage />} />
            <Route path="/png-to-webp" element={<ImageConverterPage />} />
            <Route path="/gif-to-png" element={<ImageConverterPage />} />
            <Route path="/gif-to-jpg" element={<ImageConverterPage />} />
            <Route path="/heic-to-jpg" element={<ImageConverterPage />} />
            <Route path="/heic-to-png" element={<ImageConverterPage />} />
            <Route path="/svg-to-png" element={<ImageConverterPage />} />
            <Route path="/svg-to-jpg" element={<ImageConverterPage />} />
            <Route path="/bmp-to-jpg" element={<ImageConverterPage />} />
            <Route path="/bmp-to-png" element={<ImageConverterPage />} />
            <Route path="/tiff-to-jpg" element={<ImageConverterPage />} />
            <Route path="/tiff-to-png" element={<ImageConverterPage />} />
            <Route path="/raw-to-jpg" element={<ImageConverterPage />} />
            <Route path="/raw-to-png" element={<ImageConverterPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
