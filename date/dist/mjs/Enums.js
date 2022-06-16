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
var DateFormats_EN_GB;
(function (DateFormats_EN_GB) {
    DateFormats_EN_GB["shortDate"] = "D/M";
    DateFormats_EN_GB["compactDate"] = "D\u2009MMM";
    DateFormats_EN_GB["date"] = "D\u2009MMMM";
    DateFormats_EN_GB["fullShortDate"] = "D/M/YYYY";
    DateFormats_EN_GB["fullDate"] = "D\u2009MMMM\u2009YYYY";
    DateFormats_EN_GB["fullDateTime"] = "D\u2009MMMM\u2009YYYY, h:mm\u2009a";
})(DateFormats_EN_GB || (DateFormats_EN_GB = {}));
export { NzzDateFormats, DateFormats_EN_GB };
