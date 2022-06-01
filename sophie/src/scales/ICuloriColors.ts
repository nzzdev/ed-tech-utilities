/**
 * Base class for Culori colour objects.
 */
interface IBaseColor {
  mode: string;
  alpha?: number;
}

export interface IHslColor extends IBaseColor {
  mode: "okhsl" | "hsl";
  h?: number;
  s?: number;
  l?: number;
}

export interface ILchColor extends IBaseColor {
  mode: "oklch" | "lch" | "lch65";
  l?: number;
  c?: number;
  h?: number;
}

export interface ILabColor extends IBaseColor {
  mode: "oklab" | "lab" | "lab65";
  l?: number;
  a?: number;
  b?: number;
}

export type CuloriColor = IHslColor | ILchColor | ILabColor;
