import React, { useState } from "react";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import nanoid from "nanoid";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: ${props => (props.height ? props.height + "px" : "auto")};
`;

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

const icons = [
  "letsencrypt",
  "sanity",
  "next",
  "contentful",
  "python",
  "twilio",
  "jekyll",
  "nuxt",
  "js",
  "hugo",
];

const Playground = ({ onFinish }) => {
  const [resetAfterTries, setResetAfterTries] = useState(200);
  const [velocity, setVelocity] = useState(15);
  const [motionVelocity, setMotionVelocity] = useState(15);
  const [scatterRandomly, setScatterRandomly] = useState(true);
  const [minScale, setMinScale] = useState(0.7);
  const [maxScale, setMaxScale] = useState(1);
  const [key, setKey] = useState(nanoid());

  const iconsMeta = React.useMemo(() => {
    const metaArr = [];
    for (let i = 0; i < icons.length; i++) {
      metaArr.push({
        initDeg: randomIntFromInterval(0, 360),
        direction: Math.random() > 0.5 ? "clockwise" : "counterclockwise",
      });
    }
    return metaArr;
  }, []);

  const PerfMarquee = React.memo(
    ({ velocity, scatterRandomly, minScale, maxScale, resetAfterTries, onFinish }) => (
      <Marquee
        velocity={velocity}
        scatterRandomly={scatterRandomly}
        minScale={minScale}
        maxScale={maxScale}
        resetAfterTries={resetAfterTries}
        onFinish={onFinish}
        debug
      >
        {icons.map((icon, index) => (
          <Motion {...iconsMeta[index]} velocity={motionVelocity} radius={100} key={`icon-${icon}`}>
            <Company>
              <Circle src={`${baseUrl}${icon}-icon.svg`} alt="" />
            </Company>
          </Motion>
        ))}
      </Marquee>
    ),
    (prevProps, nextProps) => {
      console.log("prevProps", prevProps);
      console.log("nextProps", nextProps);
      return false;
    },
  );

  return (
    <Wrapper>
      <Content>
        <span>
          Reset after retries:
          <b>
            <code>{resetAfterTries}</code>
          </b>
        </span>
        <Slider
          min={1}
          max={10000}
          value={resetAfterTries}
          step={50}
          getAriaValueText={v => v}
          valueLabelDisplay="auto"
          onChange={(_, val) => {
            setResetAfterTries(val);
          }}
        />

        <span>
          Velocity:
          <b>
            <code>{velocity}</code>
          </b>
        </span>
        <Slider
          min={1}
          max={1000}
          value={velocity}
          getAriaValueText={v => v}
          valueLabelDisplay="auto"
          onChange={(_, val) => {
            setVelocity(val);
          }}
        />

        <span>Reset after retries:</span>
        <Slider />

        <span>Reset after retries:</span>
        <Slider />

        <button onClick={() => setKey(nanoid())} type="button">
          Recalculate
        </button>
      </Content>

      <Container height={500}>
        <PerfMarquee
          velocity={velocity}
          scatterRandomly={scatterRandomly}
          minScale={minScale}
          maxScale={maxScale}
          resetAfterTries={resetAfterTries}
          onFinish={onFinish}
        />
      </Container>
    </Wrapper>
  );
};

export default Playground;
