# @nzz/et-utils-data

Package for functions that manipulate data.

## Content

### twoDimensionToObjectArray(twoDimensionArray)
The `twoDimensionToObjectArray` function can be used to convert a two-dimensional array into an object array. The function can be used for Q's data table.

```js
import { twoDimensionToObjectArray } from "@nzz/et-utils-data";

twoDimensionToObjectArray([["property1","property2","property3"], ["value1","value2","value3"], ["value4","value5","value6"]]);
// Result: [{property1: "value1", property2: "value2", property3: "value3"},{property1: "value4", property2: "value5", property3: "value6"}]
```

