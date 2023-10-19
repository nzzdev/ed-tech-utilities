// All events should prefixed with "et-" so they can be found easily in the tracking data and not mixed with older events.
export var EventActionNavigation;
(function (EventActionNavigation) {
    EventActionNavigation["SWIPE_RIGHT"] = "et-swipe-right";
    EventActionNavigation["SWIPE_LEFT"] = "et-swipe-left";
    EventActionNavigation["CLICK_NEXT"] = "et-click-next";
    EventActionNavigation["CLICK_PREVIOUS"] = "et-click-previous";
})(EventActionNavigation || (EventActionNavigation = {}));
// TODO create a new category like "navigation" if your new actions do not fit into the existing categories
