import React from "react";
import styled from "styled-components";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee";

const Company = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
`;

const Circle = styled.img`
  position: absolute;
  transform: scale(0.5);
  object-position: center center;
  will-change: transform, opacity;
  width: 150px;
  height: 150px;
  top: -50%;
  left: -50%;
  border-radius: 50%;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.07);
`;

const baseUrl = "https://assets.zeit.co/image/upload/q_auto/front/home/isos/";

const Companies = ({ onFinish }) => (
  <Marquee
    velocity={12}
    scatterRandomly
    minScale={0.7}
    resetAfterTries={200}
    onFinish={onFinish}
    debug
  >
    <Motion
      initDeg={randomIntFromInterval(0, 360)}
      direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
      velocity={10}
      radius={100}
    >
      <Company>
        <Circle src={`${baseUrl}letsencrypt-icon.svg`} alt="" />
      </Company>
    </Motion>

    <Motion
      initDeg={randomIntFromInterval(0, 360)}
      direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
      velocity={10}
      radius={100}
    >
      <Company>
        <Circle src={`${baseUrl}sanity-icon.svg`} alt="" />
      </Company>
    </Motion>

    <Motion
      initDeg={randomIntFromInterval(0, 360)}
      direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
      velocity={10}
      radius={100}
    >
      <Company>
        <Circle src={`${baseUrl}next-icon.svg`} alt="" />
      </Company>
    </Motion>

    <Motion
      initDeg={randomIntFromInterval(0, 360)}
      direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
      velocity={10}
      radius={100}
    >
      <Company>
        <Circle src={`${baseUrl}contentful-icon.svg`} alt="" />
      </Company>
    </Motion>

    <Motion
      initDeg={randomIntFromInterval(0, 360)}
      direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
      velocity={10}
      radius={100}
    >
      <Company>
        <Circle src={`${baseUrl}python-icon.svg`} alt="" />
      </Company>
    </Motion>

    <Motion
      initDeg={randomIntFromInterval(0, 360)}
      direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
      velocity={10}
      radius={100}
    >
      <Company>
        <Circle src={`${baseUrl}twilio-icon.svg`} alt="" />
      </Company>
    </Motion>

    <Motion
      initDeg={randomIntFromInterval(0, 360)}
      direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
      velocity={10}
      radius={100}
    >
      <Company>
        <Circle src={`${baseUrl}jekyll-icon.svg`} alt="" />
      </Company>
    </Motion>

    <Motion
      initDeg={randomIntFromInterval(0, 360)}
      direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
      velocity={10}
      radius={100}
    >
      <Company>
        <Circle src={`${baseUrl}nuxt-icon.svg`} alt="" />
      </Company>
    </Motion>

    <Motion
      initDeg={randomIntFromInterval(0, 360)}
      direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
      velocity={10}
      radius={100}
    >
      <Company>
        <Circle src={`${baseUrl}js-icon.svg`} alt="" />
      </Company>
    </Motion>

    <Motion
      initDeg={randomIntFromInterval(0, 360)}
      direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
      velocity={10}
      radius={100}
    >
      <Company>
        <Circle src={`${baseUrl}hugo-icon.svg`} alt="" />
      </Company>
    </Motion>
  </Marquee>
);

export default Companies;
