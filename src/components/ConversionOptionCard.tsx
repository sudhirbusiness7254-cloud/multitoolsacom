import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ConversionOptionCardProps {
  fromFormat: string;
  toFormat: string;
  fromColor: string;
  toColor: string;
  route: string;
  description: string;
}

const ConversionOptionCard = ({ 
  fromFormat, 
  toFormat, 
  fromColor, 
  toColor, 
  route,
  description 
}: ConversionOptionCardProps) => {
  return (
    <Link
      to={route}
      className="group bg-teal-medium/20 hover:bg-teal-medium/40 border border-teal-medium hover:border-cyan-bright rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-bright/10 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span 
            className="px-3 py-1.5 rounded-lg text-sm font-bold"
            style={{ backgroundColor: fromColor, color: '#0a1a1f' }}
          >
            {fromFormat}
          </span>
          <ArrowRight className="w-4 h-4 text-cyan-bright group-hover:translate-x-1 transition-transform" />
          <span 
            className="px-3 py-1.5 rounded-lg text-sm font-bold"
            style={{ backgroundColor: toColor, color: '#0a1a1f' }}
          >
            {toFormat}
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {description}
      </p>
    </Link>
  );
};

export default ConversionOptionCard;
