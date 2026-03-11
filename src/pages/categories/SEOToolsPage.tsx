import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import { getCategoryBySlug } from "@/data/toolsData";
import { Link } from "react-router-dom";
import { Search, BarChart3, Code, Type, Share2, ListOrdered, CaseSensitive } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "keyword-density-checker": <BarChart3 className="w-6 h-6" />,
  "meta-tag-generator": <Code className="w-6 h-6" />,
  "word-counter": <Type className="w-6 h-6" />,
  "open-graph-checker": <Share2 className="w-6 h-6" />,
  "heading-checker": <ListOrdered className="w-6 h-6" />,
  "text-case-converter": <CaseSensitive className="w-6 h-6" />,
};

const colorMap: Record<string, string> = {
  "keyword-density-checker": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "meta-tag-generator": "bg-green-500/10 text-green-500 border-green-500/20",
  "word-counter": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "open-graph-checker": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "heading-checker": "bg-red-500/10 text-red-500 border-red-500/20",
  "text-case-converter": "bg-teal-500/10 text-teal-500 border-teal-500/20",
};

const SEOToolsPage = () => {
  const category = getCategoryBySlug("seo-tools")!;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Free SEO Tools Online - Keyword Checker, Meta Tag Generator | MultiToolsA</title>
        <meta name="description" content="Free online SEO tools: Keyword Density Checker, Meta Tag Generator, Word Counter, Open Graph Checker, Heading Analyzer. Optimize your website for search engines." />
        <link rel="canonical" href="https://multitoolsa.com/seo-tools" />
        <meta property="og:title" content="Free SEO Tools - MultiToolsA" />
        <meta property="og:description" content="Optimize your website with free SEO tools. Check keyword density, generate meta tags, count words, and validate Open Graph tags." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/seo-tools" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free SEO Tools",
            "description": "Collection of free online SEO tools for website optimization",
            "url": "https://multitoolsa.com/seo-tools",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": category.tools.map((tool, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": tool.name,
                "url": `https://multitoolsa.com/${tool.slug}`,
              })),
            },
          })}
        </script>
      </Helmet>
      <HreflangTags path="/seo-tools" />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Search className="w-4 h-4" />
              Free SEO Tools
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Free Online SEO Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Analyze, optimize, and improve your website's search engine ranking with our free, browser-based SEO tools. 
              No signup required — all processing happens locally.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/${tool.slug}`}
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-4 ${colorMap[tool.slug] || "bg-primary/10 text-primary border-primary/20"}`}>
                    {iconMap[tool.slug] || <Search className="w-6 h-6" />}
                  </div>
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Why Use Our SEO Tools?</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Search Engine Optimization (SEO) is essential for any website that wants to attract organic traffic from Google 
                and other search engines. Our free SEO tools help you analyze and optimize various aspects of your web pages 
                without requiring expensive software subscriptions or technical expertise.
              </p>
              <p>
                Every tool runs entirely in your browser. Your content never leaves your device — we don't store, transmit, 
                or process any data on our servers. This means you can safely analyze confidential content, unpublished articles, 
                and sensitive business information with complete privacy.
              </p>

              <h3 className="text-xl font-bold text-foreground">How SEO Tools Improve Your Rankings</h3>
              <p>
                Proper keyword density helps search engines understand what your page is about without keyword stuffing. 
                Well-crafted meta tags improve click-through rates from search results. A clean heading structure makes 
                your content more accessible and easier for search engines to index. Open Graph tags ensure your content 
                looks professional when shared on social media platforms like Facebook, LinkedIn, and Twitter.
              </p>

              <h3 className="text-xl font-bold text-foreground">Who Should Use These Tools?</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Bloggers & Content Creators</strong> — Optimize articles before publishing for maximum search visibility</li>
                <li><strong>Digital Marketers</strong> — Analyze competitor content and refine your SEO strategy</li>
                <li><strong>Web Developers</strong> — Generate proper meta tags and validate structured data</li>
                <li><strong>Small Business Owners</strong> — Improve website visibility without hiring an SEO agency</li>
                <li><strong>Students & Researchers</strong> — Count words, check readability, and format text efficiently</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SEOToolsPage;
