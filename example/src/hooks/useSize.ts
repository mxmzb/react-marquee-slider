import { useState, useLayoutEffect, useRef, useCallback } from "react";

interface Size {
  width: number;
  height: number;
}

export function useSize<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T>,
  Size
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    if (ref.current) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (ref.current) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return [ref, size];
} 