import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import { Link } from "react-router-dom";
import { FileImage, ArrowRight, CheckCircle, XCircle, Star } from "lucide-react";

const ImageFormatsGuidePage = () => {
  const formats = [
    {
      name: "JPEG / JPG",
      fullName: "Joint Photographic Experts Group",
      extension: ".jpg, .jpeg",
      year: "1992",
      compression: "Lossy",
      transparency: false,
      animation: false,
      colors: "16.7 million",
      bestFor: ["Photographs", "Web images", "Social media", "Print photos"],
      notFor: ["Logos", "Text graphics", "Screenshots", "Images needing transparency"],
      typicalSize: "Small to medium",
      browserSupport: "100%",
      description: "JPEG is the most widely used image format, especially for photographs. It uses lossy compression, meaning some data is permanently removed to reduce file size. The compression algorithm is optimized for photographic content with smooth color gradients. Quality can be adjusted from 0-100%, with 70-85% being optimal for most web use.",
      technicalDetails: "JPEG uses discrete cosine transform (DCT) to convert image data into frequency components, then quantizes these components to reduce file size. Higher compression means more aggressive quantization, which can cause visible artifacts especially around sharp edges.",
      whenToUse: "Use JPEG for any photographic image where small file size matters more than pixel-perfect quality. It's ideal for web photos, digital camera output, and anywhere transparency isn't needed.",
      color: "#E74C3C"
    },
    {
      name: "PNG",
      fullName: "Portable Network Graphics",
      extension: ".png",
      year: "1996",
      compression: "Lossless",
      transparency: true,
      animation: false,
      colors: "16.7 million + alpha",
      bestFor: ["Logos", "Graphics with text", "Screenshots", "Images needing transparency"],
      notFor: ["Large photographs", "When small file size is critical"],
      typicalSize: "Medium to large",
      browserSupport: "100%",
      description: "PNG was developed as a patent-free replacement for GIF and offers true lossless compression. Every pixel is preserved exactly, making it perfect for graphics where accuracy matters. PNG supports full alpha transparency, allowing semi-transparent pixels—crucial for overlays and modern web design.",
      technicalDetails: "PNG uses DEFLATE compression (the same as ZIP files) on filtered image data. Filter algorithms predict pixel values to improve compression. PNG-8 uses 256-color palette, while PNG-24/32 support millions of colors with optional alpha channel.",
      whenToUse: "Use PNG for logos, graphics with text, screenshots, or any image requiring transparency. Also ideal when you need to edit an image multiple times without quality degradation.",
      color: "#3498DB"
    },
    {
      name: "WebP",
      fullName: "Web Picture Format",
      extension: ".webp",
      year: "2010",
      compression: "Both lossy and lossless",
      transparency: true,
      animation: true,
      colors: "16.7 million + alpha",
      bestFor: ["Modern websites", "Web optimization", "Replacing JPEG and PNG"],
      notFor: ["Print workflows", "Older browser support required", "Professional photo editing"],
      typicalSize: "Smallest for web",
      browserSupport: "97%+",
      description: "Developed by Google specifically for web use, WebP provides superior compression for both lossy and lossless images. It typically produces files 25-35% smaller than JPEG at equivalent quality and smaller than PNG for lossless images. WebP also supports transparency and animation.",
      technicalDetails: "WebP lossy uses predictive coding based on VP8 video codec, predicting pixel values from surrounding blocks. Lossless WebP uses multiple techniques including spatial prediction, color caching, and entropy coding. Animation uses interframe compression.",
      whenToUse: "Use WebP as your primary format for modern websites. Serve with JPEG/PNG fallbacks for older browsers. It's the best choice for optimizing web performance without sacrificing quality.",
      color: "#27AE60"
    },
    {
      name: "GIF",
      fullName: "Graphics Interchange Format",
      extension: ".gif",
      year: "1987",
      compression: "Lossless",
      transparency: "Limited (1-bit)",
      animation: true,
      colors: "256",
      bestFor: ["Simple animations", "Small icons", "Simple graphics"],
      notFor: ["Photographs", "Graphics with gradients", "High-quality animation"],
      typicalSize: "Small for simple graphics, large for animations",
      browserSupport: "100%",
      description: "GIF is one of the oldest image formats still in widespread use, famous for animated images. Its 256-color limit makes it unsuitable for photographs but efficient for simple graphics. GIF supports basic transparency (fully transparent or fully opaque) and frame-by-frame animation.",
      technicalDetails: "GIF uses LZW compression on indexed color data. Each frame can have its own 256-color palette. Animations can specify frame delays and disposal methods. Modern alternatives like WebP and APNG offer better animation with full color support.",
      whenToUse: "Use GIF for simple animations when universal support is needed, or for very simple graphics. For new projects, consider WebP animation or video formats for better quality and smaller sizes.",
      color: "#9B59B6"
    },
    {
      name: "SVG",
      fullName: "Scalable Vector Graphics",
      extension: ".svg",
      year: "1999",
      compression: "Text-based (compressible)",
      transparency: true,
      animation: true,
      colors: "Unlimited",
      bestFor: ["Logos", "Icons", "Illustrations", "Graphics that scale"],
      notFor: ["Photographs", "Complex realistic images"],
      typicalSize: "Very small for simple graphics",
      browserSupport: "100%",
      description: "SVG is fundamentally different from other formats—it's vector-based, meaning images are defined by mathematical shapes rather than pixels. This allows perfect scaling to any size without quality loss. SVG files are actually XML text, making them editable and stylable with CSS.",
      technicalDetails: "SVG defines shapes using paths, basic shapes (rect, circle, etc.), text, and groups. Supports transformations, gradients, patterns, filters, and animations. Can be embedded inline in HTML and manipulated with JavaScript. Compressed as SVGZ using gzip.",
      whenToUse: "Use SVG for logos, icons, and any graphic that needs to display at multiple sizes. Perfect for responsive design and high-DPI displays. Avoid for photographs or images with many complex details.",
      color: "#E67E22"
    },
    {
      name: "HEIC / HEIF",
      fullName: "High Efficiency Image Container",
      extension: ".heic, .heif",
      year: "2015",
      compression: "Lossy (HEVC)",
      transparency: true,
      animation: true,
      colors: "16.7 million + alpha",
      bestFor: ["iPhone photos", "High-quality storage", "Live Photos"],
      notFor: ["Web publishing", "Cross-platform sharing", "Older systems"],
      typicalSize: "Small (50% of JPEG)",
      browserSupport: "Limited (~40%)",
      description: "HEIC is Apple's preferred image format for iOS devices, offering significantly better compression than JPEG while maintaining quality. A 12MP iPhone photo that would be 3MB as JPEG is typically under 1.5MB as HEIC. However, limited compatibility outside the Apple ecosystem often requires conversion.",
      technicalDetails: "HEIC uses HEVC (H.265) video codec for image compression, leveraging advanced techniques like larger block sizes, more prediction modes, and better entropy coding. The container can hold multiple images, enabling Live Photos and burst sequences.",
      whenToUse: "HEIC is great for personal photo storage on Apple devices. Convert to JPEG or WebP before sharing or web publishing to ensure compatibility across all devices and browsers.",
      color: "#1ABC9C"
    },
    {
      name: "TIFF",
      fullName: "Tagged Image File Format",
      extension: ".tiff, .tif",
      year: "1986",
      compression: "Various (often none or lossless)",
      transparency: true,
      animation: false,
      colors: "Up to 48-bit",
      bestFor: ["Professional photography", "Print production", "Archival storage"],
      notFor: ["Web use", "Email sharing", "Limited storage"],
      typicalSize: "Very large",
      browserSupport: "Limited",
      description: "TIFF is a professional format designed for maximum quality and flexibility. It supports various compression methods (including none), high bit depths, and multiple pages. Used extensively in print, publishing, and professional photography workflows where quality preservation is critical.",
      technicalDetails: "TIFF uses a tag-based structure allowing extensive metadata and multiple compression options (None, LZW, ZIP, JPEG). Supports CMYK color for print, 16/32-bit per channel, layers, and multiple images in one file. Highly extensible but can result in compatibility issues.",
      whenToUse: "Use TIFF for professional workflows, print production, or archival storage where file size isn't a concern. Convert to JPEG or PNG for web use or sharing.",
      color: "#34495E"
    },
    {
      name: "BMP",
      fullName: "Bitmap Image File",
      extension: ".bmp",
      year: "1990",
      compression: "Usually none",
      transparency: "Limited (32-bit)",
      animation: false,
      colors: "Up to 16.7 million",
      bestFor: ["Windows applications", "Simple graphics editing"],
      notFor: ["Web use", "File sharing", "Storage-conscious use"],
      typicalSize: "Very large (uncompressed)",
      browserSupport: "100%",
      description: "BMP is Windows' native uncompressed image format. While it preserves perfect quality, the lack of compression results in very large files. BMP is rarely used today except within Windows applications or for specific technical purposes where uncompressed data is required.",
      technicalDetails: "BMP stores pixels in a simple row-by-row format with optional RLE compression for 4-bit and 8-bit images. 32-bit BMPs include an alpha channel. The simple format makes it easy to read/write programmatically but inefficient for storage.",
      whenToUse: "Avoid BMP for most purposes. Use PNG instead for lossless quality with much smaller files. BMP may be needed for specific Windows applications or technical requirements.",
      color: "#7F8C8D"
    }
  ];

  const comparisonTable = [
    { format: "JPEG", photos: "★★★★★", graphics: "★★☆☆☆", transparency: "✗", animation: "✗", web: "★★★★★" },
    { format: "PNG", photos: "★★★☆☆", graphics: "★★★★★", transparency: "✓", animation: "✗", web: "★★★★☆" },
    { format: "WebP", photos: "★★★★★", graphics: "★★★★★", transparency: "✓", animation: "✓", web: "★★★★★" },
    { format: "GIF", photos: "★☆☆☆☆", graphics: "★★★☆☆", transparency: "△", animation: "✓", web: "★★★☆☆" },
    { format: "SVG", photos: "✗", graphics: "★★★★★", transparency: "✓", animation: "✓", web: "★★★★★" },
    { format: "HEIC", photos: "★★★★★", graphics: "★★★☆☆", transparency: "✓", animation: "✓", web: "★★☆☆☆" },
  ];

  return (
    <>
      <Helmet>
        <title>Complete Guide to Image Formats: JPEG vs PNG vs WebP vs GIF | Convert</title>
        <meta name="description" content="Comprehensive guide comparing image formats. Learn when to use JPEG, PNG, WebP, GIF, SVG, HEIC, and TIFF. Understand compression, transparency, and choose the right format for any situation." />
        <meta name="keywords" content="image formats comparison, JPEG vs PNG, WebP format, GIF animation, SVG vector, HEIC conversion, image format guide, when to use PNG, when to use JPEG" />
        <link rel="canonical" href="https://multitoolsa.com/image-formats-guide" />
        
        <meta property="og:title" content="Complete Guide to Image Formats | Convert" />
        <meta property="og:description" content="Everything you need to know about image formats. Compare JPEG, PNG, WebP, GIF, SVG, and more." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://multitoolsa.com/image-formats-guide" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Complete Guide to Image Formats: When to Use Each Format",
            "description": "Comprehensive comparison of image formats including JPEG, PNG, WebP, GIF, SVG, HEIC, TIFF, and BMP.",
            "author": {
              "@type": "Organization",
              "name": "Convert"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Convert",
              "url": "https://multitoolsa.com"
            }
          })}
        </script>
      </Helmet>
      <HreflangTags path="/image-formats-guide" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <FileImage className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Educational Guide</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                Complete Guide to Image Formats
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Understanding when to use JPEG, PNG, WebP, GIF, and other formats can dramatically improve 
                your website performance and image quality. This guide explains everything.
              </p>
            </div>
          </section>

          {/* Quick Comparison Table */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Quick Format Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-card rounded-xl border border-border">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-bold">Format</th>
                      <th className="px-4 py-3 text-center font-bold">Photos</th>
                      <th className="px-4 py-3 text-center font-bold">Graphics</th>
                      <th className="px-4 py-3 text-center font-bold">Transparency</th>
                      <th className="px-4 py-3 text-center font-bold">Animation</th>
                      <th className="px-4 py-3 text-center font-bold">Web Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.map((row, index) => (
                      <tr key={index} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 font-semibold">{row.format}</td>
                        <td className="px-4 py-3 text-center text-yellow-500">{row.photos}</td>
                        <td className="px-4 py-3 text-center text-yellow-500">{row.graphics}</td>
                        <td className="px-4 py-3 text-center">
                          {row.transparency === "✓" ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : 
                           row.transparency === "✗" ? <XCircle className="w-5 h-5 text-red-500 mx-auto" /> :
                           <span className="text-yellow-500">△</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.animation === "✓" ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : 
                           <XCircle className="w-5 h-5 text-red-500 mx-auto" />}
                        </td>
                        <td className="px-4 py-3 text-center text-yellow-500">{row.web}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Detailed Format Sections */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center">Detailed Format Guide</h2>
              
              <div className="space-y-12">
                {formats.map((format, index) => (
                  <article key={index} className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                        style={{ backgroundColor: format.color }}
                      >
                        {format.extension.split(',')[0].replace('.', '').toUpperCase()}
                      </div>
                      
                      <div className="flex-1">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold mb-1">{format.name}</h3>
                          <p className="text-muted-foreground">{format.fullName} ({format.year})</p>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">{format.description}</p>
                        
                        {/* Quick Stats */}
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                          <div className="bg-secondary/50 rounded-lg px-3 py-2 text-sm">
                            <div className="text-muted-foreground">Compression</div>
                            <div className="font-semibold">{format.compression}</div>
                          </div>
                          <div className="bg-secondary/50 rounded-lg px-3 py-2 text-sm">
                            <div className="text-muted-foreground">Colors</div>
                            <div className="font-semibold">{format.colors}</div>
                          </div>
                          <div className="bg-secondary/50 rounded-lg px-3 py-2 text-sm">
                            <div className="text-muted-foreground">Transparency</div>
                            <div className="font-semibold">{format.transparency ? "Yes" : "No"}</div>
                          </div>
                          <div className="bg-secondary/50 rounded-lg px-3 py-2 text-sm">
                            <div className="text-muted-foreground">Browser Support</div>
                            <div className="font-semibold">{format.browserSupport}</div>
                          </div>
                        </div>
                        
                        {/* Best For / Not For */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <h4 className="font-semibold text-green-500 mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" /> Best For
                            </h4>
                            <ul className="space-y-1">
                              {format.bestFor.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-500 mb-2 flex items-center gap-2">
                              <XCircle className="w-4 h-4" /> Avoid For
                            </h4>
                            <ul className="space-y-1">
                              {format.notFor.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {/* When to Use */}
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Star className="w-4 h-4 text-primary" /> When to Use {format.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">{format.whenToUse}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-20 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-3xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Convert Your Images?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Now that you know which format to use, try our free conversion tools. 
                Convert between any formats instantly in your browser.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/image-converter"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Convert Images Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                >
                  Browse All Tools
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

export default ImageFormatsGuidePage;
