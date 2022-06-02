import dayjs from 'dayjs';

declare enum NzzDateFormats {
    ShortDate = "D.\u2009M.",
    CompactDate = "D.\u2009MMM",
    Date = "D.\u2009MMMM",
    FullShortDate = "D.\u2009M.\u2009YYYY",
    FullDate = "D.\u2009MMMM\u2009YYYY",
    FullDateTime = "D.\u2009MMMM\u2009YYYY, H.mm\u2009[Uhr]"
}

declare const dayjsWrapper: typeof dayjs;
/**
 * @description Creates a time period label
 */
declare function createFromToLabel(fromDate: dayjs.Dayjs, toDate: dayjs.Dayjs, fromFormat?: NzzDateFormats | string, toFormat?: NzzDateFormats | string, divider?: string, spacer?: string, withoutHtml?: boolean): string;

export { NzzDateFormats as Formats, createFromToLabel, dayjsWrapper as dayjs };
