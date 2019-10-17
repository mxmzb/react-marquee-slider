import React, { useState, useRef, ReactNode, useEffect, FC } from "react";
import styled, { keyframes } from "styled-components";
import Child from "./Child";

import { Position } from "./Types";

import {
  doesOverlap,
  outOfContainerBounds,
  randomIntFromInterval,
  randomFloatFromInterval,
} from "./util";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* box-sizing: border-box; */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const marqueeAnimRtl = keyframes`
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-100%, 0);
  }
`;

const marqueeAnimLtr = keyframes`
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(100%, 0);
  }
`;

const Mirror = styled.div<{ direction: "ltr" | "rtl" }>`
  min-width: 100%;
  flex-shrink: 0;
  animation: ${props => (props.direction === "rtl" ? marqueeAnimRtl : marqueeAnimLtr)} linear
    infinite;
`;

type MarqueeProps = {
  children: ReactNode[];
  direction: "ltr" | "rtl";
  minScale: number;
  maxScale: number;
  velocity: number; // move x pixels per second
  scatterRandomly: boolean;
  debug: boolean;
  resetAfterTries: number;
  onFinish: () => void;
};

const NESTED_UPDATE_LIMIT = 50;

const Marquee: FC<MarqueeProps> = ({
  children,
  direction,
  velocity,
  scatterRandomly,
  minScale,
  maxScale,
  resetAfterTries,
  onFinish,
  debug,
}: MarqueeProps) => {
  const [
    retryAfterExceedingUpdateDepthTrigger,
    setRetryAfterExceedingUpdateDepthTrigger,
  ] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [nestedUpdateCount, setNestedUpdateCount] = useState(0);
  const [totalTries, setTotalTries] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [childrenPosition, setChildrenPosition] = useState<Position[]>([]);
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  const [t0] = useState(performance.now());

  useEffect(() => {
    if (scatterRandomly) {
      setContainerSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
    setAnimationDuration(containerRef.current.clientWidth / velocity);
  }, [scatterRandomly, velocity]);

  useEffect(() => {
    if (scatterRandomly && nestedUpdateCount < NESTED_UPDATE_LIMIT) {
      const siblings = marqueeRef.current.childNodes;
      if (siblings.length > 0) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const childRect = siblings[siblings.length - 1].getBoundingClientRect();

        if (outOfContainerBounds(childRect, containerRect)) {
          setChildrenPosition(state => state.slice(0, -1));
          setNestedUpdateCount(nestedUpdateCount + 1);
          setTotalTries(totalTries + 1);
        } else {
          let hasOverlaps = false;

          for (let i = 0; i + 1 < siblings.length; i++) {
            const rect1 = siblings[i].getBoundingClientRect();
            const rect2 = siblings[siblings.length - 1].getBoundingClientRect();

            if (doesOverlap(rect1, rect2, containerRect)) {
              hasOverlaps = true;
              setChildrenPosition(state => state.slice(0, -1));
              setNestedUpdateCount(nestedUpdateCount + 1);
              setTotalTries(totalTries + 1);
            }
          }

          if (
            !hasOverlaps &&
            siblings.length === childrenPosition.length &&
            childrenPosition.length == children.length
          ) {
            if (debug) {
              const t1 = performance.now();
              console.log("FINISH");
              console.log(`Marquee took ${(t1 - t0) / totalTries} milliseconds per try.`);
              console.log(`Marquee took ${t1 - t0} milliseconds and ${totalTries} tries total.`);
            }

            onFinish();
          }
        }
      }

      if (
        containerSize.width > 0 &&
        containerSize.height > 0 &&
        childrenPosition.length < children.length
      ) {
        setChildrenPosition(state => [
          ...state,
          {
            x: randomIntFromInterval(0, containerSize.width),
            y: randomIntFromInterval(0, containerSize.height),
            scale: randomFloatFromInterval(minScale, maxScale),
          },
        ]);
        setNestedUpdateCount(nestedUpdateCount + 1);
        setTotalTries(totalTries + 1);
      }

      // reset
      if (totalTries > 0 && totalTries % resetAfterTries === 0) {
        setChildrenPosition([]);
      }
    }
  }, [
    nestedUpdateCount,
    childrenPosition,
    childrenPosition.length,
    children.length,
    containerSize,
    scatterRandomly,
    minScale,
    maxScale,
  ]);

  useEffect(() => {
    // console.log("nestedUpdateCount", nestedUpdateCount);
    if (nestedUpdateCount >= NESTED_UPDATE_LIMIT) {
      const resetRenderTimer = setTimeout(() => {
        setNestedUpdateCount(0);
        setRetryAfterExceedingUpdateDepthTrigger(retryAfterExceedingUpdateDepthTrigger + 1);
      });

      return () => clearTimeout(resetRenderTimer);
    }
  }, [nestedUpdateCount, retryAfterExceedingUpdateDepthTrigger]);

  const renderChild = (child: ReactNode, index: number, isOriginal: boolean) => {
    let pos: Position;
    if (childrenPosition[index] !== undefined) {
      pos = childrenPosition[index];
    }

    return (
      <Child
        key={`${isOriginal ? "child-original" : "child-clone"}-${index}`}
        {...pos}
        scatterRandomly={scatterRandomly}
      >
        {child}
      </Child>
    );
  };

  const filteredChildren = children.filter((child, index) =>
    scatterRandomly ? childrenPosition[index] !== undefined : true,
  );

  return (
    <Container ref={containerRef}>
      <Mirror
        ref={marqueeRef}
        style={{ animationDuration: `${animationDuration}s` }}
        direction={direction}
      >
        {filteredChildren.map((c, i) => renderChild(c, i, true))}
      </Mirror>
      <Mirror style={{ animationDuration: `${animationDuration}s` }} direction={direction}>
        {filteredChildren.map((c, i) => renderChild(c, i, false))}
      </Mirror>
    </Container>
  );
};

Marquee.defaultProps = {
  direction: "rtl",
  velocity: 30,
  minScale: 1,
  maxScale: 1,
  scatterRandomly: false,
  debug: false,

  // the more elements, the higher you should put this.
  // change in hundred or thousand steps even
  resetAfterTries: 100,
  onFinish: () => {},
};

export default Marquee;
