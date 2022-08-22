declare const thousandSeparator = "\u2009";
declare const nzzDecimalSeparator = ",";
declare function formatNumber(number: number, forceThousandSeparator?: boolean, locale?: string): string;
export { formatNumber, thousandSeparator, nzzDecimalSeparator };
