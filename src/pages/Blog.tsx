import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User, Tag, Search, Filter } from "lucide-react";
import HreflangTags from "@/components/HreflangTags";
import { blogPosts, blogCategories } from "@/data/blogData";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = blogPosts[0];
  const displayPosts = searchQuery || selectedCategory !== "All" ? filteredPosts : blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Blog - MultiToolsA | Image Editing Tips, Tutorials & Guides</title>
        <meta name="description" content="Discover expert tips, tutorials, and guides on image editing, compression, format conversion, and optimization. Learn from MultiToolsA's comprehensive blog articles." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://multitoolsa.com/blog" />
        <meta property="og:title" content="Blog - MultiToolsA | Image Editing Tips & Tutorials" />
        <meta property="og:description" content="Expert guides on image compression, format conversion, and optimization techniques." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/blog" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "MultiToolsA Blog",
            "description": "Expert tips and tutorials on image editing, compression, and optimization",
            "url": "https://multitoolsa.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "MultiToolsA",
              "logo": {
                "@type": "ImageObject",
                "url": "https://multitoolsa.com/logo.png"
              }
            },
            "blogPost": blogPosts.slice(0, 10).map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.date,
              "author": {
                "@type": "Organization",
                "name": post.author
              }
            }))
          })}
        </script>
      </Helmet>
      <HreflangTags path="/blog" />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {blogPosts.length} Expert Articles
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Image Editing Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Expert tips, tutorials, and guides to help you master image editing, compression, and optimization. 
              Learn best practices and stay updated with the latest techniques.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-xl bg-card border-border"
              />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="bg-secondary/30 border-b border-border sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {blogCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border hover:bg-muted text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post - Only show when not searching */}
        {!searchQuery && selectedCategory === "All" && (
          <section className="container mx-auto px-4 py-12">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-8 h-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold text-foreground">Featured Article</h2>
            </div>
            <Link to={`/blog/${featuredPost.id}`} className="block group">
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto md:min-h-[400px] overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full w-fit mb-4">
                      {featuredPost.category}
                    </span>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}


        {/* Search Results Info */}
        {(searchQuery || selectedCategory !== "All") && (
          <section className="container mx-auto px-4 pt-8">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Found <span className="font-semibold text-foreground">{filteredPosts.length}</span> articles
                {searchQuery && <> matching "<span className="text-primary">{searchQuery}</span>"</>}
                {selectedCategory !== "All" && <> in <span className="text-primary">{selectedCategory}</span></>}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                  className="text-sm text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="container mx-auto px-4 py-12">
          {!searchQuery && selectedCategory === "All" && (
            <div className="flex items-center gap-2 mb-8">
              <span className="w-8 h-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
            </div>
          )}
          
          {displayPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group">
                  <article className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View All Articles
              </button>
            </div>
          )}
        </section>

        {/* Mobile Native Ad - after articles */}
        <div className="container mx-auto px-4 lg:hidden">
          <MobileNativeAd />
        </div>
        
        {/* Desktop Native Banner Ad - after articles */}
        <div className="container mx-auto px-4 hidden lg:block">
          <NativeBannerAd />
        </div>

        {/* Newsletter Section */}
        <section className="bg-gradient-dark py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Stay Updated
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4">Get the Latest Tips in Your Inbox</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of creators who receive our weekly newsletter with image editing tips, 
                tutorials, and exclusive content. No spam, unsubscribe anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 py-6"
                />
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Subscribe Free
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                By subscribing, you agree to our Privacy Policy. We respect your inbox.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-8 h-1 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold text-foreground">Popular Topics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Image Compression", count: 5, icon: "📦" },
              { name: "Format Conversion", count: 4, icon: "🔄" },
              { name: "Photo Editing", count: 6, icon: "🎨" },
              { name: "Web Performance", count: 3, icon: "⚡" },
              { name: "PDF Tools", count: 2, icon: "📄" },
              { name: "Privacy & Security", count: 3, icon: "🔒" },
              { name: "Social Media", count: 2, icon: "📱" },
              { name: "E-commerce", count: 2, icon: "🛒" }
            ].map((topic) => (
              <button
                key={topic.name}
                onClick={() => setSearchQuery(topic.name.split(" ")[0])}
                className="p-4 bg-card border border-border rounded-xl hover:bg-muted/50 hover:border-primary/30 transition-all text-left group"
              >
                <span className="text-2xl mb-2 block">{topic.icon}</span>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">{topic.name}</span>
                <span className="text-xs text-muted-foreground block mt-1">{topic.count} articles</span>
              </button>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 pb-16">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-2xl p-8 md:p-12 text-center border border-border">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Optimize Your Images?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Put your knowledge into practice with our free online image tools. 
              Compress, convert, resize, and edit your images right in your browser.
            </p>
            <Link 
              to="/all-tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Explore All Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Mobile Native Ad - before CTA */}
        <div className="container mx-auto px-4 lg:hidden">
          <MobileNativeAd />
        </div>
        
        {/* Desktop Native Banner Ad - before CTA */}
        <div className="container mx-auto px-4 hidden lg:block">
          <NativeBannerAd />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
