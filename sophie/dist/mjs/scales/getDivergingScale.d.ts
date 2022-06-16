import { IConfig } from "./defaultConfig";
import { CuloriColor } from "./ICuloriColors";
/**
 * Generate a diverging scale based on two colours.
 * @param color1 - The first color
 * @param color2 - The second color
 * @param numberOfColors - Should be between 2 and 14
 * @param config - Additional configuration settings that is passed into the
 *                 {@link getSequentialScale} method. Either add one config
 *                 that is being used for both branches of the scale, or pass
 *                 in a tuple of config files, where the first is used for the
 *                 left branch and the second config is used for the right branch
 *                 of the scale.
 */
export declare function getDivergingScale(color1: string | CuloriColor, color2: string | CuloriColor, numberOfColors: number, config?: IConfig | [IConfig, IConfig]): string[];
