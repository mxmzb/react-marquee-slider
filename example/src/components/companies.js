import React, { useEffect, useState } from "react";
import styled from "styled-components";
import times from "lodash/times";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";
import { withSize } from "react-sizeme";
import { nanoid } from "nanoid";

import FullWidth from "../components/FullWidth";

import logoAmazon from "../images/amazon.svg";
import logoAngular from "../images/angular.svg";
import logoApple from "../images/apple.svg";
import logoGatsby from "../images/gatsby.svg";
import logoLamborghini from "../images/lamborghini.svg";
import logoMicrosoft from "../images/microsoft.svg";
import logoNext from "../images/next.svg";
import logoPython from "../images/python.svg";
import logoRollsRoyce from "../images/rolls-royce.svg";
import logoTesla from "../images/tesla-motors.svg";
import logoTwilio from "../images/twilio.svg";

const Height = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.height ? props.height + "px" : "auto")};
`;

const Company = styled.div`
  position: relative;
  width: ${(props) => props.scale * 75}px;
  height: ${(props) => props.scale * 75}px;
`;

const Circle = styled.div`
  position: absolute;
  transform: scale(0.5);
  object-position: center center;
  will-change: transform, opacity;
  width: ${(props) => props.scale * 150}px;
  height: ${(props) => props.scale * 150}px;
  top: -50%;
  left: -50%;
  border-radius: 50%;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  display: block;
  /* https://stackoverflow.com/questions/24843676/how-can-i-fit-a-square-html-image-inside-a-circle-border */
  /* just making it < 70.7% */
  width: 60%;
  height: 60%;
`;

const icons = [
  logoAmazon,
  logoGatsby,
  logoAngular,
  logoApple,
  logoLamborghini,
  logoMicrosoft,
  logoNext,
  logoPython,
  logoRollsRoyce,
  logoTesla,
  logoTwilio,
];

const Companies = ({ size, onStartPerformance, onEndPerformance }) => {
  const [key, setKey] = useState(nanoid());

  useEffect(() => {
    setKey(nanoid());
  }, [size, size.width]);

  let scale = 0.5;

  if (size && size.width > 800) {
    scale = 0.65;
  }

  if (size && size.width > 1100) {
    scale = 0.8;
  }

  if (size && size.width > 1400) {
    scale = 1;
  }

  return (
    <FullWidth>
      <Height height={500}>
        <Marquee
          key={key}
          velocity={12}
          scatterRandomly
          minScale={0.7}
          resetAfterTries={200}
          onInit={onStartPerformance}
          onFinish={onEndPerformance}
        >
          {times(8, Number).map((id) => (
            <Motion
              key={`marquee-example-company-${id}`}
              initDeg={randomIntFromInterval(0, 360)}
              direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
              velocity={10}
              radius={scale * 100}
            >
              <Company scale={scale}>
                <Circle scale={scale}>
                  <Logo src={icons[id]} alt="" />
                </Circle>
              </Company>
            </Motion>
          ))}
        </Marquee>
      </Height>
    </FullWidth>
  );
};

export default React.memo(withSize()(Companies));
