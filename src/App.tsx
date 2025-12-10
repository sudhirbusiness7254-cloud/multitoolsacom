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
            
            {/* Image Converter Tool */}
            <Route path="/image-converter" element={<ImageConverterPage />} />
            <Route path="/image-converter/:conversion" element={<ImageConverterPage />} />
            
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
