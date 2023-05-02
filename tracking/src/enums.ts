// All events should prefixed with "et-" so they can be found easily in the tracking data and not mixed with older events.
// Create a new category like "navigation" if your new actions do not fit into the existing categories
export enum EventActionNavigation {
  SWIPE_RIGHT = "et-swipe-right",
  SWIPE_LEFT = "et-swipe-left",
  CLICK_NEXT = "et-click-next",
  CLICK_PREVIOUS = "et-click-previous",
}

export enum MediaAction {
  PLAY_AUDIO_THROUGH_HOVER = "et-play-audio-through-hover",
  PLAY_AUDIO_THROUGH_TOUCH = "et-play-audio-through-touch",
}
