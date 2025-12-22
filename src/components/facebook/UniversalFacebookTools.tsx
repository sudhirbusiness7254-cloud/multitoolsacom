import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Copy, 
  RefreshCw, 
  Sparkles, 
  User, 
  MessageSquare,
  Hash,
  Lightbulb,
  Calculator,
  Megaphone,
  Calendar,
  Clock,
  Target,
  AlignLeft,
  Type,
  AtSign,
  MousePointer,
  Heading,
  MessageCircle
} from "lucide-react";

interface UniversalFacebookToolsProps {
  toolType?: string;
}

const toolIconMap: Record<string, React.ElementType> = {
  "facebook-caption-generator": MessageSquare,
  "facebook-bio-generator": User,
  "facebook-hashtag-generator": Hash,
  "facebook-post-idea-generator": Lightbulb,
  "facebook-comment-generator": MessageCircle,
  "facebook-story-text-generator": Type,
  "facebook-page-name-generator": AtSign,
  "facebook-engagement-rate-calculator": Calculator,
  "facebook-ad-copy-generator": Megaphone,
  "facebook-cta-generator": MousePointer,
  "facebook-content-calendar-generator": Calendar,
  "facebook-posting-time-analyzer": Clock,
  "facebook-audience-interest-finder": Target,
  "facebook-ad-headline-generator": Heading,
  "facebook-post-formatter": AlignLeft,
};

const UniversalFacebookTools = ({ toolType }: UniversalFacebookToolsProps) => {
  const [inputText, setInputText] = useState("");
  const [selectedTone, setSelectedTone] = useState("casual");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculator states
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");
  const [engagementRate, setEngagementRate] = useState<number | null>(null);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }, []);

  const generateContent = useCallback(async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const contentTemplates: Record<string, string[]> = {
      caption: [
        "✨ Life is what happens when you're busy making other plans. What's your plan for today? Drop a comment below! 👇",
        "📸 Capturing moments that matter. Every picture tells a story, what's yours? Share your thoughts! 💭",
        "🌟 Dream big, work hard, stay focused. Success is just around the corner! Who's ready to crush their goals? 💪",
        "💫 Sometimes the smallest step in the right direction ends up being the biggest step of your life. Keep moving forward! 🚀",
        "🎯 Goals don't work unless you do. Let's make today count! What are you working on? 📝"
      ],
      bio: [
        "✨ Dreamer | Creator | Storyteller | Making the ordinary extraordinary ✨",
        "🌍 Explorer of life's beautiful moments | Sharing my journey one post at a time 📸",
        "💡 Turning ideas into reality | Passionate about growth and connection 🌱",
        "🎯 Living life on my own terms | Inspiring others along the way 💫",
        "🌟 Just a soul with goals | Building my dreams one day at a time 🚀"
      ],
      hashtags: [
        "#motivation #success #goals #mindset #inspiration #growth #positivity #lifestyle #entrepreneur #hustle #dreambig #nevergiveup",
        "#love #life #happy #instagood #photooftheday #beautiful #fashion #smile #friends #family #blessed #grateful",
        "#business #marketing #entrepreneur #startup #success #motivation #money #smallbusiness #branding #digitalmarketing"
      ],
      postIdea: [
        "📊 Poll: Ask your audience about their weekend plans and share yours! Great for boosting engagement.",
        "🎬 Behind-the-scenes: Show a day in your life or work process. People love authentic content!",
        "💬 Engagement post: Share a controversial opinion in your niche and ask for thoughts. Gets people talking!",
        "📚 Value post: Share 5 tips that helped you achieve something specific. Educational content performs great!",
        "🎉 Celebration: Highlight a milestone or thank your community. Gratitude posts build connection!"
      ],
      comment: [
        "This is absolutely amazing! Thanks for sharing this valuable content 🙌 Really made my day!",
        "Love this perspective! Really made me think differently about it 💡 Keep up the great work!",
        "Great post! This resonates with me so much. Keep up the incredible work! ✨",
        "Wow, this is so inspiring! Needed to see this today 🌟 Thank you for sharing!",
        "Couldn't agree more! This is exactly what I've been thinking about lately 💯"
      ],
      storyText: [
        "✨ New day, new opportunities! Swipe up to see more → What's on your agenda today?",
        "🔥 Big things coming! Stay tuned for the announcement... You don't want to miss this!",
        "💭 Quick question: What's your biggest goal this week? Drop your answer!",
        "📸 POV: You're living your best life ✨ This is your sign to keep going!",
        "🎯 Monday motivation: Your only limit is your mind. Let's crush this week!"
      ],
      pageName: [
        "Digital Dreams Studio ✨",
        "The Creative Corner 🎨",
        "Inspired Living Daily 🌟",
        "Modern Life Chronicles 📖",
        "The Growth Mindset Hub 🚀"
      ],
      adCopy: [
        "🚀 Transform your life in just 30 days! Our proven system has helped thousands achieve their goals. Limited spots available - claim yours now! ⏰",
        "💡 Stop struggling and start succeeding! Discover the secret that top performers use to 10x their results. Free training inside! 🎓",
        "⚡ Ready for a change? Join 50,000+ people who've already transformed their lives with our revolutionary approach. Start free today! 🌟"
      ],
      cta: [
        "👉 Get Started Now - It's Free!",
        "🎯 Claim Your Spot Today",
        "⚡ Start Your Transformation",
        "🚀 Join The Movement",
        "💫 Unlock Your Potential Now"
      ],
      adHeadline: [
        "Transform Your Results in 7 Days 🚀",
        "The Secret Top Performers Know 💡",
        "Finally, A System That Works ✨",
        "Your Success Story Starts Here 🌟",
        "Stop Dreaming, Start Achieving 🎯"
      ]
    };
    
    const type = toolType?.replace("facebook-", "").replace("-generator", "").replace("-finder", "").replace("-analyzer", "") || "caption";
    const templates = contentTemplates[type] || contentTemplates.caption;
    const randomContent = templates[Math.floor(Math.random() * templates.length)];
    
    setGeneratedContent(randomContent);
    setIsProcessing(false);
    toast.success("Content generated successfully!");
  }, [toolType]);

  const calculateEngagement = useCallback(() => {
    const followerCount = parseFloat(followers);
    const likeCount = parseFloat(likes);
    const commentCount = parseFloat(comments);
    const shareCount = parseFloat(shares);
    
    if (isNaN(followerCount) || followerCount === 0) {
      toast.error("Please enter a valid follower count");
      return;
    }
    
    const totalEngagement = (likeCount || 0) + (commentCount || 0) + (shareCount || 0);
    const rate = (totalEngagement / followerCount) * 100;
    
    setEngagementRate(rate);
    toast.success("Engagement rate calculated!");
  }, [followers, likes, comments, shares]);

  const formatText = useCallback((style: "bold" | "italic" | "strikethrough") => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to format");
      return;
    }
    
    const unicodeMaps: Record<string, Record<string, string>> = {
      bold: {
        'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
        'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽',
        'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅',
        'y': '𝘆', 'z': '𝘇', 'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙',
        'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡',
        'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩',
        'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭'
      },
      italic: {
        'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩',
        'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱',
        'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹',
        'y': '𝘺', 'z': '𝘻', 'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍',
        'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕',
        'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝',
        'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
      },
      strikethrough: {}
    };
    
    if (style === "strikethrough") {
      const formatted = inputText.split('').map(char => char + '\u0336').join('');
      setGeneratedContent(formatted);
    } else {
      const map = unicodeMaps[style];
      const formatted = inputText.split('').map(char => map[char] || char).join('');
      setGeneratedContent(formatted);
    }
    toast.success("Text formatted!");
  }, [inputText]);

  // Determine which interface to show based on tool type
  const isCalculator = toolType?.includes("calculator");
  const isFormatter = toolType?.includes("formatter");
  const isTimingTool = toolType?.includes("time") || toolType?.includes("calendar");

  // Get tool icon
  const ToolIcon = toolType ? toolIconMap[toolType] || Sparkles : Sparkles;
  const toolName = toolType 
    ? toolType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace('Facebook ', '') 
    : 'Facebook Tool';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <ToolIcon className="h-5 w-5 text-blue-500" />
            </div>
            <span>{toolName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isCalculator ? (
            // Calculator interface
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter your Facebook metrics below to calculate your engagement rate. A higher rate indicates better audience interaction.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="followers">Total Followers</Label>
                  <Input
                    id="followers"
                    type="number"
                    placeholder="e.g., 10000"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="likes">Post Likes</Label>
                  <Input
                    id="likes"
                    type="number"
                    placeholder="e.g., 500"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comments">Comments</Label>
                  <Input
                    id="comments"
                    type="number"
                    placeholder="e.g., 50"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shares">Shares</Label>
                  <Input
                    id="shares"
                    type="number"
                    placeholder="e.g., 25"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={calculateEngagement}>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Engagement Rate
              </Button>
              {engagementRate !== null && (
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl text-center">
                  <p className="text-sm text-muted-foreground mb-2">Your Engagement Rate</p>
                  <p className="text-4xl font-bold text-blue-500 mb-2">{engagementRate.toFixed(2)}%</p>
                  <p className="text-sm text-muted-foreground">
                    {engagementRate >= 6 ? "🎉 Outstanding! You're in the top tier of Facebook engagement!" : 
                     engagementRate >= 3 ? "🎉 Excellent engagement! Your content resonates well with your audience." : 
                     engagementRate >= 1 ? "👍 Good engagement rate. Keep creating quality content!" : 
                     "💡 There's room for improvement. Try posting more engaging content and at optimal times."}
                  </p>
                </div>
              )}
            </div>
          ) : isFormatter ? (
            // Formatter interface
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter your text below and click a formatting button to convert it to special Unicode characters that work on Facebook.
              </p>
              <div className="space-y-2">
                <Label htmlFor="text">Enter Your Text</Label>
                <Textarea
                  id="text"
                  placeholder="Type the text you want to format..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[100px] w-full"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => formatText("bold")} className="flex-1 min-w-[100px]">
                  <span className="font-bold mr-2">B</span> Bold
                </Button>
                <Button variant="outline" onClick={() => formatText("italic")} className="flex-1 min-w-[100px]">
                  <span className="italic mr-2">I</span> Italic
                </Button>
                <Button variant="outline" onClick={() => formatText("strikethrough")} className="flex-1 min-w-[100px]">
                  <span className="line-through mr-2">S</span> Strikethrough
                </Button>
              </div>
              {generatedContent && (
                <div className="space-y-3">
                  <Label>Formatted Text</Label>
                  <div className="p-4 bg-muted rounded-xl border">
                    <p className="text-foreground break-all">{generatedContent}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => copyToClipboard(generatedContent)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Formatted Text
                  </Button>
                </div>
              )}
            </div>
          ) : isTimingTool ? (
            // Timing/Calendar tool interface
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select your industry to get personalized posting time recommendations based on audience behavior.
              </p>
              <div className="space-y-2">
                <Label htmlFor="industry">Your Industry</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General/Lifestyle</SelectItem>
                    <SelectItem value="business">Business/B2B</SelectItem>
                    <SelectItem value="ecommerce">E-commerce/Retail</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="health">Health & Fitness</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={generateContent} disabled={isProcessing}>
                {isProcessing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Clock className="h-4 w-4 mr-2" />
                )}
                {toolType?.includes("calendar") ? "Generate Content Calendar" : "Analyze Best Times"}
              </Button>
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl space-y-4">
                <h4 className="font-semibold text-foreground text-lg">Recommended Posting Times</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg border">
                    <p className="font-medium text-foreground mb-2">📅 Monday - Friday</p>
                    <p className="text-sm text-muted-foreground">Morning: 9:00 AM - 10:00 AM</p>
                    <p className="text-sm text-muted-foreground">Afternoon: 1:00 PM - 3:00 PM</p>
                    <p className="text-sm text-muted-foreground">Evening: 7:00 PM - 8:00 PM</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border">
                    <p className="font-medium text-foreground mb-2">🗓️ Weekends</p>
                    <p className="text-sm text-muted-foreground">Morning: 10:00 AM - 12:00 PM</p>
                    <p className="text-sm text-muted-foreground">Afternoon: 2:00 PM - 4:00 PM</p>
                    <p className="text-sm text-muted-foreground">Evening: 7:00 PM - 9:00 PM</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  * Times shown in your local timezone. Test different times with your specific audience for best results.
                </p>
              </div>
            </div>
          ) : (
            // Generator interface (default)
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Generate engaging content for your Facebook posts. Add context for more personalized results.
              </p>
              <div className="space-y-2">
                <Label htmlFor="context">Topic or Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="Describe what your post is about, your niche, or any specific keywords..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[80px] w-full"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select value={selectedTone} onValueChange={setSelectedTone}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="funny">Funny & Witty</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600" 
                onClick={generateContent}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                Generate Content
              </Button>
              {generatedContent && (
                <div className="space-y-3">
                  <Label>Generated Content</Label>
                  <div className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">{generatedContent}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => copyToClipboard(generatedContent)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={generateContent}
                      disabled={isProcessing}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Generate Another
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UniversalFacebookTools;
