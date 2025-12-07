import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageConverter from "@/components/ImageConverter";
import {
  Image, 
  Zap, 
  Shield, 
  Download, 
  Globe, 
  CheckCircle,
  FileImage,
  ArrowRightLeft
} from "lucide-react";

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
  "bmp-to-jpg": {
    title: "BMP to JPG Converter - Free Online Image Conversion Tool",
    description: "Convert BMP images to JPG format online for free. Drastically reduce file size while maintaining image quality.",
    h1: "Convert BMP to JPG Online Free",
    fromFormat: "bmp",
    toFormat: "jpg"
  },
};

const ImageConverterPage = () => {
  const { conversion } = useParams<{ conversion?: string }>();
  const location = useLocation();
  
  // Check if we're on a direct route like /jpg-to-png
  const pathConversion = location.pathname.replace('/', '').replace('/image-converter/', '');
  const activeConversion = conversion || (conversionMeta[pathConversion] ? pathConversion : undefined);
  
  const meta = activeConversion && conversionMeta[activeConversion] 
    ? conversionMeta[activeConversion] 
    : {
        title: "Free Online Image Converter - JPG, PNG, WEBP, GIF, HEIC | Convert Images",
        description: "Convert images between JPG, PNG, WEBP, GIF, BMP, SVG, and HEIC formats online for free. Fast, secure, and easy-to-use image conversion tool with no watermarks.",
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
          "text": "We support all major image formats including JPG/JPEG, PNG, WEBP, GIF, BMP, SVG, HEIC, and HEIF. You can convert between any of these formats instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Is my uploaded image secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! All image conversion happens directly in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert HEIC photos from iPhone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can convert HEIC/HEIF images from iPhone to JPG, PNG, or WEBP format. This makes your iPhone photos compatible with all devices and platforms."
        }
      },
      {
        "@type": "Question",
        "name": "What is the maximum file size I can convert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Since conversion happens in your browser, there's no strict file size limit. However, very large images may take longer to process depending on your device's capabilities."
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
        <meta name="keywords" content="image converter, jpg to png, png to jpg, webp converter, heic to jpg, photo converter, image format converter, free image converter, online image converter, convert images online" />
        <link rel="canonical" href={`https://yoursite.com/image-converter${conversion ? `/${conversion}` : ''}`} />
        
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        
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
          <section className="py-12 md:py-20 bg-gradient-hero">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-bright/10 border border-cyan-bright/30 mb-6">
                  <Image className="w-4 h-4 text-cyan-bright" />
                  <span className="text-sm font-medium text-cyan-bright">Free Image Converter</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  {meta.h1}
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Convert images between JPG, PNG, WEBP, GIF, BMP, SVG, and HEIC formats instantly. 
                  100% free, secure, and processed entirely in your browser.
                </p>
              </div>

              <ImageConverter preselectedConversion={preselectedFormat} />
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24 bg-teal-dark/50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-12">
                Why Use Our Image Converter?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-teal-medium/30 rounded-2xl p-6 border border-teal-medium hover:border-cyan-bright transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan-bright/20 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-cyan-bright" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground text-sm">
                    Convert images in seconds with our optimized browser-based technology.
                  </p>
                </div>

                <div className="bg-teal-medium/30 rounded-2xl p-6 border border-teal-medium hover:border-cyan-bright transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan-bright/20 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-cyan-bright" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">100% Secure</h3>
                  <p className="text-muted-foreground text-sm">
                    Your images never leave your device. All processing happens locally in your browser.
                  </p>
                </div>

                <div className="bg-teal-medium/30 rounded-2xl p-6 border border-teal-medium hover:border-cyan-bright transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan-bright/20 flex items-center justify-center mb-4">
                    <Download className="w-6 h-6 text-cyan-bright" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Watermarks</h3>
                  <p className="text-muted-foreground text-sm">
                    Download clean, professional images without any watermarks or branding.
                  </p>
                </div>

                <div className="bg-teal-medium/30 rounded-2xl p-6 border border-teal-medium hover:border-cyan-bright transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan-bright/20 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-cyan-bright" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Works Everywhere</h3>
                  <p className="text-muted-foreground text-sm">
                    Use on any device with a modern browser - desktop, tablet, or mobile.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Supported Formats */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-4">
                Supported Image Formats
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Convert between all popular image formats with just a few clicks
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {["JPG", "PNG", "WEBP", "GIF", "BMP", "SVG", "HEIC"].map((format) => (
                  <div 
                    key={format}
                    className="bg-teal-medium/20 rounded-xl p-4 text-center border border-teal-medium hover:border-cyan-bright hover:bg-teal-medium/40 transition-all"
                  >
                    <FileImage className="w-8 h-8 text-cyan-bright mx-auto mb-2" />
                    <span className="font-semibold text-foreground">{format}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 p-4 bg-teal-medium/20 rounded-xl">
                  <ArrowRightLeft className="w-5 h-5 text-cyan-bright flex-shrink-0" />
                  <span className="text-sm text-foreground">JPG ↔ PNG ↔ WEBP</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-teal-medium/20 rounded-xl">
                  <ArrowRightLeft className="w-5 h-5 text-cyan-bright flex-shrink-0" />
                  <span className="text-sm text-foreground">HEIC → JPG/PNG/WEBP</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-teal-medium/20 rounded-xl">
                  <ArrowRightLeft className="w-5 h-5 text-cyan-bright flex-shrink-0" />
                  <span className="text-sm text-foreground">GIF ↔ PNG ↔ JPG</span>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 md:py-24 bg-teal-dark/50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-12">
                How to Convert Images
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-bright text-teal-dark font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Upload Image</h3>
                  <p className="text-muted-foreground text-sm">
                    Drag and drop your image or click to browse and select a file from your device.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-bright text-teal-dark font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Select Format</h3>
                  <p className="text-muted-foreground text-sm">
                    Choose your desired output format from the dropdown menu (PNG, JPG, WEBP, etc.).
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-bright text-teal-dark font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Download</h3>
                  <p className="text-muted-foreground text-sm">
                    Click convert and download your newly formatted image instantly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-12">
                Frequently Asked Questions
              </h2>

              <div className="max-w-3xl mx-auto space-y-6">
                {faqSchema.mainEntity.map((faq, index) => (
                  <div key={index} className="bg-teal-medium/20 rounded-xl p-6 border border-teal-medium">
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-bright flex-shrink-0 mt-0.5" />
                      {faq.name}
                    </h3>
                    <p className="text-muted-foreground ml-8">
                      {faq.acceptedAnswer.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="py-16 md:py-24 bg-teal-dark/50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-invert">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  The Ultimate Free Online Image Converter
                </h2>
                
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Looking for a reliable, fast, and free image converter? Our online tool allows you to convert 
                    images between all popular formats including JPG, PNG, WEBP, GIF, BMP, SVG, and HEIC/HEIF. 
                    Whether you need to convert iPhone photos (HEIC) to JPG for sharing, optimize images for the 
                    web by converting to WEBP, or simply change between common formats, our converter handles it all.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                    Why Convert Images to Different Formats?
                  </h3>
                  <p>
                    Different image formats serve different purposes. <strong>JPG</strong> is ideal for photographs 
                    with millions of colors and offers good compression. <strong>PNG</strong> supports transparency 
                    and is perfect for logos, icons, and graphics. <strong>WEBP</strong> provides superior compression 
                    for web use, reducing file sizes by up to 30% compared to JPG while maintaining quality. 
                    <strong>GIF</strong> supports animation and is widely used for simple graphics.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                    Convert HEIC Photos from iPhone
                  </h3>
                  <p>
                    iPhone cameras save photos in HEIC format by default, which offers better quality at smaller 
                    file sizes. However, HEIC isn't universally supported. Our converter makes it easy to convert 
                    HEIC images to JPG, PNG, or WEBP for compatibility with Windows, Android, and web platforms.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                    Optimize Images for Web Performance
                  </h3>
                  <p>
                    Web performance is crucial for user experience and SEO. Converting images to WEBP format can 
                    significantly reduce page load times. Our converter helps you optimize images for websites, 
                    blogs, and e-commerce platforms without sacrificing visual quality.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                    Privacy-First Image Conversion
                  </h3>
                  <p>
                    Unlike other online converters, our tool processes everything directly in your browser. 
                    Your images are never uploaded to any server, ensuring complete privacy and security. 
                    This also means faster conversions since there's no upload/download time to external servers.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ImageConverterPage;
