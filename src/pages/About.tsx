import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Image, Shield, Zap, Globe, Users, Heart, Award, 
  CheckCircle, Clock, Lock, Sparkles, Target, TrendingUp,
  Building2, Mail, MapPin, FileText, Scale, Eye, Cpu,
  Layers, RefreshCw, Lightbulb, BookOpen, HelpCircle
} from "lucide-react";
import HreflangTags from "@/components/HreflangTags";

const About = () => {
  const stats = [
    { value: "100+", label: "Free Tools Available" },
    { value: "15+", label: "Tool Categories" },
    { value: "100%", label: "Browser-Based Processing" },
    { value: "0", label: "Files Stored on Servers" },
    { value: "24/7", label: "Tool Availability" },
    { value: "∞", label: "Daily Usage Limit" },
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "All image processing happens locally in your browser. Your files never leave your device, are never uploaded to any server, and are never stored anywhere. We believe your data belongs to you alone. This is not just a feature—it's our core principle."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Truly Free Forever",
      description: "No hidden costs, no premium tiers, no watermarks, no signup required. Every tool is completely free with no limitations. We believe essential tools should be accessible to everyone regardless of budget or location."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Efficient",
      description: "Our tools are optimized for speed and performance. Because processing happens on your device using modern web technologies, there's no upload/download time. Get instant results without waiting for server processing."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Universal Accessibility",
      description: "Access our tools from any device with a modern browser—Windows, Mac, Linux, iOS, Android, Chrome OS. No software installation required. Work from anywhere, anytime, on any device."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Full Transparency",
      description: "We're transparent about how our tools work, what data we collect (virtually none), and how we sustain our service. We believe users deserve to know exactly what happens with their files."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Continuous Improvement",
      description: "We regularly update our tools with new features, better algorithms, and improved user interfaces based on user feedback and emerging web technologies."
    }
  ];

  const team = [
    {
      role: "Development Team",
      description: "Our team of experienced web developers builds and maintains the tools, ensuring they work flawlessly across all devices and browsers while maintaining the highest performance and security standards."
    },
    {
      role: "UX/Design Team",
      description: "Our designers focus on creating intuitive, accessible interfaces that make complex image operations simple and straightforward for users of all skill levels and technical backgrounds."
    },
    {
      role: "Content & Support Team",
      description: "Our content specialists create helpful guides, tutorials, and documentation to help users get the most out of our tools. They also handle user inquiries and continuously improve our resources."
    }
  ];

  const toolCategories = [
    { icon: <Image className="w-5 h-5" />, title: "Image Conversion", desc: "Convert between 20+ formats including JPG, PNG, WebP, GIF, BMP, TIFF, HEIC, ICO, and more" },
    { icon: <Zap className="w-5 h-5" />, title: "Image Compression", desc: "Reduce file sizes by up to 90% while maintaining visual quality for web and mobile" },
    { icon: <Target className="w-5 h-5" />, title: "Resize & Crop", desc: "Precise resizing with multiple methods: exact dimensions, percentage, aspect ratio preservation" },
    { icon: <TrendingUp className="w-5 h-5" />, title: "Photo Enhancement", desc: "Adjust brightness, contrast, saturation, and apply professional filters and effects" },
    { icon: <Lock className="w-5 h-5" />, title: "Security & Privacy", desc: "Blur faces, redact sensitive areas, remove metadata, encrypt images for secure sharing" },
    { icon: <Award className="w-5 h-5" />, title: "PDF Tools", desc: "Merge, split, compress PDFs and convert images to/from PDF documents" },
    { icon: <Layers className="w-5 h-5" />, title: "Watermarking", desc: "Add text or image watermarks to protect your creative work and build your brand" },
    { icon: <Cpu className="w-5 h-5" />, title: "QR Code Tools", desc: "Generate, customize, and decode QR codes for business and personal use" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>About MultiToolsA - Free Online Image Tools | Our Mission, Story & Team</title>
        <meta name="description" content="Learn about MultiToolsA - a comprehensive free online platform with 100+ image tools. Discover our mission to provide private, accessible, and professional-grade image editing for everyone. Meet our team and understand our values." />
        <meta name="keywords" content="about MultiToolsA, image tools company, free online tools, image editing platform, privacy-focused tools, our mission, our team" />
        <link rel="canonical" href="https://multitoolsa.com/about" />
        <meta property="og:title" content="About MultiToolsA - Free Online Image Tools" />
        <meta property="og:description" content="Learn about our mission to provide free, private, and professional image editing tools for everyone. Discover our story, values, and the team behind MultiToolsA." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/about" />
        <meta property="og:image" content="https://multitoolsa.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About MultiToolsA - Free Online Image Tools" />
        <meta name="twitter:description" content="Learn about our mission to provide free, private, and professional image editing tools for everyone." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About MultiToolsA",
            "description": "Learn about MultiToolsA's mission to provide free, private, and professional image editing tools for everyone.",
            "url": "https://multitoolsa.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "MultiToolsA",
              "url": "https://multitoolsa.com",
              "logo": "https://multitoolsa.com/logo.png",
              "description": "MultiToolsA is a free online platform providing 100+ professional-grade image editing tools with complete privacy. All processing happens locally in users' browsers.",
              "foundingDate": "2024",
              "founder": {
                "@type": "Organization",
                "name": "MultiToolsA Team"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "url": "https://multitoolsa.com/contact",
                "availableLanguage": "English"
              },
              "sameAs": []
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MultiToolsA",
            "url": "https://multitoolsa.com",
            "description": "Free online image tools platform with 100+ tools for image conversion, compression, editing, and more.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://multitoolsa.com/all-tools?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      <HreflangTags path="/about" />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About MultiToolsA</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              Free Image Tools for Everyone
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              MultiToolsA is a comprehensive free online platform offering over 100 professional-grade image editing tools 
              with complete privacy. All processing happens locally in your browser—your files never leave your device, 
              are never uploaded to any server, and are never accessible to anyone but you.
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
                <Mail className="w-4 h-4" />
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="p-4">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Lightbulb className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Making Professional Image Tools Accessible to All</h2>
            </div>
            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">Our mission is simple:</strong> to democratize access to professional image editing tools. 
                We believe that everyone—from professional photographers and designers to students, small business owners, 
                and casual users—deserves access to high-quality image tools without financial barriers or privacy concerns.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In a world where many online tools require expensive subscriptions, collect user data, or add watermarks to outputs, 
                MultiToolsA stands apart. We've built a platform where every tool is:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  "Completely free with no hidden costs",
                  "Privacy-focused with no data collection",
                  "Accessible without registration",
                  "Available without usage limits",
                  "Free from watermarks on outputs",
                  "Usable on any device or browser"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This commitment guides every decision we make—from the tools we develop to the technologies we choose.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile Native Ad */}
        <div className="container mx-auto max-w-4xl px-4 lg:hidden">
          <MobileNativeAd />
        </div>
        
        {/* Desktop Native Banner Ad */}
        <div className="container mx-auto max-w-4xl px-4 hidden lg:block">
          <NativeBannerAd />
        </div>

        {/* Our Story - Expanded */}
        <section className="py-16 md:py-20 px-4 bg-gradient-dark">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <BookOpen className="w-4 h-4" />
                Our Story
              </div>
              <h2 className="text-2xl md:text-4xl font-bold">How MultiToolsA Began</h2>
            </div>
            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">The Problem We Saw</h3>
                <p className="text-muted-foreground leading-relaxed">
                  MultiToolsA was founded with a simple observation: the world of online image tools was broken. 
                  Most platforms required users to upload their personal images to remote servers, raising serious privacy concerns. 
                  Others charged monthly subscriptions for basic features, created artificial usage limits, or added watermarks 
                  to outputs unless users paid. For many people—especially those in developing countries, students, 
                  or small businesses—these barriers made professional image editing inaccessible.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Our Solution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We built MultiToolsA differently. Using modern web technologies like JavaScript, HTML5 Canvas, Web Workers, 
                  and WebAssembly, we created tools that process images entirely within your browser. This approach means:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Your images never leave your device—complete privacy guaranteed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">No upload/download wait times—instant processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">No server costs to maintain—we can offer everything for free</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Works offline once loaded—no internet required for processing</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Where We Are Today</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Today, MultiToolsA offers over 100 specialized image tools organized into 15+ categories. 
                  From simple format conversion and compression to advanced editing, watermarking, PDF tools, 
                  and security features—we cover virtually every image editing need. Our platform serves users worldwide, 
                  from professional designers and photographers to students, bloggers, e-commerce sellers, 
                  and everyday users who just need to resize a photo.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Our Commitment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our commitment remains unchanged: to provide the most comprehensive, accessible, and privacy-respecting 
                  image tools on the web. We continuously improve our existing tools, add new features based on user feedback, 
                  and stay current with emerging web technologies to deliver the best possible experience—completely free, forever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />
                Our Values
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">What We Stand For</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do—from the tools we build to the way we interact with our users.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Native Ad - after values */}
        <div className="container mx-auto max-w-4xl px-4 lg:hidden">
          <MobileNativeAd />
        </div>
        
        {/* Desktop Native Banner Ad - after values */}
        <div className="container mx-auto max-w-4xl px-4 hidden lg:block">
          <NativeBannerAd />
        </div>

        {/* What We Offer - Expanded */}
        <section className="py-16 md:py-20 px-4 bg-gradient-dark">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Layers className="w-4 h-4" />
                Our Tools
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Comprehensive Image Tool Suite</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                MultiToolsA offers 100+ specialized tools across 15+ categories to handle every image editing need.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {toolCategories.map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                to="/all-tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                View All 100+ Tools
              </Link>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Cpu className="w-4 h-4" />
                Our Technology
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">How Our Tools Work</h2>
            </div>
            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border">
              <p className="text-muted-foreground leading-relaxed mb-6">
                MultiToolsA is built using cutting-edge web technologies that enable powerful image processing 
                directly in your browser. Here's how we make it work:
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-2">Client-Side Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    All image manipulation happens entirely within your browser using JavaScript, HTML5 Canvas API, 
                    and modern web APIs. Your files are processed locally on your device—they're never uploaded to any server.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-2">Modern Web Technologies</h3>
                  <p className="text-sm text-muted-foreground">
                    We leverage Web Workers for background processing, WebAssembly for compute-intensive operations, 
                    and the File API for handling your images. This ensures fast, efficient processing without blocking your browser.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-2">Cross-Platform Compatibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Our tools work on any modern browser—Chrome, Firefox, Safari, Edge—across Windows, Mac, Linux, iOS, 
                    and Android. No plugins or software installation required.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-2">Privacy by Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Because processing happens on your device, your images never leave your control. 
                    We can't see your files, we don't store them, and we have no access to your content. 
                    This is privacy by design, not just by policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team - Enhanced */}
        <section className="py-16 md:py-20 px-4 bg-gradient-dark">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Our Team
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">The People Behind MultiToolsA</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                MultiToolsA is built by a dedicated team of developers, designers, and content specialists 
                who are passionate about creating tools that respect user privacy while delivering professional results.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    <Users className="w-10 h-10" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{member.role}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparency & Trust */}
        <section className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Scale className="w-4 h-4" />
                Transparency & Trust
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Our Commitment to You</h2>
            </div>
            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Privacy Guarantee</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not collect, store, or have access to any images you process using our tools. 
                    All processing happens locally in your browser. We don't use tracking pixels, 
                    we don't sell user data, and we don't build user profiles. Your privacy is not just 
                    a feature—it's the foundation of how we built MultiToolsA.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">How We Sustain Our Service</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    MultiToolsA is supported through non-intrusive advertising displayed on our website. 
                    These ads help us cover hosting costs and continue developing new features. 
                    We're committed to keeping ads respectful and non-disruptive to your experience. 
                    We will never compromise on privacy or add paywalls to our core tools.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Data Collection</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect minimal, anonymized analytics to understand how our tools are used and 
                    improve user experience. This includes basic metrics like page views and tool usage counts—never 
                    personal information or your actual image data. For complete details, see our{" "}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Contact & Support</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're here to help. If you have questions, feedback, or need assistance, 
                    please reach out through our{" "}
                    <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>. 
                    We typically respond within 24-48 hours and genuinely value your input.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Enhanced */}
        <section className="py-16 md:py-20 px-4 bg-gradient-dark">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Award className="w-4 h-4" />
                Why MultiToolsA
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Why Choose MultiToolsA?</h2>
            </div>
            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "100% free with no hidden costs or premium tiers",
                  "Complete privacy—files never leave your device",
                  "No account registration or signup required",
                  "Works on all devices, browsers, and operating systems",
                  "100+ specialized tools for every image need",
                  "Fast browser-based processing with no upload wait",
                  "No watermarks added to any of your images",
                  "No daily limits or artificial usage restrictions",
                  "Professional-quality results comparable to paid tools",
                  "Regular updates with new features and improvements",
                  "Comprehensive tutorials and documentation",
                  "Responsive support team ready to help"
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

        {/* Legal & Policies */}
        <section className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <FileText className="w-4 h-4" />
                Legal & Policies
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Our Policies</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We believe in transparency. Read our policies to understand how we operate and protect your interests.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link to="/privacy" className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors group">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Privacy Policy</h3>
                <p className="text-sm text-muted-foreground">Learn how we protect your privacy and handle data.</p>
              </Link>
              <Link to="/terms" className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors group">
                <FileText className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Terms of Service</h3>
                <p className="text-sm text-muted-foreground">Read our terms and conditions for using MultiToolsA.</p>
              </Link>
              <Link to="/faq" className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors group">
                <HelpCircle className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">FAQ</h3>
                <p className="text-sm text-muted-foreground">Find answers to frequently asked questions.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 bg-gradient-dark">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Start using our free image editing tools today. 
              No signup required, no credit card needed—just pick a tool and start editing!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/all-tools"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Image className="w-5 h-5" />
                Browse All Tools
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </Link>
              <Link 
                to="/faq"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
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
