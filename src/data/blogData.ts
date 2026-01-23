// Blog images
import imageCompressionGuide from "@/assets/blog/image-compression-guide.jpg";
import imageFormatsExplained from "@/assets/blog/image-formats-explained.jpg";
import websiteSpeedOptimization from "@/assets/blog/website-speed-optimization.jpg";
import watermarkProtection from "@/assets/blog/watermark-protection.jpg";
import socialMediaImageSizes from "@/assets/blog/social-media-image-sizes.jpg";
import imageMetadataPrivacy from "@/assets/blog/image-metadata-privacy.jpg";
import heicToJpgGuide from "@/assets/blog/heic-to-jpg-guide.jpg";
import batchProcessingWorkflow from "@/assets/blog/batch-processing-workflow.jpg";
import pdfImageTools from "@/assets/blog/pdf-image-tools.jpg";
import imageCroppingTechniques from "@/assets/blog/image-cropping-techniques.jpg";
import transparentBackgrounds from "@/assets/blog/transparent-backgrounds.jpg";
import qrCodeDesign from "@/assets/blog/qr-code-design.jpg";
import photoFiltersEffects from "@/assets/blog/photo-filters-effects.jpg";
import ecommerceProductImages from "@/assets/blog/ecommerce-product-images.jpg";
import imageSecurityEncryption from "@/assets/blog/image-security-encryption.jpg";

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

export const blogPosts: BlogPost[] = [
  {
    id: "complete-guide-image-compression",
    title: "Complete Guide to Image Compression: Techniques, Tools, and Best Practices",
    excerpt: "Learn everything about image compression, from lossy vs lossless techniques to choosing the right format for your needs. Discover how to reduce file sizes without sacrificing quality.",
    author: "MultiToolsA Team",
    date: "December 10, 2025",
    readTime: "12 min read",
    tags: ["Image Compression", "Optimization", "Web Performance"],
    image: imageCompressionGuide,
    category: "Compression"
  },
  {
    id: "image-formats-explained",
    title: "Image Formats Explained: JPEG vs PNG vs WebP vs GIF - Which Should You Use?",
    excerpt: "Understand the differences between popular image formats. Learn when to use JPEG, PNG, WebP, or GIF for optimal quality and performance in different scenarios.",
    author: "MultiToolsA Team",
    date: "December 8, 2025",
    readTime: "10 min read",
    tags: ["Image Formats", "JPEG", "PNG", "WebP"],
    image: imageFormatsExplained,
    category: "Formats"
  },
  {
    id: "optimize-images-website-speed",
    title: "How to Optimize Images for Faster Website Loading Speed",
    excerpt: "Website speed matters for SEO and user experience. Discover proven strategies to optimize your images and improve page load times significantly.",
    author: "MultiToolsA Team",
    date: "December 5, 2025",
    readTime: "8 min read",
    tags: ["SEO", "Web Performance", "Optimization"],
    image: websiteSpeedOptimization,
    category: "Optimization"
  },
  {
    id: "watermark-images-protect-photos",
    title: "How to Watermark Your Images: Protect Your Photos and Build Your Brand",
    excerpt: "Learn the best practices for watermarking your images. Discover different watermark styles, placement strategies, and tools to protect your creative work.",
    author: "MultiToolsA Team",
    date: "December 3, 2025",
    readTime: "7 min read",
    tags: ["Watermarking", "Copyright", "Photography"],
    image: watermarkProtection,
    category: "Security"
  },
  {
    id: "resize-images-social-media",
    title: "Image Sizing Guide for Social Media: Perfect Dimensions for Every Platform",
    excerpt: "Get the perfect image dimensions for Facebook, Instagram, Twitter, LinkedIn, and more. Our comprehensive guide ensures your images look great everywhere.",
    author: "MultiToolsA Team",
    date: "November 30, 2025",
    readTime: "9 min read",
    tags: ["Social Media", "Image Resizing", "Marketing"],
    image: socialMediaImageSizes,
    category: "Social Media"
  },
  {
    id: "remove-image-metadata-privacy",
    title: "Image Metadata and Privacy: Why You Should Remove EXIF Data Before Sharing",
    excerpt: "Your photos contain hidden data that reveals your location, camera settings, and more. Learn why and how to remove metadata to protect your privacy.",
    author: "MultiToolsA Team",
    date: "November 28, 2025",
    readTime: "6 min read",
    tags: ["Privacy", "Metadata", "Security"],
    image: imageMetadataPrivacy,
    category: "Privacy"
  },
  {
    id: "heic-to-jpg-conversion-guide",
    title: "HEIC to JPG Conversion: The Complete Guide for iPhone Users",
    excerpt: "iPhone photos saved as HEIC causing compatibility issues? Learn how to convert HEIC to JPG quickly and understand when to use each format for best results.",
    author: "MultiToolsA Team",
    date: "November 25, 2025",
    readTime: "7 min read",
    tags: ["HEIC", "iPhone", "Format Conversion"],
    image: heicToJpgGuide,
    category: "Formats"
  },
  {
    id: "batch-image-processing-workflow",
    title: "Batch Image Processing: How to Edit Hundreds of Images in Minutes",
    excerpt: "Stop editing images one by one. Master batch processing techniques to resize, compress, convert, and watermark hundreds of images efficiently using free online tools.",
    author: "MultiToolsA Team",
    date: "November 22, 2025",
    readTime: "11 min read",
    tags: ["Batch Processing", "Productivity", "Workflow"],
    image: batchProcessingWorkflow,
    category: "Productivity"
  },
  {
    id: "pdf-image-tools-complete-guide",
    title: "Working with PDFs and Images: Convert, Merge, and Optimize Like a Pro",
    excerpt: "Master PDF and image workflows. Learn how to convert images to PDF, merge multiple PDFs, compress large files, and extract images from documents.",
    author: "MultiToolsA Team",
    date: "November 18, 2025",
    readTime: "10 min read",
    tags: ["PDF", "Document Conversion", "Productivity"],
    image: pdfImageTools,
    category: "PDF Tools"
  },
  {
    id: "image-cropping-techniques",
    title: "Image Cropping Mastery: Techniques That Transform Your Photos",
    excerpt: "Learn professional cropping techniques including the rule of thirds, golden ratio, and aspect ratio selection. Transform ordinary photos into stunning compositions.",
    author: "MultiToolsA Team",
    date: "November 15, 2025",
    readTime: "8 min read",
    tags: ["Cropping", "Photography", "Composition"],
    image: imageCroppingTechniques,
    category: "Editing"
  },
  {
    id: "transparent-background-images",
    title: "Creating Transparent Backgrounds: Complete PNG Transparency Guide",
    excerpt: "Need images with transparent backgrounds for logos, product photos, or graphics? Learn multiple techniques to remove backgrounds and create perfect PNGs.",
    author: "MultiToolsA Team",
    date: "November 12, 2025",
    readTime: "9 min read",
    tags: ["Transparency", "PNG", "Background Removal"],
    image: transparentBackgrounds,
    category: "Editing"
  },
  {
    id: "qr-code-image-integration",
    title: "QR Codes and Images: Design Tips for Scannable, Beautiful QR Codes",
    excerpt: "Create QR codes that are both functional and visually appealing. Learn about custom colors, logo embedding, error correction, and testing best practices.",
    author: "MultiToolsA Team",
    date: "November 8, 2025",
    readTime: "6 min read",
    tags: ["QR Code", "Design", "Marketing"],
    image: qrCodeDesign,
    category: "Marketing"
  },
  {
    id: "photo-filters-effects-guide",
    title: "Photo Filters and Effects: From Basic Adjustments to Creative Transformations",
    excerpt: "Master photo enhancement with our guide to filters and effects. Learn about brightness, contrast, saturation, and creative filters like sepia, vintage, and more.",
    author: "MultiToolsA Team",
    date: "November 5, 2025",
    readTime: "8 min read",
    tags: ["Photo Filters", "Image Enhancement", "Creativity"],
    image: photoFiltersEffects,
    category: "Editing"
  },
  {
    id: "ecommerce-product-image-optimization",
    title: "E-commerce Product Images: Optimization Guide for Higher Conversions",
    excerpt: "Optimize your product images for e-commerce success. Learn about ideal sizes, backgrounds, compression settings, and multi-angle photography best practices.",
    author: "MultiToolsA Team",
    date: "November 1, 2025",
    readTime: "12 min read",
    tags: ["E-commerce", "Product Photography", "Conversion"],
    image: ecommerceProductImages,
    category: "E-commerce"
  },
  {
    id: "image-security-encryption-guide",
    title: "Image Security: Encrypt, Blur, and Protect Sensitive Visual Content",
    excerpt: "Keep your images secure with encryption, face blurring, and area redaction techniques. Essential knowledge for handling confidential photos and documents.",
    author: "MultiToolsA Team",
    date: "October 28, 2025",
    readTime: "7 min read",
    tags: ["Security", "Encryption", "Privacy"],
    image: imageSecurityEncryption,
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
