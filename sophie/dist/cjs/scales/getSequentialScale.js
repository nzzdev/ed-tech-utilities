"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequentialScale = void 0;
const defaultConfig_1 = require("./defaultConfig");
const d3_scale_1 = require("d3-scale");
// @ts-ignore
const culori_1 = require("culori");
/**
 * Create a sequential scale given …
 * @param seedColor - a colour to create the scale from.
 * @param numberOfColors - how many steps the scale should contain
 * @param additionalConfig - additional configuration settings, as described here: {@link defaultConfig}
 *
 * @returns An array of sRGB hex codes
 */
function getSequentialScale(seedColor, numberOfColors, additionalConfig = {}) {
    // Merge the configuration with the defaults
    const config = Object.assign(Object.assign({}, defaultConfig_1.defaultConfig), additionalConfig);
    // Create Seed Colour
    const seedColorHsl = (0, culori_1.okhsl)(seedColor);
    const maximalLightness = seedColorHsl.l > config.maximalLightness
        ? seedColorHsl.l
        : config.maximalLightness;
    const minimalLightness = seedColorHsl.l < config.minimalLightness
        ? seedColorHsl.l
        : config.minimalLightness;
    /** What's the minimal difference for the maximum amount of colors that we can reach? */
    const minimalDifference = (maximalLightness - minimalLightness) / config.maximumNumberOfColors;
    /**  The lightness difference of the neutral and the seed color */
    const lightnessDifference = maximalLightness - seedColorHsl.l;
    /**
     * Extend the scale towards the dark color when the difference between the colours is
     * smaller than the potential minimal difference when using the whole colour range
     */
    const extendScale = lightnessDifference / numberOfColors < minimalDifference;
    // Create a lightness scale, so we can put the seed colour at the correct place on the scale
    const lightnessScale = (0, d3_scale_1.scaleLinear)().domain([
        maximalLightness,
        minimalLightness,
    ]);
    const saturationScale = (0, d3_scale_1.scaleLinear)()
        .domain([maximalLightness, minimalLightness])
        .range([1, config.desaturationFactor]);
    // Create a scale that allows us to calculate how far the light and dark colours have to
    // be shifted in order to reach the full range of the hue shift, while still
    // keeping the seed colour at the same place
    const hueShiftScale = (0, d3_scale_1.scaleLinear)().range([0, config.hueShiftDistance]);
    // Set the saturation of the brightest colour
    // It should use the saturation scale, but not exceed the configured maximal saturation
    let brightColorSaturation = seedColorHsl.s * saturationScale(seedColorHsl.l);
    if (brightColorSaturation > config.maximalSaturation) {
        brightColorSaturation = config.maximalSaturation;
    }
    // Create the bright color
    let brightColorHsl = config.lightTargetColor
        ? // In case the config gives a light target color, set this color
            (0, culori_1.okhsl)(config.lightTargetColor)
        : // Otherwise create one from the seed color by upping the lightness and decreasing the saturation
         Object.assign(Object.assign({}, seedColorHsl), { l: maximalLightness, 
            // Depending on how light the seed colour is, desaturate the light colour more or less
            s: brightColorSaturation, 
            // Shift the hue
            h: seedColorHsl.h - hueShiftScale(lightnessScale(seedColorHsl.l)) });
    // Create the dark color
    let darkColorHsl = config.darkTargetColor
        ? // Use configured color
            (0, culori_1.okhsl)(config.darkTargetColor)
        : // Or create one from the seed color
         Object.assign(Object.assign({}, seedColorHsl), { l: minimalLightness, h: seedColorHsl.h +
                (config.hueShiftDistance -
                    hueShiftScale(lightnessScale(seedColorHsl.l))) });
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
    let interpolator = (0, culori_1.interpolate)(colorPalette, config.colorSpace);
    return (0, culori_1.samples)(extendScale && !config.forceMaximumLightnessSpread
        ? config.maximumNumberOfColors
        : numberOfColors)
        .map(interpolator)
        .slice(0, numberOfColors)
        .reverse()
        .map(culori_1.formatHex);
}
exports.getSequentialScale = getSequentialScale;
