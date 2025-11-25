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

        {/* Tool Description Section */}
        <section className="py-12 md:py-16 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-6">
              About Our Social Media Tag Generator Tool
            </h2>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border mb-8">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                Our free Social Media Tag Generator is a powerful tool designed to help content creators optimize their content across multiple platforms including YouTube, Instagram, TikTok, LinkedIn, Twitter, Facebook, and Pinterest. Simply paste your content URL, and our tool automatically generates relevant tags and hashtags that can boost your content's visibility and reach.
              </p>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-red-500/10 p-2 rounded-lg">
                      <span className="text-xl">📺</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">YouTube</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    SEO-optimized tags for better search rankings
                  </p>
                </div>
                
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-pink-500/10 p-2 rounded-lg">
                      <span className="text-xl">📸</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">Instagram</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Trending hashtags for posts and reels
                  </p>
                </div>
                
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-cyan-500/10 p-2 rounded-lg">
                      <span className="text-xl">🎵</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">TikTok</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Viral hashtags for the For You page
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <span className="text-xl">💼</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">LinkedIn</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Professional hashtags for B2B content
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-sky-500/10 p-2 rounded-lg">
                      <span className="text-xl">🐦</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">Twitter</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Trending hashtags for engagement
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-600/10 p-2 rounded-lg">
                      <span className="text-xl">👥</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">Facebook</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Hashtags for posts and videos
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-red-600/10 p-2 rounded-lg">
                      <span className="text-xl">📌</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">Pinterest</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    SEO-rich keywords for pins
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Why Tags and Hashtags Matter</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Improve Search Visibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Properly tagged content appears in search results when users look for specific topics, significantly increasing your chances of being discovered by new audiences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Algorithm Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Social media algorithms use tags to understand your content and recommend it to interested users. Effective tagging helps platforms categorize and distribute your content effectively.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Reach Target Audience</h4>
                    <p className="text-sm text-muted-foreground">
                      Strategic hashtags connect your content with users actively searching for or interested in your niche, leading to higher engagement rates and quality followers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Competitive Advantage</h4>
                    <p className="text-sm text-muted-foreground">
                      Many creators neglect proper tagging. Using optimized tags gives you an edge over competitors and increases your content's performance metrics like views, likes, and shares.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Analytics and Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Consistent tagging helps you track which topics perform best, allowing you to refine your content strategy and create more of what your audience wants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                  Copy your content URL from YouTube, Instagram, TikTok, LinkedIn, Twitter, Facebook, or Pinterest and paste it into the input field above
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
