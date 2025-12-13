import { Link } from "react-router-dom";
import { toolCategories } from "@/data/toolsData";
import logo from "@/assets/logo-icon.png";

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
    <footer className="bg-card border-t border-border mt-8 sm:mt-12 md:mt-16">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <img src={logo} alt="MultiTools Logo" className="h-8 w-8" />
              <h3 className="text-lg sm:text-xl font-bold text-primary">MultiTools</h3>
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

        {/* All Tools Quick Links */}
        <div className="border-t border-border pt-6 sm:pt-8 mb-6 sm:mb-8">
          <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-center text-sm sm:text-base">Popular Tools</h4>
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
        
        {/* Bottom Links */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
          <Link to="/" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/about" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/blog" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
          <Link to="/privacy" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
          <Link to="/terms" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          <Link to="/contact" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
        </div>
        
        <div className="text-center">
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} MultiTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
