import { Link } from "react-router-dom";
import { toolCategories } from "@/data/toolsData";

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
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-10 md:py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-primary mb-4">MultiTools</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Free online tools for image conversion, compression, editing, and social media tags. Fast, secure, browser-based.
            </p>
          </div>
          
          {/* Category Groups */}
          {categoryGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.map((category) => (
                <div key={category.id} className="mb-6">
                  <Link 
                    to={`/${category.slug}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                  <div className="flex flex-col gap-1 mt-2">
                    {category.tools.slice(0, 3).map((tool) => (
                      <Link 
                        key={tool.id} 
                        to={`/${tool.slug}`} 
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                    {category.tools.length > 3 && (
                      <Link 
                        to={`/${category.slug}`} 
                        className="text-xs text-primary hover:underline"
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
        <div className="border-t border-border pt-8 mb-8">
          <h4 className="font-semibold text-foreground mb-4 text-center">Popular Tools</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: "JPG to PNG", route: "/jpg-to-png" },
              { name: "PNG to JPG", route: "/png-to-jpg" },
              { name: "JPEG Compressor", route: "/jpeg-compressor" },
              { name: "PNG Compressor", route: "/png-compressor" },
              { name: "Image Resize", route: "/image-resize" },
              { name: "Image Crop", route: "/image-crop" },
              { name: "Rotate Image", route: "/image-rotate-flip" },
              { name: "Photo Filters", route: "/photo-filters" },
              { name: "Watermark", route: "/watermark-tools" },
              { name: "Tag Extractor", route: "/tag-extractor" },
            ].map((item) => (
              <Link 
                key={item.route} 
                to={item.route}
                className="px-3 py-1 bg-secondary rounded-full text-xs text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Bottom Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MultiTools. All rights reserved. All processing happens locally in your browser.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
