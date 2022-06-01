import { scaleLinear } from 'd3-scale';
import { okhsl, interpolate, samples, formatHex } from 'culori';

/**
 * Some default configs for the scale generation functions.
 *
 * The original can be found in this Observable:
 * https://observablehq.com/d/94ec90259bc4534b
 *
 */
const defaultConfig = {
    maximumNumberOfColors: 7,
    minimalLightness: 0.35,
    maximalLightness: 0.85,
    colorSpace: "okhsl",
    lightTargetColor: null,
    darkTargetColor: null,
    desaturationFactor: 0.25,
    maximalSaturation: 0.4,
    hueShiftDistance: 0,
    forceMaximumLightnessSpread: false,
};

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
    const config = Object.assign(Object.assign({}, defaultConfig), additionalConfig);
    // Create Seed Colour
    const seedColorHsl = okhsl(seedColor);
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
         Object.assign(Object.assign({}, seedColorHsl), { l: maximalLightness, 
            // Depending on how light the seed colour is, desaturate the light colour more or less
            s: brightColorSaturation, 
            // Shift the hue
            h: seedColorHsl.h - hueShiftScale(lightnessScale(seedColorHsl.l)) });
    // Create the dark color
    let darkColorHsl = config.darkTargetColor
        ? // Use configured color
            okhsl(config.darkTargetColor)
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
    let interpolator = interpolate(colorPalette, config.colorSpace);
    return samples(extendScale && !config.forceMaximumLightnessSpread
        ? config.maximumNumberOfColors
        : numberOfColors)
        .map(interpolator)
        .slice(0, numberOfColors)
        .reverse()
        .map(formatHex);
}

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
function getDivergingScale(color1, color2, numberOfColors, config = {}) {
    // Check for obvious disasters
    if (numberOfColors < 2)
        throw new RangeError("Diverging scales must consist of at least two colours.");
    if (numberOfColors > 14)
        throw new RangeError("For more than 14 colour stops use a gradient instead.");
    const divergingScalesConfig = Object.assign(Object.assign(Object.assign({}, defaultConfig), { 
        /**
         * Use a completely neutral grey, so we don't have any hue shifts
         */
        lightTargetColor: numberOfColors % 2 === 0 ? null : { mode: "okhsl", l: 0.8, s: 0 }, 
        /**
         * In case we don't use a light target colour, don't desaturate the
         * light colour as much as with the sequential scales to have two clearly
         * separated branches
         */
        desaturationFactor: 0.75, maximalSaturation: 0.55, forceMaximumLightnessSpread: numberOfColors > 6 }), (Array.isArray(config) ? {} : config));
    const additionalColor = numberOfColors % 2;
    const okhslColors = [color1, color2].map(okhsl);
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
            let leftBranchForFour = getSequentialScale(okhslColors[0], 3, Object.assign(Object.assign({}, divergingScalesConfig), (Array.isArray(config) ? config[0] : config)));
            let rightBranchForFour = getSequentialScale(okhslColors[1], 3, Object.assign(Object.assign({}, divergingScalesConfig), (Array.isArray(config) ? config[1] : config)));
            return [
                ...leftBranchForFour.slice(0, 2),
                ...rightBranchForFour.slice(0, 2).reverse(),
            ];
        // Then handle all other cases
        default:
            const numberOfColorsPerBranch = Math.floor(numberOfColors / 2);
            let leftBranch = getSequentialScale(okhslColors[0], numberOfColorsPerBranch + additionalColor, Object.assign(Object.assign({}, divergingScalesConfig), (Array.isArray(config) ? config[0] : config)));
            let rightBranch = getSequentialScale(okhslColors[1], numberOfColorsPerBranch + additionalColor, Object.assign(Object.assign({}, divergingScalesConfig), (Array.isArray(config) ? config[1] : config)));
            if (numberOfColors % 2 === 0) {
                return [...leftBranch, ...rightBranch.reverse()];
            }
            return [...leftBranch, ...rightBranch.reverse().slice(1)];
    }
}

export { getDivergingScale, getSequentialScale };
