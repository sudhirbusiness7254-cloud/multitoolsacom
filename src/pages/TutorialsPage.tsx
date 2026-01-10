import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import { BookOpen, Image, Minimize2, Crop, FileText, Palette, Shield, ArrowRight, Clock, CheckCircle } from "lucide-react";

const tutorials = [
  {
    id: "compress-images-web",
    title: "How to Compress Images for the Web: A Complete Guide",
    description: "Learn the best practices for compressing images without losing quality. Covers JPEG, PNG, and WebP optimization techniques.",
    icon: <Minimize2 className="w-6 h-6" />,
    duration: "10 min read",
    difficulty: "Beginner",
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
    topics: ["Format Conversion", "JPEG", "PNG", "WebP"],
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
    icon: <Crop className="w-6 h-6" />,
    duration: "7 min read",
    difficulty: "Beginner",
    topics: ["Image Resizing", "Resolution", "Aspect Ratio"],
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
    id: "watermark-protect-images",
    title: "Adding Watermarks to Protect Your Images",
    description: "Learn how to add professional watermarks to protect your photos and build brand recognition.",
    icon: <Shield className="w-6 h-6" />,
    duration: "6 min read",
    difficulty: "Beginner",
    topics: ["Watermarking", "Copyright", "Brand Protection"],
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

## Quick Reference Card

| Platform | Post Size | Story Size | Profile |
|----------|-----------|------------|---------|
| Instagram | 1080x1350 | 1080x1920 | 320x320 |
| Facebook | 1200x630 | 1080x1920 | 170x170 |
| Twitter | 1200x675 | N/A | 400x400 |
| LinkedIn | 1200x627 | N/A | 400x400 |
| Pinterest | 1000x1500 | 1080x1920 | 165x165 |
    `
  },
  {
    id: "remove-image-metadata",
    title: "Understanding and Removing Image Metadata (EXIF Data)",
    description: "Learn what metadata is stored in your photos, why it matters for privacy, and how to remove it.",
    icon: <FileText className="w-6 h-6" />,
    duration: "6 min read",
    difficulty: "Intermediate",
    topics: ["Metadata", "EXIF", "Privacy", "Security"],
    content: `
## What is Image Metadata?

Digital images contain hidden information called metadata. This data is embedded in the file and includes details about how, when, and where the photo was taken.

## Types of Metadata in Images

### EXIF (Exchangeable Image File Format)
Technical data added by your camera:
- **Camera model and settings** (aperture, shutter speed, ISO)
- **Date and time** the photo was taken
- **GPS coordinates** (if location services enabled)
- **Thumbnail preview**
- **Lens information**
- **Flash usage**
- **Orientation**

### IPTC (International Press Telecommunications Council)
Professional/editorial information:
- Photographer name
- Copyright notice
- Caption/description
- Keywords and tags
- Contact information

### XMP (Extensible Metadata Platform)
Adobe's metadata standard:
- Editing history
- Software used
- Custom metadata fields

## Why Metadata Privacy Matters

### Location Tracking Risk
If your camera has GPS enabled, every photo contains exact coordinates. Sharing these photos reveals:
- Your home address (from photos taken at home)
- Your workplace location
- Places you frequent
- Travel patterns

### Personal Information Exposure
Metadata may include:
- Your name (from camera registration)
- Serial numbers (can identify your specific camera)
- Editing software (may reveal if image was modified)

### Real-World Examples of Metadata Issues
- Journalists have been located via photo metadata
- Celebrities' home locations exposed through social media photos
- Photo editing detection for insurance fraud
- Stalking cases enabled by location data in photos

## When to Remove Metadata

### Always Remove Before:
- Posting to public social media
- Sharing on forums or public websites
- Sending to people you don't fully trust
- Selling or licensing images publicly

### Keep Metadata When:
- Archiving personal photos
- Professional photography workflows
- Copyright/ownership documentation
- Sharing with trusted collaborators

## How to View Image Metadata

Using our View EXIF tool:
1. Upload your image
2. View all embedded metadata
3. See exactly what information is stored

## How to Remove Metadata

Using our Remove EXIF tool:
1. Upload your image
2. Select which metadata to remove (all or specific types)
3. Download the clean version

Your original file remains unchanged—we create a new version without the selected metadata.

## Metadata and Social Media

Major platforms handle metadata differently:

| Platform | Strips EXIF? | Strips GPS? |
|----------|-------------|-------------|
| Facebook | Yes | Yes |
| Instagram | Yes | Yes |
| Twitter | Yes | Yes |
| WhatsApp | Yes | Yes |
| Discord | No | No |
| Email | No | No |

**Important:** Even if platforms strip metadata, they may store it on their servers before removing it from public-facing versions.

## Best Practices for Metadata Privacy

1. **Disable GPS on camera** - Prevent location data from being captured
2. **Remove metadata before sharing** - Use our tools to clean files
3. **Check settings on phone** - Most smartphones embed GPS by default
4. **Consider metadata when archiving** - Keep originals with metadata in secure storage
5. **Verify removal worked** - Use View EXIF after cleaning to confirm

## Metadata for Copyright Protection

While metadata can be a privacy risk, it's also useful for proving ownership:
- Embed copyright notices in IPTC data
- Include creator contact information
- Add unique identifiers
- Register photos with copyright offices for legal protection

The key is being intentional—keep metadata for your records, remove it before public sharing.
    `
  }
];

const TutorialsPage = () => {
  return (
    <>
      <Helmet>
        <title>Image Editing Tutorials & Guides - MultiToolsA | Learn Free</title>
        <meta name="description" content="Learn image editing with our free tutorials. Master image compression, format conversion, resizing, watermarking, and more. Step-by-step guides for beginners to advanced users." />
        <meta name="keywords" content="image editing tutorials, photo editing guide, image compression tutorial, resize images guide, watermark tutorial, free image editing lessons" />
        <link rel="canonical" href="https://multitoolsa.com/tutorials" />
        
        <meta property="og:title" content="Image Editing Tutorials - MultiToolsA" />
        <meta property="og:description" content="Free step-by-step guides for image compression, conversion, resizing, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/tutorials" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Image Editing Tutorials",
            "description": "Comprehensive tutorials for image editing, compression, conversion, and optimization",
            "url": "https://multitoolsa.com/tutorials",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": tutorials.map((tutorial, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": tutorial.title,
                "url": `https://multitoolsa.com/tutorials#${tutorial.id}`
              }))
            }
          })}
        </script>
      </Helmet>
      <HreflangTags path="/tutorials" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Free Learning Resources</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Image Editing Tutorials
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Master image editing with our comprehensive, beginner-friendly guides. 
                Learn compression, conversion, resizing, watermarking, and more—all completely free.
              </p>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="py-8 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary">{tutorials.length}</div>
                  <div className="text-sm text-muted-foreground">In-Depth Tutorials</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary">Free</div>
                  <div className="text-sm text-muted-foreground">No Cost to Learn</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary">All Levels</div>
                  <div className="text-sm text-muted-foreground">Beginner to Pro</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary">Updated</div>
                  <div className="text-sm text-muted-foreground">Latest Techniques</div>
                </div>
              </div>
            </div>
          </section>

          {/* Tutorial List */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="space-y-6">
                {tutorials.map((tutorial) => (
                  <article 
                    key={tutorial.id} 
                    id={tutorial.id}
                    className="bg-card rounded-2xl border border-border overflow-hidden"
                  >
                    {/* Tutorial Header */}
                    <div className="p-6 md:p-8 border-b border-border">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          {tutorial.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {tutorial.difficulty}
                            </span>
                            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {tutorial.duration}
                            </span>
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold mb-2">{tutorial.title}</h2>
                          <p className="text-muted-foreground">{tutorial.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {tutorial.topics.map((topic) => (
                              <span key={topic} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tutorial Content */}
                    <div className="p-6 md:p-8">
                      <div className="prose prose-sm md:prose max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
                        {tutorial.content.split('\n').map((paragraph, idx) => {
                          if (paragraph.startsWith('## ')) {
                            return <h2 key={idx} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
                          } else if (paragraph.startsWith('### ')) {
                            return <h3 key={idx} className="text-lg font-semibold mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
                          } else if (paragraph.startsWith('- **')) {
                            return (
                              <div key={idx} className="flex items-start gap-2 ml-4 mb-1">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                <span dangerouslySetInnerHTML={{ __html: paragraph.replace('- **', '<strong>').replace('**', '</strong>') }} />
                              </div>
                            );
                          } else if (paragraph.startsWith('- ')) {
                            return (
                              <div key={idx} className="flex items-start gap-2 ml-4 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span>{paragraph.replace('- ', '')}</span>
                              </div>
                            );
                          } else if (paragraph.startsWith('|')) {
                            return null; // Skip table rows for simplicity
                          } else if (paragraph.trim()) {
                            return <p key={idx} className="mb-3">{paragraph}</p>;
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-3xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Apply What You've Learned?</h2>
              <p className="text-muted-foreground mb-6">
                Put your new knowledge into practice with our free online image tools. 
                No signup required—just start editing!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Browse All Tools <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/faq"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
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