import { defaultConfig, IConfig } from "./defaultConfig";
import { getSequentialScale } from "./getSequentialScale";
import { okhsl, formatHex } from "culori";
import { CuloriColor, IHslColor } from "./ICuloriColors";

/* "baseUrl": ".",
"paths": {
  "culori": ["./../node_modules/culori/bundled/culori.js"]
} */

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
export function getDivergingScale(
  color1: string | CuloriColor,
  color2: string | CuloriColor,
  numberOfColors: number,
  config: IConfig | [IConfig, IConfig] = {}
): string[] {
  // Check for obvious disasters
  if (numberOfColors < 2)
    throw new RangeError(
      "Diverging scales must consist of at least two colours."
    );
  if (numberOfColors > 14)
    throw new RangeError(
      "For more than 14 colour stops use a gradient instead."
    );

  const divergingScalesConfig: IConfig = {
    // Take the default config that applies to all scales
    ...defaultConfig,
    /**
     * Use a completely neutral grey, so we don't have any hue shifts
     */
    lightTargetColor:
      numberOfColors % 2 === 0 ? null : { mode: "okhsl", l: 0.8, s: 0 },

    /**
     * In case we don't use a light target colour, don't desaturate the
     * light colour as much as with the sequential scales to have two clearly
     * separated branches
     */
    desaturationFactor: 0.75,
    maximalSaturation: 0.55,
    forceMaximumLightnessSpread: numberOfColors > 6,

    // In case we have a config that applies to both branches, apply it here
    // so it will overwrite the previously set defaults
    ...(Array.isArray(config) ? {} : config),
  };

  const additionalColor = numberOfColors % 2;

  const okhslColors: IHslColor[] = [color1, color2].map(okhsl);

  switch (numberOfColors) {
    // Deal with the really simple cases first
    case 2:
      // Return both colours. Easy-peasy.
      return okhslColors.map(formatHex);

    case 3:
      // Return both colours and the neutral color in between
      return [
        okhslColors[0],
        okhsl(divergingScalesConfig.lightTargetColor),
        okhslColors[1],
      ].map(formatHex);

    case 4:
      let leftBranchForFour = getSequentialScale(okhslColors[0], 3, {
        ...divergingScalesConfig,
        ...(Array.isArray(config) ? config[0] : config),
      });
      let rightBranchForFour = getSequentialScale(okhslColors[1], 3, {
        ...divergingScalesConfig,
        ...(Array.isArray(config) ? config[1] : config),
      });
      return [
        ...leftBranchForFour.slice(0, 2),
        ...rightBranchForFour.slice(0, 2).reverse(),
      ];

    // Then handle all other cases
    default:
      const numberOfColorsPerBranch = Math.floor(numberOfColors / 2);

      let leftBranch = getSequentialScale(
        okhslColors[0],
        numberOfColorsPerBranch + additionalColor,
        {
          ...divergingScalesConfig,
          ...(Array.isArray(config) ? config[0] : config),
        }
      );
      let rightBranch = getSequentialScale(
        okhslColors[1],
        numberOfColorsPerBranch + additionalColor,
        {
          ...divergingScalesConfig,
          ...(Array.isArray(config) ? config[1] : config),
        }
      );

      if (numberOfColors % 2 === 0) {
        return [...leftBranch, ...rightBranch.reverse()];
      }

      return [...leftBranch, ...rightBranch.reverse().slice(1)];
  }
}

export default getDivergingScale;
