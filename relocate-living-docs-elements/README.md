# @nzz/et-utils-relocate-living-docs-elements

Extracts the livingdocs elements and places the elements append at the specified HTML target.

## Install

```
npm install -D @nzz/et-utils-relocate-living-docs-elements
```

## Content

### relocateLivingDocsElements(elementIdPrefix: string, elementIds: string[], targetElement: HTMLElement): void

```ts
import { relocateLivingDocsElements } from "@nzz/et-utils-relocate-living-docs-elements";

  relocateLivingDocsElements(elementIdPrefix, elementIds, targetElement));
};
```

## Modules & Node support

The package follows a hybrid module structure, supporting ES6 & CommonJS Module imports.
Node support can be implemented by changing the internal, relative import statements to include the file type suffix `.js` (not `.ts`!). This however breaks the CommonJS Module imports (`require()`), which should not be an issue if Node 12+ is used in the project.
