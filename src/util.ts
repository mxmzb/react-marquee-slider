export const randomFloatFromInterval = (min: number, max: number) =>
  (Math.random() * (max - min) + min).toFixed(4);

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// https://stackoverflow.com/a/12067046/744230
export const doesOverlap = (rect1: ClientRect, rect2: ClientRect) =>
  !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );

export const outOfContainerBounds = (childRect: ClientRect, containerRect: ClientRect) =>
  childRect.bottom > containerRect.bottom || childRect.right > containerRect.right;
