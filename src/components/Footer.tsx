import { Link } from "react-router-dom";
import { toolCategories } from "@/data/toolsData";
import logo from "@/assets/logo-icon.png";
import SafeBannerAd from "@/components/ads/SafeBannerAd";

const Footer = () => {
  const imageCategories = toolCategories.filter(cat => cat.id !== "tag-tools").sort((a, b) => a.priority - b.priority);
  
  // Group categories for footer display
  const categoryGroups = [
    imageCategories.slice(0, 4),
    imageCategories.slice(4, 8),
    imageCategories.slice(8, 12),
    imageCategories.slice(12)
  ];

  return (
    <footer className="bg-card border-t border-border mt-8 sm:mt-12 md:mt-16 pb-16 md:pb-0">
      {/* Mobile Footer Banner Ad (320x50) - Mobile Only */}
      <div className="md:hidden flex justify-center py-4">
        <SafeBannerAd size="320x50" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <img src={logo} alt="MultiToolsA Logo" className="h-8 w-8" />
              <h3 className="text-lg sm:text-xl font-bold text-primary">MultiToolsA</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Free online tools for image conversion, compression, editing, and social media tags.
            </p>
          </div>
          
          {/* Category Groups */}
          {categoryGroups.slice(0, 4).map((group, groupIndex) => (
            <div key={groupIndex} className="col-span-1">
              {group.slice(0, 2).map((category) => (
                <div key={category.id} className="mb-4 sm:mb-6">
                  <Link 
                    to={`/${category.slug}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {category.name}
                  </Link>
                  <div className="flex flex-col gap-0.5 sm:gap-1 mt-1 sm:mt-2">
                    {category.tools.slice(0, 3).map((tool) => (
                      <Link 
                        key={tool.id} 
                        to={`/${tool.slug}`} 
                        className="text-[10px] sm:text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                    {category.tools.length > 3 && (
                      <Link 
                        to={`/${category.slug}`} 
                        className="text-[10px] sm:text-xs text-primary hover:underline"
                      >
                        +{category.tools.length - 3} more
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* PDF Tools Quick Links */}
        <div className="border-t border-border pt-6 sm:pt-8 mb-6 sm:mb-8">
          <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-center text-sm sm:text-base">PDF Tools</h4>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6">
            {[
              { name: "Merge PDF", route: "/merge-pdf" },
              { name: "Compress PDF", route: "/compress-pdf" },
              { name: "Word to PDF", route: "/word-to-pdf" },
              { name: "Image to PDF", route: "/image-to-pdf" },
              { name: "Split PDF", route: "/split-pdf" },
            ].map((item) => (
              <Link 
                key={item.route} 
                to={item.route}
                className="px-2 sm:px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] sm:text-xs text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-center text-sm sm:text-base">Popular Image Tools</h4>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {[
              { name: "JPG to PNG", route: "/jpg-to-png" },
              { name: "PNG to JPG", route: "/png-to-jpg" },
              { name: "JPEG Compressor", route: "/jpeg-compressor" },
              { name: "PNG Compressor", route: "/png-compressor" },
              { name: "Image Resize", route: "/image-resize" },
              { name: "Image Crop", route: "/image-crop" },
              { name: "Rotate Image", route: "/image-rotate-flip" },
              { name: "Watermark", route: "/watermark-tools" },
              { name: "Tag Extractor", route: "/tag-extractor" },
            ].map((item) => (
              <Link 
                key={item.route} 
                to={item.route}
                className="px-2 sm:px-3 py-1 bg-secondary rounded-full text-[10px] sm:text-xs text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-border pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="text-lg">🔒</span>
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="text-lg">🌐</span>
              <span>Browser-Based Processing</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="text-lg">✨</span>
              <span>No Registration Required</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="text-lg">🚀</span>
              <span>Free Forever</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Links */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
          <Link to="/" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/all-tools" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">All Tools</Link>
          <Link to="/pdf-tools" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">PDF Tools</Link>
          <Link to="/tag-extractor" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Tag Generator</Link>
          <Link to="/blog" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
          <Link to="/image-formats-guide" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Format Guide</Link>
          <Link to="/how-tools-work" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</Link>
          <Link to="/about" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/faq" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
          <Link to="/privacy" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
          <Link to="/terms" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          <Link to="/contact" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          <Link to="/advertiser-disclosure" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Ad Disclosure</Link>
        </div>
        
        {/* Site Purpose Statement */}
        <div className="text-center mb-4 px-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground max-w-3xl mx-auto">
            MultiToolsA is a free online platform providing 100+ professional image editing tools including format conversion, 
            compression, resizing, cropping, watermarking, and PDF tools. All processing happens locally in your browser for complete privacy.
          </p>
        </div>

        {/* Advertiser Disclosure */}
        <div className="text-center mb-4 px-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground/70 max-w-3xl mx-auto">
            <strong>Advertiser Disclosure:</strong> This website contains advertisements delivered by Google AdSense. 
            These ads help us keep our tools free for everyone. We may earn a small commission when you interact with ads, 
            at no additional cost to you. <Link to="/advertiser-disclosure" className="underline hover:text-primary">Learn more</Link> | <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} MultiToolsA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;