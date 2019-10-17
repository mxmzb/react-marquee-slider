import React, { useState, useEffect } from "react";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee";
import styled from "styled-components";
import { Slider, FormControlLabel, RadioGroup, Radio, Switch } from "@material-ui/core";
import nanoid from "nanoid";
import { GithubPicker } from "react-color";
import { Hook, Console, Decode } from "console-feed";

import FullWidth from "../components/FullWidth";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Height = styled.div`
  position: relative;
  width: 100%;
  height: ${props => (props.height ? props.height + "px" : "auto")};
  background: ${props => props.background};
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

const ColorPickers = styled.div`
  width: 50%;
`;

const Settings = styled.div`
  width: 50%;
`;

const Separator = styled.div`
  height: ${props => props.height}px;
`;

const SLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  margin-right: 10px;
`;

const SValue = styled.span`
  font-weight: 900;
`;

const Help = styled.span`
  font-size: 0.7rem;
  color: #777;
`;

const IFrame = styled.div`
  height: 200px;
  overflow: scroll;
  background: #242424;
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

const colors = [
  "#eeeeee",
  "#fa8072",
  "#ffffff",
  "#ffefd5",
  "#87ceeb",
  "#7fffd4",
  "#ffe4e1",
  "#f0f8ff",
];

const Label = ({ label, value, help, color }) => (
  <div>
    <SLabel>{label}</SLabel>
    {value && <SValue>{value}</SValue>}
    <div />
    {help && <Help>{help}</Help>}
    <Separator height={5} />
  </div>
);

const PerfMarquee = React.memo(
  ({
    artificialKey,
    direction,
    velocity,
    scatterRandomly,
    scale,
    resetAfterTries,
    iconsMeta,
    onFinish,
    motionVelocity,
    motionRadius,
  }) => (
    <Marquee
      key={artificialKey}
      direction={direction}
      velocity={velocity}
      scatterRandomly={scatterRandomly}
      minScale={scale[0]}
      maxScale={scale[1]}
      resetAfterTries={resetAfterTries}
      onFinish={onFinish}
      debug
    >
      {icons.map((icon, index) => (
        <Motion
          {...iconsMeta[index]}
          velocity={motionVelocity}
          radius={motionRadius}
          key={`icon-${icon}`}
        >
          <Company>
            <Circle src={`${baseUrl}${icon}-icon.svg`} alt="" />
          </Company>
        </Motion>
      ))}
    </Marquee>
  ),
  // (prevProps, nextProps) => {
  //   console.log("prevProps", prevProps);
  //   console.log("nextProps", nextProps);
  //   return false;
  // },
);

const Playground = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [palette, setPalette] = useState({
    container: "#eeeeee",
    childOriginal: "#fa8072",
    childClone: "#ffefd5",
    solarSystem: "",
  });
  const [direction, setDirection] = useState("ltr");
  const [scatterRandomly, setScatterRandomly] = useState(true);
  const [height, setHeight] = useState(500);
  const [resetAfterTries, setResetAfterTries] = useState(200);
  const [velocity, setVelocity] = useState(15);
  const [motionVelocity, setMotionVelocity] = useState(15);
  const [motionRadius, setMotionRadius] = useState(100);
  const [scale, setScale] = useState([0.7, 1]);
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

  useEffect(() => {
    Hook(window.console, log => {
      if (log[0].method !== "warn") {
        setLogs(state => [...state, Decode(log)]);
      }
    });
  }, []);

  return (
    <div>
      <Row>
        <ColorPickers>
          <Label label="Container background color:" color={palette.container} />
          <GithubPicker
            color={palette.container}
            onChange={val => setPalette({ ...palette, container: val.hex })}
            colors={colors}
            triangle="hide"
          />
          <Separator height={20} />

          <Label label="Original child background color:" color={palette.container} />
          <GithubPicker
            color={palette.container}
            onChange={val => setPalette({ ...palette, container: val.hex })}
            colors={colors}
            triangle="hide"
          />
          <Separator height={20} />

          <Label label="Cloned child background color:" color={palette.container} />
          <GithubPicker
            color={palette.container}
            onChange={val => setPalette({ ...palette, container: val.hex })}
            colors={colors}
            triangle="hide"
          />
          <Separator height={20} />

          <Label label="SolarSystem background color:" color={palette.container} />
          <GithubPicker
            color={palette.container}
            onChange={val => setPalette({ ...palette, container: val.hex })}
            colors={colors}
            triangle="hide"
          />
          <Separator height={20} />

          <Label label="Earth background color:" color={palette.container} />
          <GithubPicker
            color={palette.container}
            onChange={val => setPalette({ ...palette, container: val.hex })}
            colors={colors}
            triangle="hide"
          />
        </ColorPickers>

        <Settings>
          <RadioGroup defaultValue="ltr" name="customized-radios">
            <FormControlLabel
              value="ltr"
              control={
                <Radio
                  color="primary"
                  checked={direction === "ltr"}
                  onChange={evt => setDirection(evt.target.value)}
                />
              }
              label="Left to right"
            />
            <FormControlLabel
              value="rtl"
              control={
                <Radio
                  color="primary"
                  checked={direction === "rtl"}
                  onChange={evt => setDirection(evt.target.value)}
                />
              }
              label="Right to left"
            />
          </RadioGroup>
          <FormControlLabel
            control={
              <Switch
                checked={scatterRandomly}
                onChange={() => {
                  setKey(nanoid());
                  setScatterRandomly(!scatterRandomly);
                }}
                color="primary"
              />
            }
            label="Scatter randomly"
          />

          <Separator height={25} />

          <Label
            label="Container height:"
            value={height}
            help="The higher the more space, the easier the component will find space to position the children if `scatter randomly` is activated"
          />
          <Slider
            min={50}
            max={1000}
            value={height}
            step={50}
            getAriaValueText={v => v}
            valueLabelDisplay="auto"
            onChange={(_, val) => {
              setKey(nanoid());
              setHeight(val);
            }}
          />

          <Separator height={25} />

          <Label label="Reset after retries:" value={resetAfterTries} />
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

          <Separator height={25} />

          <Label label="Velocity:" value={velocity} />
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

          <Separator height={25} />

          <Label label="Motion velocity:" value={motionVelocity} />
          <Slider
            min={1}
            max={1000}
            value={motionVelocity}
            getAriaValueText={v => v}
            valueLabelDisplay="auto"
            onChange={(_, val) => {
              setMotionVelocity(val);
            }}
          />

          <Separator height={25} />

          <Label label="Motion radius:" value={motionRadius} />
          <Slider
            min={50}
            max={500}
            step={10}
            value={motionRadius}
            getAriaValueText={v => v}
            valueLabelDisplay="auto"
            onChange={(_, val) => {
              setKey(nanoid());
              setMotionRadius(val);
            }}
          />

          <Separator height={25} />

          <Label label="Scale:" value={`min(${scale[0]}) max(${scale[1]})`} />
          <Slider
            min={0.1}
            max={2}
            step={0.1}
            value={scale}
            getAriaValueText={v => v}
            valueLabelDisplay="auto"
            onChange={(_, val) => {
              setScale(val);
            }}
          />
        </Settings>
      </Row>

      <FullWidth>
        <Height height={height} background={palette.container}>
          <PerfMarquee
            artificialKey={key}
            direction={direction}
            velocity={velocity}
            scatterRandomly={scatterRandomly}
            scale={scale}
            resetAfterTries={resetAfterTries}
            motionVelocity={motionVelocity}
            motionRadius={motionRadius}
            iconsMeta={iconsMeta}
            onFinish={() => setLoading(false)}
          />
          {/* <Marquee
            key={key}
            velocity={velocity}
            scatterRandomly={scatterRandomly}
            minScale={scale[0]}
            maxScale={scale[1]}
            resetAfterTries={resetAfterTries}
            onFinish={() => setLoading(false)}
            debug
          >
            {icons.map((icon, index) => (
              <Motion
                {...iconsMeta[index]}
                velocity={motionVelocity}
                radius={100}
                key={`icon-${icon}`}
              >
                <Company>
                  <Circle src={`${baseUrl}${icon}-icon.svg`} alt="" />
                </Company>
              </Motion>
            ))}
          </Marquee> */}
        </Height>
        <IFrame>
          <Console logs={logs} variant="dark" />
        </IFrame>
      </FullWidth>
    </div>
  );
};

export default Playground;
