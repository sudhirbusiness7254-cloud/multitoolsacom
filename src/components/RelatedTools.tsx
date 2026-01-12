import { Link } from "react-router-dom";
import { ArrowRight, Wrench } from "lucide-react";
import { getRelatedToolsForBlog, RelatedTool } from "@/data/internalLinkingData";
import { ToolIconWithBackground } from "@/lib/toolIcons";

interface RelatedToolsProps {
  blogId: string;
  title?: string;
}

const RelatedTools = ({ blogId, title = "Try These Tools" }: RelatedToolsProps) => {
  const tools = getRelatedToolsForBlog(blogId);
  
  if (tools.length === 0) return null;
  
  return (
    <section className="my-12 py-8 px-6 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-2xl border border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Wrench className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">Put this knowledge into practice</p>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            to={`/${tool.slug}`}
            className="group flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all"
          >
            <ToolIconWithBackground 
              toolSlug={tool.slug} 
              size={40} 
              iconSize={20}
              className="flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {tool.name}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {tool.description}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
          </Link>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          to="/all-tools"
          className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
        >
          Explore all 100+ free tools <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default RelatedTools;
