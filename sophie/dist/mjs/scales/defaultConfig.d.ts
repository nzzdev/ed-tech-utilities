/**
 * Some default configs for the scale generation functions.
 *
 * The original can be found in this Observable:
 * https://observablehq.com/d/94ec90259bc4534b
 *
 */
import { CuloriColor } from "./ICuloriColors.js";
/**
 * Make all properties in T optional
 */
declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
export interface ConfigurationObject {
    /** What colour space to use for the interpolation */
    colorSpace: string;
    /**
     * Instead of creating a dark colour from the seed colour, define the darkest colour directly.
     **/
    darkTargetColor: string | null | CuloriColor;
    /** By how much the lightest colour should be desaturated based on the seed colour's saturation.
     * Between 0 and 1; a lower value means lower saturation.
     * */
    desaturationFactor: number;
    /**
     * Whether the scale should always use the full lightness ranged defined by
     * {@link ConfigurationObject.minimalLightness} and
     * {@link ConfigurationObject.maximalLightness}.
     *
     * Otherwise, the seed colour will be used as the darkest colour as long
     * as the lightness difference between each step of the scale is not lower
     * than the difference that can be achieved by using the full range.
     */
    forceMaximumLightnessSpread: boolean;
    /** The hue shift in degrees */
    hueShiftDistance: number;
    /**
     * Instead of creating a light colour from the seed colour, define the lightest colour directly
     **/
    lightTargetColor: string | null | CuloriColor;
    /** The maximal lightness, or: how light the lightest colour can be */
    maximalLightness: number;
    /** The maximum number of colours */
    maximumNumberOfColors: number;
    /**
     * Maximum amount of saturation in okhsl colour space. Between 0 and 1.
     *
     * The brightest colour of the scale is desaturated by the {@link ConfigurationObject.desaturationFactor}, but limited by
     * this number (i.e. if the saturation exceeds this number, it is being clamped down).
     *
     * This is in order to reduce the saturation of the brightest colour when the seed colour is already quite bright and
     * saturated.
     */
    maximalSaturation: number;
    /** The minimal lightness, or: how dark the darkest colour can be */
    minimalLightness: number;
}
export declare type IConfig = Partial<ConfigurationObject>;
export declare const defaultConfig: ConfigurationObject;
export {};
