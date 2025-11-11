import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TagGenerator from "@/components/TagGenerator";
import { Sparkles, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* <!-- AD PLACEMENT ZONE: Below Header Banner --> */}
      {/* <div className="w-full bg-muted/20 border-2 border-dashed border-muted p-4 text-center text-muted-foreground">
        [Header Banner Ad Space - Full Width Responsive]
      </div> */}
      
      <main className="flex-1">
        {/* Generator Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <TagGenerator />
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-dark to-teal-medium py-12 md:py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cyan-bright mb-3 md:mb-4">
              YouTube Tag & Hashtag Generator
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Boost your video visibility with AI-powered tags and trending hashtags. Free, fast, and optimized for YouTube SEO.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-12">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="bg-accent/20 p-2 md:p-3 rounded-lg">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-cyan-bright" />
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-bold text-cyan-bright">100% Free</div>
                  <div className="text-xs md:text-sm text-foreground/80">No registration needed</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="bg-accent/20 p-2 md:p-3 rounded-lg">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-cyan-bright" />
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-bold text-cyan-bright">SEO Optimized</div>
                  <div className="text-xs md:text-sm text-foreground/80">Rank higher on YouTube</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="bg-accent/20 p-2 md:p-3 rounded-lg">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-bright" />
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-bold text-cyan-bright">Instant Results</div>
                  <div className="text-xs md:text-sm text-foreground/80">Generate in seconds</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- AD PLACEMENT ZONE: Mid-page Section --> */}
        {/* <div className="w-full bg-muted/20 border-2 border-dashed border-muted p-4 text-center text-muted-foreground my-8">
          [Mid-page Ad Space - Full Width]
        </div> */}

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
                  Copy your YouTube video URL and paste it into the input field above
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
                  Copy the results and add them to your YouTube video description
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
                    Proper tags help YouTube's algorithm understand your content and rank it higher in search results.
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
