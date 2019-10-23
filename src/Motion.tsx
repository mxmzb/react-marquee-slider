import React, { useRef, useState, useEffect, ReactNode, FC } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div<{ buffer: number; backgroundColor: string }>`
  display: flex;
  width: ${props => props.buffer}px;
  height: ${props => props.buffer}px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`;

const Space = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const SolarSystem = styled.div<{
  width: number;
  initDeg: number;
  direction: string;
  backgroundColor: string;
}>`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -${props => props.width / 2}px;
  margin-top: -${props => props.width / 2}px;
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  animation: ${props => orbit(props.initDeg, props.direction)} linear infinite;
  background-color: ${props => props.backgroundColor};
`;

const Earth = styled.div<{ initDeg: number; direction: string; backgroundColor: string }>`
  display: inline-block;
  animation: ${props => reconciliation(props.initDeg, props.direction)} linear infinite;
  background-color: ${props => props.backgroundColor};
`;

const orbit = (initDeg: number, direction: string) => keyframes`
  0% {
    transform: rotate(${initDeg}deg);
  }

  100% {
    transform: rotate(${direction === "clockwise" ? initDeg + 360 : initDeg - 360}deg);
  }
`;

const reconciliation = (initDeg: number, direction: string) => keyframes`
  0% {
    transform: rotate(${direction === "clockwise" ? 360 - initDeg : 0 - initDeg}deg);
  }

  100% {
    transform: rotate(${direction === "clockwise" ? 0 - initDeg : 360 - initDeg}deg);
  }
`;

type Props = {
  children: ReactNode;
  initDeg: number;
  velocity: number; // move x pixels per second
  radius: number;
  backgroundColors: {
    earth: string;
    solarSystem: string;
    buffer: string;
  };
  direction: "clockwise" | "counterclockwise";
};

const Motion: FC<Props> = ({
  children,
  initDeg,
  direction,
  velocity,
  radius,
  backgroundColors,
}: Props) => {
  const earthRef = useRef(null);
  const [earthSize, setEarthSize] = useState({ width: 0, height: 0 });

  const halfWidth = Math.pow(Math.pow(radius, 2) / 2, 1 / 2);
  const width = halfWidth * 2;

  const circumference = 2 * Math.PI * radius;
  const animationDuration = circumference / velocity;

  useEffect(() => {
    setEarthSize({
      width: earthRef.current ? earthRef.current.clientWidth : 0,
      height: earthRef.current ? earthRef.current.clientHeight : 0,
    });
  }, []);

  return (
    <Container buffer={radius * 2} backgroundColor={backgroundColors.buffer}>
      <Space width={earthSize.width} height={earthSize.height}>
        <SolarSystem
          style={{ animationDuration: `${animationDuration}s` }}
          width={width}
          initDeg={initDeg}
          direction={direction}
          backgroundColor={backgroundColors.solarSystem}
        >
          <Earth
            ref={earthRef}
            style={{ animationDuration: `${animationDuration}s` }}
            initDeg={initDeg}
            direction={direction}
            backgroundColor={backgroundColors.earth}
          >
            {children}
          </Earth>
        </SolarSystem>
      </Space>
    </Container>
  );
};

Motion.defaultProps = {
  initDeg: 0,
  velocity: 10, // move x pixels per second
  radius: 10,
  direction: "clockwise",
  backgroundColors: {
    earth: "transparent",
    solarSystem: "transparent",
    buffer: "transparent",
  },
};

export default Motion;
