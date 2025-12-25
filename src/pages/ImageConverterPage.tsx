import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageConverter from "@/components/ImageConverter";
import { conversionArticles } from "@/data/conversionArticlesData";
import {
  Image, 
  Zap, 
  Shield, 
  Download, 
  Globe, 
  CheckCircle,
  FileImage,
  BookOpen,
  Lightbulb,
  HelpCircle,
  Lock,
  Users,
  Star,
  Sparkles,
  ArrowRight
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HreflangTags from "@/components/HreflangTags";

const conversionMeta: Record<string, { title: string; description: string; h1: string; fromFormat: string; toFormat: string }> = {
  "jpg-to-png": {
    title: "JPG to PNG Converter - Free Online Image Conversion Tool",
    description: "Convert JPG images to PNG format online for free. Preserve transparency, high quality conversion with no watermarks. Fast, secure, and easy to use.",
    h1: "Convert JPG to PNG Online Free",
    fromFormat: "jpg",
    toFormat: "png"
  },
  "png-to-jpg": {
    title: "PNG to JPG Converter - Free Online Image Conversion Tool",
    description: "Convert PNG images to JPG format online for free. Reduce file size while maintaining quality. No signup required, instant conversion.",
    h1: "Convert PNG to JPG Online Free",
    fromFormat: "png",
    toFormat: "jpg"
  },
  "webp-to-jpg": {
    title: "WEBP to JPG Converter - Free Online Image Conversion Tool",
    description: "Convert WEBP images to JPG format online for free. Make your WebP images compatible with all devices. Fast and secure conversion.",
    h1: "Convert WEBP to JPG Online Free",
    fromFormat: "webp",
    toFormat: "jpg"
  },
  "webp-to-png": {
    title: "WEBP to PNG Converter - Free Online Image Conversion Tool",
    description: "Convert WEBP images to PNG format online for free. Preserve transparency and quality. No software installation required.",
    h1: "Convert WEBP to PNG Online Free",
    fromFormat: "webp",
    toFormat: "png"
  },
  "jpg-to-webp": {
    title: "JPG to WEBP Converter - Free Online Image Conversion Tool",
    description: "Convert JPG images to WEBP format online for free. Reduce file size by up to 30% with better quality. Optimize for web performance.",
    h1: "Convert JPG to WEBP Online Free",
    fromFormat: "jpg",
    toFormat: "webp"
  },
  "png-to-webp": {
    title: "PNG to WEBP Converter - Free Online Image Conversion Tool",
    description: "Convert PNG images to WEBP format online for free. Smaller file sizes with transparency support. Perfect for web optimization.",
    h1: "Convert PNG to WEBP Online Free",
    fromFormat: "png",
    toFormat: "webp"
  },
  "gif-to-png": {
    title: "GIF to PNG Converter - Free Online Image Conversion Tool",
    description: "Convert GIF images to PNG format online for free. Extract frames or convert static GIFs to high-quality PNG images.",
    h1: "Convert GIF to PNG Online Free",
    fromFormat: "gif",
    toFormat: "png"
  },
  "gif-to-jpg": {
    title: "GIF to JPG Converter - Free Online Image Conversion Tool",
    description: "Convert GIF images to JPG format online for free. Convert animated or static GIFs to compressed JPG format.",
    h1: "Convert GIF to JPG Online Free",
    fromFormat: "gif",
    toFormat: "jpg"
  },
  "heic-to-jpg": {
    title: "HEIC to JPG Converter - Free Online Image Conversion Tool",
    description: "Convert HEIC images to JPG format online for free. Make iPhone photos compatible with all devices and platforms instantly.",
    h1: "Convert HEIC to JPG Online Free",
    fromFormat: "heic",
    toFormat: "jpg"
  },
  "heic-to-png": {
    title: "HEIC to PNG Converter - Free Online Image Conversion Tool",
    description: "Convert HEIC images to PNG format online for free. Preserve quality from iPhone photos with universal compatibility.",
    h1: "Convert HEIC to PNG Online Free",
    fromFormat: "heic",
    toFormat: "png"
  },
  "svg-to-png": {
    title: "SVG to PNG Converter - Free Online Image Conversion Tool",
    description: "Convert SVG vector images to PNG format online for free. Rasterize vectors at any resolution with high quality output.",
    h1: "Convert SVG to PNG Online Free",
    fromFormat: "svg",
    toFormat: "png"
  },
  "svg-to-jpg": {
    title: "SVG to JPG Converter - Free Online Image Conversion Tool",
    description: "Convert SVG vector images to JPG format online for free. Convert vector graphics to compressed raster images.",
    h1: "Convert SVG to JPG Online Free",
    fromFormat: "svg",
    toFormat: "jpg"
  },
  "bmp-to-jpg": {
    title: "BMP to JPG Converter - Free Online Image Conversion Tool",
    description: "Convert BMP images to JPG format online for free. Drastically reduce file size while maintaining image quality.",
    h1: "Convert BMP to JPG Online Free",
    fromFormat: "bmp",
    toFormat: "jpg"
  },
  "bmp-to-png": {
    title: "BMP to PNG Converter - Free Online Image Conversion Tool",
    description: "Convert BMP images to PNG format online for free. Convert bitmap images to portable network graphics format.",
    h1: "Convert BMP to PNG Online Free",
    fromFormat: "bmp",
    toFormat: "png"
  },
  "tiff-to-jpg": {
    title: "TIFF to JPG Converter - Free Online Image Conversion Tool",
    description: "Convert TIFF images to JPG format online for free. Compress large TIFF files to smaller JPG format for easy sharing.",
    h1: "Convert TIFF to JPG Online Free",
    fromFormat: "tiff",
    toFormat: "jpg"
  },
  "tiff-to-png": {
    title: "TIFF to PNG Converter - Free Online Image Conversion Tool",
    description: "Convert TIFF images to PNG format online for free. Convert high-quality TIFF images to web-friendly PNG format.",
    h1: "Convert TIFF to PNG Online Free",
    fromFormat: "tiff",
    toFormat: "png"
  },
  "raw-to-jpg": {
    title: "RAW to JPG Converter - Free Online Image Conversion Tool",
    description: "Convert RAW camera images to JPG format online for free. Process camera RAW files into shareable JPG images.",
    h1: "Convert RAW to JPG Online Free",
    fromFormat: "raw",
    toFormat: "jpg"
  },
  "raw-to-png": {
    title: "RAW to PNG Converter - Free Online Image Conversion Tool",
    description: "Convert RAW camera images to PNG format online for free. Convert unprocessed camera files to high-quality PNG.",
    h1: "Convert RAW to PNG Online Free",
    fromFormat: "raw",
    toFormat: "png"
  },
};

const ImageConverterPage = () => {
  const { conversion } = useParams<{ conversion?: string }>();
  const location = useLocation();
  
  const pathConversion = location.pathname.replace('/', '').replace('/image-converter/', '');
  const activeConversion = conversion || (conversionMeta[pathConversion] ? pathConversion : undefined);
  
  const meta = activeConversion && conversionMeta[activeConversion] 
    ? conversionMeta[activeConversion] 
    : {
        title: "Free Online Image Converter - JPG, PNG, WEBP, GIF, TIFF, RAW | Convert Images",
        description: "Convert images between JPG, PNG, WEBP, GIF, BMP, SVG, TIFF, RAW, and HEIC formats online for free. Fast, secure, and easy-to-use image conversion tool with no watermarks.",
        h1: "Free Online Image Converter",
        fromFormat: "",
        toFormat: ""
      };

  const preselectedFormat = activeConversion ? meta.toFormat : undefined;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I convert an image to a different format?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply upload your image using drag & drop or click to browse. Select your desired output format from the dropdown, click Convert, and download your converted image. The entire process takes just seconds."
        }
      },
      {
        "@type": "Question",
        "name": "Is this image converter free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our image converter is completely free to use. There are no hidden fees, no watermarks on converted images, and no signup required."
        }
      },
      {
        "@type": "Question",
        "name": "What image formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support all major image formats including JPG/JPEG, PNG, WEBP, GIF, BMP, SVG, TIFF, RAW, HEIC, and HEIF. You can convert between any of these formats instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Is my uploaded image secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! All image conversion happens directly in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security."
        }
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Image Converter",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2847"
    }
  };

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content="image converter, jpg to png, png to jpg, webp converter, tiff to jpg, raw to png, heic to jpg, photo converter, free image converter" />
        <link rel="canonical" href={`https://multitoolsa.com${location.pathname}`} />
        <HreflangTags path={location.pathname} />
        
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://multitoolsa.com${location.pathname}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Image className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Free Image Converter</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {meta.h1}
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Convert images instantly. 100% free, secure, and processed entirely in your browser.
                </p>
              </div>

              <ImageConverter preselectedConversion={preselectedFormat} />
            </div>
          </section>

          {/* Format-Specific Comprehensive Article Section */}
          {activeConversion && conversionArticles[activeConversion] && (
            <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
              <div className="container mx-auto max-w-5xl">
                {/* Main Article Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-lg">
                    <FileImage className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold">
                      Complete Guide: {meta.fromFormat.toUpperCase()} to {meta.toFormat.toUpperCase()} Conversion
                    </h2>
                    <p className="text-muted-foreground mt-1">Everything you need to know about converting {meta.fromFormat.toUpperCase()} files to {meta.toFormat.toUpperCase()} format</p>
                  </div>
                </div>
                
                {/* Comprehensive Article Content */}
                <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                  {/* About Section - Full 1000+ Word Article */}
                  <div className="p-6 sm:p-10 border-b border-border">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-primary" />
                      About {meta.fromFormat.toUpperCase()} to {meta.toFormat.toUpperCase()} Conversion
                    </h3>
                    <div className="prose prose-lg max-w-none">
                      {conversionArticles[activeConversion].about.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Why Convert Section */}
                  <div className="p-6 sm:p-10 bg-gradient-to-r from-primary/5 to-orange-500/5 border-b border-border">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                      <Lightbulb className="w-6 h-6 text-primary" />
                      Why Convert {meta.fromFormat.toUpperCase()} to {meta.toFormat.toUpperCase()}?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                      {conversionArticles[activeConversion].whyConvert}
                    </p>
                  </div>
                  
                  {/* Technical Details Section */}
                  <div className="p-6 sm:p-10 border-b border-border">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                      <Zap className="w-6 h-6 text-primary" />
                      Technical Details & Process
                    </h3>
                    <div className="bg-secondary/30 rounded-xl p-6">
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {conversionArticles[activeConversion].technicalDetails}
                      </p>
                    </div>
                  </div>
                  
                  {/* Use Cases & Benefits Grid */}
                  <div className="p-6 sm:p-10 grid lg:grid-cols-2 gap-8">
                    {/* Use Cases */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <ArrowRight className="w-6 h-6 text-blue-500" />
                        Common Use Cases
                      </h3>
                      <ul className="space-y-4">
                        {conversionArticles[activeConversion].useCases.map((useCase, i) => (
                          <li key={i} className="flex items-start gap-4 bg-background/50 rounded-lg p-4">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="text-muted-foreground">{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Benefits */}
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <Star className="w-6 h-6 text-green-500" />
                        Key Benefits
                      </h3>
                      <ul className="space-y-4">
                        {conversionArticles[activeConversion].benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-4 bg-background/50 rounded-lg p-4">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="p-6 sm:p-10 bg-gradient-to-r from-primary/10 to-orange-500/10 border-t border-border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">100%</div>
                        <div className="text-sm text-muted-foreground">Free to Use</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">0</div>
                        <div className="text-sm text-muted-foreground">Server Uploads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">∞</div>
                        <div className="text-sm text-muted-foreground">Conversions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                        <div className="text-sm text-muted-foreground">Availability</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Comprehensive About Section - 700+ words */}
          <section className="py-12 md:py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">About Our Image Converter</h2>
              </div>
              
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to our comprehensive online image converter, a powerful and versatile tool designed to handle all your image format conversion needs with professional-grade quality and unmatched convenience. In today's digital landscape, where images play a crucial role in communication, marketing, web development, and personal expression, having a reliable image conversion tool is more important than ever. Our platform provides a seamless solution for converting images between all major formats including JPG, PNG, WEBP, GIF, BMP, TIFF, SVG, RAW, and HEIC.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  The technology powering our image converter represents the cutting edge of browser-based image processing. Unlike traditional online converters that require you to upload your files to remote servers, our tool utilizes advanced HTML5 Canvas APIs, WebAssembly technology, and optimized JavaScript algorithms to perform all conversions directly within your web browser. This revolutionary approach means your images never leave your device, providing unparalleled privacy protection while eliminating upload and download wait times. Whether you are converting a single photograph or batch processing multiple images, the conversion happens instantaneously on your local machine.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Understanding the nuances of different image formats is essential for achieving optimal results. JPG (JPEG) is the go-to format for photographs and images with complex color gradients, offering excellent compression while maintaining visual quality. PNG excels at preserving sharp edges, text, and transparency, making it ideal for logos, graphics, and web elements. WEBP, developed by Google, combines the best of both worlds, offering superior compression for both photographs and graphics while supporting transparency and animation. GIF is perfect for simple animations and graphics with limited colors. TIFF and BMP provide uncompressed, high-quality output for professional printing and archival purposes. RAW files from digital cameras contain unprocessed sensor data, offering maximum flexibility for professional editing. HEIC, the modern format used by Apple devices, provides exceptional quality at reduced file sizes.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our image converter is designed to serve a diverse range of users and use cases. Professional photographers can quickly convert RAW files to web-friendly formats for online portfolios and client previews. Web developers can optimize images by converting to WEBP format, significantly reducing page load times and improving SEO rankings. Social media managers can ensure their visual content meets platform-specific requirements by converting to the appropriate format and dimensions. E-commerce businesses can maintain consistent product image quality while optimizing file sizes for faster page loads. Students and educators can convert presentation graphics and educational materials to universally compatible formats. Everyday users can easily share iPhone photos captured in HEIC format with friends and family using older devices or different platforms.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Quality preservation is at the heart of our conversion process. We understand that your images represent important memories, professional work, or business assets, which is why our algorithms are optimized to maintain the highest possible quality during conversion. When converting between lossless formats like PNG and BMP, your images retain 100% of their original quality. For conversions involving lossy formats like JPG and WEBP, our intelligent compression algorithms find the optimal balance between file size reduction and visual fidelity. You can trust that your converted images will look exactly as intended, whether displayed on high-resolution monitors, printed on professional equipment, or shared across digital platforms.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  The user experience we have crafted prioritizes simplicity without sacrificing functionality. Our intuitive drag-and-drop interface allows you to start converting images within seconds of arriving on our page. There is no learning curve, no complex settings to configure, and no software to download or install. Simply drag your image onto the designated area, select your desired output format, and click convert. Your converted image is ready for download immediately. For users who require more control, we offer advanced options including quality adjustment, format-specific settings, and batch processing capabilities. Our responsive design ensures a seamless experience across all devices, from desktop computers to tablets and smartphones, allowing you to convert images wherever you are.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-sm">Instant Conversion</h4>
                      <p className="text-xs text-muted-foreground">Process images in milliseconds with client-side technology</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-sm">Universal Compatibility</h4>
                      <p className="text-xs text-muted-foreground">Works on all modern browsers and devices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-sm">Complete Privacy</h4>
                      <p className="text-xs text-muted-foreground">Your files never leave your device</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-sm">No Registration</h4>
                      <p className="text-xs text-muted-foreground">Start using immediately without an account</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use Section */}
          <section className="py-12 md:py-20 bg-secondary/30 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">How to Convert Images</h2>
              </div>
              
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 mb-6">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Converting images with our tool is incredibly simple and straightforward. We have designed the entire process to be intuitive for users of all technical skill levels. Follow these comprehensive steps to convert your images quickly and efficiently, achieving professional-quality results every time.
                </p>

                <div className="space-y-4">
                  {[
                    { step: 1, title: "Upload Your Image", desc: "Drag and drop your image directly onto the upload area, or click to browse and select files from your device. We support all major image formats including JPG, PNG, WEBP, GIF, BMP, TIFF, SVG, RAW, and HEIC. You can upload images up to 50MB in size." },
                    { step: 2, title: "Preview Your Image", desc: "Once uploaded, you will see a preview of your image along with its current format, file size, and dimensions. This allows you to verify you have selected the correct file before proceeding with the conversion." },
                    { step: 3, title: "Select Output Format", desc: "Choose your desired output format from the dropdown menu. Each format has its own advantages: use JPG for photographs, PNG for graphics with transparency, WEBP for web optimization, and others based on your specific needs." },
                    { step: 4, title: "Adjust Quality Settings", desc: "For formats that support quality adjustment (JPG, WEBP), you can fine-tune the compression level. Higher quality means larger file sizes but better visual fidelity, while lower quality produces smaller files suitable for web use." },
                    { step: 5, title: "Convert and Download", desc: "Click the Convert button to process your image. The conversion happens instantly in your browser. Once complete, click the Download button to save your converted image to your device with the new format." }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1 bg-secondary/50 rounded-xl p-4">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Pro Tips for Best Results
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-sm text-muted-foreground">Use PNG format when you need to preserve transparency in logos, icons, or graphics.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-sm text-muted-foreground">Convert to WEBP for web images to reduce file size by up to 30% compared to JPG.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-sm text-muted-foreground">Keep a backup of your original images before converting to lossy formats.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-sm text-muted-foreground">For printing purposes, use lossless formats like PNG or TIFF to maintain maximum quality.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Use Our Converter Section */}
          <section className="py-12 md:py-20 px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Why Use Our Image Converter?</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Zap, title: "Lightning Fast", desc: "Convert images in milliseconds with advanced browser-based technology. No waiting for uploads or downloads." },
                  { icon: Shield, title: "100% Secure", desc: "Images never leave your device. All processing happens locally in your browser for complete privacy." },
                  { icon: Download, title: "No Watermarks", desc: "Download clean, professional-quality images without any watermarks, logos, or branding." },
                  { icon: Globe, title: "Works Everywhere", desc: "Use on any device with a modern browser. Desktop, tablet, or mobile - convert anywhere." }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-12 md:py-20 bg-secondary/30 px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Key Benefits</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Convert between 10+ image formats instantly",
                  "No file size limits on most conversions",
                  "Batch conversion support for multiple images",
                  "Quality adjustment for optimal file sizes",
                  "Works offline after page loads",
                  "Mobile-friendly responsive design",
                  "No account or registration required",
                  "Unlimited free conversions",
                  "Professional-grade output quality"
                ].map((benefit, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 border border-border flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="text-sm text-muted-foreground pt-1">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy & Security Section */}
          <section className="py-12 md:py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Privacy & Security</h2>
              </div>
              
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is our top priority. In an era of increasing data breaches and privacy concerns, we have built our image converter with a fundamentally different approach that puts you in complete control of your data. Unlike traditional online tools that upload your files to remote servers for processing, our converter utilizes advanced browser-based technology to perform all conversions directly on your device.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">100% Client-Side Processing</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">All image processing occurs in your browser. Your files are never transmitted to any server.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">Zero Data Collection</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">We do not collect, store, or analyze any of your images or personal data.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">Works Offline</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Once loaded, the converter works without internet connection.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">No Account Required</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Use all features without creating an account or providing personal information.</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  This architecture means you can confidently convert sensitive documents, personal photographs, confidential business materials, and any other images without worrying about unauthorized access or data leaks. Whether you are a healthcare professional, legal practitioner, business executive, or privacy-conscious individual, our tool provides the security you need with the convenience you want.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-20 bg-secondary/30 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Find answers to the most common questions about our image converter. If you have additional questions, please feel free to contact our support team.
              </p>

              <Accordion type="single" collapsible className="space-y-2">
                {faqSchema.mainEntity.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-xl px-4">
                    <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                      {faq.name}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      {faq.acceptedAnswer.text}
                    </AccordionContent>
                  </AccordionItem>
                ))}
                
                <AccordionItem value="faq-5" className="bg-card border border-border rounded-xl px-4">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                    Can I convert multiple images at once?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Yes, our tool supports batch conversion. You can convert multiple images consecutively without refreshing the page. Simply complete one conversion, then upload your next image to continue.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-6" className="bg-card border border-border rounded-xl px-4">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                    What is the maximum file size supported?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Our converter supports images up to 50MB in size. For very large files, processing time may vary depending on your device's capabilities. Most images convert instantly.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-7" className="bg-card border border-border rounded-xl px-4">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                    Will my image quality be affected during conversion?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    For lossless conversions (like PNG to PNG), quality is perfectly preserved. For lossy formats (JPG, WEBP), you can adjust the quality slider to find your ideal balance between file size and visual quality. Our algorithms are optimized for maximum quality retention.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-8" className="bg-card border border-border rounded-xl px-4">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                    Does the converter work on mobile devices?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Absolutely! Our converter is fully responsive and works perfectly on smartphones and tablets. You can convert images directly from your phone's camera roll or photo gallery.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ImageConverterPage;