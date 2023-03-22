/**
 * @jest-environment jsdom
 */
import * as tService from "../src/trackAction";

describe("Service", () => {
  const componentName = "mock-qcc-element";
  let trackActionSpy: jest.SpyInstance<
    void,
    [
      origin: HTMLElement | Event,
      componentName: string,
      actionName: string,
      eventNonInteractive?: boolean
    ]
  >;
  let mockButtonElement: HTMLButtonElement;

  beforeEach(() => {
    trackActionSpy = jest.spyOn(tService, "trackAction");
  });

  it("should track a interactive action event", () => {
    const actionName = "mock-action-clicked";
    let resultEvent: Event;

    // Create mock button element
    mockButtonElement = document.createElement("button");
    mockButtonElement.innerHTML = "Trigger Mock-Action";
    mockButtonElement.onclick = (event: Event) => {
      console.log("Mock-Action triggered");
      resultEvent = event;
      tService.trackAction(event, componentName, actionName);
    };

    // Simulate click
    mockButtonElement.click();

    expect(trackActionSpy).toHaveBeenCalledWith(
      resultEvent,
      componentName,
      actionName
    );
  });

  it("should track a non-interactive action", () => {
    const actionName = "test-element-initialized";
    let testElement: HTMLElement;

    const initTestElement = () => {
      testElement = document.createElement("h1");
      testElement.innerHTML = "Lorem Ipsum";
      tService.trackAction(testElement, componentName, actionName, true);
    };

    initTestElement();

    expect(trackActionSpy).toHaveBeenCalledWith(
      testElement,
      componentName,
      actionName,
      true
    );
  });
});
