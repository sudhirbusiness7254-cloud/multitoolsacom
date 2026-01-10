import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Image, Shield, Zap, Globe, Users, Heart, Award, 
  CheckCircle, Clock, Lock, Sparkles, Target, TrendingUp
} from "lucide-react";
import HreflangTags from "@/components/HreflangTags";

const About = () => {
  const stats = [
    { value: "100+", label: "Free Tools" },
    { value: "1M+", label: "Images Processed" },
    { value: "100%", label: "Private & Secure" },
    { value: "0", label: "Files Stored" },
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "All image processing happens locally in your browser. Your files never leave your device, are never uploaded to any server, and are never stored anywhere. We believe your data belongs to you alone."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Truly Free",
      description: "No hidden costs, no premium tiers, no watermarks, no signup required. Every tool is completely free with no limitations. We believe essential tools should be accessible to everyone regardless of budget."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Efficient",
      description: "Our tools are optimized for speed. Because processing happens on your device, there's no upload/download time. Get instant results without waiting for server processing."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Works Everywhere",
      description: "Access our tools from any device with a modern browser—Windows, Mac, Linux, iOS, Android. No software installation required. Work from anywhere, anytime."
    }
  ];

  const team = [
    {
      role: "Development Team",
      description: "Our team of experienced web developers builds and maintains the tools, ensuring they work flawlessly across all devices and browsers while maintaining the highest performance standards."
    },
    {
      role: "UX/Design Team",
      description: "Our designers focus on creating intuitive, accessible interfaces that make complex image operations simple and straightforward for users of all skill levels."
    },
    {
      role: "Content & SEO Team",
      description: "Our content specialists create helpful guides, tutorials, and documentation to help users get the most out of our tools and improve their image editing skills."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>About MultiToolsA - Free Online Image Tools | Our Story & Mission</title>
        <meta name="description" content="Learn about MultiToolsA - a comprehensive free online platform with 100+ image tools. Discover our mission to provide private, accessible, and professional-grade image editing for everyone." />
        <meta name="keywords" content="about MultiToolsA, image tools company, free online tools, image editing platform, privacy-focused tools" />
        <link rel="canonical" href="https://multitoolsa.com/about" />
        <meta property="og:title" content="About MultiToolsA - Free Online Image Tools" />
        <meta property="og:description" content="Learn about our mission to provide free, private, and professional image editing tools for everyone." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/about" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About MultiToolsA",
            "description": "Learn about MultiToolsA's mission to provide free, private, and professional image editing tools.",
            "url": "https://multitoolsa.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "MultiToolsA",
              "url": "https://multitoolsa.com",
              "logo": "https://multitoolsa.com/logo.png",
              "description": "Free online image tools and tag generator platform",
              "foundingDate": "2024",
              "sameAs": []
            }
          })}
        </script>
      </Helmet>
      <HreflangTags path="/about" />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About Us</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Free Image Tools for Everyone
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              MultiToolsA is a comprehensive free online platform offering professional-grade image editing tools 
              with complete privacy. All processing happens locally in your browser—your files never leave your device.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/all-tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Image className="w-4 h-4" />
                Explore 100+ Tools
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="p-4">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
              <p className="text-muted-foreground leading-relaxed mb-4">
                MultiToolsA was founded with a simple belief: professional image editing tools should be accessible to everyone, 
                not just those who can afford expensive software. We saw that many online tools required uploads to remote servers, 
                raising privacy concerns and slowing down workflows with upload and download times.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We built MultiToolsA differently. Every tool processes images directly in your browser using modern web technologies 
                like JavaScript, HTML5 Canvas, and WebAssembly. This means your images never leave your device—they're never uploaded 
                to any server, never stored anywhere, and never accessible to anyone but you.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Today, MultiToolsA offers over 100 specialized image tools covering everything from format conversion and compression 
                to advanced editing, watermarking, and security features. Millions of images have been processed through our platform, 
                all while maintaining complete user privacy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission continues: to provide the most comprehensive, accessible, and privacy-respecting image tools on the web. 
                Whether you're a professional designer, a small business owner, or someone who just needs to resize a photo, 
                MultiToolsA is here to help—completely free, forever.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-12 md:py-16 px-4 bg-gradient-dark">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What We Stand For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">What We Offer</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: <Image className="w-5 h-5" />, title: "Image Conversion", desc: "Convert between JPG, PNG, WebP, GIF, BMP, TIFF, and more" },
                { icon: <Zap className="w-5 h-5" />, title: "Image Compression", desc: "Reduce file sizes while maintaining visual quality" },
                { icon: <Target className="w-5 h-5" />, title: "Resize & Crop", desc: "Precise resizing and cropping with multiple methods" },
                { icon: <TrendingUp className="w-5 h-5" />, title: "Photo Filters", desc: "Apply brightness, contrast, saturation, and effects" },
                { icon: <Lock className="w-5 h-5" />, title: "Security Tools", desc: "Blur faces, hide areas, encrypt images" },
                { icon: <Award className="w-5 h-5" />, title: "PDF Tools", desc: "Merge, split, compress, and convert PDFs" },
              ].map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-4 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-12 md:py-16 px-4 bg-gradient-dark">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Team</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              MultiToolsA is built by a dedicated team of developers, designers, and content specialists 
              who are passionate about creating tools that respect user privacy while delivering professional results.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">{member.role}</h3>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose MultiToolsA?</h2>
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "100% free with no hidden costs or premium tiers",
                  "Complete privacy—files never leave your device",
                  "No account registration or signup required",
                  "Works on all devices and browsers",
                  "100+ specialized tools for every image need",
                  "Fast browser-based processing",
                  "No watermarks added to your images",
                  "No daily limits or usage restrictions",
                  "Professional-quality results",
                  "Regular updates and new features"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 px-4 bg-gradient-dark">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join millions of users who trust MultiToolsA for their image editing needs. 
              No signup required—just pick a tool and start editing!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/all-tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Browse All Tools
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
  );
};

export default About;
