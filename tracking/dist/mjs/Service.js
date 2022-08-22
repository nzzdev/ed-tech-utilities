function trackAction(origin, actionName, eventNonInteractive = false) {
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
    }
    else if (origin.dispatchEvent) {
        origin.dispatchEvent(trackingEvent);
    }
}
function isEvent(eventOrElement) {
    return eventOrElement.target !== undefined;
}
export { trackAction };
