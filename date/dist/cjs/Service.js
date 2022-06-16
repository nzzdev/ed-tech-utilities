"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayjs = exports.createFromToLabel = void 0;
// Dayjs init
const Enums_1 = require("./Enums");
const dayjs_1 = __importDefault(require("dayjs"));
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
const isToday_1 = __importDefault(require("dayjs/plugin/isToday"));
require("dayjs/locale/de");
const dayjsWrapper = dayjs_1.default;
exports.dayjs = dayjsWrapper;
dayjs_1.default.extend(isBetween_1.default);
dayjs_1.default.extend(isToday_1.default);
dayjs_1.default.locale("de");
// Viertelgeviert Leerschlag
const thinSpace = "\u2009";
// NZZ konformer Trennstrich
const shortDash = "\u2013";
/**
 * @description Creates a time period label
 */
function createFromToLabel(fromDate, toDate, fromFormat = Enums_1.NzzDateFormats.CompactDate, toFormat = Enums_1.NzzDateFormats.CompactDate, divider = shortDash, spacer = thinSpace, withoutHtml = false) {
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
exports.createFromToLabel = createFromToLabel;
