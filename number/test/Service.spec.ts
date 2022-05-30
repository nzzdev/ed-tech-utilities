import * as Lab from "@hapi/lab";
import { expect } from "@hapi/code";
import { formatNumber } from "../src";
import { thousandSeparator } from "../src/Service";

// Hapi Lab init code
const lab = Lab.script();
const { describe, it, before } = lab;
export { lab };

describe("Service", () => {
  before(() => {});

  it("should format numbers according to the NZZ defaults", () => {
    // No thousand separator, 'de-CH' localized decimal separator '.'
    const input = 999.99;
    const result = formatNumber(input);
    const expectedResult = "999.99";
    expect(result).to.equal(expectedResult);

    // No thousand separator, removal of trailing decimal zeroes
    const input2 = 1000.0;
    const result2 = formatNumber(input2);
    const expectedResult2 = "1000";
    expect(result2).to.equal(expectedResult2);

    // Thousand separator
    const input3 = 99999;
    const result3 = formatNumber(input3, true);
    const expectedResult3 = `99${thousandSeparator}999`;
    expect(result3).to.equal(expectedResult3);

    // Forced thousand separator on 4 digit integer
    const input4 = 1000;
    const result4 = formatNumber(input4, true);
    const expectedResult4 = `1${thousandSeparator}000`;
    expect(result4).to.equal(expectedResult4);
  });

  it("should format a number with 'de-DE' localization", () => {
    // Forced thousand separator on 4 digits before decimal number,
    // 'de-DE' localized decimal separator ','
    const input = 1999.99;
    const result = formatNumber(input, true, "de-DE");
    const expectedResult = `1${thousandSeparator}999,99`;
    expect(result).to.equal(expectedResult);
  });
});
