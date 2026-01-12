// Internal Linking Strategy Data
// Maps blog posts to relevant tools and vice versa for SEO and user experience

export interface RelatedTool {
  slug: string;
  name: string;
  description: string;
}

export interface RelatedArticle {
  id: string;
  title: string;
  excerpt: string;
  relevance: string;
}

// Blog post to tool mappings
export const blogToToolsMap: Record<string, RelatedTool[]> = {
  "complete-guide-image-compression": [
    { slug: "jpeg-compressor", name: "JPEG Compressor", description: "Compress JPEG images with adjustable quality" },
    { slug: "png-compressor", name: "PNG Compressor", description: "Reduce PNG file sizes without quality loss" },
    { slug: "webp-compressor", name: "WebP Compressor", description: "Optimize WebP images for faster loading" },
    { slug: "gif-compressor", name: "GIF Compressor", description: "Compress animated and static GIFs" },
    { slug: "reduce-file-size", name: "Reduce File Size", description: "General-purpose image size reduction" },
  ],
  "image-formats-explained": [
    { slug: "jpg-to-png", name: "JPG to PNG", description: "Convert photos to lossless PNG format" },
    { slug: "png-to-jpg", name: "PNG to JPG", description: "Convert graphics to compressed JPEG" },
    { slug: "jpg-to-webp", name: "JPG to WebP", description: "Convert to modern WebP format" },
    { slug: "webp-to-jpg", name: "WebP to JPG", description: "Convert WebP for universal compatibility" },
    { slug: "gif-to-png", name: "GIF to PNG", description: "Convert GIF frames to static PNG" },
  ],
  "optimize-images-website-speed": [
    { slug: "jpeg-compressor", name: "JPEG Compressor", description: "Reduce photo file sizes for web" },
    { slug: "jpg-to-webp", name: "JPG to WebP", description: "Convert to faster-loading WebP" },
    { slug: "exact-resize", name: "Exact Resize", description: "Resize images to exact dimensions" },
    { slug: "optimize-for-web", name: "Optimize for Web", description: "Automatically optimize for web use" },
    { slug: "reduce-resolution", name: "Reduce Resolution", description: "Lower resolution for faster loading" },
  ],
  "watermark-images-protect-photos": [
    { slug: "text-watermark", name: "Text Watermark", description: "Add custom text watermarks" },
    { slug: "image-watermark", name: "Image Watermark", description: "Overlay logo watermarks" },
    { slug: "opacity-settings", name: "Opacity Settings", description: "Control watermark transparency" },
    { slug: "position-settings", name: "Position Settings", description: "Place watermarks strategically" },
  ],
  "resize-images-social-media": [
    { slug: "exact-resize", name: "Exact Resize", description: "Resize to specific platform dimensions" },
    { slug: "aspect-ratio-crop", name: "Aspect Ratio Crop", description: "Crop to social media ratios" },
    { slug: "fit-to-box", name: "Fit to Box", description: "Fit images within size constraints" },
    { slug: "percentage-resize", name: "Percentage Resize", description: "Scale images proportionally" },
  ],
  "remove-image-metadata-privacy": [
    { slug: "remove-exif", name: "Remove EXIF", description: "Strip metadata from images" },
    { slug: "view-exif", name: "View EXIF", description: "Inspect image metadata" },
    { slug: "edit-exif-datetime", name: "Edit EXIF DateTime", description: "Modify image date/time" },
    { slug: "manual-face-blur", name: "Face Blur", description: "Blur faces for privacy" },
  ],
  "heic-to-jpg-conversion-guide": [
    { slug: "heic-to-jpg", name: "HEIC to JPG", description: "Convert iPhone photos to JPEG" },
    { slug: "heic-to-png", name: "HEIC to PNG", description: "Convert HEIC to lossless PNG" },
    { slug: "jpeg-compressor", name: "JPEG Compressor", description: "Compress converted photos" },
  ],
  "batch-image-processing-workflow": [
    { slug: "jpeg-compressor", name: "JPEG Compressor", description: "Batch compress multiple images" },
    { slug: "exact-resize", name: "Exact Resize", description: "Resize multiple images at once" },
    { slug: "text-watermark", name: "Text Watermark", description: "Watermark batches of images" },
    { slug: "jpg-to-webp", name: "JPG to WebP", description: "Batch convert to WebP" },
  ],
  "pdf-image-tools-complete-guide": [
    { slug: "merge-pdf", name: "Merge PDF", description: "Combine multiple PDFs" },
    { slug: "compress-pdf", name: "Compress PDF", description: "Reduce PDF file sizes" },
    { slug: "image-to-pdf", name: "Image to PDF", description: "Convert images to PDF" },
    { slug: "split-pdf", name: "Split PDF", description: "Extract pages from PDFs" },
    { slug: "word-to-pdf", name: "Word to PDF", description: "Convert documents to PDF" },
  ],
  "image-cropping-techniques": [
    { slug: "manual-crop", name: "Manual Crop", description: "Free-form image cropping" },
    { slug: "aspect-ratio-crop", name: "Aspect Ratio Crop", description: "Crop with fixed ratios" },
    { slug: "circle-crop", name: "Circle Crop", description: "Create circular images" },
    { slug: "square-crop", name: "Square Crop", description: "Perfect square crops" },
    { slug: "free-selection-crop", name: "Free Selection", description: "Custom shape cropping" },
  ],
  "transparent-background-images": [
    { slug: "add-transparency", name: "Add Transparency", description: "Make backgrounds transparent" },
    { slug: "remove-transparency", name: "Remove Transparency", description: "Replace transparent areas" },
    { slug: "jpg-to-png", name: "JPG to PNG", description: "Convert for transparency support" },
    { slug: "flatten-image", name: "Flatten Image", description: "Flatten transparent layers" },
  ],
  "qr-code-image-integration": [
    { slug: "image-to-qr-code", name: "Image to QR Code", description: "Generate QR codes from URLs" },
    { slug: "qr-code-to-image", name: "QR Code to Image", description: "Decode QR codes" },
  ],
  "photo-filters-effects-guide": [
    { slug: "brightness-adjust", name: "Brightness", description: "Adjust image brightness" },
    { slug: "contrast-adjust", name: "Contrast", description: "Enhance image contrast" },
    { slug: "saturation-adjust", name: "Saturation", description: "Modify color intensity" },
    { slug: "sepia-effect", name: "Sepia Effect", description: "Apply vintage sepia tone" },
    { slug: "blur-filter", name: "Blur Filter", description: "Add soft blur effects" },
    { slug: "sharpen-filter", name: "Sharpen", description: "Enhance image sharpness" },
  ],
  "ecommerce-product-image-optimization": [
    { slug: "jpeg-compressor", name: "JPEG Compressor", description: "Optimize product photos" },
    { slug: "exact-resize", name: "Exact Resize", description: "Standard product dimensions" },
    { slug: "remove-transparency", name: "White Background", description: "Add white backgrounds" },
    { slug: "text-watermark", name: "Text Watermark", description: "Brand your product images" },
  ],
  "image-security-encryption-guide": [
    { slug: "image-encrypt", name: "Image Encrypt", description: "Password-protect images" },
    { slug: "image-decrypt", name: "Image Decrypt", description: "Unlock encrypted images" },
    { slug: "manual-face-blur", name: "Face Blur", description: "Anonymize faces" },
    { slug: "manual-pixel-blur", name: "Pixel Blur", description: "Blur sensitive areas" },
    { slug: "remove-exif", name: "Remove EXIF", description: "Strip location data" },
  ],
};

// Tool to blog post mappings (reverse mapping for tool pages)
export const toolToArticlesMap: Record<string, RelatedArticle[]> = {
  // Compression tools
  "jpeg-compressor": [
    { id: "complete-guide-image-compression", title: "Complete Guide to Image Compression", excerpt: "Master lossy and lossless compression techniques", relevance: "Core guide" },
    { id: "optimize-images-website-speed", title: "Optimize Images for Website Speed", excerpt: "Boost your site performance with optimized images", relevance: "Performance" },
    { id: "ecommerce-product-image-optimization", title: "E-commerce Product Image Optimization", excerpt: "Optimize product photos for conversions", relevance: "E-commerce" },
  ],
  "png-compressor": [
    { id: "complete-guide-image-compression", title: "Complete Guide to Image Compression", excerpt: "Learn about lossless PNG compression", relevance: "Core guide" },
    { id: "transparent-background-images", title: "Creating Transparent Backgrounds", excerpt: "Master PNG transparency techniques", relevance: "Transparency" },
  ],
  "webp-compressor": [
    { id: "image-formats-explained", title: "Image Formats Explained", excerpt: "Understand WebP advantages over other formats", relevance: "Format guide" },
    { id: "optimize-images-website-speed", title: "Optimize Images for Website Speed", excerpt: "Use WebP for maximum performance", relevance: "Performance" },
  ],
  
  // Conversion tools
  "jpg-to-png": [
    { id: "image-formats-explained", title: "Image Formats Explained: JPEG vs PNG", excerpt: "When to choose PNG over JPEG", relevance: "Format guide" },
    { id: "transparent-background-images", title: "Creating Transparent Backgrounds", excerpt: "Convert to PNG for transparency", relevance: "Transparency" },
  ],
  "png-to-jpg": [
    { id: "image-formats-explained", title: "Image Formats Explained", excerpt: "When JPEG is better than PNG", relevance: "Format guide" },
    { id: "complete-guide-image-compression", title: "Complete Guide to Image Compression", excerpt: "Reduce file sizes by converting to JPEG", relevance: "Compression" },
  ],
  "jpg-to-webp": [
    { id: "image-formats-explained", title: "Image Formats Explained", excerpt: "Why WebP is the future of web images", relevance: "Format guide" },
    { id: "optimize-images-website-speed", title: "Optimize Images for Website Speed", excerpt: "WebP for faster loading", relevance: "Performance" },
  ],
  "heic-to-jpg": [
    { id: "heic-to-jpg-conversion-guide", title: "HEIC to JPG Conversion Guide", excerpt: "Complete guide for iPhone photo conversion", relevance: "Primary guide" },
    { id: "image-formats-explained", title: "Image Formats Explained", excerpt: "Understanding HEIC format", relevance: "Format basics" },
  ],
  "heic-to-png": [
    { id: "heic-to-jpg-conversion-guide", title: "HEIC to JPG Conversion Guide", excerpt: "Convert iPhone photos to any format", relevance: "Primary guide" },
  ],
  
  // Resize tools
  "exact-resize": [
    { id: "resize-images-social-media", title: "Image Sizing for Social Media", excerpt: "Perfect dimensions for every platform", relevance: "Social media" },
    { id: "ecommerce-product-image-optimization", title: "E-commerce Product Images", excerpt: "Standard product image sizes", relevance: "E-commerce" },
    { id: "batch-image-processing-workflow", title: "Batch Image Processing", excerpt: "Resize multiple images efficiently", relevance: "Workflow" },
  ],
  "aspect-ratio-crop": [
    { id: "image-cropping-techniques", title: "Image Cropping Mastery", excerpt: "Professional cropping techniques", relevance: "Core guide" },
    { id: "resize-images-social-media", title: "Image Sizing for Social Media", excerpt: "Platform-specific aspect ratios", relevance: "Social media" },
  ],
  
  // Crop tools
  "manual-crop": [
    { id: "image-cropping-techniques", title: "Image Cropping Mastery", excerpt: "Transform photos with professional cropping", relevance: "Primary guide" },
  ],
  "circle-crop": [
    { id: "image-cropping-techniques", title: "Image Cropping Mastery", excerpt: "Create perfect circular profile images", relevance: "Primary guide" },
  ],
  
  // Watermark tools
  "text-watermark": [
    { id: "watermark-images-protect-photos", title: "How to Watermark Your Images", excerpt: "Protect and brand your photos", relevance: "Primary guide" },
    { id: "ecommerce-product-image-optimization", title: "E-commerce Image Optimization", excerpt: "Brand your product images", relevance: "E-commerce" },
  ],
  "image-watermark": [
    { id: "watermark-images-protect-photos", title: "How to Watermark Your Images", excerpt: "Add logo watermarks professionally", relevance: "Primary guide" },
  ],
  
  // Metadata tools
  "remove-exif": [
    { id: "remove-image-metadata-privacy", title: "Image Metadata and Privacy", excerpt: "Protect your privacy by removing EXIF", relevance: "Primary guide" },
    { id: "image-security-encryption-guide", title: "Image Security Guide", excerpt: "Complete privacy protection", relevance: "Security" },
  ],
  "view-exif": [
    { id: "remove-image-metadata-privacy", title: "Image Metadata and Privacy", excerpt: "Understand what data your photos contain", relevance: "Primary guide" },
  ],
  
  // PDF tools
  "merge-pdf": [
    { id: "pdf-image-tools-complete-guide", title: "Working with PDFs and Images", excerpt: "Master PDF workflows", relevance: "Primary guide" },
  ],
  "compress-pdf": [
    { id: "pdf-image-tools-complete-guide", title: "Working with PDFs and Images", excerpt: "Reduce PDF file sizes efficiently", relevance: "Primary guide" },
    { id: "complete-guide-image-compression", title: "Complete Guide to Compression", excerpt: "Compression principles for PDFs", relevance: "Compression" },
  ],
  "image-to-pdf": [
    { id: "pdf-image-tools-complete-guide", title: "Working with PDFs and Images", excerpt: "Convert images to professional PDFs", relevance: "Primary guide" },
  ],
  
  // Filter tools
  "brightness-adjust": [
    { id: "photo-filters-effects-guide", title: "Photo Filters and Effects", excerpt: "Master brightness adjustments", relevance: "Primary guide" },
  ],
  "contrast-adjust": [
    { id: "photo-filters-effects-guide", title: "Photo Filters and Effects", excerpt: "Enhance image contrast", relevance: "Primary guide" },
  ],
  "sepia-effect": [
    { id: "photo-filters-effects-guide", title: "Photo Filters and Effects", excerpt: "Apply vintage effects", relevance: "Primary guide" },
  ],
  
  // QR tools
  "image-to-qr-code": [
    { id: "qr-code-image-integration", title: "QR Codes and Images", excerpt: "Create beautiful, scannable QR codes", relevance: "Primary guide" },
  ],
  
  // Security tools
  "image-encrypt": [
    { id: "image-security-encryption-guide", title: "Image Security Guide", excerpt: "Password-protect sensitive images", relevance: "Primary guide" },
  ],
  "manual-face-blur": [
    { id: "image-security-encryption-guide", title: "Image Security Guide", excerpt: "Anonymize faces for privacy", relevance: "Primary guide" },
    { id: "remove-image-metadata-privacy", title: "Image Metadata and Privacy", excerpt: "Complete privacy protection", relevance: "Privacy" },
  ],
  
  // Transparency tools
  "add-transparency": [
    { id: "transparent-background-images", title: "Creating Transparent Backgrounds", excerpt: "Make backgrounds transparent", relevance: "Primary guide" },
  ],
  "remove-transparency": [
    { id: "transparent-background-images", title: "Creating Transparent Backgrounds", excerpt: "Replace transparent backgrounds", relevance: "Primary guide" },
    { id: "ecommerce-product-image-optimization", title: "E-commerce Product Images", excerpt: "Add white backgrounds to products", relevance: "E-commerce" },
  ],
};

// Category to blog post mappings
export const categoryToArticlesMap: Record<string, RelatedArticle[]> = {
  "image-compression": [
    { id: "complete-guide-image-compression", title: "Complete Guide to Image Compression", excerpt: "Master compression techniques", relevance: "Essential reading" },
    { id: "optimize-images-website-speed", title: "Optimize Images for Website Speed", excerpt: "Speed up your website", relevance: "Performance" },
  ],
  "image-converter": [
    { id: "image-formats-explained", title: "Image Formats Explained", excerpt: "Choose the right format", relevance: "Essential reading" },
    { id: "heic-to-jpg-conversion-guide", title: "HEIC to JPG Conversion", excerpt: "iPhone photo conversion", relevance: "iPhone users" },
  ],
  "image-resize": [
    { id: "resize-images-social-media", title: "Image Sizing for Social Media", excerpt: "Perfect dimensions for platforms", relevance: "Essential reading" },
  ],
  "image-crop": [
    { id: "image-cropping-techniques", title: "Image Cropping Mastery", excerpt: "Professional cropping techniques", relevance: "Essential reading" },
  ],
  "watermark-tools": [
    { id: "watermark-images-protect-photos", title: "How to Watermark Your Images", excerpt: "Protect your creative work", relevance: "Essential reading" },
  ],
  "image-metadata": [
    { id: "remove-image-metadata-privacy", title: "Image Metadata and Privacy", excerpt: "Protect your location data", relevance: "Essential reading" },
  ],
  "pdf-tools": [
    { id: "pdf-image-tools-complete-guide", title: "Working with PDFs and Images", excerpt: "Master PDF workflows", relevance: "Essential reading" },
  ],
  "photo-filters": [
    { id: "photo-filters-effects-guide", title: "Photo Filters and Effects", excerpt: "Creative transformations", relevance: "Essential reading" },
  ],
  "image-security": [
    { id: "image-security-encryption-guide", title: "Image Security Guide", excerpt: "Encrypt and protect images", relevance: "Essential reading" },
    { id: "remove-image-metadata-privacy", title: "Image Metadata and Privacy", excerpt: "Privacy protection", relevance: "Privacy" },
  ],
  "image-qr": [
    { id: "qr-code-image-integration", title: "QR Codes and Images", excerpt: "Design scannable QR codes", relevance: "Essential reading" },
  ],
  "image-format-utilities": [
    { id: "transparent-background-images", title: "Creating Transparent Backgrounds", excerpt: "Transparency techniques", relevance: "Essential reading" },
  ],
  "image-optimization": [
    { id: "optimize-images-website-speed", title: "Optimize for Website Speed", excerpt: "Performance optimization", relevance: "Essential reading" },
    { id: "ecommerce-product-image-optimization", title: "E-commerce Image Optimization", excerpt: "Product photo optimization", relevance: "E-commerce" },
  ],
};

// Helper function to get related tools for a blog post
export const getRelatedToolsForBlog = (blogId: string): RelatedTool[] => {
  return blogToToolsMap[blogId] || [];
};

// Helper function to get related articles for a tool
export const getRelatedArticlesForTool = (toolSlug: string): RelatedArticle[] => {
  return toolToArticlesMap[toolSlug] || [];
};

// Helper function to get related articles for a category
export const getRelatedArticlesForCategory = (categorySlug: string): RelatedArticle[] => {
  return categoryToArticlesMap[categorySlug] || [];
};
