import { Button } from "@/components/ui/button";
import {
  Crop,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Sliders,
  Undo2,
  Redo2,
  RefreshCcw,
  Download,
  Copy,
} from "lucide-react";
import { EditMode } from "./types";

interface EditorToolbarProps {
  activeMode: EditMode;
  onModeChange: (mode: EditMode) => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onFlipH: () => void;
  onFlipV: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onDownload: () => void;
  onCopyToClipboard: () => void;
  canUndo: boolean;
  canRedo: boolean;
  hasImage: boolean;
}

const EditorToolbar = ({
  activeMode,
  onModeChange,
  onRotateLeft,
  onRotateRight,
  onFlipH,
  onFlipV,
  onUndo,
  onRedo,
  onReset,
  onDownload,
  onCopyToClipboard,
  canUndo,
  canRedo,
  hasImage,
}: EditorToolbarProps) => {
  const toolButtons = [
    { icon: Crop, label: "Crop", mode: "crop" as EditMode, onClick: () => onModeChange("crop") },
    { icon: RotateCcw, label: "Left 90°", mode: null, onClick: onRotateLeft, shortcut: "L" },
    { icon: RotateCw, label: "Right 90°", mode: null, onClick: onRotateRight, shortcut: "R" },
    { icon: FlipHorizontal, label: "Flip H", mode: null, onClick: onFlipH, shortcut: "F" },
    { icon: FlipVertical, label: "Flip V", mode: null, onClick: onFlipV, shortcut: "V" },
    { icon: Sliders, label: "Adjust", mode: "adjust" as EditMode, onClick: () => onModeChange("adjust") },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-card border border-border rounded-xl">
      {/* Edit Tools */}
      <div className="flex flex-wrap items-center gap-1">
        {toolButtons.map((tool) => (
          <Button
            key={tool.label}
            variant={activeMode === tool.mode ? "default" : "ghost"}
            size="sm"
            onClick={tool.onClick}
            disabled={!hasImage}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-[60px]"
            title={tool.shortcut ? `${tool.label} (${tool.shortcut})` : tool.label}
            aria-label={tool.label}
          >
            <tool.icon className="w-4 h-4" />
            <span className="text-[10px]">{tool.label}</span>
          </Button>
        ))}
      </div>

      <div className="w-px h-8 bg-border mx-2" />

      {/* History Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3"
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
        >
          <Undo2 className="w-4 h-4" />
          <span className="text-[10px]">Undo</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3"
          title="Redo (Ctrl+Y)"
          aria-label="Redo"
        >
          <Redo2 className="w-4 h-4" />
          <span className="text-[10px]">Redo</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={!hasImage}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3"
          title="Reset all changes"
          aria-label="Reset"
        >
          <RefreshCcw className="w-4 h-4" />
          <span className="text-[10px]">Reset</span>
        </Button>
      </div>

      <div className="w-px h-8 bg-border mx-2" />

      {/* Export Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopyToClipboard}
          disabled={!hasImage}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3"
          title="Copy to clipboard"
          aria-label="Copy to clipboard"
        >
          <Copy className="w-4 h-4" />
          <span className="text-[10px]">Copy</span>
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onDownload}
          disabled={!hasImage}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3 bg-primary"
          title="Download image"
          aria-label="Download"
        >
          <Download className="w-4 h-4" />
          <span className="text-[10px]">Export</span>
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
