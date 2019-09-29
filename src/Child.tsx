import React, { ReactNode } from "react";

type ChildProps = {
  children: ReactNode;
  top: number;
  left: number;
  scale: number;
  scatterRandomly: boolean;
};

const Child = ({ children, top, left, scale, scatterRandomly }: ChildProps) => (
  <div
    className={`child-container${scatterRandomly ? " absolute" : ""}`}
    style={{
      boxSizing: "border-box",
      left,
      top,
      transform: `scale(${scale})`,
    }}
  >
    {children}
  </div>
);

Child.defaultProps = {
  top: 0,
  left: 0,
  scale: 1,
  scatterRandomly: false,
};

export default Child;
