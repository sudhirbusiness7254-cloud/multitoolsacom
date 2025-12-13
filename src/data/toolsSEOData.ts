// Comprehensive SEO content for all tools

export interface ToolSEOContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  shortDescription: string;
  longDescription: string;
  howToUse: string[];
  benefits: string[];
  whyImportant: string;
  faqs: { question: string; answer: string }[];
  relatedTools: string[];
  category: string;
  categorySlug: string;
  keywords: string[];
  gradientFrom: string;
  gradientTo: string;
}

export const toolsSEOContent: Record<string, ToolSEOContent> = {
  // IMAGE CONVERTER TOOLS
  "jpg-to-png": {
    slug: "jpg-to-png",
    title: "JPG to PNG Converter",
    metaTitle: "JPG to PNG Converter - Free Online Image Conversion Tool",
    metaDescription: "Convert JPG images to PNG format online for free. Preserve image quality with transparent background support. No signup required, instant conversion.",
    h1: "Convert JPG to PNG Online Free",
    shortDescription: "Transform your JPG images to PNG format with transparency support",
    longDescription: "Our JPG to PNG converter allows you to easily transform JPEG images into PNG format. PNG (Portable Network Graphics) supports lossless compression and transparency, making it ideal for web graphics, logos, and images that require a transparent background. The conversion process maintains image quality while enabling features not available in JPEG format.",
    howToUse: [
      "Click the upload area or drag and drop your JPG image",
      "Wait for the image to load in the preview",
      "Click the 'Convert to PNG' button",
      "Download your converted PNG image"
    ],
    benefits: [
      "Gain transparency support for your images",
      "Lossless compression preserves image quality",
      "Better for graphics with text and sharp edges",
      "Ideal for logos and web graphics",
      "No file size limits",
      "100% free with no watermarks"
    ],
    whyImportant: "Converting JPG to PNG is essential when you need transparency in your images or want to preserve image quality for graphics that require sharp edges and text. PNG format is the standard for web graphics, logos, and any image that needs a transparent background.",
    faqs: [
      { question: "Will I lose quality when converting JPG to PNG?", answer: "No, PNG uses lossless compression so no additional quality is lost during conversion. However, any compression artifacts already present in the original JPG will remain." },
      { question: "Can I add transparency after converting?", answer: "Yes, once converted to PNG, you can use image editing software to add transparency to specific areas of the image." },
      { question: "Is PNG better than JPG?", answer: "It depends on use case. PNG is better for graphics, logos, and images needing transparency. JPG is better for photographs due to smaller file sizes." },
      { question: "What happens to the white background?", answer: "The white background remains after conversion. You would need to manually remove it using our background removal tools if transparency is desired." }
    ],
    relatedTools: ["png-to-jpg", "jpg-to-webp", "image-compressor"],
    category: "Image Converter",
    categorySlug: "image-converter",
    keywords: ["jpg to png", "jpeg to png", "convert jpg", "image converter", "free converter"],
    gradientFrom: "#FF6B6B",
    gradientTo: "#FF8E53"
  },
  "png-to-jpg": {
    slug: "png-to-jpg",
    title: "PNG to JPG Converter",
    metaTitle: "PNG to JPG Converter - Free Online Image Conversion",
    metaDescription: "Convert PNG images to JPG format online for free. Reduce file size while maintaining quality. Fast, secure, no registration needed.",
    h1: "Convert PNG to JPG Online Free",
    shortDescription: "Transform your PNG images to JPG format for smaller file sizes",
    longDescription: "Convert your PNG images to JPG format easily with our free online converter. JPG format uses lossy compression to achieve significantly smaller file sizes, making it ideal for photographs and images where a smaller file size is more important than having a transparent background.",
    howToUse: [
      "Upload your PNG image by clicking or dragging",
      "Preview your image",
      "Click 'Convert to JPG' button",
      "Download the converted JPG file"
    ],
    benefits: [
      "Significantly smaller file sizes",
      "Faster website loading times",
      "Compatible with all devices and platforms",
      "Perfect for email attachments",
      "Ideal for photographs",
      "Free and instant conversion"
    ],
    whyImportant: "PNG to JPG conversion is essential when you need to reduce image file size for faster uploads, email attachments, or website optimization. JPG format is universally supported and provides excellent compression for photographic content.",
    faqs: [
      { question: "What happens to transparency when converting to JPG?", answer: "Transparent areas will be replaced with a white background by default, as JPG does not support transparency." },
      { question: "Will the quality be affected?", answer: "JPG uses lossy compression, so there may be slight quality reduction. Our converter uses optimal settings to minimize visible quality loss." },
      { question: "Can I choose the compression level?", answer: "Yes, you can adjust the quality slider to balance between file size and image quality." }
    ],
    relatedTools: ["jpg-to-png", "png-to-webp", "png-compressor"],
    category: "Image Converter",
    categorySlug: "image-converter",
    keywords: ["png to jpg", "png to jpeg", "convert png", "image converter"],
    gradientFrom: "#4ECDC4",
    gradientTo: "#45B7AA"
  },
  "jpg-to-webp": {
    slug: "jpg-to-webp",
    title: "JPG to WebP Converter",
    metaTitle: "JPG to WebP Converter - Modern Image Format Conversion",
    metaDescription: "Convert JPG to WebP format for better web performance. Get smaller file sizes with same quality. Free online tool, no signup required.",
    h1: "Convert JPG to WebP Online Free",
    shortDescription: "Transform JPG images to modern WebP format for better web performance",
    longDescription: "WebP is a modern image format developed by Google that provides superior compression for web images. Our JPG to WebP converter helps you reduce image file sizes by up to 30% compared to JPG while maintaining the same visual quality, resulting in faster loading websites.",
    howToUse: [
      "Select or drag your JPG image to upload",
      "View the preview of your image",
      "Click 'Convert to WebP'",
      "Download your optimized WebP image"
    ],
    benefits: [
      "Up to 30% smaller file sizes than JPG",
      "Same visual quality with better compression",
      "Faster website loading times",
      "Supported by all modern browsers",
      "Better SEO through improved page speed",
      "Free conversion with no limits"
    ],
    whyImportant: "WebP format is becoming the standard for web images due to its superior compression. Converting to WebP improves website performance, reduces bandwidth costs, and provides a better user experience on both desktop and mobile devices.",
    faqs: [
      { question: "Is WebP supported by all browsers?", answer: "WebP is supported by Chrome, Firefox, Edge, Safari, and most modern browsers. For older browsers, fallback images can be provided." },
      { question: "How much smaller will my image be?", answer: "Typically, WebP images are 25-34% smaller than equivalent JPG images while maintaining the same quality." },
      { question: "Can I use WebP for print?", answer: "WebP is designed for web use. For print, JPG or PNG is recommended as they have broader support in print software." }
    ],
    relatedTools: ["webp-to-jpg", "png-to-webp", "webp-compressor"],
    category: "Image Converter",
    categorySlug: "image-converter",
    keywords: ["jpg to webp", "jpeg to webp", "webp converter", "modern image format"],
    gradientFrom: "#667eea",
    gradientTo: "#764ba2"
  },

  // COMPRESSION TOOLS
  "jpeg-compressor": {
    slug: "jpeg-compressor",
    title: "JPEG Compressor",
    metaTitle: "JPEG Compressor - Reduce JPG File Size Online Free",
    metaDescription: "Compress JPEG images online without losing quality. Reduce file size up to 80%. Free, fast, secure - no signup required.",
    h1: "Compress JPEG Images Online Free",
    shortDescription: "Reduce JPEG file sizes while maintaining visual quality",
    longDescription: "Our advanced JPEG compressor uses intelligent algorithms to reduce your image file sizes by up to 80% while maintaining excellent visual quality. Perfect for optimizing images for web, email, or storage without noticeable quality loss.",
    howToUse: [
      "Upload your JPEG image",
      "Adjust the quality slider if needed",
      "Click 'Compress' to process",
      "Download your optimized image"
    ],
    benefits: [
      "Reduce file size up to 80%",
      "Maintain visual quality",
      "Faster website loading",
      "Save storage space",
      "Perfect for email attachments",
      "Batch compression available"
    ],
    whyImportant: "Image compression is crucial for web performance. Large images slow down websites, increase bounce rates, and negatively impact SEO. Properly compressed images load faster and provide better user experience across all devices.",
    faqs: [
      { question: "How much can I compress without losing quality?", answer: "Most images can be compressed 50-70% with virtually no visible quality loss. Higher compression rates may show artifacts." },
      { question: "Is the compression reversible?", answer: "JPEG compression is lossy, meaning some data is permanently removed. Always keep your original files as backup." },
      { question: "Can I compress multiple images at once?", answer: "Yes, our tool supports batch compression for multiple images." }
    ],
    relatedTools: ["png-compressor", "webp-compressor", "image-optimization"],
    category: "Image Compression",
    categorySlug: "image-compression",
    keywords: ["jpeg compressor", "jpg compressor", "compress jpeg", "reduce image size"],
    gradientFrom: "#f093fb",
    gradientTo: "#f5576c"
  },
  "png-compressor": {
    slug: "png-compressor",
    title: "PNG Compressor",
    metaTitle: "PNG Compressor - Reduce PNG File Size Online Free",
    metaDescription: "Compress PNG images online without losing transparency. Reduce file size while preserving quality. Free tool, no registration needed.",
    h1: "Compress PNG Images Online Free",
    shortDescription: "Reduce PNG file sizes while preserving transparency and quality",
    longDescription: "Our PNG compressor uses advanced algorithms to significantly reduce PNG file sizes while preserving transparency and maintaining excellent image quality. Ideal for web graphics, logos, and any images that require a transparent background.",
    howToUse: [
      "Upload your PNG image",
      "Select compression level",
      "Click 'Compress' button",
      "Download your optimized PNG"
    ],
    benefits: [
      "Preserves transparency",
      "Maintains image quality",
      "Reduces file size significantly",
      "Perfect for web graphics",
      "Supports alpha channels",
      "Free unlimited compression"
    ],
    whyImportant: "PNG files can become very large, especially with transparency. Compressing PNG images reduces loading times and bandwidth usage while keeping the quality needed for professional graphics and logos.",
    faqs: [
      { question: "Will compression remove transparency?", answer: "No, our PNG compressor preserves the alpha channel and all transparency information." },
      { question: "Is PNG compression lossy or lossless?", answer: "PNG supports lossless compression, meaning no image data is lost during compression." },
      { question: "How much can PNG files be compressed?", answer: "Depending on the image content, PNG files can be reduced by 30-70% without visible quality loss." }
    ],
    relatedTools: ["jpeg-compressor", "webp-compressor", "png-to-jpg"],
    category: "Image Compression",
    categorySlug: "image-compression",
    keywords: ["png compressor", "compress png", "reduce png size", "optimize png"],
    gradientFrom: "#11998e",
    gradientTo: "#38ef7d"
  },

  // RESIZE TOOLS
  "exact-resize": {
    slug: "exact-resize",
    title: "Exact Image Resize",
    metaTitle: "Exact Image Resize - Resize to Specific Dimensions Online",
    metaDescription: "Resize images to exact dimensions online. Set precise width and height in pixels. Free, fast, no signup needed.",
    h1: "Resize Images to Exact Dimensions",
    shortDescription: "Resize your images to precise width and height measurements",
    longDescription: "Our exact resize tool allows you to resize any image to specific pixel dimensions. Whether you need an image for a specific social media platform, website requirement, or print project, you can set the exact width and height you need.",
    howToUse: [
      "Upload your image",
      "Enter the desired width in pixels",
      "Enter the desired height in pixels",
      "Choose whether to maintain aspect ratio",
      "Click 'Resize' and download"
    ],
    benefits: [
      "Precise dimension control",
      "Maintain or adjust aspect ratio",
      "Perfect for specific requirements",
      "High-quality output",
      "Instant processing",
      "Free with no limits"
    ],
    whyImportant: "Many platforms and use cases require images of specific dimensions. Social media profiles, banners, thumbnails, and print materials all have specific size requirements that must be met for optimal display.",
    faqs: [
      { question: "Will resizing affect image quality?", answer: "Enlarging images may reduce quality. Reducing size generally maintains quality. We use high-quality resampling algorithms for best results." },
      { question: "Can I maintain the aspect ratio?", answer: "Yes, you can lock the aspect ratio so the image maintains its proportions while being resized." },
      { question: "What is the maximum size I can resize to?", answer: "You can resize images up to 10,000 x 10,000 pixels, though enlarging images beyond their original size may reduce quality." }
    ],
    relatedTools: ["percentage-resize", "fit-to-width", "fit-to-height"],
    category: "Image Resize",
    categorySlug: "image-resize",
    keywords: ["exact resize", "resize image", "specific dimensions", "pixel resize"],
    gradientFrom: "#00c6ff",
    gradientTo: "#0072ff"
  },

  // CROP TOOLS
  "manual-crop": {
    slug: "manual-crop",
    title: "Manual Image Crop",
    metaTitle: "Manual Image Crop - Free Online Photo Cropping Tool",
    metaDescription: "Crop images online with precision. Free-form selection, custom dimensions. Fast, easy, no signup required.",
    h1: "Crop Images Online Free",
    shortDescription: "Precisely crop your images with custom selections",
    longDescription: "Our manual crop tool gives you complete control over how you crop your images. Select any area of your image with precision, adjust the crop box freely, and create perfectly cropped images for any purpose.",
    howToUse: [
      "Upload your image",
      "Draw a crop box by clicking and dragging",
      "Adjust the selection as needed",
      "Click 'Crop' to apply",
      "Download your cropped image"
    ],
    benefits: [
      "Complete control over crop area",
      "Precise pixel adjustments",
      "Real-time preview",
      "Undo and redo options",
      "No quality loss",
      "Free and unlimited"
    ],
    whyImportant: "Cropping allows you to remove unwanted areas, focus on the subject, and create images that fit specific aspect ratios. It is an essential editing tool for photographers, designers, and content creators.",
    faqs: [
      { question: "Can I crop to specific dimensions?", answer: "Yes, you can enter specific width and height values for precise cropping." },
      { question: "Does cropping reduce image quality?", answer: "No, cropping removes areas of the image but does not reduce the quality of the remaining content." },
      { question: "Can I undo my crop?", answer: "You can reset and start over at any time before downloading the final image." }
    ],
    relatedTools: ["aspect-ratio-crop", "circle-crop", "square-crop"],
    category: "Image Crop",
    categorySlug: "image-crop",
    keywords: ["crop image", "photo crop", "cut image", "trim photo"],
    gradientFrom: "#f857a6",
    gradientTo: "#ff5858"
  },

  // WATERMARK TOOLS
  "text-watermark": {
    slug: "text-watermark",
    title: "Text Watermark Tool",
    metaTitle: "Add Text Watermark to Images - Free Online Tool",
    metaDescription: "Add custom text watermarks to your images online. Protect your photos with copyright text. Free, easy to use, no signup required.",
    h1: "Add Text Watermark to Images",
    shortDescription: "Protect your images with custom text watermarks",
    longDescription: "Our text watermark tool allows you to add custom text overlays to your images for copyright protection and branding. Choose from multiple fonts, colors, sizes, and positioning options to create professional watermarks.",
    howToUse: [
      "Upload your image",
      "Enter your watermark text",
      "Choose font, size, and color",
      "Select position (corner, center, or tile)",
      "Adjust opacity",
      "Download your watermarked image"
    ],
    benefits: [
      "Protect intellectual property",
      "Brand your images",
      "Multiple font options",
      "Customizable opacity",
      "Tiled watermark option",
      "Free unlimited use"
    ],
    whyImportant: "Watermarks help protect your images from unauthorized use, establish copyright, and promote your brand. They are essential for photographers, designers, and content creators who share work online.",
    faqs: [
      { question: "Can I use my own font?", answer: "We offer a selection of popular fonts. Custom font upload is not currently available." },
      { question: "Will the watermark affect image quality?", answer: "No, the watermark is applied as an overlay without degrading the underlying image." },
      { question: "Can I make the watermark semi-transparent?", answer: "Yes, you can adjust the opacity from 10% to 100%." }
    ],
    relatedTools: ["image-watermark", "opacity-settings", "position-settings"],
    category: "Watermark Tools",
    categorySlug: "watermark-tools",
    keywords: ["text watermark", "add watermark", "copyright image", "protect photo"],
    gradientFrom: "#6366f1",
    gradientTo: "#8b5cf6"
  },

  // IMAGE TO DOCUMENT TOOLS
  "image-to-pdf": {
    slug: "image-to-pdf",
    title: "Image to PDF Converter",
    metaTitle: "Image to PDF Converter - Convert Images to PDF Free",
    metaDescription: "Convert JPG, PNG, and other images to PDF online. Combine multiple images into one PDF. Free, secure, no signup required.",
    h1: "Convert Images to PDF Online Free",
    shortDescription: "Transform images into professional PDF documents",
    longDescription: "Our Image to PDF converter allows you to convert single or multiple images into high-quality PDF documents. Perfect for creating portfolios, combining receipts, or converting photos for professional documents. Support for JPG, PNG, WebP, and more.",
    howToUse: [
      "Upload one or more images",
      "Arrange images in desired order",
      "Choose page size and orientation",
      "Click 'Convert to PDF'",
      "Download your PDF document"
    ],
    benefits: [
      "Combine multiple images into one PDF",
      "Maintain original image quality",
      "Choose page size and layout",
      "Professional document output",
      "Universal PDF compatibility",
      "Free unlimited conversions"
    ],
    whyImportant: "PDF is the universal standard for document sharing. Converting images to PDF makes them easier to share, print, and archive while ensuring they look the same on any device.",
    faqs: [
      { question: "Can I combine multiple images into one PDF?", answer: "Yes, you can upload multiple images and they will be combined into a single PDF document." },
      { question: "Will the image quality be preserved?", answer: "Yes, our converter maintains the original image quality in the PDF." },
      { question: "Can I choose the page size?", answer: "Yes, you can select from standard page sizes like A4, Letter, or let images define page size." }
    ],
    relatedTools: ["image-to-docx", "image-to-pptx", "jpeg-compressor"],
    category: "Image to Document",
    categorySlug: "image-to-document",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photo to pdf"],
    gradientFrom: "#ec4899",
    gradientTo: "#f97316"
  },

  // QR CODE TOOLS
  "image-to-qr-code": {
    slug: "image-to-qr-code",
    title: "Image to QR Code Generator",
    metaTitle: "Image to QR Code Generator - Create QR Codes Online Free",
    metaDescription: "Generate QR codes from image URLs or text. Create scannable QR codes for your images. Free online tool, no signup required.",
    h1: "Generate QR Codes Online Free",
    shortDescription: "Create QR codes from URLs, text, or image links",
    longDescription: "Our QR code generator creates high-quality, scannable QR codes from any URL, text, or image link. Perfect for sharing images, websites, contact information, or any data that needs to be quickly accessed via smartphone scan.",
    howToUse: [
      "Enter your URL or text content",
      "Customize QR code size if needed",
      "Choose foreground and background colors",
      "Generate your QR code",
      "Download as PNG or SVG"
    ],
    benefits: [
      "Easy sharing of links and content",
      "Customizable colors and sizes",
      "High-quality output",
      "Works with any scanner app",
      "SVG and PNG formats",
      "Free unlimited generation"
    ],
    whyImportant: "QR codes bridge the physical and digital worlds, allowing quick access to online content through a simple smartphone scan. They are essential for marketing, product packaging, and contactless information sharing.",
    faqs: [
      { question: "How do I scan a QR code?", answer: "Most smartphone camera apps can scan QR codes automatically. Simply point your camera at the code." },
      { question: "What size should my QR code be?", answer: "For print, QR codes should be at least 2x2 cm. For digital use, 200x200 pixels is usually sufficient." },
      { question: "Can I customize the QR code appearance?", answer: "Yes, you can change colors and add logos while maintaining scannability." }
    ],
    relatedTools: ["qr-code-to-image", "image-to-base64"],
    category: "Image QR Tools",
    categorySlug: "image-qr",
    keywords: ["qr code generator", "create qr code", "qr maker", "image qr"],
    gradientFrom: "#3b82f6",
    gradientTo: "#1d4ed8"
  }
};

// Generate default SEO content for tools not explicitly defined
export const getToolSEOContent = (slug: string, toolName: string, category: string, categorySlug: string): ToolSEOContent => {
  if (toolsSEOContent[slug]) {
    return toolsSEOContent[slug];
  }

  // Generate default content
  const formattedName = toolName.replace(/-/g, " ");
  const gradients = [
    { from: "#FF6B6B", to: "#FF8E53" },
    { from: "#4ECDC4", to: "#45B7AA" },
    { from: "#667eea", to: "#764ba2" },
    { from: "#f093fb", to: "#f5576c" },
    { from: "#11998e", to: "#38ef7d" },
    { from: "#00c6ff", to: "#0072ff" },
    { from: "#f857a6", to: "#ff5858" },
    { from: "#6366f1", to: "#8b5cf6" },
    { from: "#ec4899", to: "#f97316" },
    { from: "#3b82f6", to: "#1d4ed8" }
  ];
  const gradient = gradients[Math.abs(slug.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % gradients.length];

  return {
    slug,
    title: toolName,
    metaTitle: `${toolName} - Free Online Tool | MultiTools`,
    metaDescription: `Use our free ${toolName.toLowerCase()} tool online. Fast, secure, and easy to use. No signup required. Process images instantly in your browser.`,
    h1: `${toolName} - Free Online Tool`,
    shortDescription: `Use our ${toolName.toLowerCase()} for quick and easy image processing`,
    longDescription: `Our ${toolName.toLowerCase()} provides a fast, secure, and easy way to process your images online. All processing happens in your browser, ensuring your files remain private and secure. No signup or installation required.`,
    howToUse: [
      "Upload your image by clicking or dragging",
      "Adjust settings as needed",
      "Click the process button",
      "Download your processed image"
    ],
    benefits: [
      "100% free to use",
      "No signup or registration required",
      "Fast processing in your browser",
      "Your files stay private and secure",
      "Works on any device",
      "No watermarks on output"
    ],
    whyImportant: `${toolName} is an essential tool for image editing and processing. Whether you are a professional designer, content creator, or just need to quickly edit an image, this tool provides the functionality you need with no hassle.`,
    faqs: [
      { question: `Is ${toolName} free to use?`, answer: "Yes, this tool is completely free with no hidden charges or premium features." },
      { question: "Do I need to create an account?", answer: "No, you can use this tool immediately without any signup or registration." },
      { question: "Is my data secure?", answer: "Yes, all processing happens in your browser. Your files are never uploaded to our servers." },
      { question: "What file formats are supported?", answer: "We support all major image formats including JPG, PNG, WebP, GIF, and more." }
    ],
    relatedTools: [],
    category,
    categorySlug,
    keywords: [slug.replace(/-/g, " "), toolName.toLowerCase(), category.toLowerCase()],
    gradientFrom: gradient.from,
    gradientTo: gradient.to
  };
};

export const getAllToolsFlat = () => {
  const tools: { slug: string; name: string; category: string; categorySlug: string }[] = [];
  
  // Image Converter
  const converterTools = [
    "jpg-to-png", "png-to-jpg", "jpg-to-webp", "webp-to-jpg", "png-to-webp", "webp-to-png",
    "gif-to-png", "gif-to-jpg", "bmp-to-jpg", "bmp-to-png", "tiff-to-jpg", "tiff-to-png",
    "svg-to-png", "svg-to-jpg", "heic-to-jpg", "heic-to-png", "raw-to-jpg", "raw-to-png"
  ];
  converterTools.forEach(slug => {
    const name = slug.split('-').map(w => w.toUpperCase()).join(' ').replace(' TO ', ' to ');
    tools.push({ slug, name, category: "Image Converter", categorySlug: "image-converter" });
  });

  // Image Compression
  ["jpeg-compressor", "png-compressor", "webp-compressor", "gif-compressor", "tiff-compressor"].forEach(slug => {
    const name = slug.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Image Compression", categorySlug: "image-compression" });
  });

  // Image to Document
  ["image-to-pdf", "image-to-docx", "image-to-pptx", "image-to-html", "image-to-base64", "base64-to-image"].forEach(slug => {
    const name = slug.split('-').map(w => w.toUpperCase()).join(' ').replace(' TO ', ' to ');
    tools.push({ slug, name, category: "Image to Document", categorySlug: "image-to-document" });
  });

  // Image Resize
  ["exact-resize", "percentage-resize", "fit-to-width", "fit-to-height", "fit-to-box", "resize-without-quality-loss"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Image Resize", categorySlug: "image-resize" });
  });

  // Image Crop
  ["manual-crop", "aspect-ratio-crop", "circle-crop", "square-crop", "free-selection-crop"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Image Crop", categorySlug: "image-crop" });
  });

  // Rotate & Flip
  ["rotate-90", "rotate-180", "rotate-270", "custom-rotate", "flip-horizontal", "flip-vertical", "mirror-effect"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Rotate & Flip", categorySlug: "image-rotate-flip" });
  });

  // Format Utilities
  ["grayscale-conversion", "black-white-conversion", "add-transparency", "remove-transparency", "flatten-image", "merge-images"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Format Utilities", categorySlug: "image-format-utilities" });
  });

  // Photo Filters
  ["brightness-adjust", "contrast-adjust", "saturation-adjust", "sharpen-filter", "blur-filter", "gaussian-blur", "emboss-filter", "smooth-filter", "pixelate-effect", "sepia-effect", "negative-image", "vintage-filter", "warm-tone", "cool-tone"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Photo Filters", categorySlug: "photo-filters" });
  });

  // Watermark Tools
  ["text-watermark", "image-watermark", "font-change", "color-change", "opacity-settings", "position-settings"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Watermark Tools", categorySlug: "watermark-tools" });
  });

  // Image Combine
  ["merge-horizontally", "merge-vertically", "collage-maker", "stitch-images", "before-after-maker"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Image Combine", categorySlug: "image-combine" });
  });

  // Image Metadata
  ["view-exif", "remove-exif", "edit-exif-datetime", "copy-exif"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Image Metadata", categorySlug: "image-metadata" });
  });

  // Image Optimization
  ["reduce-file-size", "reduce-resolution", "optimize-for-web", "auto-orient-image"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Image Optimization", categorySlug: "image-optimization" });
  });

  // Image Drawing
  ["paint-tool", "draw-shapes", "signature-pad", "add-stickers", "add-emojis"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Image Drawing", categorySlug: "image-drawing" });
  });

  // Image Security
  ["manual-face-blur", "manual-pixel-blur", "hide-area", "image-encrypt", "image-decrypt"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Image Security", categorySlug: "image-security" });
  });

  // Image QR Tools
  ["image-to-qr-code", "qr-code-to-image"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "Image QR Tools", categorySlug: "image-qr" });
  });

  return tools;
};