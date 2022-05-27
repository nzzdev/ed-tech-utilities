import * as Lab from "@hapi/lab";
import { expect } from "@hapi/code";
import { createFromToLabel, dayjs } from "../src";

// Hapi Lab init code
const lab = Lab.script();
const { describe, it, before } = lab;
export { lab };

describe("Service", () => {
  before(() => {});

  it("should create a dayjs date", () => {
    const result = dayjs();

    expect(result).to.be.object();
  });

  it("should create a from-to date label", () => {
    const result = createFromToLabel(dayjs(), dayjs());

    expect(result).to.be.string();
  });
});
