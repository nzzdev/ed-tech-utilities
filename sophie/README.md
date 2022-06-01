# @nzz/et-utils-sophie

Library containing scripts related to or used in sophie modules

## Content

### getDivergingScale(color1, color2, numberOfColors, config)

```js
import { getDivergingScale } from "@nzz/et-utils-sophie";

getDivergingScale("#000000", "#ffffff", 4);
// Result: ['#000000', '#646464', '#e0e0e0', '#c2c2c2']
```

### getSequentialScale(seedColor, numberOfColors, additionalConfig)

```js
import { getSequentialScale } from "@nzz/et-utils-sophie";

getSequentialScale("#ffaabb", 7);
// Result: ['#990042', '#bc0053', '#e10065', '#ff2a79', '#ff7095', '#ff9cb1', '#eacbd1']
```
