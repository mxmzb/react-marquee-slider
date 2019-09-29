import React, { useState, useRef, useLayoutEffect, ReactNode } from "react";
import Child from "./Child";

import {
  doesOverlap,
  outOfContainerBounds,
  randomIntFromInterval,
  randomFloatFromInterval,
} from "./util";

import "./css/slider.css";

type SliderProps = {
  children: ReactNode[];
  minScale: number;
  maxScale: number;
  duration: number;
  scatterRandomly: boolean;
};

const Slider = ({ children, duration, scatterRandomly, minScale, maxScale }: SliderProps) => {
  const [containerSize, setContainerSize] = useState([0, 0]);
  const [childrenPosition, setChildrenPosition] = useState([]);
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useLayoutEffect(() => {
    if (scatterRandomly) {
      setContainerSize([containerRef.current.clientWidth, containerRef.current.clientHeight]);
    }
  }, [scatterRandomly]);

  useLayoutEffect(() => {
    if (scatterRandomly) {
      const siblings = marqueeRef.current.childNodes;

      if (siblings.length > 0) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const childRect = siblings[siblings.length - 1].getBoundingClientRect();

        if (outOfContainerBounds(childRect, containerRect)) {
          setChildrenPosition(state => state.slice(0, -1));
        } else {
          for (let i = 0; i + 1 < siblings.length; i++) {
            const rect1 = siblings[i].getBoundingClientRect();
            const rect2 = siblings[siblings.length - 1].getBoundingClientRect();

            if (doesOverlap(rect1, rect2)) {
              setChildrenPosition(state => state.slice(0, -1));
            }
          }
        }
      }

      if (
        containerSize[0] > 0 &&
        containerSize[1] > 0 &&
        childrenPosition.length < children.length
      ) {
        const childPosCandidate = {
          x: randomIntFromInterval(0, containerSize[0]),
          y: randomIntFromInterval(0, containerSize[1]),
          scale: randomFloatFromInterval(minScale, maxScale),
        };

        setChildrenPosition(state => [...state, childPosCandidate]);
      }
    }
  }, [childrenPosition, childrenPosition.length, children.length, containerSize, scatterRandomly]);

  return (
    <div className="container" ref={containerRef}>
      <div
        className="marquee"
        ref={marqueeRef}
        style={{ animationDuration: `${duration / 1000}s` }}
      >
        {scatterRandomly &&
          childrenPosition.map((pos, index) => (
            <Child left={pos.x} top={pos.y} key={index} scatterRandomly>
              {children[index]}
            </Child>
          ))}
        {!scatterRandomly && children.map((child, index) => <Child key={index}>{child}</Child>)}
      </div>
      <div className="marquee repeater" style={{ animationDuration: `${duration / 1000}s` }}>
        {scatterRandomly &&
          childrenPosition.map((pos, index) => (
            <Child left={pos.x} top={pos.y} scatterRandomly key={`repeater-child-${index}`}>
              {children[index]}
            </Child>
          ))}
        {!scatterRandomly && children.map((child, index) => <Child key={index}>{child}</Child>)}
      </div>
    </div>
  );
};

Slider.defaultProps = {
  duration: 3000,
  minScale: 1,
  maxScale: 1,
  scatterRandomly: false,
};

export default Slider;
