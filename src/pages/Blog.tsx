import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";

const blogPosts = [
  {
    id: "complete-guide-image-compression",
    title: "Complete Guide to Image Compression: Techniques, Tools, and Best Practices",
    excerpt: "Learn everything about image compression, from lossy vs lossless techniques to choosing the right format for your needs. Discover how to reduce file sizes without sacrificing quality.",
    author: "MultiToolsA Team",
    date: "December 10, 2025",
    readTime: "12 min read",
    tags: ["Image Compression", "Optimization", "Web Performance"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
  },
  {
    id: "image-formats-explained",
    title: "Image Formats Explained: JPEG vs PNG vs WebP vs GIF - Which Should You Use?",
    excerpt: "Understand the differences between popular image formats. Learn when to use JPEG, PNG, WebP, or GIF for optimal quality and performance in different scenarios.",
    author: "MultiToolsA Team",
    date: "December 8, 2025",
    readTime: "10 min read",
    tags: ["Image Formats", "JPEG", "PNG", "WebP"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
  },
  {
    id: "optimize-images-website-speed",
    title: "How to Optimize Images for Faster Website Loading Speed",
    excerpt: "Website speed matters for SEO and user experience. Discover proven strategies to optimize your images and improve page load times significantly.",
    author: "MultiToolsA Team",
    date: "December 5, 2025",
    readTime: "8 min read",
    tags: ["SEO", "Web Performance", "Optimization"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
  },
  {
    id: "watermark-images-protect-photos",
    title: "How to Watermark Your Images: Protect Your Photos and Build Your Brand",
    excerpt: "Learn the best practices for watermarking your images. Discover different watermark styles, placement strategies, and tools to protect your creative work.",
    author: "MultiToolsA Team",
    date: "December 3, 2025",
    readTime: "7 min read",
    tags: ["Watermarking", "Copyright", "Photography"],
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop"
  },
  {
    id: "resize-images-social-media",
    title: "Image Sizing Guide for Social Media: Perfect Dimensions for Every Platform",
    excerpt: "Get the perfect image dimensions for Facebook, Instagram, Twitter, LinkedIn, and more. Our comprehensive guide ensures your images look great everywhere.",
    author: "MultiToolsA Team",
    date: "November 30, 2025",
    readTime: "9 min read",
    tags: ["Social Media", "Image Resizing", "Marketing"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop"
  },
  {
    id: "remove-image-metadata-privacy",
    title: "Image Metadata and Privacy: Why You Should Remove EXIF Data Before Sharing",
    excerpt: "Your photos contain hidden data that reveals your location, camera settings, and more. Learn why and how to remove metadata to protect your privacy.",
    author: "MultiToolsA Team",
    date: "November 28, 2025",
    readTime: "6 min read",
    tags: ["Privacy", "Metadata", "Security"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Blog - MultiToolsA | Image Editing Tips, Tutorials & Guides</title>
        <meta name="description" content="Discover expert tips, tutorials, and guides on image editing, compression, format conversion, and optimization. Learn from MultiToolsA's comprehensive blog articles." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://multitoolsa.com/blog" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Image Editing Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert tips, tutorials, and guides to help you master image editing, compression, and optimization. 
              Learn best practices and stay updated with the latest techniques.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Article</h2>
          <Link to={`/blog/${blogPosts[0].id}`} className="block group">
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blogPosts[0].tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {blogPosts[0].author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {blogPosts[0].date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* All Posts */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group">
                <article className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
        </section>

        {/* Newsletter Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest image editing tips, tutorials, and tool updates delivered to your inbox. 
              Join thousands of creators who trust MultiToolsA for their image processing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Browse by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Image Compression", "Format Conversion", "SEO", "Photography", "Web Performance", "Privacy", "Social Media", "Watermarking", "Metadata", "Optimization", "Design Tips", "Tutorials"].map((category) => (
              <div 
                key={category} 
                className="px-4 py-3 bg-card border border-border rounded-lg text-center hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-foreground">{category}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
