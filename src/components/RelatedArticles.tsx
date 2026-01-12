import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { getRelatedArticlesForTool, getRelatedArticlesForCategory, RelatedArticle } from "@/data/internalLinkingData";

interface RelatedArticlesProps {
  toolSlug?: string;
  categorySlug?: string;
  title?: string;
  maxItems?: number;
}

const RelatedArticles = ({ 
  toolSlug, 
  categorySlug, 
  title = "Learn More",
  maxItems = 3 
}: RelatedArticlesProps) => {
  let articles: RelatedArticle[] = [];
  
  if (toolSlug) {
    articles = getRelatedArticlesForTool(toolSlug);
  } else if (categorySlug) {
    articles = getRelatedArticlesForCategory(categorySlug);
  }
  
  if (articles.length === 0) return null;
  
  const displayArticles = articles.slice(0, maxItems);
  
  return (
    <section className="my-8 py-6 px-6 bg-secondary/50 rounded-2xl border border-border">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">Helpful guides and tutorials</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {displayArticles.map((article) => (
          <Link
            key={article.id}
            to={`/blog/${article.id}`}
            className="group flex items-start gap-3 p-3 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                  {article.relevance}
                </span>
              </div>
              <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {article.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {article.excerpt}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-2" />
          </Link>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Link 
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
        >
          View all guides <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
};

export default RelatedArticles;
