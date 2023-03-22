// All events should prefixed with "et-" so they can be found easily in the tracking data and not mixed with older events.
export enum EventActionNavigation {
  SWIPE_RIGHT = "et-swipe-right",
  SWIPE_LEFT = "et-swipe-left",
  CLICK_NEXT = "et-click-next",
  CLICK_PREVIOUS = "et-click-previous",
}

// TODO create a new category like "navigation" if your new actions do not fit into the existing categories
