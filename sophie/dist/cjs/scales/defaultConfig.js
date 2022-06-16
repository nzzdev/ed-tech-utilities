"use strict";
/**
 * Some default configs for the scale generation functions.
 *
 * The original can be found in this Observable:
 * https://observablehq.com/d/94ec90259bc4534b
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
exports.defaultConfig = {
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
