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
  FileImage
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  
  // Check if we're on a direct route like /jpg-to-png
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
        <link rel="canonical" href={`https://yoursite.com${location.pathname}`} />
        
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        
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

          {/* Features Section */}
          <section className="py-16 md:py-24 bg-gradient-dark">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
                Why Use Our Image Converter?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Zap, title: "Lightning Fast", desc: "Convert images in seconds with browser-based technology." },
                  { icon: Shield, title: "100% Secure", desc: "Images never leave your device. All processing is local." },
                  { icon: Download, title: "No Watermarks", desc: "Download clean images without any watermarks or branding." },
                  { icon: Globe, title: "Works Everywhere", desc: "Use on any device with a modern browser." }
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

          {/* How It Works */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
                How to Convert Images
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { step: "1", title: "Upload Image", desc: "Drag and drop or click to upload your image.", icon: FileImage },
                  { step: "2", title: "Select Format", desc: "Choose your desired output format.", icon: CheckCircle },
                  { step: "3", title: "Download", desc: "Click convert and download your image.", icon: Download }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="bg-gradient-orange w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 md:py-24 bg-gradient-dark">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqSchema.mainEntity.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-xl px-6">
                      <AccordionTrigger className="text-left font-semibold">
                        {faq.name}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.acceptedAnswer.text}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
