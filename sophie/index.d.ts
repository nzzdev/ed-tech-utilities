declare type CuloriColor = IHslColor | ILchColor | ILabColor;

/**
 * Some default configs for the scale generation functions.
 *
 * The original can be found in this Observable:
 * https://observablehq.com/d/94ec90259bc4534b
 *
 */

declare type IConfig = Partial<ConfigurationObject>;

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
declare function getDivergingScale(color1: string | CuloriColor, color2: string | CuloriColor, numberOfColors: number, config?: IConfig | [IConfig, IConfig]): string[];

/**
 * Create a sequential scale given …
 * @param seedColor - a colour to create the scale from.
 * @param numberOfColors - how many steps the scale should contain
 * @param additionalConfig - additional configuration settings, as described here: {@link defaultConfig}
 *
 * @returns An array of sRGB hex codes
 */
declare function getSequentialScale(seedColor: string | CuloriColor, numberOfColors: number, additionalConfig?: IConfig): string[];

export { getDivergingScale, getSequentialScale };
