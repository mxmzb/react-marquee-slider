import React from "react";
import Code from "../Code";

export default ({
  iconsAmount,
  height,
  palette,
  direction,
  velocity,
  scatterRandomly,
  minScale,
  maxScale,
  resetAfterTries,
  motionVelocity,
  motionRadius,
  loading,
  showLoading,
}) => {
  const code = `import React, { useState } from "react";
import Marquee, { 
  Scale, 
  Motion,
  randomIntFromInterval, 
  randomFloatFromInterval 
} from "react-marquee-slider";
import styled from "styled-components";
import times from "lodash/times";

const icons = [
  "https://url.com/to/some/icon1.png",
  "https://url.com/to/some/icon2.png",
  // ... more of those paths
];

const Loading = styled.div\`
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 1s linear;
  background: #fff;
  justify-content: center;
  align-items: center;
\`;

const Reviews = () => {
  const [loading, setLoading] = useState(true);

  const iconsMeta = [];
  for (let i = 0; i < icons.length; i++) {
    iconsMeta.push({
      initDeg: randomIntFromInterval(0, 360),
      direction: Math.random() > 0.5 ? "clockwise" : "counterclockwise",
      scale: randomFloatFromInterval(${minScale}, ${maxScale}),
    });
  }
  
  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "${height ? height + "px" : "auto"}";
      background: "${palette.container}"
    }}>
      <Marquee
        direction={${direction}}
        velocity={${velocity}}
        scatterRandomly={${scatterRandomly}}
        minScale={${minScale}}
        maxScale={${maxScale}}
        resetAfterTries={${resetAfterTries}}
        onFinish={() => setLoading(false)}
      >
        {times(${iconsAmount}, Number).map(index => (
          <Scale scale={iconsMeta[index].scale} key={\`marquee-example-playground-\${index}\`}>
            <Motion
              {...iconsMeta[index]}
              velocity={${motionVelocity}}
              radius={${motionRadius}}
              backgroundColors={${JSON.stringify(palette, null, 2).replace(
                /(?:\r\n|\r|\n)/g,
                "\r\n              ",
              )}}
            >
              <Company>
                <Circle>
                  <Logo src={icons[index]} />
                </Circle>
              </Company>
            </Motion>
          </Scale>
        ))}
      </Marquee>${
        scatterRandomly && showLoading
          ? `
      <Loading style={{ opacity: ${loading ? 1 : 0}; }}>
        <LoadingIcon />
      </Loading>`
          : ``
      }
    </div>
  );
};
`;

  return <Code>{code}</Code>;
};
