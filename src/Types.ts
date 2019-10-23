import { ReactNode } from "react";

export interface Position {
  x: number;
  y: number;
}

export interface Motion {
  direction: "clockwise" | "counterclockwise";
  initDeg: number; // 0..360 when https://github.com/Microsoft/TypeScript/issues/15480
}
