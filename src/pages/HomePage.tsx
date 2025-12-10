import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image, Hash, ArrowRight, Zap, Shield, Globe, Sparkles } from "lucide-react";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>MultiTools - Free Image Converter & Tag Generator | Online Tools 2024</title>
        <meta name="description" content="Free online tools: Convert images (JPG, PNG, WEBP, HEIC, TIFF, RAW) and generate hashtags for YouTube, Instagram, TikTok. Fast, secure, no signup required." />
        <meta name="keywords" content="image converter, tag generator, jpg to png, hashtag generator, free online tools, photo converter, social media tags" />
        <link rel="canonical" href="https://yoursite.com/" />
        
        <meta property="og:title" content="MultiTools - Free Image Converter & Tag Generator" />
        <meta property="og:description" content="Convert images and generate hashtags for social media. 100% free, no signup required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MultiTools - Free Online Tools" />
        <meta name="twitter:description" content="Free image converter and tag generator tools." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Free Online Tools</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Powerful Tools for
                  <span className="bg-gradient-orange bg-clip-text text-transparent"> Creators</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Convert images between formats and generate viral hashtags for social media. 
                  Fast, secure, and completely free to use.
                </p>
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="py-16 md:py-24 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                Choose Your Tool
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Select from our collection of free, professional-grade tools
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Image Converter Card */}
                <Link 
                  to="/image-tools"
                  className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center mb-6">
                      <Image className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">Image Converter</h3>
                    <p className="text-muted-foreground mb-6">
                      Convert images between JPG, PNG, WEBP, GIF, BMP, TIFF, RAW, HEIC, and SVG formats. 
                      Fast, secure, browser-based conversion with no watermarks.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["JPG", "PNG", "WEBP", "TIFF", "RAW", "HEIC"].map((format) => (
                        <span 
                          key={format}
                          className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <span>Start Converting</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                {/* Tag Extractor Card */}
                <Link 
                  to="/tag-extractor"
                  className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center mb-6">
                      <Hash className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">Tag Extractor</h3>
                    <p className="text-muted-foreground mb-6">
                      Generate viral hashtags and tags for YouTube, Instagram, TikTok, Twitter, Facebook, and more. 
                      Auto-detect platform from URL.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["YouTube", "Instagram", "TikTok", "Twitter", "Facebook"].map((platform) => (
                        <span 
                          key={platform}
                          className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <span>Generate Tags</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-dark">
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
