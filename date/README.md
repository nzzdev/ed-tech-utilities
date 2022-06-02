# @nzz/et-utils-date

## Content

### dayjs wrapper

See [dayjs documentation](https://day.js.org/docs/en/installation/installation) for more information.

```js
import { dayjs } from "@nzz/et-utils-date";

dayjs(); // Result: {$L: 'de', $d: Thu Jun 02 2022 10:42:34 GMT+0200…}
```

### NZZ Standardized Date Formats for dayjs

```js
import { Formats, dayjs } from "@nzz/et-utils-date";

const date = dayjs();

date.format(Formats.ShortDate);
// Result: 2. 8.

date.format(Formats.CompactDate);
// Result: 2. Aug.

date.format(Formats.Date);
// Result: 2. August

date.format(Formats.FullShortDate);
// Result: 2. 8. 2022

date.format(Formats.FullDate);
// Result: 2. August 2022

date.format(Formats.FullDateTime);
// Result: 2. August 2022, 10.47 Uhr
```

### Helper functions for creating date labels

```js
import { createFromToLabel, dayjs, Formats } from "@nzz/et-utils-date";

const dateFrom = dajys();
const dateTo = dayjs().date(30);
const formatFrom = "D.";
const formatTo = Formats.ShortDate;
const divider = "-";
const spacer = " ";

createFromToLabel(dateFrom, dateTo);
// Result: <span>2. Juni –</span><span> 30. Juni</span>

createFromToLabel(dateFrom, dateTo, dateFormat, dateFormat, divider, spacer);
// Result: <span>2. -</span><span> 30. 6.</span>

createFromToLabel(
  dateFrom,
  dateTo,
  dateFormat,
  dateFormat,
  divider,
  spacer,
  true
);
// Result: 6. - 30. 6.
```

## Notes

- VSC auto-import has issues recognizing the non-relative import path of this package
