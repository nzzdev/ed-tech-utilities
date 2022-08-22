function trackAction(
  origin: HTMLElement | Event,
  actionName: string,
  eventNonInteractive = false
) {
  const trackingEvent = new CustomEvent("q-tracking-event", {
    bubbles: true,
    detail: {
      eventInfo: {
        componentName: "2212-solardaecher",
        eventAction: actionName,
        eventNonInteractive,
      },
    },
  });

  if (isEvent(origin)) {
    origin.target.dispatchEvent(trackingEvent);
  } else if (origin.dispatchEvent) {
    origin.dispatchEvent(trackingEvent);
  }
}

function isEvent(eventOrElement: HTMLElement | Event): eventOrElement is Event {
  return (eventOrElement as Event).target !== undefined;
}

export { trackAction };
