import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, Shield, Globe, Sparkles, Minimize2, FileText, Maximize2, Crop, RotateCw, Settings, Palette, Type, Layers, Info, PenTool, Lock, QrCode, Hash } from "lucide-react";
import { toolCategories } from "@/data/toolsData";

const iconMap: Record<string, React.ElementType> = {
  "RefreshCw": RotateCw,
  "Minimize2": Minimize2,
  "FileText": FileText,
  "Maximize2": Maximize2,
  "Crop": Crop,
  "RotateCw": RotateCw,
  "Settings": Settings,
  "Sparkles": Palette,
  "Type": Type,
  "Layers": Layers,
  "Info": Info,
  "Zap": Zap,
  "PenTool": PenTool,
  "Shield": Lock,
  "QrCode": QrCode,
  "Hash": Hash,
};

const HomePage = () => {
  const imageCategories = toolCategories.filter(cat => cat.id !== "tag-tools").sort((a, b) => a.priority - b.priority);
  const tagCategory = toolCategories.find(cat => cat.id === "tag-tools");

  return (
    <>
      <Helmet>
        <title>MultiTools - Free Image Tools & Tag Generator | Online Converter, Compressor, Editor</title>
        <meta name="description" content="Free online image tools: Convert, compress, resize, crop, rotate, add watermarks, filters & more. Generate hashtags for YouTube, Instagram, TikTok. Fast, secure, no signup." />
        <meta name="keywords" content="image converter, image compressor, photo editor, tag generator, jpg to png, hashtag generator, free online tools, image resize, image crop" />
        <link rel="canonical" href="https://multitools.com/" />
        
        <meta property="og:title" content="MultiTools - Free Image Tools & Tag Generator" />
        <meta property="og:description" content="Convert, compress, edit images and generate hashtags. 100% free, no signup required." />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "MultiTools",
            "description": "Free online image tools and tag generator",
            "url": "https://multitools.com",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Free Online Tools</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Complete Image Tools
                  <span className="bg-gradient-orange bg-clip-text text-transparent"> Ecosystem</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Convert, compress, resize, crop, edit, and enhance your images. Generate viral hashtags for social media. 
                  All tools are free, fast, and process locally for complete privacy.
                </p>
              </div>
            </div>
          </section>

          {/* Image Tools Categories */}
          <section className="py-16 md:py-24 px-4">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                Image Tools
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                14 categories, 60+ individual tools for all your image editing needs
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {imageCategories.map((category) => {
                  const IconComponent = iconMap[category.icon] || Sparkles;
                  return (
                    <Link 
                      key={category.id}
                      to={`/${category.slug}`}
                      className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                      
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-orange flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                        
                        <div className="flex items-center gap-2 text-primary text-sm font-medium">
                          <span>{category.tools.length} Tools</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Tag Tools Section */}
          {tagCategory && (
            <section className="py-16 md:py-24 px-4 bg-gradient-dark">
              <div className="container mx-auto max-w-4xl">
                <Link 
                  to="/tag-extractor"
                  className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden block"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                  
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center mb-6 mx-auto">
                      <Hash className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Tag Extractor & Generator</h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                      Generate viral hashtags and tags for YouTube, Instagram, TikTok, Twitter, Facebook, and more. 
                      Auto-detect platform from URL.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {["YouTube", "Instagram", "TikTok", "Twitter", "Facebook"].map((platform) => (
                        <span key={platform} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground">
                          {platform}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary font-semibold justify-center">
                      <span>Generate Tags</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* Features Section */}
          <section className="py-16 md:py-24 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
                Why Choose MultiTools?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Zap, title: "Lightning Fast", desc: "Instant results with browser-based processing" },
                  { icon: Shield, title: "100% Secure", desc: "Your files never leave your device" },
                  { icon: Globe, title: "Works Everywhere", desc: "Use on any device with a browser" },
                  { icon: Sparkles, title: "Completely Free", desc: "No hidden fees or watermarks" }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border text-center hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
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

export default HomePage;
