import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TagGenerator from "@/components/TagGenerator";
import { Sparkles, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Generator Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <TagGenerator />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-16 px-4 bg-card/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-8 md:mb-12">
              How to Use Our Tag Generator
            </h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Paste URL</h3>
                <p className="text-muted-foreground">
                  Copy your YouTube, Instagram, or TikTok video URL and paste it into the input field above
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Generate Tags</h3>
                <p className="text-muted-foreground">
                  Click the generate button and get instant hashtags and tags
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Copy & Use</h3>
                <p className="text-muted-foreground">
                  Copy the results and add them to your video description or post
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-8 md:mb-12">
              Why Use Tags and Hashtags?
            </h2>
            
            <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Improve Search Rankings</h3>
                  <p className="text-muted-foreground">
                    Proper tags help algorithms understand your content and rank it higher in search results across all platforms.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Increase Discoverability</h3>
                  <p className="text-muted-foreground">
                    Hashtags make your videos discoverable to users searching for specific topics and trending content.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Reach Target Audience</h3>
                  <p className="text-muted-foreground">
                    Well-chosen tags connect your content with viewers genuinely interested in your niche.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Boost Engagement</h3>
                  <p className="text-muted-foreground">
                    Better visibility leads to more views, likes, comments, and subscribers for your channel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
