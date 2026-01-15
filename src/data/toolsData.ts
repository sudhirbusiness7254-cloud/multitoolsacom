// Comprehensive tools data for all categories

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  categorySlug: string;
  icon: string;
  keywords: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  priority: number;
  tools: Tool[];
}

export const toolCategories: Category[] = [
  {
    id: "image-converter",
    name: "Image Converter",
    slug: "image-converter",
    description: "Convert images between different formats",
    icon: "RefreshCw",
    priority: 1,
    tools: [
      { id: "jpg-to-png", name: "JPG to PNG", slug: "jpg-to-png", description: "Convert JPG images to PNG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["jpg to png", "jpeg to png", "convert jpg"] },
      { id: "png-to-jpg", name: "PNG to JPG", slug: "png-to-jpg", description: "Convert PNG images to JPG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["png to jpg", "png to jpeg", "convert png"] },
      { id: "jpg-to-webp", name: "JPG to WEBP", slug: "jpg-to-webp", description: "Convert JPG images to WEBP format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["jpg to webp", "jpeg to webp"] },
      { id: "webp-to-jpg", name: "WEBP to JPG", slug: "webp-to-jpg", description: "Convert WEBP images to JPG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["webp to jpg", "webp to jpeg"] },
      { id: "png-to-webp", name: "PNG to WEBP", slug: "png-to-webp", description: "Convert PNG images to WEBP format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["png to webp"] },
      { id: "webp-to-png", name: "WEBP to PNG", slug: "webp-to-png", description: "Convert WEBP images to PNG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["webp to png"] },
      { id: "gif-to-png", name: "GIF to PNG", slug: "gif-to-png", description: "Convert GIF images to PNG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["gif to png"] },
      { id: "gif-to-jpg", name: "GIF to JPG", slug: "gif-to-jpg", description: "Convert GIF images to JPG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["gif to jpg"] },
      { id: "bmp-to-jpg", name: "BMP to JPG", slug: "bmp-to-jpg", description: "Convert BMP images to JPG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["bmp to jpg"] },
      { id: "bmp-to-png", name: "BMP to PNG", slug: "bmp-to-png", description: "Convert BMP images to PNG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["bmp to png"] },
      { id: "tiff-to-jpg", name: "TIFF to JPG", slug: "tiff-to-jpg", description: "Convert TIFF images to JPG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["tiff to jpg"] },
      { id: "tiff-to-png", name: "TIFF to PNG", slug: "tiff-to-png", description: "Convert TIFF images to PNG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["tiff to png"] },
      { id: "svg-to-png", name: "SVG to PNG", slug: "svg-to-png", description: "Convert SVG images to PNG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["svg to png"] },
      { id: "svg-to-jpg", name: "SVG to JPG", slug: "svg-to-jpg", description: "Convert SVG images to JPG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["svg to jpg"] },
      { id: "heic-to-jpg", name: "HEIC to JPG", slug: "heic-to-jpg", description: "Convert HEIC images to JPG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["heic to jpg"] },
      { id: "heic-to-png", name: "HEIC to PNG", slug: "heic-to-png", description: "Convert HEIC images to PNG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["heic to png"] },
      { id: "raw-to-jpg", name: "RAW to JPG", slug: "raw-to-jpg", description: "Convert RAW images to JPG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["raw to jpg"] },
      { id: "raw-to-png", name: "RAW to PNG", slug: "raw-to-png", description: "Convert RAW images to PNG format", category: "Image Converter", categorySlug: "image-converter", icon: "Image", keywords: ["raw to png"] },
    ]
  },
  {
    id: "image-compression",
    name: "Image Compression",
    slug: "image-compression",
    description: "Compress images to reduce file size",
    icon: "Minimize2",
    priority: 2,
    tools: [
      { id: "jpeg-compressor", name: "JPEG Compressor", slug: "jpeg-compressor", description: "Compress JPEG images without losing quality", category: "Image Compression", categorySlug: "image-compression", icon: "Minimize2", keywords: ["jpeg compressor", "jpg compressor", "compress jpeg"] },
      { id: "png-compressor", name: "PNG Compressor", slug: "png-compressor", description: "Compress PNG images without losing quality", category: "Image Compression", categorySlug: "image-compression", icon: "Minimize2", keywords: ["png compressor", "compress png"] },
      { id: "webp-compressor", name: "WebP Compressor", slug: "webp-compressor", description: "Compress WebP images without losing quality", category: "Image Compression", categorySlug: "image-compression", icon: "Minimize2", keywords: ["webp compressor", "compress webp"] },
      { id: "gif-compressor", name: "GIF Compressor", slug: "gif-compressor", description: "Compress GIF images without losing quality", category: "Image Compression", categorySlug: "image-compression", icon: "Minimize2", keywords: ["gif compressor", "compress gif"] },
      { id: "tiff-compressor", name: "TIFF Compressor", slug: "tiff-compressor", description: "Compress TIFF images without losing quality", category: "Image Compression", categorySlug: "image-compression", icon: "Minimize2", keywords: ["tiff compressor", "compress tiff"] },
    ]
  },
  {
    id: "image-to-document",
    name: "Image to Document",
    slug: "image-to-document",
    description: "Convert images to document formats",
    icon: "FileText",
    priority: 3,
    tools: [
      { id: "image-to-pdf", name: "Image to PDF", slug: "image-to-pdf", description: "Convert images to PDF documents", category: "Image to Document", categorySlug: "image-to-document", icon: "FileText", keywords: ["image to pdf", "jpg to pdf", "png to pdf"] },
      { id: "image-to-docx", name: "Image to DOCX", slug: "image-to-docx", description: "Convert images to Word documents", category: "Image to Document", categorySlug: "image-to-document", icon: "FileText", keywords: ["image to docx", "image to word"] },
      { id: "image-to-pptx", name: "Image to PPTX", slug: "image-to-pptx", description: "Convert images to PowerPoint presentations", category: "Image to Document", categorySlug: "image-to-document", icon: "FileText", keywords: ["image to pptx", "image to powerpoint"] },
      { id: "image-to-html", name: "Image to HTML", slug: "image-to-html", description: "Convert images to HTML code", category: "Image to Document", categorySlug: "image-to-document", icon: "FileText", keywords: ["image to html"] },
      { id: "image-to-base64", name: "Image to BASE64", slug: "image-to-base64", description: "Encode images to BASE64 string", category: "Image to Document", categorySlug: "image-to-document", icon: "FileText", keywords: ["image to base64", "base64 encoder"] },
      { id: "base64-to-image", name: "BASE64 to Image", slug: "base64-to-image", description: "Decode BASE64 string to image", category: "Image to Document", categorySlug: "image-to-document", icon: "FileText", keywords: ["base64 to image", "base64 decoder"] },
    ]
  },
  {
    id: "image-resize",
    name: "Image Resize",
    slug: "image-resize",
    description: "Resize images to any dimension",
    icon: "Maximize2",
    priority: 4,
    tools: [
      { id: "exact-resize", name: "Exact Resize", slug: "exact-resize", description: "Resize image to exact width and height", category: "Image Resize", categorySlug: "image-resize", icon: "Maximize2", keywords: ["exact resize", "resize image"] },
      { id: "percentage-resize", name: "Percentage Resize", slug: "percentage-resize", description: "Resize image by percentage", category: "Image Resize", categorySlug: "image-resize", icon: "Maximize2", keywords: ["percentage resize", "scale image"] },
      { id: "fit-to-width", name: "Fit to Width", slug: "fit-to-width", description: "Resize image to fit specific width", category: "Image Resize", categorySlug: "image-resize", icon: "Maximize2", keywords: ["fit to width", "resize width"] },
      { id: "fit-to-height", name: "Fit to Height", slug: "fit-to-height", description: "Resize image to fit specific height", category: "Image Resize", categorySlug: "image-resize", icon: "Maximize2", keywords: ["fit to height", "resize height"] },
      { id: "fit-to-box", name: "Fit to Box", slug: "fit-to-box", description: "Resize image to fit within a box while maintaining aspect ratio", category: "Image Resize", categorySlug: "image-resize", icon: "Maximize2", keywords: ["fit to box", "maintain aspect ratio"] },
      { id: "resize-without-quality-loss", name: "Resize Without Quality Loss", slug: "resize-without-quality-loss", description: "Resize image without losing quality", category: "Image Resize", categorySlug: "image-resize", icon: "Maximize2", keywords: ["lossless resize", "quality resize"] },
    ]
  },
  {
    id: "image-crop",
    name: "Image Crop",
    slug: "image-crop",
    description: "Crop images with various options",
    icon: "Crop",
    priority: 5,
    tools: [
      { id: "manual-crop", name: "Manual Crop", slug: "manual-crop", description: "Manually crop image with custom selection", category: "Image Crop", categorySlug: "image-crop", icon: "Crop", keywords: ["manual crop", "custom crop"] },
      { id: "aspect-ratio-crop", name: "Aspect Ratio Crop", slug: "aspect-ratio-crop", description: "Crop image to specific aspect ratio", category: "Image Crop", categorySlug: "image-crop", icon: "Crop", keywords: ["aspect ratio crop", "16:9 crop"] },
      { id: "circle-crop", name: "Circle Crop", slug: "circle-crop", description: "Crop image into a circle shape", category: "Image Crop", categorySlug: "image-crop", icon: "Crop", keywords: ["circle crop", "round crop"] },
      { id: "square-crop", name: "Square Crop", slug: "square-crop", description: "Crop image into a square shape", category: "Image Crop", categorySlug: "image-crop", icon: "Crop", keywords: ["square crop", "1:1 crop"] },
      { id: "free-selection-crop", name: "Free Selection Crop", slug: "free-selection-crop", description: "Crop image with free-form selection", category: "Image Crop", categorySlug: "image-crop", icon: "Crop", keywords: ["free selection crop", "lasso crop"] },
    ]
  },
  {
    id: "image-rotate-flip",
    name: "Rotate & Flip",
    slug: "image-rotate-flip",
    description: "Rotate and flip images",
    icon: "RotateCw",
    priority: 6,
    tools: [
      { id: "rotate-90", name: "Rotate 90°", slug: "rotate-90", description: "Rotate image 90 degrees clockwise", category: "Rotate & Flip", categorySlug: "image-rotate-flip", icon: "RotateCw", keywords: ["rotate 90", "rotate clockwise"] },
      { id: "rotate-180", name: "Rotate 180°", slug: "rotate-180", description: "Rotate image 180 degrees", category: "Rotate & Flip", categorySlug: "image-rotate-flip", icon: "RotateCw", keywords: ["rotate 180", "flip upside down"] },
      { id: "rotate-270", name: "Rotate 270°", slug: "rotate-270", description: "Rotate image 270 degrees", category: "Rotate & Flip", categorySlug: "image-rotate-flip", icon: "RotateCw", keywords: ["rotate 270", "rotate counterclockwise"] },
      { id: "custom-rotate", name: "Custom Rotate", slug: "custom-rotate", description: "Rotate image by custom angle", category: "Rotate & Flip", categorySlug: "image-rotate-flip", icon: "RotateCw", keywords: ["custom rotate", "rotate any angle"] },
      { id: "flip-horizontal", name: "Flip Horizontal", slug: "flip-horizontal", description: "Flip image horizontally", category: "Rotate & Flip", categorySlug: "image-rotate-flip", icon: "FlipHorizontal", keywords: ["flip horizontal", "mirror horizontal"] },
      { id: "flip-vertical", name: "Flip Vertical", slug: "flip-vertical", description: "Flip image vertically", category: "Rotate & Flip", categorySlug: "image-rotate-flip", icon: "FlipVertical", keywords: ["flip vertical", "mirror vertical"] },
      { id: "mirror-effect", name: "Mirror Effect", slug: "mirror-effect", description: "Create mirror effect on image", category: "Rotate & Flip", categorySlug: "image-rotate-flip", icon: "FlipHorizontal", keywords: ["mirror effect", "reflection"] },
    ]
  },
  {
    id: "image-format-utilities",
    name: "Format Utilities",
    slug: "image-format-utilities",
    description: "Image format utility tools",
    icon: "Settings",
    priority: 7,
    tools: [
      { id: "grayscale-conversion", name: "Grayscale Conversion", slug: "grayscale-conversion", description: "Convert image to grayscale", category: "Format Utilities", categorySlug: "image-format-utilities", icon: "Settings", keywords: ["grayscale", "black and white"] },
      { id: "black-white-conversion", name: "Black & White", slug: "black-white-conversion", description: "Convert image to pure black and white", category: "Format Utilities", categorySlug: "image-format-utilities", icon: "Settings", keywords: ["black white", "monochrome"] },
      { id: "add-transparency", name: "Add Transparency", slug: "add-transparency", description: "Add transparency to image", category: "Format Utilities", categorySlug: "image-format-utilities", icon: "Settings", keywords: ["add transparency", "alpha channel"] },
      { id: "remove-transparency", name: "Remove Transparency", slug: "remove-transparency", description: "Remove transparency from image", category: "Format Utilities", categorySlug: "image-format-utilities", icon: "Settings", keywords: ["remove transparency", "flatten alpha"] },
      { id: "flatten-image", name: "Flatten Image", slug: "flatten-image", description: "Flatten image layers", category: "Format Utilities", categorySlug: "image-format-utilities", icon: "Settings", keywords: ["flatten image", "merge layers"] },
      { id: "merge-images", name: "Merge Images", slug: "merge-images", description: "Merge multiple images together", category: "Format Utilities", categorySlug: "image-format-utilities", icon: "Settings", keywords: ["merge images", "combine images"] },
    ]
  },
  {
    id: "photo-filters",
    name: "Photo Filters",
    slug: "photo-filters",
    description: "Apply filters and effects to photos",
    icon: "Sparkles",
    priority: 8,
    tools: [
      { id: "brightness-adjust", name: "Brightness Adjust", slug: "brightness-adjust", description: "Adjust image brightness", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sun", keywords: ["brightness", "lighten", "darken"] },
      { id: "contrast-adjust", name: "Contrast Adjust", slug: "contrast-adjust", description: "Adjust image contrast", category: "Photo Filters", categorySlug: "photo-filters", icon: "Contrast", keywords: ["contrast", "image contrast"] },
      { id: "saturation-adjust", name: "Saturation Adjust", slug: "saturation-adjust", description: "Adjust image saturation", category: "Photo Filters", categorySlug: "photo-filters", icon: "Palette", keywords: ["saturation", "vibrance"] },
      { id: "sharpen-filter", name: "Sharpen Filter", slug: "sharpen-filter", description: "Sharpen image details", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["sharpen", "enhance details"] },
      { id: "blur-filter", name: "Blur Filter", slug: "blur-filter", description: "Apply blur effect to image", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["blur", "soft focus"] },
      { id: "gaussian-blur", name: "Gaussian Blur", slug: "gaussian-blur", description: "Apply gaussian blur to image", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["gaussian blur", "smooth blur"] },
      { id: "emboss-filter", name: "Emboss", slug: "emboss-filter", description: "Apply emboss effect to image", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["emboss", "3d effect"] },
      { id: "smooth-filter", name: "Smooth Filter", slug: "smooth-filter", description: "Apply smooth filter to image", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["smooth", "soften"] },
      { id: "pixelate-effect", name: "Pixelate Effect", slug: "pixelate-effect", description: "Pixelate image effect", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["pixelate", "mosaic"] },
      { id: "sepia-effect", name: "Sepia Effect", slug: "sepia-effect", description: "Apply sepia tone to image", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["sepia", "vintage"] },
      { id: "negative-image", name: "Negative Image", slug: "negative-image", description: "Create negative of image", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["negative", "invert colors"] },
      { id: "vintage-filter", name: "Vintage Filter", slug: "vintage-filter", description: "Apply vintage filter to image", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["vintage", "retro"] },
      { id: "warm-tone", name: "Warm Tone", slug: "warm-tone", description: "Add warm tone to image", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["warm tone", "warm filter"] },
      { id: "cool-tone", name: "Cool Tone", slug: "cool-tone", description: "Add cool tone to image", category: "Photo Filters", categorySlug: "photo-filters", icon: "Sparkles", keywords: ["cool tone", "cool filter"] },
    ]
  },
  {
    id: "watermark-tools",
    name: "Watermark Tools",
    slug: "watermark-tools",
    description: "Add watermarks to images",
    icon: "Type",
    priority: 9,
    tools: [
      { id: "text-watermark", name: "Text Watermark", slug: "text-watermark", description: "Add text watermark to image", category: "Watermark Tools", categorySlug: "watermark-tools", icon: "Type", keywords: ["text watermark", "add text"] },
      { id: "image-watermark", name: "Image Watermark", slug: "image-watermark", description: "Add image watermark to image", category: "Watermark Tools", categorySlug: "watermark-tools", icon: "Image", keywords: ["image watermark", "logo watermark"] },
      { id: "font-change", name: "Font Change", slug: "font-change", description: "Change watermark font", category: "Watermark Tools", categorySlug: "watermark-tools", icon: "Type", keywords: ["font change", "watermark font"] },
      { id: "color-change", name: "Color Change", slug: "color-change", description: "Change watermark color", category: "Watermark Tools", categorySlug: "watermark-tools", icon: "Palette", keywords: ["color change", "watermark color"] },
      { id: "opacity-settings", name: "Opacity Settings", slug: "opacity-settings", description: "Adjust watermark opacity", category: "Watermark Tools", categorySlug: "watermark-tools", icon: "Settings", keywords: ["opacity", "transparency settings"] },
      { id: "position-settings", name: "Position Settings", slug: "position-settings", description: "Set watermark position", category: "Watermark Tools", categorySlug: "watermark-tools", icon: "Move", keywords: ["position", "watermark position"] },
    ]
  },
  {
    id: "image-combine",
    name: "Image Combine",
    slug: "image-combine",
    description: "Combine and merge images",
    icon: "Layers",
    priority: 10,
    tools: [
      { id: "merge-horizontally", name: "Merge Horizontally", slug: "merge-horizontally", description: "Merge images side by side", category: "Image Combine", categorySlug: "image-combine", icon: "Layers", keywords: ["merge horizontal", "side by side"] },
      { id: "merge-vertically", name: "Merge Vertically", slug: "merge-vertically", description: "Merge images top to bottom", category: "Image Combine", categorySlug: "image-combine", icon: "Layers", keywords: ["merge vertical", "stack images"] },
      { id: "collage-maker", name: "Collage Maker", slug: "collage-maker", description: "Create photo collages", category: "Image Combine", categorySlug: "image-combine", icon: "Grid", keywords: ["collage maker", "photo collage"] },
      { id: "stitch-images", name: "Stitch Images", slug: "stitch-images", description: "Stitch images together", category: "Image Combine", categorySlug: "image-combine", icon: "Layers", keywords: ["stitch images", "panorama"] },
      { id: "before-after-maker", name: "Before/After Maker", slug: "before-after-maker", description: "Create before and after comparisons", category: "Image Combine", categorySlug: "image-combine", icon: "Layers", keywords: ["before after", "comparison"] },
    ]
  },
  {
    id: "image-metadata",
    name: "Image Metadata",
    slug: "image-metadata",
    description: "View, edit, and remove image metadata for privacy",
    icon: "Info",
    priority: 11,
    tools: [
      { id: "view-exif", name: "View EXIF", slug: "view-exif", description: "View complete EXIF metadata including camera settings, GPS, and timestamps", category: "Image Metadata", categorySlug: "image-metadata", icon: "Eye", keywords: ["view exif", "exif viewer", "metadata viewer", "image info"] },
      { id: "remove-exif", name: "Remove EXIF", slug: "remove-exif", description: "Strip all metadata from images for privacy protection", category: "Image Metadata", categorySlug: "image-metadata", icon: "Trash2", keywords: ["remove exif", "strip metadata", "privacy", "delete exif"] },
      { id: "edit-exif-datetime", name: "Edit Date/Time", slug: "edit-exif-datetime", description: "Modify image date and time metadata", category: "Image Metadata", categorySlug: "image-metadata", icon: "Calendar", keywords: ["edit exif", "change date", "modify timestamp", "edit datetime"] },
      { id: "copy-exif", name: "Copy EXIF", slug: "copy-exif", description: "Copy EXIF data from one image to another", category: "Image Metadata", categorySlug: "image-metadata", icon: "Copy", keywords: ["copy exif", "transfer metadata", "clone exif"] },
    ]
  },
  {
    id: "image-optimization",
    name: "Image Optimization",
    slug: "image-optimization",
    description: "Optimize images for web and more",
    icon: "Zap",
    priority: 12,
    tools: [
      { id: "reduce-file-size", name: "Reduce File Size", slug: "reduce-file-size", description: "Reduce image file size", category: "Image Optimization", categorySlug: "image-optimization", icon: "Zap", keywords: ["reduce size", "smaller file"] },
      { id: "reduce-resolution", name: "Reduce Resolution", slug: "reduce-resolution", description: "Reduce image resolution", category: "Image Optimization", categorySlug: "image-optimization", icon: "Zap", keywords: ["reduce resolution", "lower quality"] },
      { id: "optimize-for-web", name: "Optimize for Web", slug: "optimize-for-web", description: "Optimize images for web use", category: "Image Optimization", categorySlug: "image-optimization", icon: "Globe", keywords: ["web optimize", "web ready"] },
      { id: "auto-orient-image", name: "Auto-Orient Image", slug: "auto-orient-image", description: "Automatically orient image correctly", category: "Image Optimization", categorySlug: "image-optimization", icon: "RotateCw", keywords: ["auto orient", "fix orientation"] },
    ]
  },
  {
    id: "image-drawing",
    name: "Image Drawing",
    slug: "image-drawing",
    description: "Draw and annotate on images",
    icon: "PenTool",
    priority: 13,
    tools: [
      { id: "paint-tool", name: "Paint Tool", slug: "paint-tool", description: "Paint on images", category: "Image Drawing", categorySlug: "image-drawing", icon: "PenTool", keywords: ["paint", "draw"] },
      { id: "draw-shapes", name: "Draw Shapes", slug: "draw-shapes", description: "Draw shapes on images", category: "Image Drawing", categorySlug: "image-drawing", icon: "Square", keywords: ["draw shapes", "add shapes"] },
      { id: "signature-pad", name: "Signature Pad", slug: "signature-pad", description: "Add signature to images", category: "Image Drawing", categorySlug: "image-drawing", icon: "PenTool", keywords: ["signature", "sign image"] },
      { id: "add-stickers", name: "Add Stickers", slug: "add-stickers", description: "Add stickers to images", category: "Image Drawing", categorySlug: "image-drawing", icon: "Sticker", keywords: ["stickers", "add stickers"] },
      { id: "add-emojis", name: "Add Emojis", slug: "add-emojis", description: "Add emojis to images", category: "Image Drawing", categorySlug: "image-drawing", icon: "Smile", keywords: ["emojis", "add emojis"] },
    ]
  },
  {
    id: "image-security",
    name: "Image Security",
    slug: "image-security",
    description: "Secure and protect images",
    icon: "Shield",
    priority: 14,
    tools: [
      { id: "manual-face-blur", name: "Manual Face Blur", slug: "manual-face-blur", description: "Manually blur faces in images", category: "Image Security", categorySlug: "image-security", icon: "Shield", keywords: ["face blur", "blur face"] },
      { id: "manual-pixel-blur", name: "Manual Pixel Blur", slug: "manual-pixel-blur", description: "Manually pixelate areas in images", category: "Image Security", categorySlug: "image-security", icon: "Shield", keywords: ["pixel blur", "pixelate area"] },
      { id: "hide-area", name: "Hide Area", slug: "hide-area", description: "Hide specific areas in images", category: "Image Security", categorySlug: "image-security", icon: "EyeOff", keywords: ["hide area", "censor"] },
      { id: "image-encrypt", name: "Image Encrypt", slug: "image-encrypt", description: "Encrypt images for security", category: "Image Security", categorySlug: "image-security", icon: "Lock", keywords: ["encrypt image", "secure image"] },
      { id: "image-decrypt", name: "Image Decrypt", slug: "image-decrypt", description: "Decrypt encrypted images", category: "Image Security", categorySlug: "image-security", icon: "Unlock", keywords: ["decrypt image", "unlock image"] },
    ]
  },
  {
    id: "image-qr",
    name: "Image QR Tools",
    slug: "image-qr",
    description: "QR code and image tools",
    icon: "QrCode",
    priority: 15,
    tools: [
      { id: "image-to-qr-code", name: "Image to QR Code", slug: "image-to-qr-code", description: "Convert image URL to QR code", category: "Image QR Tools", categorySlug: "image-qr", icon: "QrCode", keywords: ["image to qr", "qr code generator"] },
      { id: "qr-code-to-image", name: "QR Code to Image", slug: "qr-code-to-image", description: "Decode QR code from image", category: "Image QR Tools", categorySlug: "image-qr", icon: "QrCode", keywords: ["qr to image", "qr code reader"] },
    ]
  },
  {
    id: "tag-tools",
    name: "Tag Tools",
    slug: "tag-tools",
    description: "Social media tag extraction tools",
    icon: "Hash",
    priority: 16,
    tools: [
      { id: "tag-extractor", name: "Tag Extractor", slug: "tag-extractor", description: "Extract tags from social media URLs", category: "Tag Tools", categorySlug: "tag-tools", icon: "Hash", keywords: ["tag extractor", "hashtag generator"] },
    ]
  },
  {
    id: "pdf-tools",
    name: "PDF Tools",
    slug: "pdf-tools",
    description: "All-in-one PDF tools for merging, compressing, converting, and splitting PDFs",
    icon: "FileText",
    priority: 17,
    tools: [
      { id: "merge-pdf", name: "Merge PDF", slug: "merge-pdf", description: "Combine multiple PDF files into one document", category: "PDF Tools", categorySlug: "pdf-tools", icon: "FileText", keywords: ["merge pdf", "combine pdf", "join pdf", "pdf merger"] },
      { id: "compress-pdf", name: "Compress PDF", slug: "compress-pdf", description: "Reduce PDF file size while maintaining quality", category: "PDF Tools", categorySlug: "pdf-tools", icon: "Minimize2", keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "shrink pdf"] },
      { id: "word-to-pdf", name: "Word to PDF", slug: "word-to-pdf", description: "Convert Word documents (DOCX, DOC) to PDF format", category: "PDF Tools", categorySlug: "pdf-tools", icon: "FileUp", keywords: ["word to pdf", "docx to pdf", "convert word", "doc to pdf"] },
      { id: "image-to-pdf", name: "Image to PDF", slug: "image-to-pdf", description: "Convert and combine images into PDF documents", category: "PDF Tools", categorySlug: "pdf-tools", icon: "Image", keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photo to pdf"] },
      { id: "split-pdf", name: "Split PDF", slug: "split-pdf", description: "Extract pages or split PDF into multiple files", category: "PDF Tools", categorySlug: "pdf-tools", icon: "Scissors", keywords: ["split pdf", "extract pdf pages", "pdf splitter", "divide pdf"] },
    ]
  },
  {
    id: "ai-image-tools",
    name: "AI Image Tools",
    slug: "ai-image-tools",
    description: "AI-powered image enhancement, upscaling, restoration, and generation tools",
    icon: "Sparkles",
    priority: 18,
    tools: [
      { id: "ai-photo-enhancer", name: "AI Photo Enhancer", slug: "ai-photo-enhancer", description: "Enhance photo quality, sharpness, and clarity automatically using AI", category: "AI Image Tools", categorySlug: "ai-image-tools", icon: "Sparkles", keywords: ["ai enhance", "photo enhancer", "remini", "improve quality", "hd photo"] },
      { id: "ai-image-upscaler", name: "AI Image Upscaler", slug: "ai-image-upscaler", description: "Upscale and enlarge images up to 4x without losing quality", category: "AI Image Tools", categorySlug: "ai-image-tools", icon: "Maximize2", keywords: ["ai upscale", "enlarge image", "increase resolution", "4x upscale"] },
      { id: "ai-background-remover", name: "AI Background Remover", slug: "ai-background-remover", description: "Remove image backgrounds automatically with AI precision", category: "AI Image Tools", categorySlug: "ai-image-tools", icon: "Eraser", keywords: ["remove background", "background eraser", "transparent background", "cutout"] },
      { id: "ai-image-restorer", name: "AI Image Restorer", slug: "ai-image-restorer", description: "Restore old, damaged, or low-quality photos using AI", category: "AI Image Tools", categorySlug: "ai-image-tools", icon: "Wand2", keywords: ["restore photo", "fix old photo", "repair image", "ai restoration"] },
      { id: "ai-image-generator", name: "AI Image Generator", slug: "ai-image-generation", description: "Generate stunning images from text prompts using AI", category: "AI Image Tools", categorySlug: "ai-image-tools", icon: "Wand2", keywords: ["ai generate", "text to image", "create image", "ai art"] },
      { id: "ai-face-swap", name: "AI Face Swap", slug: "ai-face-swap", description: "Swap faces between two photos instantly with realistic results", category: "AI Image Tools", categorySlug: "ai-image-tools", icon: "Users", keywords: ["face swap", "swap faces", "face changer", "deepfake"] },
      { id: "ai-colorize", name: "AI Colorize Photos", slug: "ai-colorize", description: "Add realistic colors to black and white photos using AI", category: "AI Image Tools", categorySlug: "ai-image-tools", icon: "Palette", keywords: ["colorize", "black and white to color", "add color", "photo colorization"] },
      { id: "ai-object-removal", name: "AI Object Removal", slug: "ai-object-removal", description: "Remove unwanted objects, people, or watermarks from photos", category: "AI Image Tools", categorySlug: "ai-image-tools", icon: "Eraser", keywords: ["remove object", "erase object", "remove watermark", "photo cleanup"] },
    ]
  },
];

export const getAllTools = (): Tool[] => {
  return toolCategories.flatMap(cat => cat.tools);
};

export const getToolBySlug = (slug: string): Tool | undefined => {
  return getAllTools().find(tool => tool.slug === slug);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return toolCategories.find(cat => cat.slug === slug);
};
