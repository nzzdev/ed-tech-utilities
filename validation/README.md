# @nzz/et-utils-validation

Library containing validator functions

## Content

### isRgbaString

Test if a given string matches the pattern of an RGBA value.

**Allowed formats**:

- `"rgba(1, 2, 3, .5)"`
- `"rgba(10%, 40%, 50%, .5)"`

```ts
import { isRgbaString } from "@nzz/et-utils-validation";

const rgba: String = "RGBA(255 ,255 , 0, 1.0) ";
isRgbaString(rgba); // true
```
