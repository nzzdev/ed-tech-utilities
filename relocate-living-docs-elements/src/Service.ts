function relocateLivingDocsElements(
  elementIdPrefix: string,
  elementIds: string[],
  targetElement: HTMLElement
) {
  const updateInterval = 300;
  let intervalId: NodeJS.Timeout | undefined;
  let intervalLimit = updateInterval * 20;

  intervalId = setInterval(() => {
    elementIds.forEach((elementId: string) => {
      const element = document.querySelector(
        `#${elementIdPrefix}-${elementId}`
      );

      if (element) {
        element.parentNode.removeChild(element);
        targetElement.appendChild(element);
        elementIds = elementIds.filter((id) => id !== elementId);
      } else {
        console.warn(`Element with Id: ${elementId} not found yet.`);
      }
    });

    if (elementIds.length < 1 || intervalLimit <= 0) {
      clearInterval(intervalId);
    }

    intervalLimit -= updateInterval;
  }, updateInterval);
}

export { relocateLivingDocsElements };
