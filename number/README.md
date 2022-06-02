# @nzz/et-utils-number

## Content

### formatNumber(number, forceThousandSeparator?, locale?)

Formats input number to NZZ Standardized Number Format.
By default numbers with only 4 digits before decimals won't be formatted with a thousand separator

```js
import { formatNumber } from "@nzz/et-utils-number";

formatNumber(1000.99); // result: 1000.99

formatNumber(1000.99, true); // result: 1 000.99

formatNumber(99888.77); // result: 99 888.77

formatNumber(1000.99, true, "de-DE"); // result: 1 000,99
```
