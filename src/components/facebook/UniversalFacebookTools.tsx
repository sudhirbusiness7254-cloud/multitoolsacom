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
  MessageCircle,
  Loader2
} from "lucide-react";

interface UniversalFacebookToolsProps {
  toolType?: string;
}

const DEEPSEEK_API_KEY = "sk-d024f61a26fc4df1ba3cb0f58abad062";

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

const getPromptForTool = (toolType: string, context: string, tone: string, category: string): string => {
  const prompts: Record<string, string> = {
    "facebook-caption-generator": `Generate an engaging Facebook caption for a ${category} post. The tone should be ${tone}. ${context ? `Context: ${context}` : ''} 
    
    Requirements:
    - Include relevant emojis
    - Add a call to action
    - Keep it under 200 characters for maximum engagement
    - Make it scroll-stopping
    
    Return only the caption, nothing else.`,
    
    "facebook-bio-generator": `Create a creative and catchy Facebook bio. The tone should be ${tone}. ${context ? `About: ${context}` : ''}
    
    Requirements:
    - Use creative emojis
    - Keep it concise (under 100 characters)
    - Make it memorable and unique
    - Include personality traits or interests
    
    Return only the bio, nothing else.`,
    
    "facebook-hashtag-generator": `Generate 10-15 relevant and trending Facebook hashtags for a ${category} post. ${context ? `Topic: ${context}` : ''}
    
    Requirements:
    - Mix popular and niche hashtags
    - Include some trending tags
    - Make them relevant to the topic
    - Format: #hashtag1 #hashtag2 ...
    
    Return only the hashtags, nothing else.`,
    
    "facebook-post-idea-generator": `Generate 3 creative and engaging Facebook post ideas for a ${category} page. The tone should be ${tone}. ${context ? `About: ${context}` : ''}
    
    Requirements:
    - Each idea should be unique and engaging
    - Include post type (poll, behind-the-scenes, story, etc.)
    - Add tips for maximizing engagement
    - Make them actionable
    
    Format each idea with an emoji and clear description.`,
    
    "facebook-comment-generator": `Generate a thoughtful and engaging comment for a Facebook post. The tone should be ${tone}. ${context ? `Post context: ${context}` : ''}
    
    Requirements:
    - Be genuine and authentic
    - Add value to the conversation
    - Include appropriate emojis
    - Keep it under 100 words
    
    Return only the comment, nothing else.`,
    
    "facebook-story-text-generator": `Create engaging text for a Facebook story. The tone should be ${tone}. ${context ? `Topic: ${context}` : ''}
    
    Requirements:
    - Keep it short and punchy
    - Include eye-catching emojis
    - Add a swipe up or action prompt
    - Make it visually appealing
    
    Return only the story text, nothing else.`,
    
    "facebook-page-name-generator": `Generate 5 unique and creative Facebook page name ideas for a ${category} business/brand. ${context ? `About: ${context}` : ''}
    
    Requirements:
    - Make them memorable
    - Easy to spell and pronounce
    - Include creative symbols if appropriate
    - Each name on a new line
    
    Return only the page names, one per line.`,
    
    "facebook-ad-copy-generator": `Write compelling Facebook ad copy for a ${category} product/service. The tone should be ${tone}. ${context ? `Details: ${context}` : ''}
    
    Requirements:
    - Hook the reader in the first line
    - Highlight benefits, not just features
    - Include a strong call to action
    - Use urgency if appropriate
    - Keep it under 125 characters for primary text
    
    Return only the ad copy, nothing else.`,
    
    "facebook-cta-generator": `Generate 5 compelling call-to-action buttons/phrases for Facebook. The tone should be ${tone}. ${context ? `For: ${context}` : ''}
    
    Requirements:
    - Use action verbs
    - Create urgency
    - Include emojis
    - Keep each under 25 characters
    
    Return only the CTAs, one per line.`,
    
    "facebook-ad-headline-generator": `Create 5 attention-grabbing Facebook ad headlines for a ${category} campaign. ${context ? `About: ${context}` : ''}
    
    Requirements:
    - Under 40 characters each
    - Include power words
    - Create curiosity
    - Use numbers if relevant
    
    Return only the headlines, one per line.`,
    
    "facebook-content-calendar-generator": `Create a 7-day Facebook content calendar for a ${category} page. ${context ? `About: ${context}` : ''}
    
    For each day, provide:
    - Day of week
    - Best posting time
    - Content type (image, video, poll, etc.)
    - Post topic/idea
    - Engagement strategy
    
    Format clearly with days as headers.`,
    
    "facebook-posting-time-analyzer": `Provide optimal Facebook posting times analysis for a ${category} audience. ${context ? `Additional info: ${context}` : ''}
    
    Include:
    - Best days to post
    - Best times for each day
    - Worst times to avoid
    - Industry-specific recommendations
    - Tips for testing optimal times
    
    Format clearly with sections.`,
    
    "facebook-audience-interest-finder": `Identify audience interests and targeting suggestions for Facebook ads in the ${category} niche. ${context ? `Specifics: ${context}` : ''}
    
    Include:
    - Related interests
    - Demographics suggestions
    - Behavioral targeting ideas
    - Lookalike audience suggestions
    - Competitor pages to target
    
    Format as a structured list.`,
  };
  
  return prompts[toolType] || prompts["facebook-caption-generator"];
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
    setGeneratedContent("");
    
    try {
      const prompt = getPromptForTool(
        toolType || "facebook-caption-generator", 
        inputText, 
        selectedTone, 
        selectedCategory
      );
      
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "You are a creative social media expert specializing in Facebook marketing. Generate engaging, authentic content that drives engagement. Be creative, use emojis appropriately, and always provide actionable content."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.8,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "";
      
      if (content) {
        setGeneratedContent(content.trim());
        toast.success("Content generated successfully!");
      } else {
        throw new Error("No content generated");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
      
      // Fallback to template-based generation
      const fallbackContent = getFallbackContent(toolType || "facebook-caption-generator");
      setGeneratedContent(fallbackContent);
    } finally {
      setIsProcessing(false);
    }
  }, [toolType, inputText, selectedTone, selectedCategory]);

  const getFallbackContent = (type: string): string => {
    const templates: Record<string, string[]> = {
      "facebook-caption-generator": [
        "✨ Life is what happens when you're busy making other plans. What's your plan for today? Drop a comment below! 👇",
        "📸 Capturing moments that matter. Every picture tells a story, what's yours? Share your thoughts! 💭",
        "🌟 Dream big, work hard, stay focused. Success is just around the corner! Who's ready to crush their goals? 💪",
      ],
      "facebook-bio-generator": [
        "✨ Dreamer | Creator | Storyteller | Making the ordinary extraordinary ✨",
        "🌍 Explorer of life's beautiful moments | Sharing my journey one post at a time 📸",
        "💡 Turning ideas into reality | Passionate about growth and connection 🌱",
      ],
      "facebook-hashtag-generator": [
        "#motivation #success #goals #mindset #inspiration #growth #positivity #lifestyle #entrepreneur #hustle #dreambig #nevergiveup",
      ],
      "facebook-post-idea-generator": [
        "📊 Poll: Ask your audience about their weekend plans and share yours!\n\n🎬 Behind-the-scenes: Show a day in your life or work process.\n\n💬 Engagement post: Share a controversial opinion in your niche.",
      ],
    };
    const list = templates[type] || templates["facebook-caption-generator"];
    return list[Math.floor(Math.random() * list.length)];
  };

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
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0">
      <Card className="border-border bg-card">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-foreground text-base sm:text-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <ToolIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            </div>
            <span className="truncate">{toolName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
          {isCalculator ? (
            // Calculator interface
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Enter your Facebook metrics below to calculate your engagement rate.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="followers" className="text-xs sm:text-sm">Total Followers</Label>
                  <Input
                    id="followers"
                    type="number"
                    placeholder="e.g., 10000"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    className="w-full text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="likes" className="text-xs sm:text-sm">Post Likes</Label>
                  <Input
                    id="likes"
                    type="number"
                    placeholder="e.g., 500"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                    className="w-full text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-xs sm:text-sm">Comments</Label>
                  <Input
                    id="comments"
                    type="number"
                    placeholder="e.g., 50"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shares" className="text-xs sm:text-sm">Shares</Label>
                  <Input
                    id="shares"
                    type="number"
                    placeholder="e.g., 25"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    className="w-full text-sm"
                  />
                </div>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm" onClick={calculateEngagement}>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Engagement Rate
              </Button>
              {engagementRate !== null && (
                <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">Your Engagement Rate</p>
                  <p className="text-3xl sm:text-4xl font-bold text-blue-500 mb-2">{engagementRate.toFixed(2)}%</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {engagementRate >= 6 ? "🎉 Outstanding! Top tier engagement!" : 
                     engagementRate >= 3 ? "🎉 Excellent engagement rate!" : 
                     engagementRate >= 1 ? "👍 Good engagement. Keep it up!" : 
                     "💡 Room for improvement. Try posting more engaging content."}
                  </p>
                </div>
              )}
            </div>
          ) : isFormatter ? (
            // Formatter interface
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Enter text and click a button to convert to special Unicode characters.
              </p>
              <div className="space-y-2">
                <Label htmlFor="text" className="text-xs sm:text-sm">Enter Your Text</Label>
                <Textarea
                  id="text"
                  placeholder="Type the text you want to format..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[80px] sm:min-h-[100px] w-full text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" onClick={() => formatText("bold")} className="text-xs sm:text-sm">
                  <span className="font-bold mr-1 sm:mr-2">B</span> Bold
                </Button>
                <Button variant="outline" onClick={() => formatText("italic")} className="text-xs sm:text-sm">
                  <span className="italic mr-1 sm:mr-2">I</span> Italic
                </Button>
                <Button variant="outline" onClick={() => formatText("strikethrough")} className="text-xs sm:text-sm">
                  <span className="line-through mr-1 sm:mr-2">S</span> Strike
                </Button>
              </div>
              {generatedContent && (
                <div className="space-y-3">
                  <Label className="text-xs sm:text-sm">Formatted Text</Label>
                  <div className="p-3 sm:p-4 bg-muted rounded-xl border">
                    <p className="text-foreground break-all text-sm">{generatedContent}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full text-sm"
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
              <p className="text-xs sm:text-sm text-muted-foreground">
                Select your industry and get AI-powered recommendations.
              </p>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-xs sm:text-sm">Your Industry</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full text-sm">
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
              <div className="space-y-2">
                <Label htmlFor="context" className="text-xs sm:text-sm">Additional Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="Describe your business or target audience..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[60px] w-full text-sm"
                />
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm" onClick={generateContent} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {toolType?.includes("calendar") ? "Generate Content Calendar" : "Analyze Best Times"}
                  </>
                )}
              </Button>
              {generatedContent && (
                <div className="space-y-3">
                  <Label className="text-xs sm:text-sm">AI Generated Analysis</Label>
                  <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
                    <p className="text-foreground whitespace-pre-wrap text-sm leading-relaxed">{generatedContent}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full text-sm"
                    onClick={() => copyToClipboard(generatedContent)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Generator interface (default) - AI Powered
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md p-2">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span><strong>AI Powered:</strong> Using DeepSeek AI for real-time content generation</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Add context for more personalized AI-generated results.
              </p>
              <div className="space-y-2">
                <Label htmlFor="context" className="text-xs sm:text-sm">Topic or Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="Describe what your post is about, your niche, or any specific keywords..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[60px] sm:min-h-[80px] w-full text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm">Tone</Label>
                  <Select value={selectedTone} onValueChange={setSelectedTone}>
                    <SelectTrigger className="w-full text-sm">
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
                  <Label className="text-xs sm:text-sm">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full text-sm">
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
                className="w-full bg-blue-500 hover:bg-blue-600 text-sm" 
                onClick={generateContent}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
              {generatedContent && (
                <div className="space-y-3">
                  <Label className="text-xs sm:text-sm">Generated Content</Label>
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed text-sm">{generatedContent}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="text-sm"
                      onClick={() => copyToClipboard(generatedContent)}
                    >
                      <Copy className="h-4 w-4 mr-1 sm:mr-2" />
                      Copy
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-sm"
                      onClick={generateContent}
                      disabled={isProcessing}
                    >
                      <RefreshCw className="h-4 w-4 mr-1 sm:mr-2" />
                      Regenerate
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
