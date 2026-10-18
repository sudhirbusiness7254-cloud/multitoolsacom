import blogCompressionImage from "@/assets/guides/tool-compress.jpg";
import blogFormatsImage from "@/assets/guides/tool-webp-convert.jpg";
import blogSpeedImage from "@/assets/guides/tool-optimize.jpg";
import blogWatermarkImage from "@/assets/guides/tool-watermark.jpg";
import blogSocialImage from "@/assets/guides/tool-exact-resize.jpg";
import blogMetadataImage from "@/assets/guides/tool-metadata.jpg";
import blogHeicImage from "@/assets/guides/tool-heic-convert.jpg";
import blogBatchImage from "@/assets/guides/step-upload-4k.png";
import blogPdfImage from "@/assets/guides/tool-pdf.jpg";
import blogCropImage from "@/assets/guides/tool-crop.jpg";
import blogTransparentImage from "@/assets/guides/tool-svg-convert.jpg";
import blogQrImage from "@/assets/guides/tool-qr.jpg";
import blogFiltersImage from "@/assets/guides/tool-filters.jpg";
import blogEcommerceImage from "@/assets/guides/after-compress.jpg";
import blogSecurityImage from "@/assets/guides/tool-security.jpg";
import blogImageSeoImage from "@/assets/guides/blog-image-seo.jpg";
import blogCoreWebVitalsImage from "@/assets/guides/blog-core-web-vitals.jpg";
import blogAvifVsWebpImage from "@/assets/guides/blog-avif-vs-webp.jpg";
import blogLazyLoadingImage from "@/assets/guides/blog-lazy-loading.jpg";
import blogImageCdnImage from "@/assets/guides/blog-image-cdn.jpg";
import blogResponsiveSrcsetImage from "@/assets/guides/blog-responsive-srcset.jpg";
import blogColorMgmtImage from "@/assets/guides/blog-color-management.jpg";
import blogScreenshotImage from "@/assets/guides/blog-screenshot-workflow.jpg";
import blogOcrImage from "@/assets/guides/blog-ocr-extraction.jpg";
import blogGifVsVideoImage from "@/assets/guides/blog-gif-vs-video.jpg";
import blogA11yImage from "@/assets/guides/blog-image-accessibility.jpg";
import blogAiUpscalingImage from "@/assets/guides/blog-ai-upscaling.jpg";
import blogExifOrientationImage from "@/assets/guides/blog-exif-orientation.jpg";
import blogSvgOptimizationImage from "@/assets/guides/blog-svg-optimization.jpg";
import blogScreenshotFormatsImage from "@/assets/guides/blog-screenshot-formats.jpg";
import blogDitheringImage from "@/assets/guides/blog-dithering.jpg";
import blogClsFontsImage from "@/assets/guides/blog-cls-fonts.jpg";
import blogC2paImage from "@/assets/guides/blog-c2pa-watermarks.jpg";
import blogSpritesImage from "@/assets/guides/blog-image-sprites.jpg";
import blogDprQualityImage from "@/assets/guides/blog-dpr-quality.jpg";
import blogProxySsrfImage from "@/assets/guides/blog-image-proxy-ssrf.jpg";
import blogHeifImage from "@/assets/guides/blog-heif-deep-dive.jpg";
import blogJpegXlImage from "@/assets/guides/blog-jpeg-xl.jpg";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  category: string;
}

export const authorProfiles: Record<string, { role: string; bio: string; expertise: string[] }> = {
  "Sudhir Sharma": {
    role: "Founder & Lead Developer",
    bio: "Sudhir builds browser-based image and document tools focused on privacy, fast processing, and practical workflows for creators, students, and small businesses.",
    expertise: ["Browser image processing", "Canvas API", "Client-side privacy"]
  },
  "Priya Mehta": {
    role: "Web Performance Engineer",
    bio: "Priya reviews Convert guides for page-speed accuracy, image optimization best practices, accessibility, and Core Web Vitals recommendations.",
    expertise: ["Core Web Vitals", "Image compression", "Accessible interfaces"]
  },
  "Amit Verma": {
    role: "Digital Privacy Researcher",
    bio: "Amit writes about safe file handling, metadata risks, copyright-aware publishing, and privacy-first online workflows.",
    expertise: ["EXIF privacy", "Secure sharing", "Copyright-safe publishing"]
  }
};

export const blogPosts: BlogPost[] = [
  // 10 NEWEST UNIQUE POSTS (June 2026)
  {
    id: "svg-optimization-2026-svgo-inline-best-practices",
    title: "SVG Optimization in 2026: SVGO Defaults, Inline vs External, and the 4 KB Audit Rule",
    excerpt: "Exported SVGs ship with 40-70% wasted bytes. A practical 2026 audit covering SVGO plugin tuning, the inline-vs-reference decision matrix, sprite patterns that still work, and an accessibility checklist most teams skip.",
    author: "Priya Mehta",
    date: "June 7, 2026",
    readTime: "11 min read",
    tags: ["SVG", "Optimization", "Icons", "Performance"],
    image: blogSvgOptimizationImage,
    category: "Optimization"
  },
  {
    id: "best-image-format-for-screenshots-2026",
    title: "The Best Image Format for Screenshots in 2026: Why Default PNG Is the Wrong Answer",
    excerpt: "A 1440p OS screenshot ships as a 4 MB PNG by default and shrinks to 280 KB as WebP lossless with zero visible difference. The 2026 format hierarchy, why JPEG fails for UI text, and a documentation workflow that holds up.",
    author: "Sudhir Sharma",
    date: "June 5, 2026",
    readTime: "10 min read",
    tags: ["Screenshots", "WebP", "AVIF", "Documentation"],
    image: blogScreenshotFormatsImage,
    category: "Formats"
  },
  {
    id: "image-dithering-retro-aesthetic-web-2026",
    title: "Image Dithering in 2026: The Retro Aesthetic That Quietly Cuts File Size by 80%",
    excerpt: "Dithering returned to web design as a deliberate stylistic choice — and shrank hero image bytes to a quarter of WebP along the way. Floyd-Steinberg vs Atkinson vs Bayer, a Canvas recipe, and the surprising accessibility upside.",
    author: "Sudhir Sharma",
    date: "June 3, 2026",
    readTime: "10 min read",
    tags: ["Dithering", "Aesthetic", "PNG-8", "Design"],
    image: blogDitheringImage,
    category: "Editing"
  },
  {
    id: "cls-image-font-loading-shifts-2026",
    title: "CLS Is Two Bugs Pretending to Be One: Images, Fonts, and the size-adjust Fix",
    excerpt: "Half of Cumulative Layout Shift in 2026 comes from web fonts, not images, and teams that solve only one watch CLS hover at 0.15 forever. The image fix, the font-metric override that almost nobody ships, and how to audit both in one pass.",
    author: "Priya Mehta",
    date: "June 1, 2026",
    readTime: "11 min read",
    tags: ["CLS", "Core Web Vitals", "Fonts", "size-adjust"],
    image: blogClsFontsImage,
    category: "Optimization"
  },
  {
    id: "ai-content-credentials-c2pa-image-watermarks-2026",
    title: "Content Credentials and C2PA in 2026: The Invisible Watermark Standard You Will Have to Care About",
    excerpt: "AI disclosure laws now point at C2PA. What content credentials actually are, how the cryptographic provenance manifest survives the image pipeline (or doesn't), and how to integrate signing without breaking your CDN setup.",
    author: "Amit Verma",
    date: "May 30, 2026",
    readTime: "12 min read",
    tags: ["C2PA", "AI", "Watermarks", "Provenance"],
    image: blogC2paImage,
    category: "Security"
  },
  {
    id: "image-sprites-2026-still-useful",
    title: "Image Sprites in 2026: Why a 2009 Technique Refuses to Die",
    excerpt: "HTTP/2 was supposed to kill sprites. It didn't, because three of the assumptions behind that prediction turned out to be wrong. The 2026 SVG-symbol sprite pattern, when sprites still lose, and the build tooling that ships them in two lines.",
    author: "Sudhir Sharma",
    date: "May 27, 2026",
    readTime: "9 min read",
    tags: ["Sprites", "Icons", "HTTP/2", "Performance"],
    image: blogSpritesImage,
    category: "Optimization"
  },
  {
    id: "device-pixel-ratio-image-quality-strategy-2026",
    title: "Device Pixel Ratio Is the Hardest Image Problem in 2026: A Quality-Adjusted DPR Strategy",
    excerpt: "Ship 1x and Retina phones look soft. Ship 3x and desktop users download 9x the pixels they can show. The 2026 strategy: vary quality inversely with DPR, cap at 2x, and honor save-data. With per-image-type allocations that actually work.",
    author: "Priya Mehta",
    date: "May 25, 2026",
    readTime: "10 min read",
    tags: ["DPR", "Retina", "srcset", "Performance"],
    image: blogDprQualityImage,
    category: "Optimization"
  },
  {
    id: "image-proxy-ssrf-security-2026",
    title: "Every Image Proxy Is a Potential SSRF Hole: How to Build One Safely in 2026",
    excerpt: "Fetching user-provided image URLs is the single most common appearance of SSRF in 2026 OWASP data. Cloud metadata exposure, the DNS rebinding race condition almost everyone misses, and a working three-layer defense pattern.",
    author: "Amit Verma",
    date: "May 23, 2026",
    readTime: "12 min read",
    tags: ["Security", "SSRF", "Image Proxy", "OWASP"],
    image: blogProxySsrfImage,
    category: "Security"
  },
  {
    id: "heif-heic-deep-dive-2026",
    title: "HEIF vs HEIC vs AVIF: The Container, the Codec, and Why iPhone Photos Don't Open on Windows",
    excerpt: "HEIF is the container, HEIC is the encoding, AVIF reuses the same container with a different codec — and confusing the three produces the wrong technical decisions. A practical 2026 walkthrough of when each fits, and how to transcode without breaking EXIF orientation.",
    author: "Sudhir Sharma",
    date: "May 20, 2026",
    readTime: "11 min read",
    tags: ["HEIF", "HEIC", "AVIF", "iPhone"],
    image: blogHeifImage,
    category: "Formats"
  },
  {
    id: "jpeg-xl-2026-the-format-that-almost-was",
    title: "JPEG XL in 2026: The Best Image Format You Should Think Carefully Before Adopting",
    excerpt: "Lossless JPEG re-encoding at 80% the size, progressive decoding that actually looks good, support in Safari and Firefox — and total absence from Chrome. A pragmatic 2026 assessment of when to ship JXL and when to wait it out.",
    author: "Priya Mehta",
    date: "May 18, 2026",
    readTime: "11 min read",
    tags: ["JPEG XL", "JXL", "Image Formats", "Browser Support"],
    image: blogJpegXlImage,
    category: "Formats"
  },
  {
    id: "native-lazy-loading-vs-intersection-observer-2026",
    title: "Native Lazy Loading vs IntersectionObserver in 2026: Which Wins?",
    excerpt: "Native loading=\"lazy\" is everywhere now, but IntersectionObserver still owns carousels, modals, and virtualised lists. A clear-eyed comparison with hybrid patterns that actually ship.",
    author: "Priya Mehta",
    date: "May 28, 2026",
    readTime: "10 min read",
    tags: ["Lazy Loading", "IntersectionObserver", "Performance"],
    image: blogLazyLoadingImage,
    category: "Optimization"
  },
  {
    id: "image-cdn-vs-self-hosting-2026",
    title: "Image CDNs vs Self-Hosting in 2026: The True Cost-Per-Image Breakdown",
    excerpt: "Hosting bills, engineering hours, regression risk, and vendor lock-in — the honest trade-offs between a managed image CDN and rolling your own pipeline, with a decision framework you can use this afternoon.",
    author: "Sudhir Sharma",
    date: "May 22, 2026",
    readTime: "11 min read",
    tags: ["CDN", "Infrastructure", "Cost"],
    image: blogImageCdnImage,
    category: "Optimization"
  },
  {
    id: "responsive-images-srcset-sizes-math",
    title: "Responsive Images Demystified: srcset, sizes, and the Math Behind Picking the Right Width",
    excerpt: "Most sites ship srcset and quietly get sizes wrong, so the browser downloads a 1920px image for a 280px slot. Here is the actual math the browser does and how to write sizes that tell the truth.",
    author: "Priya Mehta",
    date: "May 15, 2026",
    readTime: "11 min read",
    tags: ["Responsive Images", "srcset", "Performance"],
    image: blogResponsiveSrcsetImage,
    category: "Optimization"
  },
  {
    id: "color-management-srgb-display-p3-web",
    title: "Color Management for the Web: sRGB, Display P3, and Why Your Reds Look Wrong",
    excerpt: "Modern phones ship Display P3, modern cameras capture wide gamut, and the web is still pretending it is 2005. A practical walkthrough of ICC profiles, the color() function, and a wide-gamut workflow that actually works.",
    author: "Sudhir Sharma",
    date: "May 8, 2026",
    readTime: "11 min read",
    tags: ["Color Management", "Display P3", "Design"],
    image: blogColorMgmtImage,
    category: "Formats"
  },
  {
    id: "lossless-screenshot-workflow-sub-100kb",
    title: "The Lossless Screenshot Workflow: From PNG Bloat to Sub-100KB Documentation Images",
    excerpt: "Default OS screenshots routinely weigh 1–2 MB for no reason. A simple crop, encode, and dimension recipe gets the same screenshots under 100 KB without visible loss — and how to automate it in your build.",
    author: "Priya Mehta",
    date: "May 1, 2026",
    readTime: "9 min read",
    tags: ["Screenshots", "Compression", "Documentation"],
    image: blogScreenshotImage,
    category: "Compression"
  },
  {
    id: "browser-based-ocr-image-text-extraction-2026",
    title: "Extracting Text from Images: How Browser-Based OCR Works in 2026",
    excerpt: "Tesseract.js, native TextDetector, and the right preprocessing pipeline now let you pull text out of images without a server. A practical comparison plus the workflow tricks that actually move accuracy.",
    author: "Sudhir Sharma",
    date: "April 24, 2026",
    readTime: "11 min read",
    tags: ["OCR", "Tesseract", "Privacy"],
    image: blogOcrImage,
    category: "Productivity"
  },
  {
    id: "animated-gif-vs-mp4-vs-webm-2026",
    title: "Animated GIF vs MP4 vs WebM Loop: The 2026 File-Size Showdown",
    excerpt: "A 6-second product demo is 6 MB as a GIF, 400 KB as MP4, 200 KB as AV1 WebM. The case for replacing animated GIF with muted inline video, with copy-paste markup and FFmpeg recipes.",
    author: "Sudhir Sharma",
    date: "April 18, 2026",
    readTime: "10 min read",
    tags: ["GIF", "Video", "Performance"],
    image: blogGifVsVideoImage,
    category: "Formats"
  },
  {
    id: "image-accessibility-beyond-alt-text-2026",
    title: "Image Accessibility Beyond Alt Text: ARIA, Decorative Images, and Screen Reader UX",
    excerpt: "Alt text is the floor, not the ceiling. Decorative vs informational images, accessible carousels, chart descriptions, and the interactive component patterns that work for keyboard and screen-reader users.",
    author: "Amit Verma",
    date: "April 10, 2026",
    readTime: "12 min read",
    tags: ["Accessibility", "ARIA", "Alt Text"],
    image: blogA11yImage,
    category: "Optimization"
  },
  {
    id: "how-ai-image-upscaling-actually-works-2026",
    title: "How AI Image Upscaling Actually Works: Diffusion, GANs, and Real-World Quality Tests",
    excerpt: "Behind the marketing phrase \"AI upscaling\" sit three very different techniques with very different trade-offs. What ESRGAN, diffusion upscalers, and classical interpolation actually do — and when each is the right tool.",
    author: "Sudhir Sharma",
    date: "April 2, 2026",
    readTime: "11 min read",
    tags: ["AI", "Upscaling", "Image Quality"],
    image: blogAiUpscalingImage,
    category: "Editing"
  },
  {
    id: "exif-orientation-bug-photos-rotating-sideways",
    title: "The EXIF Orientation Bug: Why Your Uploaded Photos Keep Rotating Sideways",
    excerpt: "A 30-year-old metadata workaround for a hardware constraint is still rotating phone photos on the web in 2026. How EXIF orientation actually works, why pipelines silently break it, and the one-step fix.",
    author: "Amit Verma",
    date: "March 26, 2026",
    readTime: "9 min read",
    tags: ["EXIF", "Metadata", "Image Bugs"],
    image: blogExifOrientationImage,
    category: "Privacy"
  },
  {
    id: "core-web-vitals-image-loading-2026",
    title: "Core Web Vitals 2026: How Image Loading Quietly Decides Your LCP, CLS, and INP",
    excerpt: "Images are the single biggest reason most sites fail Core Web Vitals. This deep-dive shows exactly how LCP, CLS, and INP react to image decisions — preload, priority hints, aspect-ratio boxes, decoding, and INP-friendly patterns for 2026.",
    author: "Priya Mehta",
    date: "April 12, 2026",
    readTime: "14 min read",
    tags: ["Core Web Vitals", "LCP", "CLS", "INP", "Performance"],
    image: blogCoreWebVitalsImage,
    category: "Optimization"
  },
  {
    id: "avif-vs-webp-2026-which-to-ship",
    title: "AVIF vs WebP in 2026: Which Next-Gen Image Format Should You Actually Ship?",
    excerpt: "AVIF now beats WebP on file size for most photos, but WebP still wins on encode speed, tooling, and edge cases. An honest 2026 comparison covering browser support, quality at small sizes, transparency, animation, and a copy-paste <picture> fallback.",
    author: "Sudhir Sharma",
    date: "April 5, 2026",
    readTime: "11 min read",
    tags: ["AVIF", "WebP", "Image Formats", "Performance"],
    image: blogAvifVsWebpImage,
    category: "Formats"
  },
  {
    id: "image-seo-alt-text-filenames-guide",
    title: "Image SEO Guide: Alt Text, Filenames, and Schema That Actually Rank",
    excerpt: "Most image SEO advice is generic. This practical guide shows how to name files, write alt text, structure captions, and add ImageObject schema so your images rank in Google Images and pull traffic to your pages.",
    author: "Priya Mehta",
    date: "March 28, 2026",
    readTime: "13 min read",
    tags: ["Image SEO", "Alt Text", "Google Images", "Schema"],
    image: blogImageSeoImage,
    category: "Optimization"
  },
  {
    id: "complete-guide-image-compression",
    title: "Complete Guide to Image Compression: Techniques, Tools, and Best Practices",
    excerpt: "Learn everything about image compression, from lossy vs lossless techniques to choosing the right format for your needs. Discover how to reduce file sizes without sacrificing quality.",
    author: "Priya Mehta",
    date: "March 10, 2026",
    readTime: "12 min read",
    tags: ["Image Compression", "Optimization", "Web Performance"],
    image: blogCompressionImage,
    category: "Compression"
  },
  {
    id: "image-formats-explained",
    title: "Image Formats Explained: JPEG vs PNG vs WebP vs GIF - Which Should You Use?",
    excerpt: "Understand the differences between popular image formats. Learn when to use JPEG, PNG, WebP, or GIF for optimal quality and performance in different scenarios.",
    author: "Sudhir Sharma",
    date: "March 8, 2026",
    readTime: "10 min read",
    tags: ["Image Formats", "JPEG", "PNG", "WebP"],
    image: blogFormatsImage,
    category: "Formats"
  },
  {
    id: "optimize-images-website-speed",
    title: "How to Optimize Images for Faster Website Loading Speed",
    excerpt: "Website speed matters for SEO and user experience. Discover proven strategies to optimize your images and improve page load times significantly.",
    author: "Priya Mehta",
    date: "March 5, 2026",
    readTime: "8 min read",
    tags: ["SEO", "Web Performance", "Optimization"],
    image: blogSpeedImage,
    category: "Optimization"
  },
  {
    id: "watermark-images-protect-photos",
    title: "How to Watermark Your Images: Protect Your Photos and Build Your Brand",
    excerpt: "Learn the best practices for watermarking your images. Discover different watermark styles, placement strategies, and tools to protect your creative work.",
    author: "Amit Verma",
    date: "March 3, 2026",
    readTime: "7 min read",
    tags: ["Watermarking", "Copyright", "Photography"],
    image: blogWatermarkImage,
    category: "Security"
  },
  {
    id: "resize-images-social-media",
    title: "Image Sizing Guide for Social Media: Perfect Dimensions for Every Platform",
    excerpt: "Get the perfect image dimensions for Facebook, Instagram, Twitter, LinkedIn, and more. Our comprehensive guide ensures your images look great everywhere.",
    author: "Priya Mehta",
    date: "February 28, 2026",
    readTime: "9 min read",
    tags: ["Social Media", "Image Resizing", "Marketing"],
    image: blogSocialImage,
    category: "Social Media"
  },
  {
    id: "remove-image-metadata-privacy",
    title: "Image Metadata and Privacy: Why You Should Remove EXIF Data Before Sharing",
    excerpt: "Your photos contain hidden data that reveals your location, camera settings, and more. Learn why and how to remove metadata to protect your privacy.",
    author: "Amit Verma",
    date: "February 25, 2026",
    readTime: "6 min read",
    tags: ["Privacy", "Metadata", "Security"],
    image: blogMetadataImage,
    category: "Privacy"
  },
  // 9 NEW BLOG POSTS
  {
    id: "heic-to-jpg-conversion-guide",
    title: "HEIC to JPG Conversion: The Complete Guide for iPhone Users",
    excerpt: "iPhone photos saved as HEIC causing compatibility issues? Learn how to convert HEIC to JPG quickly and understand when to use each format for best results.",
    author: "Sudhir Sharma",
    date: "February 22, 2026",
    readTime: "7 min read",
    tags: ["HEIC", "iPhone", "Format Conversion"],
    image: blogHeicImage,
    category: "Formats"
  },
  {
    id: "batch-image-processing-workflow",
    title: "Batch Image Processing: How to Edit Hundreds of Images in Minutes",
    excerpt: "Stop editing images one by one. Master batch processing techniques to resize, compress, convert, and watermark hundreds of images efficiently using free online tools.",
    author: "Priya Mehta",
    date: "February 18, 2026",
    readTime: "11 min read",
    tags: ["Batch Processing", "Productivity", "Workflow"],
    image: blogBatchImage,
    category: "Productivity"
  },
  {
    id: "pdf-image-tools-complete-guide",
    title: "Working with PDFs and Images: Convert, Merge, and Optimize Like a Pro",
    excerpt: "Master PDF and image workflows. Learn how to convert images to PDF, merge multiple PDFs, compress large files, and extract images from documents.",
    author: "Sudhir Sharma",
    date: "February 15, 2026",
    readTime: "10 min read",
    tags: ["PDF", "Document Conversion", "Productivity"],
    image: blogPdfImage,
    category: "PDF Tools"
  },
  {
    id: "image-cropping-techniques",
    title: "Image Cropping Mastery: Techniques That Transform Your Photos",
    excerpt: "Learn professional cropping techniques including the rule of thirds, golden ratio, and aspect ratio selection. Transform ordinary photos into stunning compositions.",
    author: "Priya Mehta",
    date: "February 12, 2026",
    readTime: "8 min read",
    tags: ["Cropping", "Photography", "Composition"],
    image: blogCropImage,
    category: "Editing"
  },
  {
    id: "transparent-background-images",
    title: "Creating Transparent Backgrounds: Complete PNG Transparency Guide",
    excerpt: "Need images with transparent backgrounds for logos, product photos, or graphics? Learn multiple techniques to remove backgrounds and create perfect PNGs.",
    author: "Sudhir Sharma",
    date: "February 8, 2026",
    readTime: "9 min read",
    tags: ["Transparency", "PNG", "Background Removal"],
    image: blogTransparentImage,
    category: "Editing"
  },
  {
    id: "qr-code-image-integration",
    title: "QR Codes and Images: Design Tips for Scannable, Beautiful QR Codes",
    excerpt: "Create QR codes that are both functional and visually appealing. Learn about custom colors, logo embedding, error correction, and testing best practices.",
    author: "Sudhir Sharma",
    date: "February 5, 2026",
    readTime: "6 min read",
    tags: ["QR Code", "Design", "Marketing"],
    image: blogQrImage,
    category: "Marketing"
  },
  {
    id: "photo-filters-effects-guide",
    title: "Photo Filters and Effects: From Basic Adjustments to Creative Transformations",
    excerpt: "Master photo enhancement with our guide to filters and effects. Learn about brightness, contrast, saturation, and creative filters like sepia, vintage, and more.",
    author: "Priya Mehta",
    date: "February 1, 2026",
    readTime: "8 min read",
    tags: ["Photo Filters", "Image Enhancement", "Creativity"],
    image: blogFiltersImage,
    category: "Editing"
  },
  {
    id: "ecommerce-product-image-optimization",
    title: "E-commerce Product Images: Optimization Guide for Higher Conversions",
    excerpt: "Optimize your product images for e-commerce success. Learn about ideal sizes, backgrounds, compression settings, and multi-angle photography best practices.",
    author: "Priya Mehta",
    date: "January 28, 2026",
    readTime: "12 min read",
    tags: ["E-commerce", "Product Photography", "Conversion"],
    image: blogEcommerceImage,
    category: "E-commerce"
  },
  {
    id: "image-security-encryption-guide",
    title: "Image Security: Encrypt, Blur, and Protect Sensitive Visual Content",
    excerpt: "Keep your images secure with encryption, face blurring, and area redaction techniques. Essential knowledge for handling confidential photos and documents.",
    author: "Amit Verma",
    date: "January 25, 2026",
    readTime: "7 min read",
    tags: ["Security", "Encryption", "Privacy"],
    image: blogSecurityImage,
    category: "Security"
  }
];

export const blogCategories = [
  "All",
  "Compression",
  "Formats",
  "Optimization",
  "Editing",
  "Security",
  "PDF Tools",
  "Social Media",
  "E-commerce",
  "Privacy",
  "Marketing",
  "Productivity"
];
