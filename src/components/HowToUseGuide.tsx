import { 
  Upload, MousePointerClick, Settings, Download, CheckCircle, 
  AlertTriangle, Info, Lightbulb, FileType, HardDrive, Shield,
  ArrowRight, Monitor, Image, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import step screenshots
import stepUploadImg from "@/assets/guides/step-upload.png";
import stepPreviewImg from "@/assets/guides/step-preview.png";
import stepFormatSelectImg from "@/assets/guides/step-format-select.png";
import stepConvertImg from "@/assets/guides/step-convert.png";
import stepDownloadImg from "@/assets/guides/step-download.png";
import stepCompressImg from "@/assets/guides/step-compress.png";
import stepResizeImg from "@/assets/guides/step-resize.png";
import stepPdfImg from "@/assets/guides/step-pdf.png";
import stepCropImg from "@/assets/guides/step-crop.png";
import stepWatermarkImg from "@/assets/guides/step-watermark.png";
import stepRotateImg from "@/assets/guides/step-rotate.png";

// Map step types to their images
const stepImages: Record<string, string> = {
  "upload": stepUploadImg,
  "preview": stepPreviewImg,
  "format": stepFormatSelectImg,
  "convert": stepConvertImg,
  "download": stepDownloadImg,
  "compress": stepCompressImg,
  "resize": stepResizeImg,
  "pdf": stepPdfImg,
  "crop": stepCropImg,
  "watermark": stepWatermarkImg,
  "rotate": stepRotateImg,
};

export interface GuideStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
  warning?: string;
  screenshotAlt?: string;
  screenshotType?: "upload" | "preview" | "format" | "convert" | "download" | "compress" | "resize" | "pdf" | "crop" | "watermark" | "rotate";
}

export interface ToolGuideData {
  slug: string;
  supportedFormats: string[];
  maxFileSize: string;
  processingNote: string;
  privacyBehavior: string;
  steps: GuideStep[];
  proTips: string[];
  commonMistakes?: string[];
}

interface HowToUseGuideProps {
  guideData: ToolGuideData;
  toolName: string;
  gradientFrom: string;
  gradientTo: string;
}

const getStepIcon = (stepNumber: number, totalSteps: number) => {
  if (stepNumber === 1) return Upload;
  if (stepNumber === totalSteps) return Download;
  if (stepNumber === 2) return Image;
  if (stepNumber === 3) return Settings;
  return MousePointerClick;
};

const HowToUseGuide = ({ guideData, toolName, gradientFrom, gradientTo }: HowToUseGuideProps) => {
  return (
    <div className="space-y-8">
      {/* Header with Tool Info Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
        >
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold">How to Use {toolName}</h2>
      </div>

      {/* Quick Reference Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <FileType className="w-4 h-4" style={{ color: gradientFrom }} />
            <span className="text-sm font-medium text-foreground">Supported Formats</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {guideData.supportedFormats.join(", ")}
          </p>
        </div>
        
        <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="w-4 h-4" style={{ color: gradientFrom }} />
            <span className="text-sm font-medium text-foreground">Max File Size</span>
          </div>
          <p className="text-sm text-muted-foreground">{guideData.maxFileSize}</p>
        </div>
        
        <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4" style={{ color: gradientFrom }} />
            <span className="text-sm font-medium text-foreground">Processing</span>
          </div>
          <p className="text-sm text-muted-foreground">{guideData.processingNote}</p>
        </div>
        
        <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4" style={{ color: gradientFrom }} />
            <span className="text-sm font-medium text-foreground">Privacy</span>
          </div>
          <p className="text-sm text-muted-foreground">{guideData.privacyBehavior}</p>
        </div>
      </div>

      {/* Step-by-Step Visual Guide */}
      <div className="space-y-6">
        {guideData.steps.map((step, index) => {
          const StepIcon = getStepIcon(step.step, guideData.steps.length);
          const isLastStep = index === guideData.steps.length - 1;
          
          return (
            <div key={step.step} className="relative">
              {/* Connection Line */}
              {!isLastStep && (
                <div 
                  className="absolute left-5 top-16 w-0.5 h-[calc(100%-2rem)]"
                  style={{ backgroundColor: `${gradientFrom}30` }}
                />
              )}
              
              <div className="flex gap-4">
                {/* Step Number Circle */}
                <div className="relative flex-shrink-0">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                  >
                    {step.step}
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="flex-1 pb-6">
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    {/* Step Header */}
                    <div className="p-4 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <StepIcon className="w-5 h-5" style={{ color: gradientFrom }} />
                        <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                      </div>
                    </div>
                    
                    {/* Step Description */}
                    <div className="p-4">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {step.description}
                      </p>
                      
                      {/* Screenshot Image */}
                      {step.screenshotType && stepImages[step.screenshotType] ? (
                        <div className="rounded-lg border border-border overflow-hidden mb-4">
                          <img 
                            src={stepImages[step.screenshotType]} 
                            alt={step.screenshotAlt || `Step ${step.step}: ${step.title}`}
                            className="w-full h-auto object-contain bg-muted/30"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div 
                          className="bg-muted/50 rounded-lg border-2 border-dashed border-border/70 p-8 mb-4 flex flex-col items-center justify-center min-h-[120px]"
                        >
                          <Monitor className="w-8 h-8 text-muted-foreground/50 mb-2" />
                          <span className="text-sm text-muted-foreground/70 text-center">
                            {step.screenshotAlt || `Step ${step.step}: ${step.title}`}
                          </span>
                        </div>
                      )}
                      
                      {/* Tip */}
                      {step.tip && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-primary text-sm">Tip: </span>
                            <span className="text-sm text-muted-foreground">{step.tip}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Warning */}
                      {step.warning && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 mt-3">
                          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-amber-500 text-sm">Note: </span>
                            <span className="text-sm text-muted-foreground">{step.warning}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro Tips Section */}
      {guideData.proTips.length > 0 && (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Pro Tips for Best Results</h3>
          </div>
          <ul className="space-y-3">
            {guideData.proTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: gradientFrom }} />
                <span className="text-muted-foreground text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Common Mistakes to Avoid */}
      {guideData.commonMistakes && guideData.commonMistakes.length > 0 && (
        <div className="bg-amber-500/5 rounded-xl border border-amber-500/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-foreground">Common Mistakes to Avoid</h3>
          </div>
          <ul className="space-y-3">
            {guideData.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">×</span>
                <span className="text-muted-foreground text-sm">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HowToUseGuide;
