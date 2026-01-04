import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TextToImage from "@/components/TextToImage";
import HreflangTags from "@/components/HreflangTags";
import { Sparkles, Wand2, Zap, Image, Shield, Download } from "lucide-react";

const TextToImagePage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the AI text to image generator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI text to image generator uses Google's Gemini AI model to create images from text descriptions. Simply describe what you want to see, and the AI will generate a unique image based on your prompt."
        }
      },
      {
        "@type": "Question",
        "name": "Is the text to image generator free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our text to image generator is free to use. Simply enter your description and generate images instantly without any cost."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of images can I generate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can generate a wide variety of images including landscapes, portraits, abstract art, concept designs, product mockups, and more. The more detailed your description, the better the results."
        }
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Text to Image Generator",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free AI-powered text to image generator using Gemini. Create stunning images from text descriptions instantly."
  };

  return (
    <>
      <Helmet>
        <title>Free AI Text to Image Generator | Create Images from Text | MultiTools</title>
        <meta name="description" content="Generate stunning images from text descriptions using our free AI text to image generator powered by Google Gemini. Create art, designs, and visuals instantly." />
        <meta name="keywords" content="text to image, AI image generator, Gemini AI, free image generator, AI art, text to picture, image creation, AI design" />
        <link rel="canonical" href="https://multitools.com/text-to-image" />
        
        <meta property="og:title" content="Free AI Text to Image Generator | MultiTools" />
        <meta property="og:description" content="Generate stunning images from text descriptions using our free AI text to image generator powered by Google Gemini." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitools.com/text-to-image" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free AI Text to Image Generator | MultiTools" />
        <meta name="twitter:description" content="Create stunning AI-generated images from text descriptions. Free and instant." />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>
      </Helmet>
      
      <HreflangTags path="/text-to-image" />
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Powered by Gemini AI</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                  AI Text to Image Generator
                </h1>
                <p className="text-lg text-muted-foreground">
                  Transform your ideas into stunning images with our free AI-powered generator. 
                  Just describe what you want to see and let Gemini create it for you.
                </p>
              </div>
            </div>
          </section>
          
          {/* Tool Section */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6">
              <TextToImage />
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-12 sm:py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                Why Use Our AI Image Generator?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[
                  {
                    icon: Wand2,
                    title: "Powered by Gemini",
                    description: "Uses Google's advanced Gemini AI for high-quality, detailed image generation."
                  },
                  {
                    icon: Zap,
                    title: "Fast Generation",
                    description: "Get your images in seconds, not minutes. Quick and efficient processing."
                  },
                  {
                    icon: Image,
                    title: "High Quality",
                    description: "Generate detailed, high-resolution images suitable for various uses."
                  },
                  {
                    icon: Shield,
                    title: "Safe & Secure",
                    description: "Your prompts and generated images are processed securely and privately."
                  },
                  {
                    icon: Download,
                    title: "Easy Download",
                    description: "Download your generated images instantly in high quality PNG format."
                  },
                  {
                    icon: Sparkles,
                    title: "100% Free",
                    description: "No subscription required. Generate images for free without any limitations."
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                    <feature.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* How It Works */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                How to Generate Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {[
                  {
                    step: "1",
                    title: "Describe Your Image",
                    description: "Enter a detailed description of the image you want to create. Include style, colors, and mood."
                  },
                  {
                    step: "2",
                    title: "Generate",
                    description: "Click the generate button and wait a few seconds while our AI creates your image."
                  },
                  {
                    step: "3",
                    title: "Download",
                    description: "Preview your generated image and download it in high quality PNG format."
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Tips Section */}
          <section className="py-12 sm:py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                Tips for Better Results
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {[
                  "Be specific about what you want - include details about the subject, background, and composition.",
                  "Mention the style you want - realistic, cartoon, watercolor, oil painting, digital art, etc.",
                  "Describe lighting conditions - sunset, golden hour, studio lighting, dramatic shadows.",
                  "Include color preferences - warm tones, cool blues, vibrant colors, muted palette.",
                  "Specify the mood or atmosphere - peaceful, dramatic, mysterious, joyful."
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-medium">{index + 1}</span>
                    </div>
                    <p className="text-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default TextToImagePage;
