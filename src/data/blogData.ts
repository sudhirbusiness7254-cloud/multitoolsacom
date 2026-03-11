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
    date: "March 10, 2026",
    readTime: "12 min read",
    tags: ["Image Compression", "Optimization", "Web Performance"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    category: "Compression"
  },
  {
    id: "image-formats-explained",
    title: "Image Formats Explained: JPEG vs PNG vs WebP vs GIF - Which Should You Use?",
    excerpt: "Understand the differences between popular image formats. Learn when to use JPEG, PNG, WebP, or GIF for optimal quality and performance in different scenarios.",
    author: "MultiToolsA Team",
    date: "March 8, 2026",
    readTime: "10 min read",
    tags: ["Image Formats", "JPEG", "PNG", "WebP"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    category: "Formats"
  },
  {
    id: "optimize-images-website-speed",
    title: "How to Optimize Images for Faster Website Loading Speed",
    excerpt: "Website speed matters for SEO and user experience. Discover proven strategies to optimize your images and improve page load times significantly.",
    author: "MultiToolsA Team",
    date: "March 5, 2026",
    readTime: "8 min read",
    tags: ["SEO", "Web Performance", "Optimization"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Optimization"
  },
  {
    id: "watermark-images-protect-photos",
    title: "How to Watermark Your Images: Protect Your Photos and Build Your Brand",
    excerpt: "Learn the best practices for watermarking your images. Discover different watermark styles, placement strategies, and tools to protect your creative work.",
    author: "MultiToolsA Team",
    date: "March 3, 2026",
    readTime: "7 min read",
    tags: ["Watermarking", "Copyright", "Photography"],
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop",
    category: "Security"
  },
  {
    id: "resize-images-social-media",
    title: "Image Sizing Guide for Social Media: Perfect Dimensions for Every Platform",
    excerpt: "Get the perfect image dimensions for Facebook, Instagram, Twitter, LinkedIn, and more. Our comprehensive guide ensures your images look great everywhere.",
    author: "MultiToolsA Team",
    date: "February 28, 2026",
    readTime: "9 min read",
    tags: ["Social Media", "Image Resizing", "Marketing"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop",
    category: "Social Media"
  },
  {
    id: "remove-image-metadata-privacy",
    title: "Image Metadata and Privacy: Why You Should Remove EXIF Data Before Sharing",
    excerpt: "Your photos contain hidden data that reveals your location, camera settings, and more. Learn why and how to remove metadata to protect your privacy.",
    author: "MultiToolsA Team",
    date: "February 25, 2026",
    readTime: "6 min read",
    tags: ["Privacy", "Metadata", "Security"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    category: "Privacy"
  },
  // 9 NEW BLOG POSTS
  {
    id: "heic-to-jpg-conversion-guide",
    title: "HEIC to JPG Conversion: The Complete Guide for iPhone Users",
    excerpt: "iPhone photos saved as HEIC causing compatibility issues? Learn how to convert HEIC to JPG quickly and understand when to use each format for best results.",
    author: "MultiToolsA Team",
    date: "February 22, 2026",
    readTime: "7 min read",
    tags: ["HEIC", "iPhone", "Format Conversion"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    category: "Formats"
  },
  {
    id: "batch-image-processing-workflow",
    title: "Batch Image Processing: How to Edit Hundreds of Images in Minutes",
    excerpt: "Stop editing images one by one. Master batch processing techniques to resize, compress, convert, and watermark hundreds of images efficiently using free online tools.",
    author: "MultiToolsA Team",
    date: "February 18, 2026",
    readTime: "11 min read",
    tags: ["Batch Processing", "Productivity", "Workflow"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "Productivity"
  },
  {
    id: "pdf-image-tools-complete-guide",
    title: "Working with PDFs and Images: Convert, Merge, and Optimize Like a Pro",
    excerpt: "Master PDF and image workflows. Learn how to convert images to PDF, merge multiple PDFs, compress large files, and extract images from documents.",
    author: "MultiToolsA Team",
    date: "February 15, 2026",
    readTime: "10 min read",
    tags: ["PDF", "Document Conversion", "Productivity"],
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&h=400&fit=crop",
    category: "PDF Tools"
  },
  {
    id: "image-cropping-techniques",
    title: "Image Cropping Mastery: Techniques That Transform Your Photos",
    excerpt: "Learn professional cropping techniques including the rule of thirds, golden ratio, and aspect ratio selection. Transform ordinary photos into stunning compositions.",
    author: "MultiToolsA Team",
    date: "February 12, 2026",
    readTime: "8 min read",
    tags: ["Cropping", "Photography", "Composition"],
    image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=600&h=400&fit=crop",
    category: "Editing"
  },
  {
    id: "transparent-background-images",
    title: "Creating Transparent Backgrounds: Complete PNG Transparency Guide",
    excerpt: "Need images with transparent backgrounds for logos, product photos, or graphics? Learn multiple techniques to remove backgrounds and create perfect PNGs.",
    author: "MultiToolsA Team",
    date: "February 8, 2026",
    readTime: "9 min read",
    tags: ["Transparency", "PNG", "Background Removal"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    category: "Editing"
  },
  {
    id: "qr-code-image-integration",
    title: "QR Codes and Images: Design Tips for Scannable, Beautiful QR Codes",
    excerpt: "Create QR codes that are both functional and visually appealing. Learn about custom colors, logo embedding, error correction, and testing best practices.",
    author: "MultiToolsA Team",
    date: "February 5, 2026",
    readTime: "6 min read",
    tags: ["QR Code", "Design", "Marketing"],
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&h=400&fit=crop",
    category: "Marketing"
  },
  {
    id: "photo-filters-effects-guide",
    title: "Photo Filters and Effects: From Basic Adjustments to Creative Transformations",
    excerpt: "Master photo enhancement with our guide to filters and effects. Learn about brightness, contrast, saturation, and creative filters like sepia, vintage, and more.",
    author: "MultiToolsA Team",
    date: "February 1, 2026",
    readTime: "8 min read",
    tags: ["Photo Filters", "Image Enhancement", "Creativity"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    category: "Editing"
  },
  {
    id: "ecommerce-product-image-optimization",
    title: "E-commerce Product Images: Optimization Guide for Higher Conversions",
    excerpt: "Optimize your product images for e-commerce success. Learn about ideal sizes, backgrounds, compression settings, and multi-angle photography best practices.",
    author: "MultiToolsA Team",
    date: "January 28, 2026",
    readTime: "12 min read",
    tags: ["E-commerce", "Product Photography", "Conversion"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
    category: "E-commerce"
  },
  {
    id: "image-security-encryption-guide",
    title: "Image Security: Encrypt, Blur, and Protect Sensitive Visual Content",
    excerpt: "Keep your images secure with encryption, face blurring, and area redaction techniques. Essential knowledge for handling confidential photos and documents.",
    author: "MultiToolsA Team",
    date: "January 25, 2026",
    readTime: "7 min read",
    tags: ["Security", "Encryption", "Privacy"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
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
