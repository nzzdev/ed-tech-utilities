function trackAction(
  origin: HTMLElement | Event,
  componentName: string,
  actionName: string,
  eventNonInteractive = false
) {
  const trackingEvent = new CustomEvent("q-tracking-event", {
    bubbles: true,
    detail: {
      eventInfo: {
        componentName,
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
