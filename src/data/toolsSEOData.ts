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
  keyFeatures?: string[];
  whoCanUse?: string[];
  privacyNote?: string;
  conclusion?: string;
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
    metaTitle: "JPG to PNG Converter - Free Online Image Conversion Tool | MultiTools",
    metaDescription: "Convert JPG images to PNG format online for free. Preserve image quality with transparent background support. No signup required, instant conversion.",
    h1: "Convert JPG to PNG Online Free",
    shortDescription: "Transform your JPG images to PNG format with transparency support and lossless quality.",
    longDescription: "Our JPG to PNG converter allows you to easily transform JPEG images into PNG format with just a few clicks. PNG (Portable Network Graphics) supports lossless compression and transparency, making it ideal for web graphics, logos, icons, and images that require a transparent background. The conversion process maintains image quality while enabling features not available in JPEG format. Whether you are a web developer, graphic designer, or content creator, this tool provides the perfect solution for your image conversion needs.",
    howToUse: [
      "Click the upload area or drag and drop your JPG image",
      "Wait for the image to load and preview",
      "Click the Convert to PNG button",
      "Download your converted PNG image instantly"
    ],
    benefits: [
      "Gain transparency support for your images",
      "Lossless compression preserves image quality",
      "Better for graphics with text and sharp edges",
      "Ideal for logos, icons, and web graphics",
      "No file size limits on uploads",
      "100% free with no watermarks"
    ],
    whyImportant: "Converting JPG to PNG is essential when you need transparency in your images or want to preserve image quality for graphics that require sharp edges and text. PNG format is the standard for web graphics, logos, icons, and any image that needs a transparent background. Unlike JPG, PNG supports alpha transparency, making it perfect for overlaying images on different backgrounds.",
    keyFeatures: [
      "Instant JPG to PNG conversion",
      "Preserves original image quality",
      "Supports all JPG/JPEG files",
      "Browser-based processing",
      "No software installation needed",
      "Batch conversion support"
    ],
    whoCanUse: [
      "Web Developers",
      "Graphic Designers",
      "Content Creators",
      "Marketing Teams",
      "E-commerce Sellers",
      "Anyone needing PNG images"
    ],
    privacyNote: "Your images are converted securely in your browser. We never upload or store your files on any server. All processing happens locally, ensuring your photos remain completely private.",
    conclusion: "Convert your JPG images to PNG format instantly with our free online tool. Get lossless quality, transparency support, and professional results in seconds. Try it now!",
    faqs: [
      { question: "Will I lose quality when converting JPG to PNG?", answer: "No, PNG uses lossless compression so no additional quality is lost during conversion. However, any compression artifacts already present in the original JPG will remain." },
      { question: "Can I add transparency after converting?", answer: "Yes, once converted to PNG, you can use image editing software to add transparency to specific areas of the image." },
      { question: "Is PNG better than JPG?", answer: "It depends on use case. PNG is better for graphics, logos, and images needing transparency. JPG is better for photographs due to smaller file sizes." },
      { question: "What happens to the white background?", answer: "The white background remains after conversion. You would need to manually remove it using background removal tools if transparency is desired." },
      { question: "Can I convert multiple JPG files at once?", answer: "Yes, our tool supports batch conversion. Upload multiple files and convert them all in one go." },
      { question: "Is there a file size limit?", answer: "There is no strict limit, but for optimal browser performance, we recommend files under 50MB." }
    ],
    relatedTools: ["png-to-jpg", "jpg-to-webp", "jpeg-compressor"],
    category: "Image Converter",
    categorySlug: "image-converter",
    keywords: ["jpg to png", "jpeg to png", "convert jpg", "image converter", "free converter", "png converter"],
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
    metaTitle: "JPEG Compressor - Reduce JPG File Size Online Free | MultiTools",
    metaDescription: "Compress JPEG images online without losing quality. Reduce file size up to 80%. Free, fast, secure - no signup required.",
    h1: "Compress JPEG Images Online Free",
    shortDescription: "Reduce JPEG file sizes by up to 80% while maintaining excellent visual quality.",
    longDescription: "Our advanced JPEG compressor uses intelligent algorithms to reduce your image file sizes by up to 80% while maintaining excellent visual quality. Perfect for optimizing images for websites, email attachments, social media, or storage without noticeable quality loss. Whether you need to speed up your website, fit images within email size limits, or save storage space, our tool delivers professional results instantly.",
    howToUse: [
      "Upload your JPEG image by clicking or dragging",
      "Adjust the quality slider to set compression level",
      "Click Compress to process your image",
      "Download your optimized smaller image"
    ],
    benefits: [
      "Reduce file size by up to 80%",
      "Maintain excellent visual quality",
      "Faster website loading times",
      "Save valuable storage space",
      "Perfect for email attachments",
      "Batch compression available"
    ],
    whyImportant: "Image compression is crucial for web performance and user experience. Large images slow down websites, increase bounce rates, hurt SEO rankings, and consume bandwidth. Properly compressed images load faster, reduce hosting costs, and provide better user experience across all devices and connection speeds.",
    keyFeatures: [
      "Smart compression algorithms",
      "Adjustable quality settings",
      "Real-time size preview",
      "Batch processing support",
      "Maintains EXIF data option",
      "Instant download"
    ],
    whoCanUse: [
      "Website Owners",
      "Bloggers",
      "E-commerce Sellers",
      "Email Marketers",
      "Photographers",
      "Social Media Managers"
    ],
    privacyNote: "Your images are compressed securely in your browser. We never upload, store, or have access to your photos. All processing happens locally on your device, ensuring complete privacy.",
    conclusion: "Optimize your JPEG images for faster loading and smaller file sizes without sacrificing quality. Our free compressor delivers professional results instantly. Try it now and see the difference!",
    faqs: [
      { question: "How much can I compress without losing quality?", answer: "Most images can be compressed 50-70% with virtually no visible quality loss. Higher compression rates may show slight artifacts." },
      { question: "Is the compression reversible?", answer: "JPEG compression is lossy, meaning some data is permanently removed. Always keep your original files as backup." },
      { question: "Can I compress multiple images at once?", answer: "Yes, our tool supports batch compression for multiple images simultaneously." },
      { question: "Will my image metadata be preserved?", answer: "You can choose to keep or remove EXIF metadata during compression." },
      { question: "What quality setting should I use?", answer: "For web use, 70-80% quality typically provides the best balance between file size and visual quality." },
      { question: "Is there a file size limit?", answer: "For optimal browser performance, we recommend files under 50MB, though larger files can be processed." }
    ],
    relatedTools: ["png-compressor", "webp-compressor", "optimize-for-web"],
    category: "Image Compression",
    categorySlug: "image-compression",
    keywords: ["jpeg compressor", "jpg compressor", "compress jpeg", "reduce image size", "image optimizer"],
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
  },

  // PDF TOOLS
  "pdf-merge": {
    slug: "pdf-merge",
    title: "PDF Merge",
    metaTitle: "PDF Merge - Combine Multiple PDF Files Online Free",
    metaDescription: "Merge PDF files online for free. Combine multiple PDFs into one document easily. Fast, secure, no signup required. Works on all devices.",
    h1: "Merge PDF Files Online Free",
    shortDescription: "Combine multiple PDF files into a single document",
    longDescription: "Our PDF Merge tool allows you to combine multiple PDF files into one document quickly and easily. Simply upload your PDFs, arrange them in your preferred order, and download the merged result. Perfect for combining reports, documents, or creating comprehensive PDF packages.",
    howToUse: [
      "Click upload or drag and drop your PDF files",
      "Arrange files in your desired order using arrows",
      "Add more files if needed",
      "Click 'Merge' to combine all PDFs",
      "Download your merged PDF document"
    ],
    benefits: [
      "Merge unlimited PDF files",
      "Drag and drop file ordering",
      "No file size limits",
      "Fast browser-based processing",
      "Secure - files never leave your device",
      "Works on desktop and mobile"
    ],
    whyImportant: "PDF merging is essential for combining multiple documents into a single file for easier sharing, printing, and archiving. Whether you need to combine invoices, reports, or chapters into one document, our tool makes it simple and fast.",
    faqs: [
      { question: "How many PDFs can I merge at once?", answer: "There is no limit. You can merge as many PDF files as you need in a single operation." },
      { question: "Will the quality of my PDFs be affected?", answer: "No, the original quality of all PDFs is preserved during the merge process." },
      { question: "Can I rearrange the order of PDFs?", answer: "Yes, use the up and down arrows to arrange files in your desired order before merging." },
      { question: "Is the merged PDF searchable?", answer: "Yes, if your original PDFs are searchable, the merged result will also be searchable." }
    ],
    relatedTools: ["pdf-split", "pdf-compress", "word-to-pdf"],
    category: "PDF Tools",
    categorySlug: "pdf-tools",
    keywords: ["pdf merge", "combine pdf", "join pdf", "merge pdf files", "pdf combiner"],
    gradientFrom: "#DC2626",
    gradientTo: "#EA580C"
  },
  "pdf-compress": {
    slug: "pdf-compress",
    title: "PDF Compress",
    metaTitle: "PDF Compress - Reduce PDF File Size Online Free",
    metaDescription: "Compress PDF files online for free. Reduce PDF size by up to 80% without losing quality. Fast, secure, no signup required.",
    h1: "Compress PDF Files Online Free",
    shortDescription: "Reduce PDF file size while maintaining quality",
    longDescription: "Our PDF Compress tool reduces the file size of your PDF documents by up to 80% while maintaining visual quality. Perfect for email attachments, web uploads, and saving storage space. Adjust the compression level to balance between file size and quality.",
    howToUse: [
      "Upload your PDF file",
      "Adjust the compression quality slider",
      "Click 'Compress' to process",
      "Download your compressed PDF"
    ],
    benefits: [
      "Reduce file size by up to 80%",
      "Maintain document quality",
      "Perfect for email attachments",
      "Faster file uploads and downloads",
      "Save storage space",
      "No quality loss at recommended settings"
    ],
    whyImportant: "Large PDF files can be difficult to share via email, upload to websites, or store efficiently. Compressing PDFs reduces file size while keeping the document readable and professional-looking.",
    faqs: [
      { question: "How much can I compress a PDF?", answer: "Depending on the content, you can typically reduce file size by 50-80% while maintaining good visual quality." },
      { question: "Will text become blurry after compression?", answer: "No, text remains sharp and readable. Only embedded images may be slightly optimized." },
      { question: "Can I choose the compression level?", answer: "Yes, use the quality slider to balance between file size and visual quality." },
      { question: "Is compression reversible?", answer: "Compression is permanent. Always keep your original files as backup if needed." }
    ],
    relatedTools: ["pdf-merge", "pdf-split", "jpg-to-pdf"],
    category: "PDF Tools",
    categorySlug: "pdf-tools",
    keywords: ["pdf compress", "reduce pdf size", "compress pdf", "pdf size reducer", "shrink pdf"],
    gradientFrom: "#059669",
    gradientTo: "#10B981"
  },
  "word-to-pdf": {
    slug: "word-to-pdf",
    title: "Word to PDF",
    metaTitle: "Word to PDF Converter - Convert DOCX to PDF Online Free",
    metaDescription: "Convert Word documents to PDF online for free. Transform DOC and DOCX files to PDF format instantly. Fast, secure, no signup required.",
    h1: "Convert Word to PDF Online Free",
    shortDescription: "Transform Word documents into PDF format",
    longDescription: "Convert your Microsoft Word documents (DOC, DOCX) to PDF format with our free online converter. The conversion preserves formatting, fonts, and images, ensuring your document looks exactly the same in PDF format. Perfect for sharing documents that need to maintain their layout across different devices.",
    howToUse: [
      "Upload your Word document (DOC or DOCX)",
      "Wait for the file to be processed",
      "Click 'Convert' to transform to PDF",
      "Download your PDF document"
    ],
    benefits: [
      "Preserves formatting and layout",
      "Maintains fonts and images",
      "Creates universally readable documents",
      "No Microsoft Office required",
      "Fast and secure conversion",
      "Works on all devices"
    ],
    whyImportant: "PDF format ensures your documents look the same on any device or operating system. Converting Word to PDF is essential for sharing professional documents, submitting forms, or archiving important files.",
    faqs: [
      { question: "Will my formatting be preserved?", answer: "Yes, our converter maintains all formatting including fonts, images, tables, and layout." },
      { question: "Can I convert DOC files?", answer: "Yes, we support both DOC and DOCX formats from all versions of Microsoft Word." },
      { question: "Will the PDF be editable?", answer: "The PDF will be a fixed document. To edit, you would need to convert back to Word format." },
      { question: "Are hyperlinks preserved?", answer: "Yes, clickable links in your Word document will work in the resulting PDF." }
    ],
    relatedTools: ["pdf-merge", "pdf-compress", "jpg-to-pdf"],
    category: "PDF Tools",
    categorySlug: "pdf-tools",
    keywords: ["word to pdf", "docx to pdf", "convert word", "doc to pdf", "word converter"],
    gradientFrom: "#2563EB",
    gradientTo: "#3B82F6"
  },
  "pdf-split": {
    slug: "pdf-split",
    title: "PDF Split",
    metaTitle: "PDF Split - Split PDF Into Multiple Files Online Free",
    metaDescription: "Split PDF files online for free. Separate PDF pages into individual files or custom ranges. Fast, secure, no signup required.",
    h1: "Split PDF Files Online Free",
    shortDescription: "Divide PDF documents into separate files",
    longDescription: "Our PDF Split tool lets you divide a PDF document into multiple separate files. Extract specific pages, split into individual pages, or define custom page ranges. Perfect for separating chapters, extracting forms, or organizing large documents.",
    howToUse: [
      "Upload your PDF file",
      "Choose split method (all pages or custom ranges)",
      "Enter page ranges if using custom split",
      "Click 'Split' to process",
      "Download your split PDF files as a ZIP"
    ],
    benefits: [
      "Split into individual pages",
      "Custom page range support",
      "Extract specific sections",
      "Download all as ZIP file",
      "Fast processing",
      "No page limit"
    ],
    whyImportant: "Splitting PDFs helps you extract only the pages you need, share specific sections without revealing the entire document, or organize large documents into manageable pieces.",
    faqs: [
      { question: "Can I extract specific pages?", answer: "Yes, enter page ranges like '1-3, 5, 7-10' to extract only the pages you need." },
      { question: "How are split files delivered?", answer: "All split PDF files are packaged into a ZIP file for easy download." },
      { question: "Is there a page limit?", answer: "No, you can split PDFs of any size with unlimited pages." },
      { question: "Will bookmarks be preserved?", answer: "Bookmarks within the extracted page ranges will be preserved in the resulting files." }
    ],
    relatedTools: ["pdf-merge", "pdf-compress", "pdf-to-jpg"],
    category: "PDF Tools",
    categorySlug: "pdf-tools",
    keywords: ["pdf split", "split pdf", "separate pdf pages", "divide pdf", "extract pdf pages"],
    gradientFrom: "#7C3AED",
    gradientTo: "#8B5CF6"
  },
  "pdf-to-jpg": {
    slug: "pdf-to-jpg",
    title: "PDF to JPG",
    metaTitle: "PDF to JPG Converter - Convert PDF Pages to Images Online Free",
    metaDescription: "Convert PDF to JPG images online for free. Transform PDF pages into high-quality JPG images. Fast, secure, no signup required.",
    h1: "Convert PDF to JPG Images Online Free",
    shortDescription: "Transform PDF pages into JPG images",
    longDescription: "Convert your PDF documents into high-quality JPG images with our free online converter. Each page of your PDF becomes a separate JPG image, perfect for sharing on social media, embedding in presentations, or viewing without a PDF reader.",
    howToUse: [
      "Upload your PDF file",
      "Choose image quality settings",
      "Click 'Convert' to process",
      "Download all images as a ZIP file"
    ],
    benefits: [
      "High-quality image output",
      "Each page as separate image",
      "Adjustable quality settings",
      "Perfect for presentations",
      "Easy social media sharing",
      "No PDF reader required to view"
    ],
    whyImportant: "Converting PDF to JPG makes document content easily shareable on platforms that do not support PDF. Images can be embedded in presentations, posted on social media, or viewed on any device without special software.",
    faqs: [
      { question: "What quality are the JPG images?", answer: "You can choose from low, medium, or high quality. High quality produces the clearest images but larger file sizes." },
      { question: "Are all pages converted?", answer: "Yes, every page of your PDF is converted to a separate JPG image." },
      { question: "How are the images delivered?", answer: "All JPG images are packaged into a ZIP file for convenient download." },
      { question: "Can I convert only specific pages?", answer: "Currently all pages are converted. Use our PDF Split tool first if you need only specific pages." }
    ],
    relatedTools: ["jpg-to-pdf", "pdf-split", "pdf-compress"],
    category: "PDF Tools",
    categorySlug: "pdf-tools",
    keywords: ["pdf to jpg", "pdf to image", "convert pdf to jpg", "pdf converter", "pdf to jpeg"],
    gradientFrom: "#F59E0B",
    gradientTo: "#FBBF24"
  },
  "jpg-to-pdf": {
    slug: "jpg-to-pdf",
    title: "JPG to PDF",
    metaTitle: "JPG to PDF Converter - Convert Images to PDF Online Free",
    metaDescription: "Convert JPG images to PDF online for free. Combine multiple images into one PDF document. Fast, secure, no signup required.",
    h1: "Convert JPG Images to PDF Online Free",
    shortDescription: "Transform JPG images into PDF documents",
    longDescription: "Convert your JPG images into PDF documents with our free online converter. Combine multiple images into a single PDF, perfect for creating photo albums, portfolios, or document archives. Arrange images in your preferred order before conversion.",
    howToUse: [
      "Upload one or more JPG images",
      "Arrange images in your desired order",
      "Add more images if needed",
      "Click 'Convert' to create PDF",
      "Download your PDF document"
    ],
    benefits: [
      "Combine multiple images",
      "Drag and drop ordering",
      "High-quality output",
      "Perfect for portfolios",
      "Easy document sharing",
      "Print-ready PDF output"
    ],
    whyImportant: "Converting images to PDF creates a single, easy-to-share document from multiple photos. PDFs are universally readable and maintain consistent appearance across all devices and platforms.",
    faqs: [
      { question: "Can I combine multiple images into one PDF?", answer: "Yes, upload as many images as you like and they will all be combined into a single PDF document." },
      { question: "What image formats are supported?", answer: "We support JPG, JPEG, PNG, and other common image formats." },
      { question: "Will image quality be preserved?", answer: "Yes, images are embedded at their original quality in the PDF." },
      { question: "Can I control the page size?", answer: "Images are automatically sized to fit standard page dimensions while maintaining aspect ratio." }
    ],
    relatedTools: ["pdf-to-jpg", "pdf-merge", "image-to-pdf"],
    category: "PDF Tools",
    categorySlug: "pdf-tools",
    keywords: ["jpg to pdf", "image to pdf", "convert jpg to pdf", "photos to pdf", "jpeg to pdf"],
    gradientFrom: "#EC4899",
    gradientTo: "#F472B6"
  }
};

// Import PDF SEO data
import { pdfToolsSEOContent } from './pdfToolsSEOData';

// Generate default SEO content for tools not explicitly defined
export const getToolSEOContent = (slug: string, toolName: string, category: string, categorySlug: string): ToolSEOContent => {
  if (toolsSEOContent[slug]) {
    const existingContent = toolsSEOContent[slug];
    // Add default values for new fields if not present
    return {
      ...existingContent,
      keyFeatures: existingContent.keyFeatures || getDefaultKeyFeatures(category),
      whoCanUse: existingContent.whoCanUse || getDefaultWhoCanUse(category),
      privacyNote: existingContent.privacyNote || getDefaultPrivacyNote(),
      conclusion: existingContent.conclusion || getDefaultConclusion(existingContent.title)
    };
  }

  // Check PDF tools SEO data
  if (pdfToolsSEOContent[slug]) {
    const pdfSeo = pdfToolsSEOContent[slug];
    return {
      slug: pdfSeo.slug,
      title: pdfSeo.title,
      metaTitle: pdfSeo.metaTitle,
      metaDescription: pdfSeo.metaDescription,
      h1: pdfSeo.h1,
      shortDescription: pdfSeo.shortDescription,
      longDescription: pdfSeo.longDescription,
      howToUse: pdfSeo.howToUse,
      benefits: pdfSeo.benefits,
      whyImportant: pdfSeo.whyImportant,
      keyFeatures: pdfSeo.keyFeatures,
      whoCanUse: pdfSeo.whoCanUse,
      privacyNote: pdfSeo.privacyNote,
      conclusion: pdfSeo.conclusion,
      faqs: pdfSeo.faqs,
      relatedTools: pdfSeo.relatedTools,
      category: pdfSeo.category,
      categorySlug: pdfSeo.categorySlug,
      keywords: pdfSeo.keywords,
      gradientFrom: pdfSeo.gradientFrom,
      gradientTo: pdfSeo.gradientTo
    };
  }

  // Generate default content with comprehensive fields
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
    metaDescription: `Use our free ${toolName.toLowerCase()} tool online. Fast, secure, and easy to use. No signup required. Process files instantly in your browser.`,
    h1: `${toolName} - Free Online Tool`,
    shortDescription: `Use our ${toolName.toLowerCase()} for quick and easy processing with professional results.`,
    longDescription: `Our ${toolName.toLowerCase()} provides a fast, secure, and easy way to process your files online. All processing happens in your browser, ensuring your files remain private and secure. No signup, registration, or software installation required. Whether you are a professional, student, or casual user, this tool delivers the results you need instantly.`,
    howToUse: [
      "Upload your file by clicking or dragging into the upload area",
      "Adjust settings and options as needed for your requirements",
      "Click the process button to start the conversion",
      "Download your processed file instantly"
    ],
    benefits: [
      "100% free to use with no hidden charges",
      "No signup or registration required",
      "Fast processing entirely in your browser",
      "Your files stay private and secure",
      "Works on any device and browser",
      "No watermarks on output files"
    ],
    whyImportant: `${toolName} is an essential tool for anyone working with digital files. Whether you are a professional designer, content creator, business owner, student, or just need to quickly process a file, this tool provides the functionality you need with no hassle. Save time and get professional results instantly.`,
    keyFeatures: getDefaultKeyFeatures(category),
    whoCanUse: getDefaultWhoCanUse(category),
    privacyNote: getDefaultPrivacyNote(),
    conclusion: getDefaultConclusion(toolName),
    faqs: [
      { question: `Is ${toolName} free to use?`, answer: "Yes, this tool is completely free with no hidden charges, premium features, or subscription required. Use it as much as you need." },
      { question: "Do I need to create an account?", answer: "No, you can use this tool immediately without any signup, registration, or login. Just upload your file and start processing." },
      { question: "Is my data secure and private?", answer: "Yes, all processing happens securely in your browser. Your files are never uploaded to our servers or stored anywhere. Your privacy is completely protected." },
      { question: "What file formats are supported?", answer: "We support all major file formats relevant to this tool. Check the upload area for the complete list of accepted formats." },
      { question: "Does this work on mobile devices?", answer: "Yes, our tool is fully responsive and works perfectly on smartphones, tablets, and desktop computers. No app download required." },
      { question: "Are there any file size limits?", answer: "For optimal browser performance, we recommend files under 50MB. Larger files may take longer to process depending on your device." }
    ],
    relatedTools: [],
    category,
    categorySlug,
    keywords: [slug.replace(/-/g, " "), toolName.toLowerCase(), category.toLowerCase()],
    gradientFrom: gradient.from,
    gradientTo: gradient.to
  };
};

// Helper functions for default content
const getDefaultKeyFeatures = (category: string): string[] => {
  const categoryFeatures: Record<string, string[]> = {
    "Image Converter": [
      "Support for all major image formats",
      "High-quality conversion output",
      "Fast browser-based processing",
      "Batch conversion support",
      "No quality loss during conversion",
      "Instant download of converted files"
    ],
    "Image Compression": [
      "Smart compression algorithms",
      "Adjustable quality settings",
      "Maintains visual quality",
      "Significant file size reduction",
      "Batch compression support",
      "Preview before download"
    ],
    "Image Resize": [
      "Precise dimension control",
      "Maintain aspect ratio option",
      "Multiple resize modes",
      "High-quality scaling",
      "Batch resize support",
      "Preview before download"
    ],
    "Image Crop": [
      "Precise cropping controls",
      "Multiple aspect ratio presets",
      "Free-form selection",
      "Visual crop preview",
      "No quality degradation",
      "Undo and redo support"
    ],
    "Rotate & Flip": [
      "90, 180, 270 degree rotation",
      "Horizontal and vertical flip",
      "Custom angle rotation",
      "Real-time preview",
      "Maintains image quality",
      "Batch processing support"
    ],
    "Photo Filters": [
      "Professional filter effects",
      "Adjustable intensity levels",
      "Real-time preview",
      "Multiple filter options",
      "Combine multiple effects",
      "Original quality preserved"
    ],
    "Watermark Tools": [
      "Text and image watermarks",
      "Adjustable position and size",
      "Opacity control",
      "Multiple font options",
      "Batch watermarking",
      "Professional results"
    ],
    "PDF Tools": [
      "Fast PDF processing",
      "Maintains document quality",
      "Secure browser processing",
      "No file size limits",
      "Works with all PDF versions",
      "Instant download"
    ]
  };

  return categoryFeatures[category] || [
    "Fast and instant processing",
    "100% free with no hidden costs",
    "Works on all devices and browsers",
    "No registration or login required",
    "Secure and private processing",
    "Professional-quality results"
  ];
};

const getDefaultWhoCanUse = (category: string): string[] => {
  const categoryUsers: Record<string, string[]> = {
    "Image Converter": ["Web Developers", "Graphic Designers", "Content Creators", "Photographers", "Marketing Teams", "Anyone with images"],
    "Image Compression": ["Website Owners", "Email Marketers", "Bloggers", "Photographers", "E-commerce Sellers", "Social Media Managers"],
    "Image Resize": ["Social Media Managers", "E-commerce Sellers", "Graphic Designers", "Photographers", "Web Developers", "Content Creators"],
    "Image Crop": ["Photographers", "Designers", "Social Media Managers", "Content Creators", "Marketing Teams", "Personal Users"],
    "Rotate & Flip": ["Photographers", "Content Editors", "Social Media Users", "Designers", "Personal Users", "Anyone with images"],
    "Photo Filters": ["Photographers", "Influencers", "Content Creators", "Social Media Managers", "Hobbyists", "Marketing Teams"],
    "Watermark Tools": ["Photographers", "Artists", "Businesses", "Content Creators", "Agencies", "Freelancers"],
    "PDF Tools": ["Business Professionals", "Students", "Teachers", "Legal Teams", "Administrative Staff", "Anyone with documents"]
  };

  return categoryUsers[category] || ["Professionals", "Students", "Business Owners", "Content Creators", "Personal Users", "Anyone needing this tool"];
};

const getDefaultPrivacyNote = (): string => {
  return "Your privacy is our top priority. All file processing happens securely in your browser. We never upload, store, or have access to your files. Your documents and images remain completely private and are automatically cleared from memory after processing. No account, login, or personal information required.";
};

const getDefaultConclusion = (toolName: string): string => {
  return `Start using our free ${toolName} today and experience fast, secure, and professional results. No signup required, no software to install, just instant processing in your browser. Try it now and see why thousands of users trust our tools for their daily needs!`;
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

  // PDF Tools
  ["pdf-merge", "pdf-compress", "word-to-pdf", "pdf-split", "pdf-to-jpg", "jpg-to-pdf"].forEach(slug => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tools.push({ slug, name, category: "PDF Tools", categorySlug: "pdf-tools" });
  });

  // SEO Tools
  [
    ["keyword-density-checker", "Keyword Density Checker"],
    ["meta-tag-generator", "Meta Tag Generator"],
    ["word-counter", "Word Counter"],
    ["open-graph-checker", "Open Graph Checker"],
    ["heading-checker", "Heading Structure Checker"],
    ["text-case-converter", "Text Case Converter"],
  ].forEach(([slug, name]) => {
    tools.push({ slug, name, category: "SEO Tools", categorySlug: "seo-tools" });
  });

  return tools;
};