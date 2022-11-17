export const isRgbaString = (rgba: String): boolean => {
  if (!rgba || typeof rgba !== "string" || !rgba.length) return false;

  // source: https://rgxdb.com/r/GFYPX74
  const regex: RegExp =
    /rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/;

  return regex.test(rgba.toLowerCase().replace(/ +/g, ""));
};
