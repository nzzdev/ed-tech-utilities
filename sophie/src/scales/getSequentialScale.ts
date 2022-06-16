import { defaultConfig, IConfig } from "./defaultConfig";
import { scaleLinear } from "d3-scale";
// @ts-ignore
import { okhsl, samples, interpolate, formatHex } from "culori";
import { CuloriColor } from "./ICuloriColors";

/**
 * Create a sequential scale given …
 * @param seedColor - a colour to create the scale from.
 * @param numberOfColors - how many steps the scale should contain
 * @param additionalConfig - additional configuration settings, as described here: {@link defaultConfig}
 *
 * @returns An array of sRGB hex codes
 */
function getSequentialScale(
  seedColor: string | CuloriColor,
  numberOfColors: number,
  additionalConfig: IConfig = {}
): string[] {
  // Merge the configuration with the defaults
  const config = {
    ...defaultConfig,
    ...additionalConfig,
  };

  // Create Seed Colour
  const seedColorHsl = okhsl(seedColor);

  const maximalLightness =
    seedColorHsl.l > config.maximalLightness
      ? seedColorHsl.l
      : config.maximalLightness;
  const minimalLightness =
    seedColorHsl.l < config.minimalLightness
      ? seedColorHsl.l
      : config.minimalLightness;

  /** What's the minimal difference for the maximum amount of colors that we can reach? */
  const minimalDifference =
    (maximalLightness - minimalLightness) / config.maximumNumberOfColors;

  /**  The lightness difference of the neutral and the seed color */
  const lightnessDifference = maximalLightness - seedColorHsl.l;

  /**
   * Extend the scale towards the dark color when the difference between the colours is
   * smaller than the potential minimal difference when using the whole colour range
   */
  const extendScale = lightnessDifference / numberOfColors < minimalDifference;

  // Create a lightness scale, so we can put the seed colour at the correct place on the scale
  const lightnessScale = scaleLinear().domain([
    maximalLightness,
    minimalLightness,
  ]);
  const saturationScale = scaleLinear()
    .domain([maximalLightness, minimalLightness])
    .range([1, config.desaturationFactor]);

  // Create a scale that allows us to calculate how far the light and dark colours have to
  // be shifted in order to reach the full range of the hue shift, while still
  // keeping the seed colour at the same place
  const hueShiftScale = scaleLinear().range([0, config.hueShiftDistance]);

  // Set the saturation of the brightest colour
  // It should use the saturation scale, but not exceed the configured maximal saturation
  let brightColorSaturation = seedColorHsl.s * saturationScale(seedColorHsl.l);

  if (brightColorSaturation > config.maximalSaturation) {
    brightColorSaturation = config.maximalSaturation;
  }

  // Create the bright color
  let brightColorHsl = config.lightTargetColor
    ? // In case the config gives a light target color, set this color
      okhsl(config.lightTargetColor)
    : // Otherwise create one from the seed color by upping the lightness and decreasing the saturation
      {
        ...seedColorHsl,
        l: maximalLightness,

        // Depending on how light the seed colour is, desaturate the light colour more or less
        s: brightColorSaturation,

        // Shift the hue
        h: seedColorHsl.h - hueShiftScale(lightnessScale(seedColorHsl.l)),
      };

  // Create the dark color
  let darkColorHsl = config.darkTargetColor
    ? // Use configured color
      okhsl(config.darkTargetColor)
    : // Or create one from the seed color
      {
        ...seedColorHsl,
        l: minimalLightness,
        h:
          seedColorHsl.h +
          (config.hueShiftDistance -
            hueShiftScale(lightnessScale(seedColorHsl.l))),
      };

  let colorPalette = [brightColorHsl, seedColorHsl];

  // In case where we can get a bigger distance between each category color using a
  if (extendScale || config.forceMaximumLightnessSpread) {
    // Extend the scale with the dark color
    colorPalette = [
      brightColorHsl,
      [seedColorHsl, lightnessScale(seedColorHsl.l)],
      darkColorHsl,
    ];
  }

  let interpolator = interpolate(colorPalette, config.colorSpace);

  return samples(
    extendScale && !config.forceMaximumLightnessSpread
      ? config.maximumNumberOfColors
      : numberOfColors
  )
    .map(interpolator)
    .slice(0, numberOfColors)
    .reverse()
    .map(formatHex);
}

export { getSequentialScale };
