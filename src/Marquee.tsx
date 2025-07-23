"use client";

import React, { useState, useRef, ReactNode, useEffect, FC } from "react";
import styled, { keyframes, css } from "styled-components";
import Child from "./Child";

import { Position } from "./Types";

import { doesOverlap, outOfContainerBounds, randomIntFromInterval } from "./util";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
`;

const marqueeAnim = keyframes`
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(100%, 0);
  }
`;

const Mirror = styled.div<{ direction: "ltr" | "rtl"; paused: boolean }>`
  min-width: 100%;
  flex-shrink: 0;
  animation-name: ${marqueeAnim};
  animation-direction: ${(props) => (props.direction === "rtl" ? "reverse" : "normal")};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: ${(props) => (props.paused ? "paused" : "running")};
`;

type MarqueeProps = {
  children: ReactNode[];
  direction: "ltr" | "rtl";
  velocity: number; // move x pixels per second
  scatterRandomly: boolean;
  resetAfterTries: number;
  onInit: () => void;
  onFinish: ({ totalTries }: { totalTries: number }) => void;
};

const NESTED_UPDATE_LIMIT = 50;

// Let's try to prevent rerenders as much as possible
const Marquee: FC<MarqueeProps> = React.memo(
  ({
    children,
    direction,
    velocity,
    scatterRandomly,
    resetAfterTries,
    onInit,
    onFinish,
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
    const isInitRender = useRef(true);

    useEffect(() => {
      if (isInitRender.current) {
        if (typeof onInit === "function") {
          onInit();
        }
        isInitRender.current = false;
      }
    }, [onInit]);

    useEffect(() => {
      if (scatterRandomly) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    }, [scatterRandomly]);

    useEffect(() => {
      // Don't change the state if
      if (!isNaN(velocity) && velocity > 0) {
        setAnimationDuration(containerRef.current.clientWidth / velocity);
      }
    }, [velocity]);

    useEffect(() => {
      if (scatterRandomly && nestedUpdateCount < NESTED_UPDATE_LIMIT) {
        const siblings = marqueeRef.current.childNodes;
        if (siblings.length > 0) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const childRect = siblings[siblings.length - 1].getBoundingClientRect();

          if (outOfContainerBounds(childRect, containerRect)) {
            setChildrenPosition((state) => state.slice(0, -1));
            setNestedUpdateCount(nestedUpdateCount + 1);
            setTotalTries(totalTries + 1);
          } else {
            let hasOverlaps = false;

            for (let i = 0; i + 1 < siblings.length; i++) {
              const rect1 = siblings[i].getBoundingClientRect();
              const rect2 = siblings[siblings.length - 1].getBoundingClientRect();

              if (doesOverlap(rect1, rect2, containerRect)) {
                hasOverlaps = true;
                setChildrenPosition((state) => state.slice(0, -1));
                setNestedUpdateCount(nestedUpdateCount + 1);
                setTotalTries(totalTries + 1);
              }
            }

            if (
              !hasOverlaps &&
              siblings.length === childrenPosition.length &&
              childrenPosition.length === children.length
            ) {
              onFinish({ totalTries });
            }
          }
        }

        if (
          containerSize.width > 0 &&
          containerSize.height > 0 &&
          childrenPosition.length < children.length
        ) {
          setChildrenPosition((state) => [
            ...state,
            {
              x: randomIntFromInterval(0, containerSize.width),
              y: randomIntFromInterval(0, containerSize.height),
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
    }, [nestedUpdateCount, childrenPosition, containerSize, scatterRandomly]);

    useEffect(() => {
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

    const animatedStyle: Object = { animationDuration: `${animationDuration}s` };

    return (
      <Container ref={containerRef}>
        <Mirror
          style={{ ...animatedStyle, ...(velocity === 0 ? { transform: "translateX(0)" } : {}) }}
          direction={direction}
          paused={velocity === 0}
        >
          {filteredChildren.map((c, i) => renderChild(c, i, false))}
        </Mirror>
        <Mirror
          ref={marqueeRef}
          style={{ ...animatedStyle, ...(velocity === 0 ? { transform: "translateX(0)" } : {}) }}
          direction={direction}
          paused={velocity === 0}
        >
          {filteredChildren.map((c, i) => renderChild(c, i, true))}
        </Mirror>
        <Mirror
          style={{ ...animatedStyle, ...(velocity === 0 ? { transform: "translateX(0)" } : {}) }}
          direction={direction}
          paused={velocity === 0}
        >
          {filteredChildren.map((c, i) => renderChild(c, i, false))}
        </Mirror>
      </Container>
    );
  },
);

Marquee.defaultProps = {
  direction: "rtl",
  velocity: 30,
  scatterRandomly: false,

  // the more elements, the higher you should put this.
  // change in hundred or thousand steps even
  resetAfterTries: 100,
  onInit: () => {},
  onFinish: () => {},
};

export default Marquee;
