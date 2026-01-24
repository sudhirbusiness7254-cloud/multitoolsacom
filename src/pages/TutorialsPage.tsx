import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdBottom, AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";
import HreflangTags from "@/components/HreflangTags";
import { 
  BookOpen, Image, Minimize2, Crop, FileText, Palette, Shield, ArrowRight, 
  Clock, CheckCircle, RotateCw, Maximize2, Settings, Type, Layers, 
  Database, QrCode, Pencil, Lock, FileImage, Download, Zap, ChevronDown, ChevronUp
} from "lucide-react";

// Tutorial screenshots
import tutorialCompress from "@/assets/guides/tutorial-compress.png";
import tutorialConvert from "@/assets/guides/tutorial-convert.png";
import tutorialResize from "@/assets/guides/tutorial-resize.png";
import tutorialCrop from "@/assets/guides/tutorial-crop.png";
import tutorialRotate from "@/assets/guides/tutorial-rotate.png";
import tutorialWatermark from "@/assets/guides/tutorial-watermark.png";
import tutorialPdf from "@/assets/guides/tutorial-pdf.png";
import tutorialFilters from "@/assets/guides/tutorial-filters.png";
import tutorialMetadata from "@/assets/guides/tutorial-metadata.png";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  category: string;
  content: string;
  screenshot?: string;
}

const tutorials: Tutorial[] = [
  {
    id: "compress-images-web",
    title: "How to Compress Images for the Web: A Complete Guide",
    description: "Learn the best practices for compressing images without losing quality. Covers JPEG, PNG, and WebP optimization techniques.",
    icon: <Minimize2 className="w-6 h-6" />,
    screenshot: tutorialCompress,
    duration: "10 min read",
    difficulty: "Beginner",
    category: "Image Compression",
    topics: ["Image Compression", "Web Optimization", "File Size Reduction"],
    content: `
## Why Image Compression Matters

Large images are one of the biggest culprits for slow-loading websites. Studies show that pages taking longer than 3 seconds to load see 53% of mobile users abandon them. Image compression helps you:

- **Improve page load speed** by 50-80%
- **Reduce bandwidth costs** for you and your visitors
- **Boost SEO rankings** (Google uses page speed as a ranking factor)
- **Enhance user experience** with faster content delivery

## Understanding Compression Types

### Lossy Compression
Lossy compression permanently removes some image data to achieve smaller file sizes. This is what JPEG uses. The key is finding the right balance—too much compression creates visible artifacts (blocky areas, color banding), while too little doesn't save much space.

**Best for:** Photographs, complex images with many colors
**Recommended quality:** 70-85% for web use

### Lossless Compression
Lossless compression reduces file size without removing any data—the original image can be perfectly reconstructed. PNG uses lossless compression.

**Best for:** Logos, graphics with text, screenshots, images needing transparency
**Typical reduction:** 10-50% smaller than unoptimized

## Step-by-Step Compression Guide

### Step 1: Choose the Right Format
Before compressing, ensure you're using the optimal format:
- **JPEG** for photographs (no transparency needed)
- **PNG** for graphics, logos, screenshots
- **WebP** for modern web (best compression, supports both lossy and lossless)

### Step 2: Resize First
Never compress oversized images. If your image displays at 800px wide on your website, don't use a 3000px source image. Resize to the display dimensions (or 2x for retina displays).

### Step 3: Compress Appropriately
Using MultiToolsA's compression tools:
1. Upload your image using drag-and-drop
2. Adjust the quality slider (start at 80%)
3. Preview the result to check quality
4. If acceptable, download; if not, try a higher quality setting

### Step 4: Test Your Results
After compression:
- Compare file sizes (aim for 50%+ reduction)
- View both versions at 100% zoom to check quality
- Test on your actual website

## Compression Quality Guidelines

| Use Case | Recommended Quality | Expected Size Reduction |
|----------|---------------------|------------------------|
| Hero images | 80-90% | 40-60% |
| Product photos | 75-85% | 50-70% |
| Thumbnails | 60-75% | 60-80% |
| Background images | 65-80% | 50-75% |

## Common Mistakes to Avoid

1. **Compressing multiple times** - Each re-compression of a JPEG further degrades quality
2. **Using JPEG for graphics** - Causes artifacts around text and sharp edges
3. **Ignoring dimensions** - Compressing a 4000px image when you only need 800px
4. **One size fits all** - Different images need different compression levels
5. **Not testing** - Always visually inspect compressed images

## Pro Tips

- Keep original, uncompressed versions as backups
- Create multiple sizes for responsive images (srcset)
- Consider next-gen formats like WebP with JPEG/PNG fallbacks
- Use our batch compression for processing multiple images efficiently
    `
  },
  {
    id: "convert-image-formats",
    title: "Image Format Conversion: When and How to Convert",
    description: "Master the art of converting between JPEG, PNG, WebP, GIF, and other formats. Know when each format is best.",
    icon: <Image className="w-6 h-6" />,
    duration: "8 min read",
    difficulty: "Beginner",
    category: "Image Converter",
    topics: ["Format Conversion", "JPEG", "PNG", "WebP"],
    screenshot: tutorialConvert,
    content: `
## Understanding Image Formats

Every image format was designed for specific purposes. Using the right format can dramatically reduce file sizes while maintaining quality, or preserve details that matter for your use case.

## Format Comparison

### JPEG (Joint Photographic Experts Group)
**Best for:** Photographs, images with gradients, web photos
**Supports:** Millions of colors
**Compression:** Lossy (some quality loss)
**Transparency:** No
**Animation:** No

JPEG excels at compressing photographs because its lossy algorithm is designed around human perception—it discards data our eyes are less sensitive to.

### PNG (Portable Network Graphics)
**Best for:** Logos, graphics with text, screenshots, images needing transparency
**Supports:** Millions of colors + full transparency
**Compression:** Lossless (no quality loss)
**Transparency:** Yes (alpha channel)
**Animation:** No (use APNG for animation)

PNG preserves every pixel perfectly, making it ideal for images where accuracy matters.

### WebP
**Best for:** Modern websites, any image type
**Supports:** Millions of colors + transparency
**Compression:** Both lossy and lossless
**Transparency:** Yes
**Animation:** Yes

WebP provides 25-35% smaller files than JPEG at equivalent quality, with full transparency support.

### GIF (Graphics Interchange Format)
**Best for:** Simple animations, small icons
**Supports:** 256 colors only
**Compression:** Lossless
**Transparency:** Limited (no semi-transparency)
**Animation:** Yes

GIF's 256-color limit makes it poor for photos but efficient for simple graphics.

## When to Convert

### Convert TO JPEG when:
- You have a PNG photograph (common from screenshots)
- File size matters more than perfect quality
- You don't need transparency
- Sharing via email or messaging

### Convert TO PNG when:
- You need transparency
- Image contains text or sharp edges
- You need lossless quality
- Creating graphics or logos

### Convert TO WebP when:
- Building a modern website
- You want the best compression
- You need both quality and small size
- Your audience uses modern browsers

### Convert FROM HEIC when:
- Sharing iPhone photos with non-Apple users
- Uploading to websites that don't support HEIC
- Editing in software that doesn't read HEIC

## Conversion Best Practices

1. **Start with the highest quality source** - You can't gain quality by converting
2. **Match format to use case** - Don't use PNG for photographs
3. **Consider your audience** - Check browser support for WebP
4. **Preserve originals** - Keep source files for future edits
5. **Batch convert efficiently** - Use our tools to process multiple files

## Using MultiToolsA for Conversion

1. Navigate to the appropriate converter (e.g., PNG to JPG)
2. Upload your image via drag-and-drop or click
3. Adjust quality settings if available
4. Download your converted file

All conversions happen in your browser—your images never leave your device.
    `
  },
  {
    id: "resize-images-correctly",
    title: "How to Resize Images Without Losing Quality",
    description: "Learn proper image resizing techniques for web, print, and social media. Understand resolution, dimensions, and aspect ratios.",
    icon: <Maximize2 className="w-6 h-6" />,
    duration: "7 min read",
    difficulty: "Beginner",
    category: "Image Resize",
    topics: ["Image Resizing", "Resolution", "Aspect Ratio"],
    screenshot: tutorialResize,
    content: `
## The Science of Image Resizing

Images are made of pixels—tiny squares of color. When you resize an image, you're either removing pixels (downscaling) or creating new ones (upscaling). Understanding this helps you resize correctly.

## Downscaling vs Upscaling

### Downscaling (Making Smaller)
When you reduce image dimensions, pixels are combined or removed. This generally works well:
- Quality is maintained or improved (less data to display)
- File size decreases significantly
- Sharp details are preserved at reasonable reduction levels

### Upscaling (Making Larger)
When you increase dimensions, the software must create new pixels that didn't exist:
- Some quality loss is inevitable
- The algorithm "guesses" what the new pixels should be
- Avoid upscaling more than 150-200% for best results

## Resolution and Dimensions Explained

**Resolution** is the number of pixels per unit area (usually PPI - pixels per inch).
**Dimensions** are the width and height in pixels.

| Use Case | Recommended Resolution | Typical Dimensions |
|----------|----------------------|-------------------|
| Web display | 72-96 PPI | 800-2000px wide |
| Social media | 72-96 PPI | 1080-1200px wide |
| Print (photo) | 300 PPI | Depends on print size |
| Print (large format) | 150-200 PPI | Depends on print size |

## Common Resize Scenarios

### For Website Images
1. Determine the maximum display size on your site
2. Double that for retina displays (e.g., 800px display = 1600px image)
3. Compress after resizing

### For Social Media
Each platform has optimal sizes:
- **Instagram Feed:** 1080 x 1080px (square) or 1080 x 1350px (portrait)
- **Facebook:** 1200 x 630px (link preview)
- **Twitter:** 1200 x 675px
- **LinkedIn:** 1200 x 627px

### For Email
Keep images under 600px wide for email compatibility. Compress aggressively—many email clients block large images.

## Step-by-Step Resizing Guide

### Using Exact Resize (specific dimensions)
1. Open our Exact Resize tool
2. Enter your desired width and height in pixels
3. Decide whether to maintain aspect ratio (recommended)
4. Upload your image
5. Download the resized version

### Using Percentage Resize
1. Open our Percentage Resize tool
2. Enter the scaling percentage (e.g., 50% makes it half size)
3. Upload your image
4. Download the resized version

### Using Fit-to-Box
1. Open our Fit-to-Box tool
2. Enter maximum width and height
3. The image will scale to fit within those boundaries while maintaining aspect ratio
4. Perfect for thumbnail generation

## Maintaining Quality While Resizing

1. **Start with the largest source** - You can always go smaller
2. **Resize in one step** - Multiple resizes compound quality loss
3. **Use appropriate algorithms** - Our tools use high-quality interpolation
4. **Sharpen after downscaling** - Large reductions may need slight sharpening
5. **Match format to content** - Use PNG for graphics, JPEG for photos
    `
  },
  {
    id: "crop-images-professionally",
    title: "Professional Image Cropping Techniques",
    description: "Master the art of cropping images for better composition, social media, and various aspect ratios.",
    icon: <Crop className="w-6 h-6" />,
    duration: "6 min read",
    difficulty: "Beginner",
    category: "Image Crop",
    topics: ["Cropping", "Composition", "Aspect Ratios"],
    screenshot: tutorialCrop,
    content: `
## Why Cropping Matters

Cropping is one of the most powerful yet underutilized image editing techniques. A well-cropped image can:

- **Improve composition** by removing distracting elements
- **Direct viewer attention** to the subject
- **Fit specific formats** (social media, prints, thumbnails)
- **Tell a better story** through visual focus

## Understanding Aspect Ratios

An aspect ratio is the relationship between width and height. Common ratios include:

| Aspect Ratio | Use Case |
|--------------|----------|
| 1:1 (Square) | Instagram posts, profile pictures |
| 4:3 | Standard photos, presentations |
| 16:9 | Videos, YouTube thumbnails, headers |
| 3:2 | Classic photography, prints |
| 9:16 | Stories, vertical videos |
| 2:3 | Portrait prints |

## The Rule of Thirds

When cropping, imagine your image divided into a 3x3 grid. Place key elements along these lines or at their intersections for more dynamic compositions:

- **Horizons** should sit on the top or bottom third line
- **Subjects** often look best at intersection points
- **Eyes** in portraits should align with the top third

## Step-by-Step Cropping Guide

### Manual Crop
1. Open our Manual Crop tool
2. Upload your image
3. Drag the corners to select your crop area
4. Adjust the selection to frame your subject
5. Apply and download

### Aspect Ratio Crop
1. Open the Aspect Ratio Crop tool
2. Select your desired ratio (16:9, 4:3, 1:1, etc.)
3. The tool constrains your selection to that ratio
4. Position the crop area over the best part of your image
5. Apply and download

### Circle Crop (for profile pictures)
1. Open the Circle Crop tool
2. Upload your image
3. Center the circle over the subject (usually a face)
4. Adjust the circle size
5. Download with transparent background

## Cropping for Different Platforms

### Instagram
- **Feed Posts:** Crop to 1:1 (square) or 4:5 (portrait for more screen space)
- **Stories:** Crop to 9:16
- **Profile:** Circle crop, center on face

### Facebook
- **Cover Photo:** Crop to 16:9 (leaves room for cropping on mobile)
- **Profile:** Circle crop
- **Posts:** 1.91:1 or square

### LinkedIn
- **Banner:** Crop to 4:1
- **Posts:** 1.91:1 or square
- **Profile:** Circle crop

## Common Cropping Mistakes

1. **Cutting off important elements** - Leave breathing room around subjects
2. **Ignoring the rule of thirds** - Centered isn't always best
3. **Wrong aspect ratio for platform** - Check requirements first
4. **Too tight on faces** - Include some background context
5. **Cropping without purpose** - Every crop should improve the image

## Pro Tips

- **Crop before compressing** - Smaller dimensions = smaller file size
- **Save originals** - You can always crop differently later
- **Consider the subject's gaze** - Leave space in the direction they're looking
- **Use crop to remove watermarks** - Only on your own images!
- **Experiment** - Try different crops to find the best composition
    `
  },
  {
    id: "rotate-flip-images",
    title: "Rotating and Flipping Images: Complete Guide",
    description: "Learn when and how to rotate, flip, and mirror images for perfect orientation and creative effects.",
    icon: <RotateCw className="w-6 h-6" />,
    duration: "5 min read",
    difficulty: "Beginner",
    category: "Rotate & Flip",
    topics: ["Rotation", "Flipping", "Image Orientation"],
    screenshot: tutorialRotate,
    content: `
## Understanding Image Orientation

Images can be captured or saved in incorrect orientations due to camera settings, phone sensors, or file transfers. Knowing how to correct and creatively use rotation/flipping is essential.

## Rotation Basics

### Standard Rotations
- **90° Clockwise** - Turn image right
- **90° Counter-clockwise (270°)** - Turn image left
- **180°** - Flip upside down

### When to Rotate

**Correct orientation issues:**
- Photos taken in portrait mode showing sideways
- Scanned documents at wrong angles
- Screenshots from rotated devices

**Creative purposes:**
- Diagonal compositions for dynamic effect
- Architectural photography corrections
- Artistic reinterpretation

## Flipping vs Mirroring

### Horizontal Flip (Mirror)
Creates a mirror image along the vertical axis. The left side becomes the right side.

**Use cases:**
- Correcting selfies (front cameras mirror by default)
- Creating symmetrical designs
- Changing which direction a subject faces
- Print design (text will be reversed—be careful!)

### Vertical Flip
Flips the image upside down along the horizontal axis.

**Use cases:**
- Correcting upside-down scans
- Creating reflection effects
- Artistic compositions

## Step-by-Step Guides

### Quick Rotation (90°, 180°, 270°)
1. Open the appropriate rotation tool
2. Upload your image
3. See the rotated preview
4. Download the corrected image

### Custom Angle Rotation
1. Open the Custom Rotate tool
2. Upload your image
3. Enter the exact angle (e.g., 15°)
4. Adjust as needed
5. Download the result

### Creating Mirror Effects
1. Open the Mirror Effect tool
2. Upload your image
3. Choose horizontal or vertical mirroring
4. Preview the result
5. Download your mirrored image

## EXIF Orientation

Many cameras store orientation in EXIF metadata rather than actually rotating pixels. This can cause:
- Images appearing rotated in some apps but not others
- Confusion when editing
- Inconsistent display across platforms

Our tools automatically read EXIF orientation and apply it permanently, ensuring consistent display everywhere.

## Pro Tips

- **Check before sharing** - Rotate issues are embarrassing in professional contexts
- **Use rotation for compositions** - Slight rotations (1-3°) can add energy
- **Mirror for design balance** - Duplicate and flip for symmetrical layouts
- **Combine operations** - Rotate + flip can achieve any orientation
- **Consider text** - Never flip images containing text unless intentional
    `
  },
  {
    id: "watermark-protect-images",
    title: "Adding Watermarks to Protect Your Images",
    description: "Learn how to add professional watermarks to protect your photos and build brand recognition.",
    icon: <Type className="w-6 h-6" />,
    duration: "6 min read",
    difficulty: "Beginner",
    category: "Watermark Tools",
    topics: ["Watermarking", "Copyright", "Brand Protection"],
    screenshot: tutorialWatermark,
    content: `
## Why Watermark Your Images?

Watermarking serves multiple purposes:
- **Copyright protection** - Deters unauthorized use
- **Brand building** - Increases recognition of your work
- **Source identification** - Makes it easy to trace images back to you
- **Professional appearance** - Shows you value your work

## Types of Watermarks

### Text Watermarks
Simple text overlaid on images. Common formats:
- © Your Name 2024
- www.yourwebsite.com
- Your Brand Name

**Pros:** Easy to create, clearly identifies ownership
**Cons:** Can be cropped out if placed poorly

### Image/Logo Watermarks
Your logo or graphic overlaid on images.

**Pros:** Professional appearance, strong brand recognition
**Cons:** Requires a prepared logo file

### Pattern Watermarks
Repeated pattern across the entire image.

**Pros:** Very difficult to remove
**Cons:** More intrusive, affects viewing experience

## Watermark Placement Strategies

### Corner Placement
Most common—watermark in one corner.
- **Bottom-right:** Traditional, professional look
- **Bottom-left:** Alternative that may avoid cropping
- **Top corners:** Less common, can conflict with image content

### Center Placement
Watermark across the center of the image.
- More intrusive but harder to crop out
- Often used for preview/proof images
- Reduce opacity significantly (20-40%)

### Tiled/Pattern
Watermark repeated across entire image.
- Maximum protection
- Used for stock photo previews
- Very low opacity needed (10-20%)

## Best Practices for Effective Watermarks

### 1. Balance Visibility and Aesthetics
Your watermark should be visible enough to serve its purpose but not so prominent that it ruins the image.
- Use 30-50% opacity for standard watermarks
- Increase opacity for proof/preview images
- Match watermark style to your brand

### 2. Position Strategically
Place watermarks where they're visible but don't obstruct the main subject:
- Over complex areas (harder to remove)
- Near important elements
- Consider the rule of thirds

### 3. Size Appropriately
Watermarks should be:
- Large enough to read clearly
- Small enough not to dominate
- Typically 10-20% of image width for logos
- Adjust font size for text to be readable when image is at display size

### 4. Use Consistent Styling
Maintain brand consistency:
- Same font/logo across all images
- Consistent opacity and positioning
- Unified color scheme (or transparent/white that works everywhere)

## Using MultiToolsA Watermark Tools

### Adding Text Watermarks
1. Open Text Watermark tool
2. Upload your image
3. Enter your watermark text
4. Customize: font, size, color, opacity
5. Position using the placement options
6. Download watermarked image

### Adding Image Watermarks
1. Open Image Watermark tool
2. Upload your main image
3. Upload your logo/watermark image (PNG with transparency works best)
4. Adjust size, opacity, and position
5. Download watermarked image

## Removing Watermarks is Copyright Violation

Remember: Removing watermarks from images you don't own is illegal in many jurisdictions. Watermarks indicate copyright ownership, and removing them to use images without permission is a form of copyright infringement.
    `
  },
  {
    id: "optimize-social-media-images",
    title: "Optimizing Images for Social Media Platforms",
    description: "Get the perfect image sizes and formats for Facebook, Instagram, Twitter, LinkedIn, and more.",
    icon: <Palette className="w-6 h-6" />,
    duration: "8 min read",
    difficulty: "Beginner",
    category: "Social Media",
    topics: ["Social Media", "Image Optimization", "Marketing"],
    content: `
## Why Image Optimization Matters for Social Media

Social platforms compress uploaded images. Starting with properly optimized images ensures:
- Your posts look professional and crisp
- Images load quickly for your audience
- Consistent appearance across devices
- No unexpected cropping of important elements

## Platform-Specific Image Guidelines

### Instagram

**Feed Posts:**
- Square: 1080 x 1080px
- Portrait: 1080 x 1350px (recommended for engagement)
- Landscape: 1080 x 566px

**Stories:** 1080 x 1920px (9:16 ratio)

**Reels Cover:** 1080 x 1920px

**Profile Picture:** 320 x 320px (displays as circle)

**Tips:**
- Portrait images get more screen space = more engagement
- Use JPEG for photos, PNG for graphics with text
- Compress to under 8MB

### Facebook

**Feed Posts:** 1200 x 630px (1.91:1 ratio) or 1080 x 1080px (square)

**Stories:** 1080 x 1920px

**Cover Photo:** 820 x 312px (desktop), 640 x 360px (mobile)

**Profile Picture:** 170 x 170px (displays as circle on desktop)

**Link Preview:** 1200 x 630px

**Tips:**
- Facebook heavily compresses images, so upload at high quality
- Use PNG for images with text to prevent compression artifacts
- Test how images appear on mobile

### Twitter/X

**Feed Posts:** 1200 x 675px (16:9 ratio)

**Header:** 1500 x 500px

**Profile Picture:** 400 x 400px

**Tips:**
- Tweets with images get 150% more retweets
- Maximum 5MB for photos, 15MB for GIFs
- Use JPEG for photos, PNG for graphics

### LinkedIn

**Feed Posts:** 1200 x 627px or 1080 x 1080px

**Cover Photo:** 1584 x 396px

**Profile Picture:** 400 x 400px

**Tips:**
- Professional appearance matters more here
- Infographics and data visualizations perform well
- Use PNG for text-heavy images

## Universal Optimization Steps

### Step 1: Create at the Right Dimensions
Use our Exact Resize tool to get precise dimensions for your target platform.

### Step 2: Choose the Right Format
- **JPEG:** Best for photographs
- **PNG:** Best for graphics, text, logos
- **GIF:** For simple animations

### Step 3: Compress Appropriately
- 80-90% quality for images you want to look perfect
- 70-80% for standard posts
- Check file size stays under platform limits

### Step 4: Add Text Strategically
If adding text to images:
- Keep text to under 20% of image area
- Use high-contrast colors
- Leave safe zones at edges (platforms crop differently)
- Test on mobile—text should be readable on small screens

## Creating Consistent Brand Imagery

### Use Templates
Create reusable templates at correct dimensions for each platform. This saves time and ensures consistency.

### Color Consistency
Use the same color palette across platforms. When compressing or converting, verify colors remain accurate.

### Batch Processing
Use our tools to process multiple images at once:
1. Resize all images to platform dimensions
2. Apply consistent compression
3. Add watermarks if needed
    `
  },
  {
    id: "image-to-pdf-documents",
    title: "Converting Images to PDF Documents",
    description: "Learn how to convert single or multiple images into professional PDF documents for sharing and printing.",
    icon: <FileText className="w-6 h-6" />,
    duration: "6 min read",
    difficulty: "Beginner",
    category: "Image to Document",
    topics: ["PDF Conversion", "Document Creation", "Multi-page PDFs"],
    content: `
## Why Convert Images to PDF?

PDF (Portable Document Format) offers several advantages over raw images:
- **Universal compatibility** - Opens on any device
- **Multi-page documents** - Combine multiple images
- **Print-ready** - Maintains quality for printing
- **Professional sharing** - Standard business format
- **Smaller file sizes** - Especially for multi-image documents

## Common Use Cases

### Business Documents
- Convert scanned receipts to PDF for expense reports
- Compile product images into catalogs
- Create presentation handouts from screenshots

### Personal Projects
- Make photo albums from vacation pictures
- Digitize old photos for sharing
- Create recipe books from food photos

### Professional Portfolio
- Compile artwork into a portfolio PDF
- Package design work for clients
- Create lookbooks for fashion/photography

## Step-by-Step Conversion Guide

### Single Image to PDF
1. Open the Image to PDF tool
2. Upload your image (JPEG, PNG, WebP, etc.)
3. Choose page orientation (Portrait/Landscape)
4. Select page size (A4, Letter, etc.)
5. Download your PDF

### Multiple Images to PDF
1. Open the Image to PDF tool
2. Upload all images you want to include
3. Drag to reorder if needed
4. Choose page settings (same or individual)
5. Generate and download multi-page PDF

## Page Size Options

| Size | Dimensions | Best For |
|------|-----------|----------|
| A4 | 210 x 297mm | Standard documents (international) |
| Letter | 8.5 x 11" | Standard documents (US) |
| A3 | 297 x 420mm | Posters, large prints |
| Legal | 8.5 x 14" | Legal documents |
| Custom | Your choice | Special projects |

## Optimization Tips

### For Smaller File Sizes
- Compress images before converting
- Use JPEG images when possible
- Choose lower quality setting for drafts

### For Print Quality
- Use high-resolution source images (300 DPI)
- Don't resize images smaller before conversion
- Use lossless formats (PNG) for graphics

### For Digital Viewing
- Standard resolution (150 DPI) is usually sufficient
- Moderate compression acceptable
- Consider page dimensions that match common screens

## Best Practices

1. **Organize before converting** - Sort images in desired order
2. **Consistent orientation** - Don't mix portrait and landscape unless intentional
3. **Check margins** - Ensure important content isn't cut off
4. **Test print** - Print a page before printing the entire document
5. **Name files clearly** - Use descriptive PDF filenames

## Reverse: PDF to Image

Sometimes you need to extract images from PDFs:
- Extracting photos from received documents
- Converting PDF artwork to image formats
- Creating social media posts from PDF content

Use our PDF tools section for PDF to image conversion.
    `
  },
  {
    id: "photo-filters-effects",
    title: "Applying Photo Filters and Effects",
    description: "Transform your photos with professional filters, color adjustments, and creative effects.",
    icon: <Palette className="w-6 h-6" />,
    duration: "7 min read",
    difficulty: "Intermediate",
    category: "Photo Filters",
    topics: ["Photo Editing", "Filters", "Color Correction"],
    screenshot: tutorialFilters,
    content: `
## Understanding Photo Filters

Photo filters modify the visual properties of images to achieve specific looks or correct issues. Understanding what each filter does helps you choose the right one.

## Basic Adjustments

### Brightness
Controls overall lightness or darkness.
- **Increase** to brighten underexposed photos
- **Decrease** to fix overexposed shots
- **Typical range:** -30 to +30 for subtle adjustments

### Contrast
Affects the difference between light and dark areas.
- **Increase** for more dramatic, punchy images
- **Decrease** for softer, flatter looks
- High contrast emphasizes textures and details

### Saturation
Controls color intensity.
- **Increase** for vibrant, eye-catching colors
- **Decrease** for muted, subtle tones
- **Zero saturation** = grayscale

## Creative Filters

### Sepia
Adds warm, brownish tones for a vintage look.
- Great for nostalgic or historical themes
- Works best on portraits and landscapes
- Combine with slight vignette for authentic feel

### Grayscale/Black & White
Removes all color, leaving only luminance values.
- Focuses attention on composition and form
- Hides color problems or distractions
- Classic, timeless aesthetic

### Vintage/Retro
Combines effects to mimic film photography:
- Faded blacks
- Warm or cool color casts
- Grain and vignetting
- Reduced saturation

### Warm and Cool Tones
Shifts the overall color temperature:
- **Warm:** Adds orange/yellow for cozy, sunset feel
- **Cool:** Adds blue for crisp, professional look
- Subtle shifts often look most natural

## Technical Filters

### Sharpening
Enhances edge definition and detail.
- Apply after resizing images
- Over-sharpening creates ugly halos
- Use sparingly—a little goes a long way

### Blur
Softens images or creates depth effects.
- **Gaussian blur:** Smooth, natural softening
- **Motion blur:** Suggests movement
- **Tilt-shift:** Miniature effect

### Noise Reduction/Smoothing
Reduces graininess from high-ISO photos.
- Preserves details while smoothing noise
- Essential for low-light photography
- Can make skin look smoother (portrait editing)

## Step-by-Step Filter Application

### Basic Color Correction
1. Open the Brightness/Contrast tool
2. Adjust brightness if image is too dark/light
3. Increase contrast slightly for more impact
4. Fine-tune saturation if colors look off
5. Download your improved image

### Creating a Vintage Look
1. Apply sepia or desaturated filter
2. Reduce contrast slightly
3. Add warm tone
4. Apply subtle vignette
5. Consider adding grain for authenticity

### Professional Portrait Editing
1. Adjust exposure/brightness as needed
2. Apply gentle smoothing
3. Increase contrast slightly
4. Adjust color balance for skin tones
5. Subtle sharpening on eyes/hair

## Best Practices

1. **Edit non-destructively** - Keep original files
2. **Subtle is usually better** - Heavy filters look amateur
3. **Match the mood** - Filters should enhance, not dominate
4. **Be consistent** - Use similar filters for photo series
5. **Consider the platform** - Some filters work better on certain social media
    `
  },
  {
    id: "format-utilities-guide",
    title: "Image Format Utilities: Transparency and Layers",
    description: "Learn how to work with transparency, flatten layers, and manage image channels for professional results.",
    icon: <Settings className="w-6 h-6" />,
    duration: "6 min read",
    difficulty: "Intermediate",
    category: "Format Utilities",
    topics: ["Transparency", "Alpha Channel", "Layer Management"],
    content: `
## Understanding Image Transparency

Transparency (alpha channel) allows parts of an image to be see-through. This is essential for:
- Logos that overlay on different backgrounds
- Product photos with removed backgrounds
- Graphics that blend seamlessly into designs
- Icons and UI elements

## Formats That Support Transparency

| Format | Transparency Support | Quality | Best Use |
|--------|---------------------|---------|----------|
| PNG | Full (8-bit alpha) | Lossless | Logos, graphics, screenshots |
| WebP | Full | Lossy/Lossless | Modern web graphics |
| GIF | Binary (on/off) | Limited colors | Simple icons, animations |
| JPEG | None | Lossy | Photos only |
| TIFF | Full | Lossless | Professional/print |

## Adding Transparency

### Use Cases
- Making backgrounds transparent
- Creating cutout images
- Preparing logos for placement

### Step-by-Step
1. Open the Add Transparency tool
2. Upload your image
3. Select the area to make transparent
4. For simple backgrounds, use color picker
5. Save as PNG to preserve transparency

## Removing Transparency

Sometimes you need to "flatten" an image—replacing transparency with a solid color.

### Why Remove Transparency?
- Converting to JPEG (which doesn't support transparency)
- Preparing for print
- Reducing file size
- Ensuring consistent background color

### Step-by-Step
1. Open Remove Transparency tool
2. Upload your PNG with transparency
3. Choose replacement color (often white)
4. Download the flattened image

## Grayscale Conversion

Converting to grayscale isn't just removing color—it's translating color values to luminance (brightness) values.

### Technical Details
- Red, green, and blue channels are weighted differently
- Human eyes are most sensitive to green, least to blue
- Standard formula: 0.299R + 0.587G + 0.114B

### When to Use Grayscale
- Creating timeless, classic looks
- Preparing images for black & white printing
- Reducing file size (can store as single channel)
- Hiding color cast problems

## Black & White (True B&W)

Different from grayscale—true black and white has only two values:
- Pure black (0)
- Pure white (255)

### Use Cases
- Line art and sketches
- Document scanning (text)
- High-contrast artistic effect
- Stencils and patterns

### Threshold Control
The threshold determines which grays become black vs white:
- Low threshold = more white
- High threshold = more black
- Choose based on your image content

## Merging Multiple Images

Combine several images into one composition.

### Overlay Merging
Stack images with transparency to create composite:
- Background layer (bottom)
- Additional layers on top
- Transparency allows blending

### Side-by-Side Merging
Place images next to each other:
- Before/after comparisons
- Photo collages
- Panoramic compositions

### Step-by-Step
1. Open Merge Images tool
2. Upload all images to combine
3. Choose arrangement (overlay/grid/row/column)
4. Adjust spacing and alignment
5. Download merged result

## Pro Tips

- Always work in PNG when dealing with transparency
- Keep layered/transparent originals for future editing
- Test transparency on multiple backgrounds
- Check for "invisible" pixels that might cause issues
- Use compression carefully on transparent images
    `
  },
  {
    id: "metadata-exif-guide",
    title: "Understanding and Managing Image Metadata",
    description: "Learn about EXIF data, GPS information, and how to view, preserve, or remove metadata from your images.",
    icon: <Database className="w-6 h-6" />,
    duration: "6 min read",
    difficulty: "Intermediate",
    category: "Image Metadata",
    topics: ["EXIF Data", "Privacy", "Metadata Management"],
    screenshot: tutorialMetadata,
    content: `
## What is Image Metadata?

Metadata is data about data—information embedded in image files that describes the image itself. This includes:

- **Camera settings** (aperture, shutter speed, ISO)
- **Date and time** taken
- **Location** (GPS coordinates)
- **Camera/phone model**
- **Software used** for editing
- **Copyright information**

## Types of Metadata

### EXIF (Exchangeable Image File Format)
Most common metadata standard for photos:
- Camera make and model
- Lens information
- Exposure settings
- Flash usage
- White balance
- Color space

### IPTC (International Press Telecommunications Council)
Professional metadata standard:
- Caption/description
- Keywords/tags
- Creator/photographer name
- Copyright notice
- Contact information

### XMP (Extensible Metadata Platform)
Adobe's metadata format:
- Editing history
- Rating and labels
- Custom fields
- Cross-application compatibility

## Why Metadata Matters

### For Photographers
- Track camera settings for learning
- Organize large photo libraries
- Prove ownership/authorship
- Remember where/when photos were taken

### For Privacy
Metadata can reveal sensitive information:
- **Location data** - Where you (or your home) is located
- **Device info** - What phone/camera you use
- **Timestamps** - When photos were taken
- **Serial numbers** - Unique device identifiers

## Viewing Metadata

### Using Our Tool
1. Open the View Metadata tool
2. Upload any image
3. See comprehensive metadata display
4. Export metadata as text if needed

### What You'll See
- File information (name, size, dimensions)
- Camera data (make, model, settings)
- GPS coordinates (if present)
- Creation/modification dates
- Copyright and creator info

## Removing Metadata (Privacy Protection)

Before sharing images online, consider stripping metadata:

### Why Remove Metadata?
- **Privacy** - Don't reveal your location
- **Security** - Hide device information
- **File size** - Slightly smaller files
- **Anonymity** - Share without identification

### How to Strip Metadata
1. Open the Remove Metadata tool
2. Upload your image
3. Choose what to remove (all or selective)
4. Download the clean image

### What to Keep
Sometimes you want to preserve certain metadata:
- Copyright notice (protect your work)
- Creation date (for organization)
- Camera settings (for learning)

## Best Practices

### Before Sharing Publicly
- Remove GPS data unless intentional
- Strip personal device information
- Keep copyright info if you're the creator

### For Professional Use
- Add proper IPTC information
- Include copyright notices
- Use consistent keywords for searchability

### For Personal Archives
- Keep all metadata for organization
- Back up files with metadata intact
- Use metadata for sorting and searching

## GPS Data Specifically

Location data deserves special attention:

### When GPS Data is Risky
- Photos of your home
- Pictures of children/family
- Vacation photos (shows when you're away)
- Any image shared on public platforms

### How GPS Data Gets Added
- Smartphone location services
- GPS-enabled cameras
- Geotagging after the fact

### Checking for GPS Data
- Our metadata viewer shows coordinates
- Maps link shows exact location
- Latitude/longitude in decimal degrees
    `
  },
  {
    id: "qr-code-creation",
    title: "Creating and Customizing QR Codes",
    description: "Learn how to generate QR codes for URLs, text, contacts, and more with customizable designs.",
    icon: <QrCode className="w-6 h-6" />,
    duration: "5 min read",
    difficulty: "Beginner",
    category: "QR Tools",
    topics: ["QR Codes", "Marketing", "Mobile Access"],
    content: `
## What Are QR Codes?

QR (Quick Response) codes are two-dimensional barcodes that can store various types of data. When scanned with a smartphone camera, they instantly trigger actions like:
- Opening websites
- Adding contacts
- Connecting to WiFi
- Making phone calls
- Sending emails or SMS

## Common QR Code Uses

### Business Applications
- **Business cards** - Contact info that saves directly to phone
- **Marketing materials** - Links to websites or promotions
- **Product packaging** - Additional product information
- **Restaurant menus** - Touchless menu access
- **Event tickets** - Entry verification

### Personal Uses
- **WiFi sharing** - Guests can connect without password typing
- **Social media** - Quick follow/connect links
- **Payment** - Mobile payment information
- **Contact sharing** - Instant contact exchange

## Creating QR Codes

### Basic URL QR Code
1. Open the QR Code Generator
2. Select "URL" type
3. Enter your website address
4. Generate the QR code
5. Download and use

### Contact (vCard) QR Code
1. Select "Contact" type
2. Fill in name, phone, email, etc.
3. Generate the QR code
4. When scanned, adds contact directly to phone

### WiFi QR Code
1. Select "WiFi" type
2. Enter network name (SSID)
3. Enter password
4. Select security type (WPA/WPA2)
5. Generate—guests scan to connect instantly

### Text QR Code
1. Select "Text" type
2. Enter any text message
3. Generate the QR code
4. Displays text when scanned

## Customizing QR Codes

### Colors
- Change foreground (pattern) color
- Change background color
- Ensure sufficient contrast for scanning

### Adding Logos
- Embed logo in center
- Keep logo small (under 30% of QR area)
- Use error correction to maintain scannability

### Shape and Style
- Round corners for modern look
- Dot styles (square, rounded, dots)
- Eye styles (corner patterns)

## Best Practices

### For Scannability
- **Size matters** - At least 2cm x 2cm for close scanning
- **Contrast** - Dark pattern on light background works best
- **Error correction** - Use higher levels if adding logos
- **Test thoroughly** - Scan with multiple phones before printing

### For Effectiveness
- **Clear call-to-action** - Tell people what scanning does
- **Mobile-friendly destination** - QR users are on phones
- **Track usage** - Use analytics links to measure scans
- **Update destination** - Use redirect services for changeable links

### Common Mistakes
- Making QR codes too small
- Low contrast colors
- Stretching or distorting the code
- Not testing before printing
- Linking to non-mobile-friendly pages

## Reading QR Codes

Most modern smartphones can read QR codes:
- **iPhone** - Built into Camera app
- **Android** - Built into Camera or Google Lens
- **Dedicated apps** - Third-party QR scanners

### Using Our QR Reader
1. Open the QR Code Reader
2. Upload an image containing a QR code
3. View the decoded content
4. Take action (open link, save contact, etc.)

## Security Considerations

QR codes can link to malicious sites:
- Only scan codes from trusted sources
- Preview URLs before visiting
- Be wary of codes on public surfaces
- Use QR scanners that show URL before opening
    `
  },
  {
    id: "image-drawing-annotation",
    title: "Drawing and Annotating Images",
    description: "Learn how to add drawings, text, shapes, and annotations to images for presentations, tutorials, and feedback.",
    icon: <Pencil className="w-6 h-6" />,
    duration: "5 min read",
    difficulty: "Beginner",
    category: "Image Drawing",
    topics: ["Annotation", "Drawing", "Presentation"],
    content: `
## Why Annotate Images?

Adding annotations to images helps:
- **Explain concepts** in tutorials and documentation
- **Provide feedback** on designs and photos
- **Highlight important areas** for attention
- **Create instructional materials** for training
- **Mark up screenshots** for bug reports

## Types of Annotations

### Text Annotations
Add explanatory text directly on images:
- Labels for parts of diagrams
- Instructions and callouts
- Watermarks and captions
- Notes and comments

### Shape Annotations
Draw attention with geometric shapes:
- **Rectangles/boxes** - Highlight areas
- **Circles/ovals** - Circle important items
- **Arrows** - Point to specific elements
- **Lines** - Connect related items

### Freehand Drawing
Sketch directly on images:
- Underline or cross out
- Draw custom shapes
- Add handwritten notes
- Create informal marks

## Common Use Cases

### Software Documentation
- Circle buttons to click
- Arrow showing workflow direction
- Number steps in sequence
- Highlight menu items

### Design Feedback
- Circle areas needing revision
- Write notes about changes
- Cross out elements to remove
- Draw suggested alternatives

### Educational Materials
- Label diagram parts
- Show cause-and-effect with arrows
- Highlight key information
- Add explanatory text

### Social Media Content
- Add engaging text overlays
- Create meme-style images
- Highlight products/features
- Add calls-to-action

## Step-by-Step Annotation Guide

### Adding Text
1. Open the Drawing tool
2. Upload your image
3. Select the Text tool
4. Click where you want text
5. Type your annotation
6. Adjust font, size, and color
7. Position as needed

### Drawing Shapes
1. Select the Shape tool
2. Choose shape type (rectangle, circle, arrow)
3. Click and drag to draw
4. Adjust size and position
5. Set fill and stroke colors
6. Add more shapes as needed

### Freehand Drawing
1. Select the Brush/Pen tool
2. Choose brush size and color
3. Draw directly on the image
4. Use Undo for mistakes
5. Adjust opacity if needed

## Best Practices

### Keep It Clear
- Don't over-annotate—less is more
- Use consistent colors throughout
- Make text large enough to read
- Leave space around annotations

### Use Color Strategically
- Red for attention/errors
- Green for approval/success
- Yellow for caution/notes
- Blue for information
- Use contrasting colors for visibility

### Professional Appearance
- Align text and shapes neatly
- Use consistent sizing
- Choose readable fonts
- Avoid cluttered layouts

### Accessibility
- Ensure sufficient contrast
- Don't rely on color alone
- Use clear, descriptive text
- Consider how it looks in grayscale

## Output and Sharing

### Save Options
- PNG for lossless quality
- JPEG for smaller files
- Keep originals for re-editing

### Sharing Annotated Images
- Email for individual feedback
- Team chats for collaboration
- Documentation systems for tutorials
- Social media for content
    `
  },
  {
    id: "image-security-encryption",
    title: "Securing Your Images: Encryption and Protection",
    description: "Learn how to encrypt, password-protect, and secure your sensitive images from unauthorized access.",
    icon: <Lock className="w-6 h-6" />,
    duration: "6 min read",
    difficulty: "Advanced",
    category: "Image Security",
    topics: ["Encryption", "Privacy", "Data Protection"],
    content: `
## Why Secure Your Images?

Some images contain sensitive information that requires protection:
- **Personal photos** you want to keep private
- **Business documents** containing confidential data
- **Medical images** with health information
- **Legal documents** requiring confidentiality
- **Identity documents** (IDs, passports)

## Security Methods

### Password Protection
Add a password requirement to view images:
- Quick and simple protection
- Password needed to view
- Good for casual security needs
- Can be shared with trusted parties

### Encryption
Transform image data into unreadable format:
- Strong cryptographic protection
- Requires decryption key to view
- Industry-standard security
- Suitable for sensitive data

### Steganography
Hide information within images:
- Hidden data not visible to eye
- Image appears normal
- Advanced technique for covert communication
- Requires special tools to extract

## Understanding Encryption

### How It Works
1. Original image + encryption key = scrambled data
2. Scrambled data looks like random noise
3. Decryption key reverses the process
4. Only key holders can view the image

### Encryption Strength
- **AES-256** - Military-grade encryption
- **Keys should be long and random**
- **Never share keys over insecure channels**

## Step-by-Step Security Guide

### Encrypting an Image
1. Open the Image Encryption tool
2. Upload the image to encrypt
3. Enter a strong password
4. Click Encrypt
5. Download the encrypted file
6. Store password securely (separately from file)

### Decrypting an Image
1. Open the Image Decryption tool
2. Upload the encrypted file
3. Enter the correct password
4. View or download the decrypted image

### Best Practices for Passwords
- At least 12 characters
- Mix of letters, numbers, symbols
- Avoid dictionary words
- Don't reuse passwords
- Consider a password manager

## When to Use Image Security

### High Priority
- Documents with personal identifiers
- Financial information
- Medical records
- Legal/contractual documents
- Proprietary business data

### Medium Priority
- Personal photos for cloud storage
- Work in progress creative work
- Private communications
- Backup archives

### Consider Alternatives
- Very large collections (use drive encryption)
- Frequently accessed files (too cumbersome)
- Files to share publicly (defeats purpose)

## Security Best Practices

### Password Management
- Use unique passwords for different files
- Store passwords in a password manager
- Consider two-factor authentication
- Never send passwords with encrypted files

### File Handling
- Delete unencrypted originals after encryption
- Store encrypted files and passwords separately
- Back up encrypted files (they can corrupt)
- Test decryption before deleting originals

### Sharing Encrypted Files
- Send files and passwords through different channels
- Verify recipient identity before sharing
- Set expiration on sensitive shares
- Keep records of who has access

## Limitations

### What Encryption Can't Protect Against
- Someone looking over your shoulder
- Malware on your device
- Weak or guessed passwords
- Loss of the encryption key
- Legal compulsion to decrypt

### What to Consider
- Convenience vs security tradeoff
- Backup and recovery options
- What happens if you forget the password
- Jurisdiction and legal requirements
    `
  },
  {
    id: "combining-merging-images",
    title: "Combining and Merging Multiple Images",
    description: "Create collages, panoramas, and composite images by combining multiple pictures professionally.",
    icon: <Layers className="w-6 h-6" />,
    duration: "6 min read",
    difficulty: "Intermediate",
    category: "Image Combine",
    topics: ["Collages", "Image Merging", "Composites"],
    content: `
## Types of Image Combining

### Collages
Multiple images arranged in a decorative layout:
- Grid arrangements
- Freestyle layouts
- Themed presentations
- Social media graphics

### Side-by-Side Comparison
Two or more images placed adjacent:
- Before/after comparisons
- Product variations
- Progress documentation
- A/B testing visuals

### Layered Composites
Images stacked with transparency:
- Background + foreground elements
- Logo overlay on photos
- Text and graphic combinations
- Complex photo manipulation

### Stitched Panoramas
Images joined seamlessly:
- Wide landscape shots
- Interior room views
- Large subject documentation
- 360-degree views

## Creating Collages

### Grid Collages
1. Open the Collage tool
2. Select grid layout (2x2, 3x3, etc.)
3. Upload images for each cell
4. Adjust individual image positions
5. Set spacing and borders
6. Download completed collage

### Freestyle Collages
1. Choose freestyle layout
2. Upload all images
3. Drag to position each image
4. Resize and rotate as needed
5. Adjust overlapping order
6. Export final composition

### Template Collages
1. Select a pre-designed template
2. Upload images to fill slots
3. Images auto-fit to template shapes
4. Customize colors and spacing
5. Download ready-to-share collage

## Before/After Comparisons

Perfect for showing:
- Photo editing results
- Product transformations
- Renovation projects
- Progress over time

### Creating Comparisons
1. Open the Side-by-Side tool
2. Upload "before" image
3. Upload "after" image
4. Choose horizontal or vertical split
5. Add labels if desired
6. Download comparison image

## Layered Image Compositing

### Basic Overlay
1. Upload background image
2. Upload overlay image (PNG with transparency)
3. Position overlay on background
4. Adjust size and opacity
5. Blend and download

### Multiple Layers
1. Start with base image
2. Add multiple overlay elements
3. Arrange layer order (what's on top)
4. Adjust each layer's opacity
5. Flatten and export

## Best Practices

### Image Preparation
- **Consistent quality** - All images should be similar resolution
- **Color matching** - Adjust colors to look cohesive
- **Proper sizing** - Resize before combining for efficiency

### Composition Tips
- **Visual balance** - Distribute visual weight evenly
- **Color harmony** - Use complementary or matching colors
- **Focal point** - Guide viewer's eye to important element
- **White space** - Don't overcrowd the composition

### Technical Considerations
- Higher resolution = larger file size
- Combine in stages for complex projects
- Save work-in-progress versions
- Export at appropriate quality for intended use

## Use Case Examples

### Social Media Grid
Create Instagram-style grids:
- 3-image story series
- 6 or 9-image profile grid
- Carousel preview images

### Product Showcases
Display products attractively:
- Multiple angles in one image
- Size comparisons
- Color variations
- Feature callouts

### Photo Albums
Compile memories:
- Event highlights
- Travel summaries
- Family photo combinations
- Yearly retrospectives

### Professional Portfolios
Present work effectively:
- Project showcases
- Before/after transformations
- Process documentation
- Client presentation materials
    `
  },
  {
    id: "pdf-tools-guide",
    title: "Working with PDF Documents: Complete Guide",
    description: "Learn how to merge, split, compress, and convert PDF documents efficiently.",
    icon: <FileImage className="w-6 h-6" />,
    duration: "8 min read",
    difficulty: "Beginner",
    category: "PDF Tools",
    topics: ["PDF Editing", "Document Management", "File Conversion"],
    screenshot: tutorialPdf,
    content: `
## Understanding PDF Documents

PDF (Portable Document Format) is the universal standard for sharing documents because:
- **Consistent appearance** across all devices
- **Preserved formatting** regardless of software
- **Compact file sizes** for complex documents
- **Security features** like passwords and permissions

## Core PDF Operations

### Merging PDFs
Combine multiple PDFs into one document.

**Use Cases:**
- Combining report sections
- Compiling scanned documents
- Creating comprehensive packages
- Organizing related files

**How to Merge:**
1. Open the Merge PDF tool
2. Upload all PDFs to combine
3. Drag to reorder pages/documents
4. Click Merge
5. Download the combined PDF

### Splitting PDFs
Divide a PDF into multiple files.

**Use Cases:**
- Extracting specific pages
- Breaking large documents
- Sharing portions without the whole
- Reorganizing content

**How to Split:**
1. Open the Split PDF tool
2. Upload your PDF
3. Select pages to extract
4. Choose split points
5. Download resulting PDFs

### Compressing PDFs
Reduce PDF file size for sharing.

**Why Compress:**
- Email attachment limits
- Faster uploads/downloads
- Storage space savings
- Web page loading

**How to Compress:**
1. Open the Compress PDF tool
2. Upload your PDF
3. Choose compression level
4. Preview quality if available
5. Download compressed PDF

## Converting To and From PDF

### Images to PDF
Convert single or multiple images:
- Photo collections to PDF albums
- Scanned documents organization
- Portfolio compilation
- Presentation handouts

### Word to PDF
Convert Word documents:
- Preserve formatting exactly
- Lock document from editing
- Professional sharing format
- Archive documentation

### PDF to Images
Extract pages as images:
- Social media sharing
- Presentation slides
- Web content creation
- Archive accessibility

## PDF Quality Settings

### For Sharing (Small Size)
- Lower resolution (96-150 DPI)
- Higher compression
- Reduced image quality
- Acceptable for screen viewing

### For Printing (High Quality)
- Higher resolution (300 DPI)
- Minimal compression
- Preserved image quality
- Professional output

### For Archiving (Balanced)
- Medium resolution (200 DPI)
- Moderate compression
- Good quality preservation
- Reasonable file size

## Organizing Multi-Page PDFs

### Page Reordering
- Drag pages to new positions
- Move pages between sections
- Create logical flow

### Page Deletion
- Remove unnecessary pages
- Delete blank pages
- Trim document length

### Page Rotation
- Fix orientation issues
- Correct scanned documents
- Standardize page direction

## Best Practices

### Before Creating PDFs
- Finalize content before converting
- Check source document quality
- Organize pages in correct order
- Remove sensitive metadata

### When Sharing PDFs
- Test on different devices
- Check file size for email limits
- Verify all pages are included
- Confirm proper orientation

### For Long-Term Storage
- Use PDF/A format for archiving
- Keep original source files
- Document file contents
- Maintain organized file names

## Common Issues and Solutions

### File Too Large
- Compress PDF before sharing
- Reduce image quality
- Split into smaller parts
- Check for embedded high-res images

### Poor Quality
- Start with higher quality source
- Use less aggressive compression
- Check original image resolution
- Consider vector graphics where possible

### Missing Fonts
- Embed fonts in source document
- Use standard fonts
- Convert text to outlines if needed

### Cannot Open
- Check for password protection
- Verify file isn't corrupted
- Try different PDF reader
- Re-download if transferred
    `
  },
  {
    id: "batch-processing-guide",
    title: "Batch Processing: Edit Multiple Images Efficiently",
    description: "Save hours by processing multiple images at once with batch compression, conversion, and resizing.",
    icon: <Zap className="w-6 h-6" />,
    duration: "5 min read",
    difficulty: "Intermediate",
    category: "Productivity",
    topics: ["Batch Processing", "Workflow", "Efficiency"],
    content: `
## What is Batch Processing?

Batch processing applies the same operation to multiple files simultaneously, saving enormous amounts of time compared to editing one-by-one.

**Time Savings Example:**
- 50 images × 30 seconds each = 25 minutes manually
- 50 images in batch = 1-2 minutes total

## When to Use Batch Processing

### Batch Compression
Process multiple images for web use:
- Entire website image library
- Photo album optimization
- Email attachment preparation
- Social media content

### Batch Conversion
Change formats for many files:
- HEIC to JPEG for compatibility
- PNG to WebP for web
- Raw to JPEG for sharing
- Any format standardization

### Batch Resizing
Resize multiple images uniformly:
- Thumbnails generation
- Social media preparation
- Email-sized versions
- Print preparation

### Batch Watermarking
Add watermarks to image collections:
- Portfolio protection
- Stock photo preparation
- Brand consistency
- Proof images for clients

## Step-by-Step Batch Processing

### General Workflow
1. **Prepare source files** - Organize in a folder
2. **Upload all files** - Select multiple at once
3. **Configure settings** - One setting applies to all
4. **Process** - Wait for completion
5. **Download** - Get all processed files

### Batch Compression Example
1. Open Batch Compress tool
2. Drag all images to upload area
3. Set target quality (e.g., 80%)
4. Click "Compress All"
5. Download ZIP of compressed images

### Batch Resize Example
1. Open Batch Resize tool
2. Upload all images
3. Set target dimensions or percentage
4. Choose how to handle aspect ratios
5. Process and download

## Best Practices

### Before Batch Processing
- **Test on one image first** - Verify settings are correct
- **Organize source files** - Know what you're processing
- **Check file names** - Avoid duplicates
- **Backup originals** - Never process the only copy

### During Processing
- Don't close the browser tab
- Watch progress indicators
- Note any errors reported
- Be patient with large batches

### After Processing
- Verify output quality
- Check all files were processed
- Confirm file names are correct
- Delete temporary files when done

## Optimizing Your Workflow

### File Naming
- Use descriptive names before processing
- Consider adding suffixes (image-compressed.jpg)
- Maintain original names when possible

### Folder Organization
- Keep originals in separate folder
- Create output folder for processed files
- Name folders clearly (e.g., "web-optimized")

### Settings Documentation
- Note what settings you used
- Create presets for repeated tasks
- Document for team consistency

## Handling Large Batches

### Browser Limitations
- Most browsers handle 50-100 images well
- Very large batches may need splitting
- Close other tabs to free memory
- Use faster internet for uploads

### File Size Considerations
- Large source files take longer
- Consider pre-organizing by size
- Process largest files separately

### When Things Go Wrong
- Check for unsupported formats
- Look for corrupted source files
- Try smaller batch sizes
- Clear browser cache and retry
    `
  },
  {
    id: "image-optimization-seo",
    title: "Image Optimization for Websites and SEO",
    description: "Complete guide to optimizing images for faster websites, better SEO rankings, and improved user experience.",
    icon: <Download className="w-6 h-6" />,
    duration: "10 min read",
    difficulty: "Intermediate",
    category: "Image Optimization",
    topics: ["SEO", "Web Performance", "Core Web Vitals"],
    content: `
## Why Image Optimization Matters for SEO

Images directly impact your website's performance and search rankings:

- **Page speed is a ranking factor** - Google explicitly uses it
- **Core Web Vitals** - Images affect LCP (Largest Contentful Paint)
- **User experience** - Slow sites have higher bounce rates
- **Mobile-first indexing** - Google primarily uses mobile version

## The Complete Optimization Checklist

### 1. Choose the Right Format

| Content Type | Recommended Format | Alternative |
|--------------|-------------------|-------------|
| Photographs | WebP | JPEG |
| Graphics/logos | WebP or PNG | SVG |
| Simple animations | WebP | GIF |
| Icons | SVG | WebP |

### 2. Size Images Correctly

**Never upload larger images than displayed:**
- Check your maximum display size
- Create 1x and 2x versions for retina
- Use responsive images (srcset)

**Example:**
If image displays at 400px max:
- Standard: 400px wide
- Retina: 800px wide

### 3. Compress Appropriately

**Quality guidelines by use:**
- Hero images: 80-90%
- Content images: 70-85%
- Thumbnails: 60-75%
- Background: 65-80%

### 4. Implement Lazy Loading

Delay loading images until needed:
- Use native loading="lazy" attribute
- Saves bandwidth for offscreen images
- Improves initial page load

### 5. Add Descriptive Alt Text

Alt text serves multiple purposes:
- **Accessibility** for screen readers
- **SEO** context for search engines
- **Fallback** when images don't load

**Good alt text:**
- Describes the image content
- Includes relevant keywords naturally
- Is concise (under 125 characters)

### 6. Use Descriptive File Names

Instead of: IMG_20240115.jpg
Use: blue-running-shoes-side-view.jpg

- Include relevant keywords
- Use hyphens between words
- Be descriptive but concise

## Technical Implementation

### Responsive Images
Provide multiple sizes for different screens:
\`\`\`html
<img 
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 400px) 400px,
         (max-width: 800px) 800px,
         1200px"
  src="image-800.jpg"
  alt="Descriptive text">
\`\`\`

### Modern Format with Fallback
Use WebP with JPEG fallback:
\`\`\`html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Descriptive text">
</picture>
\`\`\`

### Lazy Loading
Simple native implementation:
\`\`\`html
<img src="image.jpg" alt="Description" loading="lazy">
\`\`\`

## Measuring Performance

### Tools to Use
- **Google PageSpeed Insights** - Overall performance score
- **GTmetrix** - Detailed image analysis
- **WebPageTest** - Real-world testing
- **Chrome DevTools** - Network/performance tabs

### Key Metrics to Watch
- **LCP (Largest Contentful Paint)** - Under 2.5 seconds
- **Total page weight** - Images shouldn't dominate
- **Number of requests** - Fewer is better
- **Image load time** - Individual image loading

## Common Optimization Mistakes

### 1. Using Wrong Format
- JPEG for graphics = artifacts
- PNG for photos = huge files
- GIF for complex animation = poor quality

### 2. Not Resizing Before Upload
- CMS resizes don't optimize well
- Original camera images are way too large
- Resize locally first

### 3. Forgetting Mobile
- Test on real mobile devices
- Mobile connections are slower
- Different image sizes may be needed

### 4. Over-Optimization
- Too much compression = visible quality loss
- Balance size and quality
- Test at actual display size

### 5. Ignoring CDN Benefits
- Content Delivery Networks speed delivery
- Cache images globally
- Consider for high-traffic sites

## Step-by-Step Optimization Workflow

1. **Audit current images** - Find largest/slowest
2. **Resize to correct dimensions** - Match display size
3. **Convert to optimal format** - WebP where supported
4. **Compress appropriately** - Balance size/quality
5. **Add proper attributes** - Alt text, lazy loading
6. **Test performance** - Before and after comparison
7. **Monitor ongoing** - New images need optimization too
    `
  }
];

const difficultyColors = {
  Beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  Intermediate: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Advanced: "bg-red-500/10 text-red-600 dark:text-red-400"
};

const TutorialsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>(null);

  const categories = ["all", ...Array.from(new Set(tutorials.map(t => t.category)))];

  const filteredTutorials = selectedCategory === "all" 
    ? tutorials 
    : tutorials.filter(t => t.category === selectedCategory);

  const formatContent = (content: string) => {
    return content
      .replace(/## (.*)/g, '<h2 class="text-xl font-semibold mt-6 mb-3 text-foreground">$1</h2>')
      .replace(/### (.*)/g, '<h3 class="text-lg font-medium mt-4 mb-2 text-foreground">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
      .replace(/- (.*)/g, '<li class="ml-4 text-muted-foreground">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground leading-relaxed">')
      .replace(/\| (.*) \|/g, '<tr class="border-b border-border"><td class="px-4 py-2 text-muted-foreground">$1</td></tr>')
      .replace(/```[\s\S]*?```/g, (match) => 
        `<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm text-foreground">${match.replace(/```/g, '').trim()}</code></pre>`
      );
  };

  return (
    <>
      <Helmet>
        <title>Image Editing Tutorials - Step-by-Step Guides | MultiToolsA</title>
        <meta 
          name="description" 
          content="Comprehensive image editing tutorials covering compression, conversion, resizing, cropping, watermarking, PDF tools, and more. Learn professional techniques with our step-by-step guides." 
        />
        <meta name="keywords" content="image editing tutorials, photo editing guide, image compression tutorial, resize images guide, watermark tutorial, PDF editing, image optimization, web images" />
        <link rel="canonical" href="https://multitoolsa.com/tutorials" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Image Editing Tutorials - Step-by-Step Guides | MultiToolsA" />
        <meta property="og:description" content="Learn professional image editing techniques with our comprehensive step-by-step tutorials covering compression, conversion, resizing, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/tutorials" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image Editing Tutorials - Step-by-Step Guides" />
        <meta name="twitter:description" content="Comprehensive tutorials for image compression, conversion, resizing, and professional editing techniques." />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Image Editing Tutorials",
            "description": "Comprehensive collection of step-by-step image editing tutorials",
            "url": "https://multitoolsa.com/tutorials",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": tutorials.map((tutorial, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "HowTo",
                  "name": tutorial.title,
                  "description": tutorial.description,
                  "url": `https://multitoolsa.com/tutorials#${tutorial.id}`
                }
              }))
            }
          })}
        </script>
      </Helmet>
      
      <HreflangTags path="/tutorials" />
      
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="container max-w-6xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Learning Center</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Image Editing <span className="text-primary">Tutorials</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Master professional image editing with our comprehensive step-by-step guides. 
                From basic compression to advanced optimization techniques, learn everything 
                you need to create perfect images for any purpose.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary">{tutorials.length}</div>
                  <div className="text-sm text-muted-foreground">Tutorials</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-500">Free</div>
                  <div className="text-sm text-muted-foreground">No Cost</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-500">All Levels</div>
                  <div className="text-sm text-muted-foreground">Beginner to Pro</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-500">2025</div>
                  <div className="text-sm text-muted-foreground">Updated</div>
                </div>
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="py-6 border-b border-border bg-card/50">
            <div className="container max-w-6xl mx-auto px-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    }`}
                  >
                    {category === "all" ? "All Tutorials" : category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Tutorials Grid */}
          <section className="py-12 px-4">
            <div className="container max-w-6xl mx-auto">
              <div className="grid gap-6">
                {filteredTutorials.map((tutorial) => (
                  <article 
                    key={tutorial.id}
                    id={tutorial.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Tutorial Header */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedTutorial(
                        expandedTutorial === tutorial.id ? null : tutorial.id
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          {tutorial.icon}
                        </div>
                        
                        <div className="flex-grow min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[tutorial.difficulty]}`}>
                              {tutorial.difficulty}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {tutorial.duration}
                            </span>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                              {tutorial.category}
                            </span>
                          </div>
                          
                          <h2 className="text-xl font-semibold mb-2 text-foreground">
                            {tutorial.title}
                          </h2>
                          
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {tutorial.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {tutorial.topics.map((topic, index) => (
                              <span 
                                key={index}
                                className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <ArrowRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                            expandedTutorial === tutorial.id ? "rotate-90" : ""
                          }`} />
                        </div>
                      </div>
                    </div>

                    {/* Tutorial Content (Expandable) */}
                    {expandedTutorial === tutorial.id && (
                      <div className="px-6 pb-6 pt-2 border-t border-border">
                        {/* Tutorial Screenshot */}
                        {tutorial.screenshot && (
                          <div className="mb-6 rounded-xl overflow-hidden border border-border shadow-lg">
                            <img 
                              src={tutorial.screenshot} 
                              alt={`${tutorial.title} - Visual guide screenshot`}
                              className="w-full h-auto object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        
                        <div 
                          className="prose prose-slate dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ 
                            __html: `<p class="mb-4 text-muted-foreground leading-relaxed">${formatContent(tutorial.content)}</p>` 
                          }}
                        />
                        
                        {/* Related Tools CTA */}
                        <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium text-foreground">Ready to try it yourself?</p>
                              <p className="text-sm text-muted-foreground">
                                Use our free {tutorial.category.toLowerCase()} tools to apply what you've learned.
                              </p>
                            </div>
                            <Link 
                              to="/all-tools" 
                              className="ml-auto flex items-center gap-1 text-primary hover:underline text-sm font-medium"
                            >
                              View Tools <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              {filteredTutorials.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tutorials found in this category.</p>
                </div>
              )}
            </div>
          </section>

          {/* Ads Section */}
          <section className="py-8 px-4">
            <div className="container max-w-4xl mx-auto">
              <AdInline />
              <AdBottom className="mt-4" />
              <AdVideo className="mt-4" />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="container max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Put Your Knowledge to Use?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Apply what you've learned with our free online image tools. No sign-up required, 
                and all processing happens in your browser for complete privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Browse All Tools
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/faq"
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                >
                  Read FAQ
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TutorialsPage;
