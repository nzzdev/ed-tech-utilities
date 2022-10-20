import { isRgbaString } from "../src";

const correctRGBAs = [
  "rgba(255,255,0,1.0)",
  "rgba(255,255,0,0.5)",
  "rgba(255,255,0,0)",
  "rgba(255,255,0,.5)", // no leading 0
  "rgba(255, 255 , 0,15)", // with spaces
  "rgba( 1%, 2%, 3%, .5)", // with %
];

const incorrectRGBAs = [
  "",
  undefined,
  null,
  3,
  NaN,
  "rgb(255, 0, 0)", // rgb
  "rgba(A,255,0,1.1)", // r != number
  "rgba (1, 2, 3)", // space in front
  "rgb(255,0,0,)", // no alpha
  "rgb(150 0 60 / 0.5)", // alternative rgba format
  "rgba( 1%, 2, 3%, 0.5)", // partial %
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
