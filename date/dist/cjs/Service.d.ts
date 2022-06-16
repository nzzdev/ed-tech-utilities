import { NzzDateFormats as Formats } from "./Enums";
import dayjs from "dayjs";
import "dayjs/locale/de";
declare const dayjsWrapper: typeof dayjs;
/**
 * @description Creates a time period label
 */
declare function createFromToLabel(fromDate: dayjs.Dayjs, toDate: dayjs.Dayjs, fromFormat?: Formats | string, toFormat?: Formats | string, divider?: string, spacer?: string, withoutHtml?: boolean): string;
export { createFromToLabel, dayjsWrapper as dayjs };
