import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { ToolIconWithBackground } from "@/lib/toolIcons";

interface InlineToolLinkProps {
  slug: string;
  name: string;
  className?: string;
}

// Inline tool link for use within article content
export const InlineToolLink = ({ slug, name, className = "" }: InlineToolLinkProps) => {
  return (
    <Link
      to={`/${slug}`}
      className={`inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors text-sm font-medium ${className}`}
    >
      {name}
      <ArrowRight className="w-3 h-3" />
    </Link>
  );
};

interface ToolCalloutProps {
  slug: string;
  name: string;
  description: string;
}

// Callout box for featuring a tool within content
export const ToolCallout = ({ slug, name, description }: ToolCalloutProps) => {
  return (
    <Link
      to={`/${slug}`}
      className="block my-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl hover:border-primary/40 transition-all group"
    >
      <div className="flex items-center gap-4">
        <ToolIconWithBackground toolSlug={slug} size={48} iconSize={24} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs text-primary font-medium">Try This Tool</span>
          </div>
          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
};

interface QuickToolsGridProps {
  tools: { slug: string; name: string }[];
  title?: string;
}

// Grid of quick tool links for sidebars or inline sections
export const QuickToolsGrid = ({ tools, title = "Quick Tools" }: QuickToolsGridProps) => {
  return (
    <div className="my-6 p-4 bg-secondary/50 rounded-xl border border-border">
      <h4 className="font-semibold text-sm text-foreground mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            to={`/${tool.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card text-sm rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-all"
          >
            <ToolIconWithBackground toolSlug={tool.slug} size={20} iconSize={12} />
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default { InlineToolLink, ToolCallout, QuickToolsGrid };
