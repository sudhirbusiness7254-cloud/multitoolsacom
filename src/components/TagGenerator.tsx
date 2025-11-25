import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, Hash, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Platform = "youtube" | "instagram" | "tiktok" | "linkedin" | "twitter" | "facebook" | "pinterest" | null;

const TagGenerator = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<Platform>(null);

  const detectPlatform = (url: string): Platform => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    } else if (url.includes("instagram.com")) {
      return "instagram";
    } else if (url.includes("tiktok.com")) {
      return "tiktok";
    } else if (url.includes("linkedin.com")) {
      return "linkedin";
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      return "twitter";
    } else if (url.includes("facebook.com") || url.includes("fb.com")) {
      return "facebook";
    } else if (url.includes("pinterest.com") || url.includes("pin.it")) {
      return "pinterest";
    }
    return null;
  };

  const generateTags = () => {
    if (!videoUrl.trim()) {
      toast.error("Please enter a video URL");
      return;
    }

    const platform = detectPlatform(videoUrl);
    
    if (!platform) {
      toast.error("Please enter a valid social media URL (YouTube, Instagram, TikTok, LinkedIn, Twitter, Facebook, or Pinterest)");
      return;
    }

    setIsLoading(true);
    setDetectedPlatform(platform);
    
    // Simulate tag generation (in a real app, this would call an API)
    setTimeout(() => {
      let generatedHashtags = "";
      let generatedTags = "";

      switch (platform) {
        case "youtube":
          generatedHashtags = `#YouTube #VideoMarketing #ContentCreator #ViralVideo #YouTubeTips #VideoSEO #SocialMedia #DigitalMarketing #YouTubeGrowth #ContentStrategy`;
          generatedTags = `youtube, video marketing, content creation, viral videos, youtube tips, video seo, social media, digital marketing, youtube growth, content strategy, video optimization, youtube algorithm, video content, youtube channel, content creator`;
          break;
        
        case "instagram":
          generatedHashtags = `#Instagram #InstaDaily #InstaGood #PhotoOfTheDay #InstaMood #InstaReels #Trending #ExploreMore #InstaGram #SocialMedia #ContentCreator #ViralReels #InstaLove #InstaFamous #ReelsInsta`;
          generatedTags = `instagram, reels, instagram reels, content creator, viral content, social media, instagram tips, engagement, followers, instagram growth, photo of the day, instagram marketing, influencer, trending reels, instagram algorithm`;
          break;
        
        case "tiktok":
          generatedHashtags = `#TikTok #FYP #ForYou #Viral #Trending #TikTokViral #TikTokTrend #FYPage #TikTokFamous #ContentCreator #TikTokVideo #ViralTikTok #ForYouPage #TikTokLife #TikTokCreator`;
          generatedTags = `tiktok, fyp, for you page, viral, trending, tiktok viral, content creator, tiktok trends, tiktok growth, tiktok tips, tiktok algorithm, viral video, tiktok marketing, tiktok content, social media, tiktok creator`;
          break;
        
        case "linkedin":
          generatedHashtags = `#LinkedIn #LinkedInTips #ProfessionalDevelopment #CareerGrowth #BusinessNetworking #ThoughtLeadership #LinkedInMarketing #B2B #ProfessionalBranding #LinkedInContent #CareerAdvice #BusinessStrategy #LinkedInVideo #Leadership #Networking`;
          generatedTags = `linkedin, professional networking, career development, business growth, linkedin tips, b2b marketing, thought leadership, professional branding, linkedin content, career advice, business strategy, linkedin algorithm, professional development, networking tips, linkedin marketing`;
          break;
        
        case "twitter":
          generatedHashtags = `#Twitter #TwitterTips #SocialMedia #Trending #Viral #TwitterMarketing #ContentCreator #DigitalMarketing #TwitterThread #Engagement #TwitterCommunity #SocialMediaMarketing #TwitterGrowth #OnlinePresence #TwitterStrategy`;
          generatedTags = `twitter, social media, twitter tips, viral tweets, twitter marketing, content strategy, engagement, twitter growth, twitter algorithm, digital marketing, twitter threads, social media strategy, twitter community, online presence, twitter engagement`;
          break;
        
        case "facebook":
          generatedHashtags = `#Facebook #FacebookMarketing #SocialMedia #FacebookAds #ContentMarketing #FacebookVideo #SocialMediaMarketing #FacebookTips #DigitalMarketing #FacebookPage #ContentCreator #FacebookGrowth #VideoMarketing #FacebookStrategy #Engagement`;
          generatedTags = `facebook, facebook marketing, social media, facebook ads, content marketing, facebook video, social media strategy, facebook tips, digital marketing, facebook page, facebook growth, video marketing, facebook algorithm, engagement, facebook content`;
          break;
        
        case "pinterest":
          generatedHashtags = `#Pinterest #PinterestMarketing #PinterestTips #PinterestSEO #VisualContent #PinterestBusiness #ContentMarketing #PinterestGrowth #PinterestStrategy #SocialMedia #PinterestIdeas #DigitalMarketing #PinterestPin #VisualMarketing #PinterestInspiration`;
          generatedTags = `pinterest, pinterest marketing, pinterest seo, visual content, pinterest tips, pinterest business, content marketing, pinterest growth, pinterest strategy, pinterest algorithm, pinterest pins, visual marketing, pinterest ideas, social media, pinterest inspiration`;
          break;
      }
      
      setHashtags(generatedHashtags);
      setTags(generatedTags);
      setIsLoading(false);
      toast.success(`Tags and hashtags generated for ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
    }, 1000);
  };


  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-card rounded-xl p-4 sm:p-6 shadow-lg border border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="bg-accent/10 p-2 sm:p-3 rounded-lg">
            <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Social Media Tag Generator</h2>
              {detectedPlatform && (
                <Badge variant="secondary" className="text-xs">
                  {detectedPlatform.charAt(0).toUpperCase() + detectedPlatform.slice(1)}
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Generate optimized tags and hashtags for all major platforms</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="video-url" className="block text-sm font-medium text-foreground mb-2">
              Social Media Content URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="video-url"
                type="text"
                placeholder="Paste URL from YouTube, Instagram, TikTok, LinkedIn, Twitter, Facebook, or Pinterest..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={generateTags} 
                disabled={isLoading}
                className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
              >
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="hashtags" className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Hash className="w-4 h-4 text-accent" />
                  Generated Hashtags
                </label>
                {hashtags && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(hashtags, "Hashtags")}
                    className="h-8 text-xs"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                )}
              </div>
              <Textarea
                id="hashtags"
                placeholder="Hashtags will appear here..."
                value={hashtags}
                readOnly
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="tags" className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Tag className="w-4 h-4 text-accent" />
                  Generated Tags
                </label>
                {tags && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(tags, "Tags")}
                    className="h-8 text-xs"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                )}
              </div>
              <Textarea
                id="tags"
                placeholder="Tags will appear here..."
                value={tags}
                readOnly
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagGenerator;
