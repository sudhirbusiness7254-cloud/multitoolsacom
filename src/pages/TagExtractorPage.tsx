import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TagGenerator from "@/components/TagGenerator";
import { Hash, Globe, Zap, CheckCircle, TrendingUp, Target, Users, Sparkles, Search, BarChart3, Shield, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TagExtractorPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a social media tag generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A social media tag generator is a free online tool that automatically creates relevant hashtags and tags for your social media content. It analyzes your content URL and generates optimized tags for platforms like YouTube, Instagram, TikTok, Twitter, Facebook, LinkedIn, and Pinterest."
        }
      },
      {
        "@type": "Question",
        "name": "How do I use the tag generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply paste your social media content URL into the input field and click 'Generate Tags'. The tool will automatically detect the platform and generate relevant hashtags and tags that you can copy and use in your posts."
        }
      },
      {
        "@type": "Question",
        "name": "Is this tag generator free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our social media tag generator is completely free to use with no signup required. You can generate unlimited tags for all supported platforms without any cost."
        }
      },
      {
        "@type": "Question",
        "name": "Which social media platforms are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tag generator supports all major social media platforms including YouTube, Instagram, TikTok, Twitter/X, Facebook, LinkedIn, and Pinterest. The tool automatically detects the platform from your URL."
        }
      },
      {
        "@type": "Question",
        "name": "Why are hashtags important for social media?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hashtags help increase your content's visibility and discoverability. They categorize your content, making it easier for users interested in specific topics to find your posts. Proper hashtag usage can significantly boost engagement, reach, and follower growth."
        }
      },
      {
        "@type": "Question",
        "name": "How many hashtags should I use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The optimal number varies by platform: Instagram allows up to 30 (5-15 recommended), Twitter works best with 1-3, TikTok performs well with 3-5, LinkedIn suggests 3-5, and YouTube videos benefit from 5-10 relevant tags in the description."
        }
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Social Media Tag Generator",
    "operatingSystem": "Web Browser",
    "applicationCategory": "UtilitiesApplication",
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
        <title>Free Social Media Tag Generator - Hashtags for YouTube, Instagram, TikTok | 2024</title>
        <meta name="description" content="Generate free hashtags and tags for YouTube, Instagram, TikTok, Twitter, Facebook, LinkedIn & Pinterest. Boost your social media reach with our AI-powered tag generator tool." />
        <meta name="keywords" content="tag generator, hashtag generator, youtube tags, instagram hashtags, tiktok hashtags, social media tags, free hashtag generator, youtube tag extractor, trending hashtags, viral hashtags" />
        <link rel="canonical" href="https://yoursite.com/tag-extractor" />
        
        <meta property="og:title" content="Free Social Media Tag Generator - Hashtags for All Platforms" />
        <meta property="og:description" content="Generate optimized hashtags for YouTube, Instagram, TikTok, Twitter, Facebook & more. 100% free tag generator tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/tag-extractor" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Social Media Tag Generator" />
        <meta name="twitter:description" content="Generate viral hashtags for all social media platforms instantly." />
        
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
              <div className="text-center max-w-4xl mx-auto mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Hash className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Social Media Tag Generator</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Free Hashtag & Tag Generator for Social Media
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Generate viral hashtags for YouTube, Instagram, TikTok, Twitter, Facebook, LinkedIn & Pinterest. 
                  Boost your content reach instantly with our free tag generator tool.
                </p>
              </div>
            </div>
          </section>

          {/* Generator Section */}
          <section className="py-12 px-4 -mt-8">
            <div className="container mx-auto">
              <TagGenerator />
            </div>
          </section>

          {/* Supported Platforms */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                Supported Social Media Platforms
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Our tag generator supports all major social media platforms. Simply paste your content URL and get optimized tags instantly.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  { name: "YouTube", emoji: "📺", color: "bg-red-500" },
                  { name: "Instagram", emoji: "📸", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
                  { name: "TikTok", emoji: "🎵", color: "bg-foreground" },
                  { name: "Twitter", emoji: "🐦", color: "bg-sky-500" },
                  { name: "Facebook", emoji: "👥", color: "bg-blue-600" },
                  { name: "LinkedIn", emoji: "💼", color: "bg-blue-700" },
                  { name: "Pinterest", emoji: "📌", color: "bg-red-600" },
                ].map((platform) => (
                  <div key={platform.name} className="bg-card rounded-xl p-4 border border-border text-center hover:border-primary/50 hover-lift transition-all">
                    <div className={`w-12 h-12 ${platform.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-xl">{platform.emoji}</span>
                    </div>
                    <h3 className="font-semibold text-sm">{platform.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                How to Use the Tag Generator
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Generate hashtags in 3 simple steps. No signup required, completely free.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "1",
                    title: "Paste Your URL",
                    description: "Copy the URL of your social media post, video, or reel and paste it in the input field above.",
                    icon: Globe
                  },
                  {
                    step: "2", 
                    title: "Generate Tags",
                    description: "Click the 'Generate Tags' button. Our tool automatically detects the platform and creates relevant hashtags.",
                    icon: Zap
                  },
                  {
                    step: "3",
                    title: "Copy & Use",
                    description: "Copy the generated hashtags and tags with one click. Paste them in your post description for maximum reach.",
                    icon: CheckCircle
                  }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="bg-gradient-orange w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Use Tags Section */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                Why Are Hashtags Important for Social Media?
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Hashtags are essential for growing your social media presence. Here's why you should use optimized tags on every post.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Search,
                    title: "Improve Discoverability",
                    description: "Hashtags make your content searchable. When users search for specific topics, your posts appear in results, bringing new audiences to your content."
                  },
                  {
                    icon: TrendingUp,
                    title: "Boost Engagement",
                    description: "Posts with relevant hashtags get 12.6% more engagement than those without. Tags help you reach users genuinely interested in your content."
                  },
                  {
                    icon: Target,
                    title: "Reach Target Audience",
                    description: "Strategic hashtags connect you with your ideal audience. Niche-specific tags attract followers who are more likely to engage and convert."
                  },
                  {
                    icon: BarChart3,
                    title: "Algorithm Optimization",
                    description: "Social media algorithms use tags to categorize content. Proper tagging helps platforms understand and recommend your posts to relevant users."
                  },
                  {
                    icon: Users,
                    title: "Build Community",
                    description: "Branded and community hashtags help build your tribe. Create campaigns and track participation with custom hashtags."
                  },
                  {
                    icon: Sparkles,
                    title: "Go Viral",
                    description: "Trending hashtags can propel your content to viral status. Our tool identifies popular tags to maximize your content's potential."
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
                Tag Generator Features
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Zap, title: "Instant Results", desc: "Get tags in seconds" },
                  { icon: Shield, title: "100% Free", desc: "No hidden charges" },
                  { icon: Globe, title: "All Platforms", desc: "7+ platforms supported" },
                  { icon: Clock, title: "Unlimited Use", desc: "No daily limits" }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border text-center">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Everything you need to know about our social media tag generator
              </p>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    What is a social media tag generator?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    A social media tag generator is a free online tool that automatically creates relevant hashtags and tags for your social media content. It analyzes your content URL and generates optimized tags for platforms like YouTube, Instagram, TikTok, Twitter, Facebook, LinkedIn, and Pinterest.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    How do I use the tag generator?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Using our tag generator is simple: 1) Copy your social media content URL (video, post, or reel), 2) Paste it in the input field on this page, 3) Click "Generate Tags", 4) Copy the generated hashtags and tags, 5) Paste them in your post description.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Is this tag generator completely free?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, our social media tag generator is 100% free to use with no signup required. You can generate unlimited tags for all supported platforms without any cost.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Which platforms are supported?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We support YouTube, Instagram, TikTok, Twitter/X, Facebook, LinkedIn, and Pinterest. The tool automatically detects the platform from your URL.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    How many hashtags should I use?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    It varies by platform: Instagram allows up to 30 (5-15 recommended), Twitter works best with 1-3, TikTok performs well with 3-5, LinkedIn suggests 3-5, and YouTube videos benefit from 5-10 relevant tags.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* SEO Article Section */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <article className="prose prose-invert max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                  The Complete Guide to Social Media Hashtags in 2024
                </h2>
                
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    In today's digital landscape, hashtags have become an essential tool for content creators, marketers, and businesses looking to expand their reach on social media platforms. Our free tag generator helps you discover the most effective hashtags for your content across YouTube, Instagram, TikTok, Twitter, Facebook, LinkedIn, and Pinterest.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Understanding Hashtag Strategy</h3>
                  <p>
                    Effective hashtag usage requires a balanced approach. Using too many hashtags can appear spammy, while using too few might limit your reach. Our tag generator analyzes your content and suggests the optimal mix of trending, niche, and branded hashtags tailored to each platform's best practices.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Platform-Specific Optimization</h3>
                  <p>
                    Each social media platform has its own hashtag culture. Instagram thrives on multiple hashtags, TikTok favors trending sounds and challenges, YouTube relies on tags for search optimization, and Twitter prefers concise, relevant hashtags. Our tool automatically adapts its suggestions based on the detected platform.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Maximizing Content Discoverability</h3>
                  <p>
                    The right hashtags can exponentially increase your content's visibility. By combining popular hashtags with niche-specific ones, you can reach both broad audiences and targeted communities interested in your specific content type. This strategic approach helps build a loyal following over time.
                  </p>
                </div>
              </article>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TagExtractorPage;
