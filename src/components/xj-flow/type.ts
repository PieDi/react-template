import { PaintStyle, OverlaySpec } from 'jsplumb';

export interface XJNode {
  id: string;
  width: number;
  height?: number;
  left: number;
  top: number;
  label: string;
  select?: boolean;
}

export interface XJEdge {
  uuids: [string, string];
  source: string;
  target: string;
  paintStyle?: PaintStyle;
  endpointStyle?: PaintStyle;
  overlays?: Array<OverlaySpec>;
  label?: string;
}
