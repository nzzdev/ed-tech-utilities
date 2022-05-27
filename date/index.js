import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/de';

// "\u2009" = thinSpace = Viertelgeviert Leerschlag
var NzzDateFormats;
(function (NzzDateFormats) {
    NzzDateFormats["ShortDate"] = "D.\u2009M.";
    NzzDateFormats["CompactDate"] = "D.\u2009MMM";
    NzzDateFormats["Date"] = "D.\u2009MMMM";
    NzzDateFormats["FullShortDate"] = "D.\u2009M.\u2009YYYY";
    NzzDateFormats["FullDate"] = "D.\u2009MMMM\u2009YYYY";
    NzzDateFormats["FullDateTime"] = "D.\u2009MMMM\u2009YYYY, H.mm\u2009[Uhr]";
})(NzzDateFormats || (NzzDateFormats = {}));

// Dayjs init
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
function createFromToLabel(fromDate, toDate, fromFormat = NzzDateFormats.CompactDate, toFormat = NzzDateFormats.CompactDate, divider = shortDash, spacer = thinSpace, withoutHtml = false) {
    const from = fromDate.format(fromFormat);
    const to = toDate.format(toFormat);
    let label = "";
    if (withoutHtml) {
        label = `${from + spacer + divider + spacer + to}`;
    }
    else {
        label += `<span>${from + spacer + divider}</span>`;
        label += `<span>${spacer + to}</span>`;
    }
    return label;
}

export { NzzDateFormats as Formats, createFromToLabel, dayjsWrapper as dayjs };
