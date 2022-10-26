"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRgbaString = void 0;
const isRgbaString = (rgba) => {
    if (!rgba || typeof rgba !== "string" || !rgba.length)
        return false;
    // source: https://rgxdb.com/r/GFYPX74
    const regex = /rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/;
    return regex.test(rgba);
};
exports.isRgbaString = isRgbaString;
