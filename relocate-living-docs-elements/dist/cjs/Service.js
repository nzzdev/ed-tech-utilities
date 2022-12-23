"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relocateLivingDocsElements = void 0;
function relocateLivingDocsElements(elementIdPrefix, elementIds, targetElement) {
    const updateInterval = 300;
    let intervalId;
    let intervalLimit = updateInterval * 20;
    intervalId = setInterval(() => {
        elementIds.forEach((elementId) => {
            const element = document.querySelector(`#${elementIdPrefix}-${elementId}`);
            if (element) {
                element.parentNode.removeChild(element);
                targetElement.appendChild(element);
                elementIds = elementIds.filter((id) => id !== elementId);
            }
            else {
                console.warn(`Element with Id: ${elementId} not found yet.`);
            }
        });
        if (elementIds.length < 1 || intervalLimit <= 0) {
            clearInterval(intervalId);
        }
        intervalLimit -= updateInterval;
    }, updateInterval);
}
exports.relocateLivingDocsElements = relocateLivingDocsElements;
