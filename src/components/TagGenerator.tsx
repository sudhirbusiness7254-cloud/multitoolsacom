import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, Hash, Tag } from "lucide-react";

const TagGenerator = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateTags = () => {
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    setIsLoading(true);
    
    // Simulate tag generation (in a real app, this would call an API)
    setTimeout(() => {
      // Extract video ID and create sample tags
      const videoId = extractVideoId(youtubeUrl);
      
      if (!videoId) {
        toast.error("Invalid YouTube URL");
        setIsLoading(false);
        return;
      }

      // Sample generated hashtags
      const generatedHashtags = `#YouTube #VideoMarketing #ContentCreator #ViralVideo #YouTubeTips #VideoSEO #SocialMedia #DigitalMarketing #YouTubeGrowth #ContentStrategy`;
      
      // Sample generated tags
      const generatedTags = `youtube, video marketing, content creation, viral videos, youtube tips, video seo, social media, digital marketing, youtube growth, content strategy, video optimization, youtube algorithm, video content, youtube channel, content creator`;
      
      setHashtags(generatedHashtags);
      setTags(generatedTags);
      setIsLoading(false);
      toast.success("Tags and hashtags generated successfully!");
    }, 1000);
  };

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^&\s]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* <!-- AD PLACEMENT ZONE: Top Banner Ad (728x90 or responsive) --> */}
      {/* <div className="w-full bg-muted/20 border-2 border-dashed border-muted rounded-lg p-4 text-center text-muted-foreground">
        [Top Banner Ad Space - 728x90]
      </div> */}

      <div className="bg-card rounded-xl p-4 sm:p-6 shadow-lg border border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="bg-accent/10 p-2 sm:p-3 rounded-lg">
            <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">YouTube Tag & Hashtag Generator</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Generate optimized tags and hashtags for your YouTube videos</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="youtube-url" className="block text-sm font-medium text-foreground mb-2">
              YouTube Video URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="youtube-url"
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
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

      {/* <!-- AD PLACEMENT ZONE: Bottom Banner Ad (728x90 or responsive) --> */}
      {/* <div className="w-full bg-muted/20 border-2 border-dashed border-muted rounded-lg p-4 text-center text-muted-foreground">
        [Bottom Banner Ad Space - 728x90]
      </div> */}
    </div>
  );
};

export default TagGenerator;
