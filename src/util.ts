export const randomFloatFromInterval = (min: number, max: number) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(4));

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// https://stackoverflow.com/a/12067046/744230
export const doesOverlap = (rect1: ClientRect, rect2: ClientRect, containerRect: ClientRect) => {
  if (rect1.right > containerRect.right) {
    return (
      !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      ) || rect1.right - containerRect.right > rect2.left
    );
  }

  if (rect2.right > containerRect.right) {
    return (
      !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      ) || rect2.right - containerRect.right > rect1.left
    );
  }

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

export const outOfContainerBounds = (childRect: ClientRect, containerRect: ClientRect) =>
  childRect.bottom > containerRect.bottom;
// appending `|| childRect.right > containerRect.right` would disallow overflowing
// child elements from overflowing the right container edge. but that excludes a stripe
// on the right container edge of the min element width from being filled, which may look
// unnatural. so that's why we allow right overflow
