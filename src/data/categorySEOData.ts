// SEO content for all categories

export interface CategorySEOContent {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  shortDescription: string;
  longDescription: string;
  howToUse: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  gradientFrom: string;
  gradientTo: string;
}

export const categoriesSEOContent: Record<string, CategorySEOContent> = {
  "image-converter": {
    slug: "image-converter",
    name: "Image Converter",
    metaTitle: "Image Converter - Convert JPG, PNG, WebP, GIF Online Free",
    metaDescription: "Free online image converter. Convert between JPG, PNG, WebP, GIF, BMP, TIFF, SVG, HEIC and more. Fast, secure, no signup required.",
    h1: "Image Format Converter",
    shortDescription: "Convert images between all popular formats instantly",
    longDescription: "Our comprehensive image converter supports all major image formats including JPG, PNG, WebP, GIF, BMP, TIFF, SVG, HEIC, and RAW. Convert between any formats with perfect quality preservation. All processing happens locally in your browser for maximum privacy and speed.",
    howToUse: [
      "Upload your image by clicking or drag and drop",
      "Select the source format (auto-detected)",
      "Choose your desired output format",
      "Click Convert and download your converted image"
    ],
    benefits: [
      "Support for 20+ image formats",
      "Batch conversion capability",
      "Preserves image quality",
      "No file size limits",
      "Instant browser-based processing",
      "100% free with no watermarks"
    ],
    faqs: [
      { question: "Which image formats can I convert?", answer: "We support JPG, PNG, WebP, GIF, BMP, TIFF, SVG, HEIC, RAW, and many more formats. You can convert between any of these formats freely." },
      { question: "Will converting affect image quality?", answer: "Most conversions preserve quality. Converting from lossy (JPG) to lossless (PNG) preserves current quality. Converting from lossless to lossy may have minimal quality reduction." },
      { question: "Can I convert multiple images at once?", answer: "Yes, our converter supports batch processing for multiple images simultaneously." },
      { question: "Is my data secure?", answer: "Absolutely. All conversion happens in your browser - your files never leave your device." }
    ],
    gradientFrom: "#3B82F6",
    gradientTo: "#06B6D4"
  },
  "image-compression": {
    slug: "image-compression",
    name: "Image Compression",
    metaTitle: "Image Compressor - Compress JPEG, PNG, WebP Online Free",
    metaDescription: "Free online image compressor. Reduce file size by up to 90% without losing quality. Compress JPEG, PNG, WebP, GIF instantly.",
    h1: "Image Compressor",
    shortDescription: "Reduce image file sizes by up to 90% without quality loss",
    longDescription: "Our advanced image compression tools use intelligent algorithms to dramatically reduce file sizes while maintaining visual quality. Perfect for web optimization, faster uploads, and saving storage space. Supports JPEG, PNG, WebP, GIF, TIFF and more.",
    howToUse: [
      "Upload your image file",
      "Adjust the quality slider (70-85% recommended)",
      "Preview the compressed result",
      "Download your optimized image"
    ],
    benefits: [
      "Reduce file size by up to 90%",
      "Maintain visual quality",
      "Faster website loading times",
      "Save storage space",
      "Perfect for email attachments",
      "No quality loss at recommended settings"
    ],
    faqs: [
      { question: "How much can I compress without losing quality?", answer: "Most images can be compressed 50-70% with virtually no visible quality loss. The recommended quality setting of 70-85% provides excellent results." },
      { question: "Which format compresses best?", answer: "WebP offers the best compression for web use. JPEG compresses well for photographs. PNG is best for graphics with transparency." },
      { question: "Is compression reversible?", answer: "Lossy compression (JPEG, WebP) permanently removes data. Always keep original files as backup." },
      { question: "Are my images uploaded to a server?", answer: "No, all compression happens locally in your browser. Your images never leave your device." }
    ],
    gradientFrom: "#22C55E",
    gradientTo: "#10B981"
  },
  "image-to-document": {
    slug: "image-to-document",
    name: "Image to Document",
    metaTitle: "Image to PDF, DOCX, PPTX Converter - Free Online Tools",
    metaDescription: "Convert images to PDF, Word, PowerPoint, HTML, and Base64. Combine multiple images into documents. Free, fast, secure.",
    h1: "Image to Document Converter",
    shortDescription: "Transform images into professional documents",
    longDescription: "Convert your images into various document formats including PDF, DOCX, PPTX, HTML, and Base64. Combine multiple images into single documents, create presentations from photo collections, or embed images as Base64 for web development.",
    howToUse: [
      "Upload one or more images",
      "Select your desired document format",
      "Arrange and customize layout if needed",
      "Convert and download your document"
    ],
    benefits: [
      "Create professional PDF documents",
      "Generate Word documents with images",
      "Build PowerPoint presentations",
      "Embed images as Base64 code",
      "Combine multiple images into one document",
      "Universal document compatibility"
    ],
    faqs: [
      { question: "Can I combine multiple images into one PDF?", answer: "Yes, upload multiple images and they will be combined into a single PDF document in your preferred order." },
      { question: "What document formats are supported?", answer: "We support PDF, DOCX (Word), PPTX (PowerPoint), HTML, and Base64 encoding." },
      { question: "Will image quality be preserved?", answer: "Yes, our converters maintain original image quality in the output documents." },
      { question: "Can I choose page size and layout?", answer: "Yes, you can select page size, orientation, and how images are arranged on pages." }
    ],
    gradientFrom: "#EC4899",
    gradientTo: "#F97316"
  },
  "image-resize": {
    slug: "image-resize",
    name: "Image Resize",
    metaTitle: "Image Resizer - Resize Images Online Free | Exact Dimensions",
    metaDescription: "Free online image resizer. Resize to exact dimensions, percentage, or fit to width/height. Maintain aspect ratio. Fast and easy.",
    h1: "Image Resizer",
    shortDescription: "Resize images to any dimension with precision",
    longDescription: "Our image resizing tools give you complete control over image dimensions. Resize to exact pixels, scale by percentage, fit to specific width or height, or fit within a bounding box while maintaining aspect ratio. High-quality resampling ensures sharp results.",
    howToUse: [
      "Upload your image",
      "Choose resize method (exact, percentage, fit)",
      "Enter your desired dimensions",
      "Download your resized image"
    ],
    benefits: [
      "Precise dimension control",
      "Multiple resize methods",
      "Maintain aspect ratio option",
      "High-quality resampling",
      "Perfect for social media sizes",
      "Batch resize support"
    ],
    faqs: [
      { question: "Will resizing affect image quality?", answer: "Reducing size maintains quality. Enlarging may reduce sharpness. We use high-quality resampling algorithms for best results." },
      { question: "Can I maintain aspect ratio?", answer: "Yes, you can lock aspect ratio to prevent distortion when resizing." },
      { question: "What is the maximum size?", answer: "You can resize up to 10,000 x 10,000 pixels, though enlarging beyond original size may reduce quality." },
      { question: "Can I resize for social media?", answer: "Yes, use our exact resize tool to match specific platform requirements like Instagram, Facebook, or Twitter." }
    ],
    gradientFrom: "#00C6FF",
    gradientTo: "#0072FF"
  },
  "image-crop": {
    slug: "image-crop",
    name: "Image Crop",
    metaTitle: "Image Cropper - Crop Photos Online Free | Circle, Square, Custom",
    metaDescription: "Free online image cropper. Crop to any shape including circle, square, custom aspect ratios. Precise selection tools. No signup required.",
    h1: "Image Cropper",
    shortDescription: "Crop images with precision in any shape",
    longDescription: "Our cropping tools offer complete flexibility in how you trim your images. Use manual selection for custom crops, preset aspect ratios for social media, circle crop for profile pictures, or square crop for thumbnails. Real-time preview ensures perfect results.",
    howToUse: [
      "Upload your image",
      "Select crop mode (manual, aspect ratio, circle, square)",
      "Drag to position the crop area",
      "Apply crop and download"
    ],
    benefits: [
      "Multiple crop shapes available",
      "Preset aspect ratios",
      "Real-time preview",
      "Pixel-perfect precision",
      "No quality loss",
      "Circle crop for profile pictures"
    ],
    faqs: [
      { question: "Does cropping reduce quality?", answer: "No, cropping only removes unwanted areas without affecting the quality of the remaining image." },
      { question: "Can I crop to a specific aspect ratio?", answer: "Yes, we offer preset ratios like 16:9, 4:3, 1:1, and custom ratios for your specific needs." },
      { question: "How do I create a circular profile picture?", answer: "Use our Circle Crop tool - upload your image, position the circular selection, and download with transparent background." },
      { question: "Can I undo a crop?", answer: "You can reset and start over before downloading. Always keep your original file as backup." }
    ],
    gradientFrom: "#A855F7",
    gradientTo: "#EC4899"
  },
  "image-rotate-flip": {
    slug: "image-rotate-flip",
    name: "Rotate & Flip",
    metaTitle: "Rotate & Flip Images Online Free | 90°, 180°, Mirror",
    metaDescription: "Free online image rotation and flip tool. Rotate 90°, 180°, 270° or custom angles. Flip horizontal or vertical. Instant processing.",
    h1: "Rotate & Flip Images",
    shortDescription: "Rotate images to any angle or flip for mirror effects",
    longDescription: "Quickly rotate your images by preset angles (90°, 180°, 270°) or enter any custom rotation. Create mirror effects with horizontal and vertical flipping. Perfect for fixing orientation, creating reflections, or artistic compositions.",
    howToUse: [
      "Upload your image",
      "Choose rotation angle or flip direction",
      "Preview the result",
      "Download your transformed image"
    ],
    benefits: [
      "Quick preset rotations",
      "Custom angle rotation",
      "Horizontal and vertical flip",
      "Mirror effect creation",
      "Fix photo orientation",
      "Lossless transformation"
    ],
    faqs: [
      { question: "Does rotating reduce image quality?", answer: "90°, 180°, and 270° rotations are lossless. Custom angles may have minimal interpolation but quality is preserved." },
      { question: "What is the difference between flip and mirror?", answer: "Flip reverses the image (left becomes right). Mirror creates a reflection effect, often used for artistic purposes." },
      { question: "Can I rotate by any angle?", answer: "Yes, our custom rotate tool allows any angle from 0° to 360° with precision control." },
      { question: "Will the canvas size change?", answer: "For 90° and 270° rotations, width and height swap. For custom angles, canvas expands to fit the rotated image." }
    ],
    gradientFrom: "#F97316",
    gradientTo: "#EAB308"
  },
  "image-format-utilities": {
    slug: "image-format-utilities",
    name: "Format Utilities",
    metaTitle: "Image Format Utilities - Grayscale, Transparency, Color Tools",
    metaDescription: "Free image format utilities. Convert to grayscale, add/remove transparency, invert colors, apply sepia. Professional image processing online.",
    h1: "Image Format Utilities",
    shortDescription: "Professional tools for image format manipulation",
    longDescription: "Our format utility tools help you manipulate image properties professionally. Convert to grayscale or pure black and white, add transparency by removing colors, remove transparency with custom backgrounds, invert colors, or apply classic sepia toning.",
    howToUse: [
      "Upload your image",
      "Select the utility you need",
      "Adjust settings if available",
      "Download your processed image"
    ],
    benefits: [
      "Grayscale conversion",
      "Transparency management",
      "Color inversion",
      "Sepia toning",
      "Black & white with threshold",
      "Professional results"
    ],
    faqs: [
      { question: "What is the difference between grayscale and black & white?", answer: "Grayscale converts to shades of gray. Black & white uses a threshold to convert to pure black or pure white only." },
      { question: "How does add transparency work?", answer: "Select a color to make transparent, adjust tolerance, and that color range becomes transparent." },
      { question: "Can I remove transparency?", answer: "Yes, choose a background color to replace transparent areas with a solid color." },
      { question: "What is sepia effect?", answer: "Sepia gives images a warm, brownish vintage photography look popular in historical photographs." }
    ],
    gradientFrom: "#6366F1",
    gradientTo: "#8B5CF6"
  },
  "photo-filters": {
    slug: "photo-filters",
    name: "Photo Filters",
    metaTitle: "Photo Filters & Effects - Brightness, Contrast, Vintage Online",
    metaDescription: "Free photo filter tools. Adjust brightness, contrast, saturation. Apply vintage, sepia, blur effects. Professional photo editing online.",
    h1: "Photo Filters & Effects",
    shortDescription: "Apply professional filters and effects to your photos",
    longDescription: "Transform your photos with professional-grade filters and effects. Adjust brightness, contrast, and saturation. Apply artistic effects like vintage, sepia, blur, sharpen, and pixelate. Create stunning visual effects with real-time preview.",
    howToUse: [
      "Upload your photo",
      "Select a filter or adjustment",
      "Use sliders to fine-tune intensity",
      "Preview and download your enhanced photo"
    ],
    benefits: [
      "Professional adjustment tools",
      "Artistic filter effects",
      "Real-time preview",
      "Non-destructive editing",
      "Multiple effects stacking",
      "One-click presets"
    ],
    faqs: [
      { question: "Can I combine multiple filters?", answer: "Yes, you can apply multiple adjustments and effects to create unique combinations." },
      { question: "What does the sharpen filter do?", answer: "Sharpen enhances edge contrast to make details appear crisper and more defined." },
      { question: "How does pixelate work?", answer: "Pixelate reduces image detail by grouping pixels, creating a mosaic-like retro effect." },
      { question: "Are changes reversible?", answer: "Yes, you can reset any changes before downloading. Always keep your original file." }
    ],
    gradientFrom: "#F093FB",
    gradientTo: "#F5576C"
  },
  "watermark-tools": {
    slug: "watermark-tools",
    name: "Watermark Tools",
    metaTitle: "Add Watermark to Images - Text & Logo Watermark Online Free",
    metaDescription: "Free watermark tools. Add text or logo watermarks to images. Customize font, color, opacity, position. Protect your photos online.",
    h1: "Watermark Tools",
    shortDescription: "Protect your images with custom watermarks",
    longDescription: "Add professional watermarks to protect your images and establish your brand. Choose between text watermarks with customizable fonts, colors, and sizes, or image watermarks for logos. Position anywhere, adjust opacity, and create tiled patterns for maximum protection.",
    howToUse: [
      "Upload your main image",
      "Choose text or image watermark",
      "Customize appearance and position",
      "Apply watermark and download"
    ],
    benefits: [
      "Text and image watermarks",
      "Multiple font options",
      "Adjustable opacity",
      "Flexible positioning",
      "Tiled pattern option",
      "Protect intellectual property"
    ],
    faqs: [
      { question: "Can I use my logo as a watermark?", answer: "Yes, upload your logo image and it will be applied as a watermark with adjustable size and opacity." },
      { question: "How transparent should my watermark be?", answer: "30-50% opacity is typical - visible enough to protect but not distracting from the image." },
      { question: "Can I tile the watermark across the entire image?", answer: "Yes, the tiled pattern option repeats your watermark diagonally across the entire image for maximum protection." },
      { question: "Where should I position my watermark?", answer: "Common positions are bottom-right or center. Corners can be cropped out, so consider tiled patterns for high-value images." }
    ],
    gradientFrom: "#14B8A6",
    gradientTo: "#059669"
  },
  "image-combine": {
    slug: "image-combine",
    name: "Image Combine",
    metaTitle: "Combine & Merge Images Online Free | Collage Maker",
    metaDescription: "Free image combining tools. Merge images horizontally, vertically, create collages, before/after comparisons. No signup required.",
    h1: "Image Combine & Merge",
    shortDescription: "Combine multiple images into one seamlessly",
    longDescription: "Our image combining tools let you merge multiple images in various layouts. Combine horizontally for panorama-style results, vertically for long images, create grid collages, or make before/after comparisons. Unlimited images with drag-to-reorder support.",
    howToUse: [
      "Upload multiple images",
      "Choose combine mode (horizontal, vertical, collage)",
      "Drag to reorder images",
      "Adjust gap and background, then download"
    ],
    benefits: [
      "Unlimited image combining",
      "Multiple layout options",
      "Drag-to-reorder support",
      "Adjustable gaps and spacing",
      "Custom background colors",
      "High-resolution output"
    ],
    faqs: [
      { question: "How many images can I combine?", answer: "There is no limit - combine as many images as you need." },
      { question: "Can I rearrange the image order?", answer: "Yes, simply drag and drop thumbnails to reorder before combining." },
      { question: "What is the collage mode?", answer: "Collage arranges images in a grid with customizable number of columns." },
      { question: "Can I add spacing between images?", answer: "Yes, use the gap slider to add spacing and choose a background color for the gaps." }
    ],
    gradientFrom: "#8B5CF6",
    gradientTo: "#7C3AED"
  },
  "image-metadata": {
    slug: "image-metadata",
    name: "Image Metadata",
    metaTitle: "Image Metadata Viewer & Remover - View EXIF Data Online",
    metaDescription: "Free image metadata tools. View EXIF data, remove metadata for privacy, edit date/time. Protect your privacy before sharing photos.",
    h1: "Image Metadata Tools",
    shortDescription: "View, edit, and remove image metadata for privacy",
    longDescription: "Manage your image metadata with our comprehensive tools. View all EXIF data including camera settings, GPS location, and timestamps. Remove metadata for privacy before sharing online. Edit date and time information as needed.",
    howToUse: [
      "Upload your image",
      "View all metadata information",
      "Choose to remove or edit metadata",
      "Download your clean image"
    ],
    benefits: [
      "View complete EXIF data",
      "Remove all metadata",
      "Protect location privacy",
      "Edit date/time stamps",
      "See camera settings",
      "Clean images before sharing"
    ],
    faqs: [
      { question: "What is EXIF data?", answer: "EXIF (Exchangeable Image File Format) data includes camera settings, date/time, GPS location, and other information embedded in photos." },
      { question: "Why should I remove metadata?", answer: "Metadata can reveal your location, camera type, and when/where photos were taken. Remove it for privacy before sharing online." },
      { question: "Will removing metadata affect image quality?", answer: "No, metadata removal does not affect the visual image quality at all." },
      { question: "Can I selectively remove some metadata?", answer: "Our tool removes all metadata for complete privacy. For selective editing, use professional software." }
    ],
    gradientFrom: "#F59E0B",
    gradientTo: "#D97706"
  },
  "image-optimization": {
    slug: "image-optimization",
    name: "Image Optimization",
    metaTitle: "Image Optimization for Web - Reduce Size & Improve Speed",
    metaDescription: "Free image optimization tools. Optimize for web performance, reduce file size, adjust resolution. Improve website speed and SEO.",
    h1: "Image Optimization",
    shortDescription: "Optimize images for faster web performance",
    longDescription: "Prepare your images for optimal web performance. Reduce file sizes without visible quality loss, lower resolution for faster loading, and auto-orient images correctly. Improve your website speed, reduce bandwidth costs, and boost SEO rankings.",
    howToUse: [
      "Upload your image",
      "Select optimization type",
      "Adjust target size or quality",
      "Download your optimized image"
    ],
    benefits: [
      "Faster website loading",
      "Reduced bandwidth usage",
      "Improved SEO rankings",
      "Better user experience",
      "Lower storage costs",
      "Mobile-optimized images"
    ],
    faqs: [
      { question: "What is web optimization?", answer: "Web optimization balances image quality and file size for fastest loading while maintaining visual quality on screens." },
      { question: "How does this affect SEO?", answer: "Faster loading pages rank better in search engines. Optimized images directly improve Core Web Vitals metrics." },
      { question: "What resolution should I use for web?", answer: "For most web use, 72-150 DPI is sufficient. Higher resolution is only needed for print materials." },
      { question: "Will visitors notice the optimization?", answer: "Properly optimized images look identical to originals on screens while loading much faster." }
    ],
    gradientFrom: "#EF4444",
    gradientTo: "#DC2626"
  },
  "image-drawing": {
    slug: "image-drawing",
    name: "Image Drawing",
    metaTitle: "Draw & Annotate Images Online Free | Add Text, Shapes, Signatures",
    metaDescription: "Free image drawing and annotation tools. Add text, shapes, signatures, arrows to images. Perfect for screenshots and tutorials.",
    h1: "Image Drawing & Annotation",
    shortDescription: "Draw and annotate directly on your images",
    longDescription: "Add drawings, text, shapes, and annotations to your images. Perfect for creating tutorials, annotating screenshots, adding signatures, or creative expression. Choose from freehand drawing, shape tools, text boxes, and more.",
    howToUse: [
      "Upload your image",
      "Select a drawing tool",
      "Draw or add annotations",
      "Download your annotated image"
    ],
    benefits: [
      "Freehand drawing tools",
      "Shape tools (rectangle, circle, arrow)",
      "Text annotations",
      "Signature capability",
      "Multiple colors and sizes",
      "Undo/redo support"
    ],
    faqs: [
      { question: "Can I add arrows and callouts?", answer: "Yes, use our shape tools to add arrows, rectangles, circles, and lines for professional annotations." },
      { question: "Is there an undo function?", answer: "Yes, you can undo and redo actions while editing, and reset to start fresh if needed." },
      { question: "Can I add text to images?", answer: "Yes, our text tool lets you add customizable text anywhere on your image." },
      { question: "How do I create a signature?", answer: "Use the freehand pen tool to draw your signature, or use the signature pad for a clean writing surface." }
    ],
    gradientFrom: "#10B981",
    gradientTo: "#059669"
  },
  "image-security": {
    slug: "image-security",
    name: "Image Security",
    metaTitle: "Image Security Tools - Blur Faces, Pixelate, Encrypt Images",
    metaDescription: "Free image security tools. Blur faces, pixelate sensitive areas, hide content, encrypt images. Protect privacy in photos.",
    h1: "Image Security & Privacy",
    shortDescription: "Protect sensitive information in your images",
    longDescription: "Secure your images before sharing with powerful privacy tools. Blur faces to protect identities, pixelate sensitive information like license plates or documents, hide specific areas, or encrypt entire images for secure sharing.",
    howToUse: [
      "Upload your image",
      "Select security tool (blur, pixelate, hide, encrypt)",
      "Mark the areas to protect",
      "Download your secured image"
    ],
    benefits: [
      "Face blurring for privacy",
      "Pixelation for sensitive data",
      "Area hiding with solid colors",
      "Image encryption",
      "Protect identities",
      "GDPR compliance support"
    ],
    faqs: [
      { question: "Is the blur/pixelate reversible?", answer: "No, once applied and saved, blur and pixelate effects permanently remove detail from those areas." },
      { question: "How does image encryption work?", answer: "Encryption scrambles the image data with a password. Only someone with the password can decrypt and view it." },
      { question: "Can I blur multiple areas?", answer: "Yes, mark as many areas as needed before applying the effect." },
      { question: "Is this suitable for GDPR compliance?", answer: "Yes, blurring faces and removing identifiable information helps with privacy regulation compliance." }
    ],
    gradientFrom: "#EF4444",
    gradientTo: "#B91C1C"
  },
  "image-qr": {
    slug: "image-qr",
    name: "Image QR Tools",
    metaTitle: "QR Code Generator & Reader - Create & Scan QR Codes Online",
    metaDescription: "Free QR code tools. Generate QR codes from URLs or text. Read QR codes from images. Customizable colors and sizes.",
    h1: "QR Code Tools",
    shortDescription: "Generate and read QR codes easily",
    longDescription: "Create custom QR codes from any URL or text content, or decode QR codes from images. Our generator supports custom colors and sizes for branding. The reader quickly extracts content from QR code images.",
    howToUse: [
      "Enter URL/text or upload QR code image",
      "Customize colors if generating",
      "Generate or decode the QR code",
      "Download your QR code or copy extracted content"
    ],
    benefits: [
      "Generate QR from any text/URL",
      "Decode QR codes from images",
      "Custom colors for branding",
      "Multiple size options",
      "SVG and PNG downloads",
      "Instant processing"
    ],
    faqs: [
      { question: "What can I encode in a QR code?", answer: "Any text, URL, contact information, Wi-Fi credentials, or other data up to about 3KB." },
      { question: "What size should my QR code be?", answer: "For print, at least 2x2 cm. For digital, 200x200 pixels minimum. Larger is better for scanning reliability." },
      { question: "Can I customize the QR code colors?", answer: "Yes, choose custom foreground and background colors. Ensure good contrast for reliable scanning." },
      { question: "What if the QR code in my image is not reading?", answer: "Ensure the QR code is clearly visible, not too small, and has good contrast. Try cropping to focus on just the QR code." }
    ],
    gradientFrom: "#3B82F6",
    gradientTo: "#1D4ED8"
  }
};

export const getCategorySEOContent = (slug: string): CategorySEOContent | undefined => {
  return categoriesSEOContent[slug];
};