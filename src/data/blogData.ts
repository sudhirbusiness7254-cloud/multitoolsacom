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
    bio: "Priya reviews MultiToolsA guides for page-speed accuracy, image optimization best practices, accessibility, and Core Web Vitals recommendations.",
    expertise: ["Core Web Vitals", "Image compression", "Accessible interfaces"]
  },
  "Amit Verma": {
    role: "Digital Privacy Researcher",
    bio: "Amit writes about safe file handling, metadata risks, copyright-aware publishing, and privacy-first online workflows.",
    expertise: ["EXIF privacy", "Secure sharing", "Copyright-safe publishing"]
  }
};

export const blogPosts: BlogPost[] = [
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
