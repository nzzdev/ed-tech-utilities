import { relocateLivingDocsElements } from "../src";
import { stringSourceElement } from "./source-element";

const elementIdPrefix = "id";
const targetElement = document.createElement("div");
const divContainer = document.createElement("div");

describe("Service", () => {
  it("The source element should relocate to the target element", () => {
    const elementIds = ["doc-1gc8qk5qe0", "doc-1gc8qu9bb1"];
    // set fake setInterval time
    jest.useFakeTimers();
    divContainer.innerHTML = stringSourceElement;
    document.body.append(divContainer);

    relocateLivingDocsElements(elementIdPrefix, elementIds, targetElement);
    // set time for fake setInterval
    jest.advanceTimersByTime(3000);

    expect(targetElement.querySelector("#id-doc-1gc8qk5qe0")).toBeTruthy();
    expect(targetElement.querySelector("#id-doc-1gc8qu9bb1")).toBeTruthy();
  });

  it("The source element was not found", () => {
    // set fake setInterval time
    const elementIds = ["doc-1gc8qk5qe00", "doc-1gc8qu9bb1"];
    const logSpy = jest.spyOn(console, 'warn');
    jest.useFakeTimers();

    divContainer.innerHTML = stringSourceElement;
    document.body.append(divContainer)

    relocateLivingDocsElements(elementIdPrefix, elementIds, targetElement);
    // set time for fake setInterval
    jest.advanceTimersByTime(3000);

    expect(targetElement.querySelector("#id-doc-1gc8qk5qe00")).toBeNull();
    expect(logSpy).toHaveBeenCalledWith('Element with Id: doc-1gc8qk5qe00 not found yet.');
  });
});
