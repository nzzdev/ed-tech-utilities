# @nzz/et-utils-tracking

Library containing tracking related services and functions

## Content

### trackAction(origin: HTMLElement | Event, actionName: string, eventNonInteractive?): void

Tracks action (element/event) and sends data to tracking environment for later usage.

Usage with interactive event

```ts
import { trackAction } from "@nzz/et-utils-tracking";

const button = document.createElement("button");
button.onclick = (event: Event) => {
  // ...
  trackAction(event, "2212-Solardaecher", "button-clicked");
};
```

Usage with non-interactive element

```ts
import { trackAction } from "@nzz/et-utils-tracking";

function initHeadingElement() {
  testElement = document.createElement("h1");
  testElement.innerHTML = "Lorem Ipsum";

  trackAction(testElement, "2217-Dnipro", "heading-element-initialized", true);
}

initHeadingElement();
```

## Modules & Node support

The package follows a hybrid module structure, supporting ES6 & CommonJS Module imports.
Node support can be implemented by changing the internal, relative import statements to include the file type suffix `.js` (not `.ts`!). This however breaks the CommonJS Module imports (`require()`), which should not be an issue if Node 12+ is used in the project.
