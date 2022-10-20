import { isRgbaString } from "../src";

const correctRGBAs = [
  "rgba(255,255,0,1.0)",
  "rgba(255,255,0,0.5)",
  "rgba(255,255,0,0)",
];

const incorrectRGBAs = [
  "",
  undefined,
  null,
  3,
  NaN,
  "rgb(255, 0, 0)", // rgb
  "rgb(255,115,15)", // rgb without spaces
  "rgba(255, 255 , 0,15)", // rgba with spaces
  "rgba(255,255,0,15)", // alpha > 1
  "rgba(255,255,0,1.1)", // alpha > 1
  "rgba(555,255,0,1.1)", // r > 255
  "rgb(255,0,0,)", // no alpha
  "rgb(150 0 60 / 0.5)", // alternative rgba format
];

describe("IsRgbaString", () => {
  it("should recognize correct RGBA strings", () => {
    correctRGBAs.forEach((rgba) => expect(isRgbaString(rgba)).toBe(true));
  });

  it("should recognize incorrect RGBA strings", () => {
    incorrectRGBAs.forEach((rgba) =>
      expect(isRgbaString(rgba as any)).toBe(false)
    );
  });
});
