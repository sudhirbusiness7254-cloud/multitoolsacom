export interface ImageState {
  src: string;
  rotation: number;
  flipH: boolean;
  flipV: boolean;
  brightness: number;
  contrast: number;
  saturation: number;
  crop: CropArea | null;
  zoom: number;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface HistoryEntry {
  state: ImageState;
  timestamp: number;
}

export type AspectRatio = "free" | "1:1" | "4:3" | "16:9" | "3:2" | "original";

export type EditMode = "none" | "crop" | "rotate" | "flip" | "adjust";

export interface ExportOptions {
  format: "jpeg" | "png" | "webp";
  quality: number;
  preserveMetadata: boolean;
}
