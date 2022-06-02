import { createFromToLabel, dayjs } from "../src";

describe("Service", () => {
  it("should create a dayjs date", () => {
    const result = dayjs();

    expect(result).toBeInstanceOf(Object);
  });

  it("should create a from-to date label", () => {
    const dateFrom = dayjs("2022-01-20");
    const dateTo = dayjs("2022-01-30");
    const result = createFromToLabel(dateFrom, dateTo);
    const expectedResult = "<span>20. Jan. –</span><span> 30. Jan.</span>";

    expect(result).toEqual(expectedResult);
  });
});
