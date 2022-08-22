// Viertelgeviert Leerschlag
const thinSpace = "\u2009";
const thousandSeparator = thinSpace;
const nzzDecimalSeparator = ",";
const swissLocale = "de-CH";
function formatNumber(number, forceThousandSeparator = false, locale = swissLocale) {
    // By default we don't use a thousand separator for 4 digit before decimal numbers
    const intFormatterThreshold = forceThousandSeparator ? 4 : 5;
    const formatter = new Intl.NumberFormat(locale);
    let parts = formatter.formatToParts(number);
    let formattedNumber;
    // Change decimal separator for 'de-CH'
    if (locale === swissLocale) {
        const decimalPart = parts.find((part) => part.type === "decimal");
        if (decimalPart) {
            decimalPart.value = nzzDecimalSeparator;
        }
    }
    if (Math.floor(number).toString().length >= intFormatterThreshold) {
        formattedNumber = parts
            .map((part) => (part.type === "group" ? thousandSeparator : part.value))
            .join("");
    }
    else {
        // Remove thousand separator if existing
        parts = parts.filter((part) => part.type !== "group");
        formattedNumber = parts.map((part) => part.value).join("");
    }
    return formattedNumber;
}
// Export of thousandSeparator for unit tests
export { formatNumber, thousandSeparator, nzzDecimalSeparator };
