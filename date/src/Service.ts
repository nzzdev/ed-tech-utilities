// Dayjs init
import { NzzDateFormats as Formats } from "./Enums";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import "dayjs/locale/de";

const dayjsWrapper = dayjs;

dayjs.extend(isBetween);
dayjs.extend(isToday);
dayjs.locale("de");

// Viertelgeviert Leerschlag
const thinSpace = "\u2009";
// NZZ konformer Trennstrich
const shortDash = "\u2013";

/**
 * @description Creates a time period label
 */
function createFromToLabel(
  fromDate: dayjs.Dayjs,
  toDate: dayjs.Dayjs,
  fromFormat = Formats.CompactDate,
  toFormat = Formats.CompactDate,
  divider = shortDash,
  spacer = thinSpace,
  withoutHtml = false
) {
  const from = fromDate.format(fromFormat);
  const to = toDate.format(toFormat);
  let label = "";

  if (withoutHtml) {
    label = `${from + spacer + divider + spacer + to}`;
  } else {
    label += `<span>${from + spacer + divider}</span>`;
    label += `<span>${spacer + to}</span>`;
  }

  return label;
}

export { createFromToLabel, dayjsWrapper as dayjs };
