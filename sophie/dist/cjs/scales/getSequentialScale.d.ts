import { IConfig } from "./defaultConfig";
import { CuloriColor } from "./ICuloriColors";
/**
 * Create a sequential scale given …
 * @param seedColor - a colour to create the scale from.
 * @param numberOfColors - how many steps the scale should contain
 * @param additionalConfig - additional configuration settings, as described here: {@link defaultConfig}
 *
 * @returns An array of sRGB hex codes
 */
export declare function getSequentialScale(seedColor: string | CuloriColor, numberOfColors: number, additionalConfig?: IConfig): string[];
