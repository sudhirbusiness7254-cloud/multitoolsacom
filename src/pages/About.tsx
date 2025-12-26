import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tag, Hash, TrendingUp, Zap } from "lucide-react";
import HreflangTags from "@/components/HreflangTags";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>About MultiToolsA - Free Image Tools & Tag Generator</title>
        <meta name="description" content="Learn about MultiToolsA - your free, powerful solution for image processing and content optimization. Discover our tools for image conversion, compression, and social media tag generation." />
        <link rel="canonical" href="https://multitoolsa.com/about" />
        <meta property="og:title" content="About MultiToolsA - Free Image Tools & Tag Generator" />
        <meta property="og:description" content="Learn about MultiToolsA - your free solution for image processing and content optimization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/about" />
      </Helmet>
      <HreflangTags path="/about" />
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About MultiToolsA Tag Generator</h1>
          
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border mb-8">
            <p className="text-lg text-muted-foreground mb-6">
              Welcome to MultiToolsA - your free, powerful solution for YouTube content optimization. Our tag and hashtag generator helps content creators maximize their video reach and improve discoverability on YouTube.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4">What We Do</h2>
            <p className="text-muted-foreground mb-6">
              We provide a simple yet effective tool that analyzes your YouTube video URL and generates relevant, SEO-optimized tags and hashtags. Our generator helps you save time and ensures your content reaches the right audience.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div className="flex gap-4">
                <div className="bg-accent/10 p-3 rounded-lg h-fit">
                  <Tag className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Smart Tag Generation</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically generate relevant tags based on your video content and metadata
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-accent/10 p-3 rounded-lg h-fit">
                  <Hash className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Hashtag Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Get trending and relevant hashtags to boost your video's visibility
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-accent/10 p-3 rounded-lg h-fit">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">SEO Optimized</h3>
                  <p className="text-sm text-muted-foreground">
                    All suggestions are optimized for YouTube's search algorithm
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-accent/10 p-3 rounded-lg h-fit">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Fast & Free</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate unlimited tags and hashtags instantly, completely free
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground mb-6">
              <li>Copy your YouTube video URL from the address bar</li>
              <li>Paste the URL into the input field on our homepage</li>
              <li>Click the "Generate" button</li>
              <li>Copy the generated hashtags and tags from their respective boxes</li>
              <li>Paste them into your YouTube video description and tags section</li>
            </ol>

            <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Tags and Hashtags?</h2>
            <p className="text-muted-foreground mb-4">
              Tags and hashtags are crucial for YouTube SEO. They help YouTube understand your content and show it to the right audience. Proper tagging can:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Improve your video's search ranking</li>
              <li>Increase video discoverability</li>
              <li>Reach targeted audiences interested in your content</li>
              <li>Boost engagement and view count</li>
              <li>Connect your video to trending topics</li>
            </ul>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
