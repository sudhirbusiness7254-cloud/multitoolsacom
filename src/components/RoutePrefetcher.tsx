import { useEffect } from "react";

/**
 * Prefetches all lazy-loaded route chunks during browser idle time.
 * Result: after first paint, navigating to any tool feels instant — no spinner.
 */
const RoutePrefetcher = () => {
  useEffect(() => {
    const prefetch = () => {
      // Category pages (most visited)
      import("@/pages/categories/ImageCompressionPage");
      import("@/pages/categories/ImageResizePage");
      import("@/pages/categories/ImageCropPage");
      import("@/pages/categories/ImageRotateFlipPage");
      import("@/pages/categories/FormatUtilitiesPage");
      import("@/pages/categories/PhotoFiltersPage");
      import("@/pages/categories/WatermarkToolsPage");
      import("@/pages/categories/ImageCombinePage");
      import("@/pages/categories/ImageMetadataPage");
      import("@/pages/categories/ImageOptimizationPage");
      import("@/pages/categories/ImageDrawingPage");
      import("@/pages/categories/ImageSecurityPage");
      import("@/pages/categories/ImageQRPage");
      import("@/pages/categories/PDFToolsPage");
      import("@/pages/categories/SEOToolsPage");
      import("@/pages/categories/ImageToDocumentPage");

      // Tool & landing pages
      import("@/pages/ImageToolsPage");
      import("@/pages/ImageConverterPage");
      import("@/pages/ImageEditorPage");
      import("@/pages/AllToolsPage");
      import("@/pages/tools/DynamicToolPage");
      import("@/pages/tools/PDFToolPage");

      // Content pages
      import("@/pages/Blog");
      import("@/pages/BlogPost");
      import("@/pages/FAQPage");
      import("@/pages/About");
      import("@/pages/Contact");
    };

    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(prefetch, { timeout: 2500 });
    } else {
      setTimeout(prefetch, 1500);
    }
  }, []);

  return null;
};

export default RoutePrefetcher;
