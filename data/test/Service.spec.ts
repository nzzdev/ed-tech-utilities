import { twoDimensionToObjectArray } from "../src";
import { emptyActual, emptyExpect, strictTypeForPropertyActual, strictTypeForPropertyExpect, mixedTypeForPropertyActual, mixedTypeForPropertyExpect } from "./MockData";

describe("Service", () => {
  it("should return array with object and empty values", () => {
    const result = twoDimensionToObjectArray(emptyActual);
    expect(result).toEqual(emptyExpect);
  });

  it("should return array with object and values with same type per property or empty value", () => {
    const result = twoDimensionToObjectArray(strictTypeForPropertyActual);
    expect(result).toEqual(strictTypeForPropertyExpect);
  });

  it("should return array with object and values with mixed type per property or empty value", () => {
    const result = twoDimensionToObjectArray(mixedTypeForPropertyActual);
    expect(result).toEqual(mixedTypeForPropertyExpect);
  });
});
