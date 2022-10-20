export const isRgbaString = (rgba: String): boolean => {
  if (!rgba || typeof rgba !== "string" || !rgba.length) return false;

  // source: https://gist.github.com/sethlopezme/d072b945969a3cc2cc11
  const regex: RegExp =
    /^rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|0?\.\d|1(\.0)?)\)$/;

  return regex.test(rgba);
};
