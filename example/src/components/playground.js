"use client";

import React, { Fragment, useState, useEffect, useRef } from "react";
import Marquee, {
  Motion,
  Scale,
  randomIntFromInterval,
  randomFloatFromInterval,
} from "react-marquee-slider";
import styled from "styled-components";
import { Slider, FormControlLabel, RadioGroup, Radio, Switch, Button } from "@mui/material";
import { nanoid } from "nanoid";
import { GithubPicker } from "react-color";
import times from "lodash/times";

import FullWidth from "./FullWidth";
import LoadingIcon from "./LoadingIcon";
import ComputationTime from "./ComputationTime";

import CodePlayground from "./code/Playground";

import { useSize } from "../hooks/useSize";

const Row = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 42rem) {
    flex-direction: row;
  }
`;

const Height = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.height ? props.height + "px" : "auto")};
  background: ${(props) => props.background};
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
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.1),
    0 3px 10px rgba(0, 0, 0, 0.07);
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

const ColorPickers = styled.div`
  margin-bottom: 35px;

  > .github-picker {
    box-sizing: content-box !important;
  }

  @media (min-width: 42rem) {
    width: 50%;
    margin-bottom: 0;
  }
`;

const Settings = styled.div`
  @media (min-width: 42rem) {
    width: 50%;
  }
`;

const Separator = styled.div`
  height: ${(props) => props.height}px;
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

const Loading = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 1s linear;
  opacity: ${(props) => (props.loading === "true" ? 1 : 0)};
  background: #fff;
  justify-content: center;
  align-items: center;
`;

const IconPadding = styled.div`
  padding: 15px;
`;

const icons = [
  "/assets/images/amazon.svg",
  "/assets/images/gatsby.svg",
  "/assets/images/angular.svg",
  "/assets/images/apple.svg",
  "/assets/images/lamborghini.svg",
  "/assets/images/microsoft.svg",
  "/assets/images/next.svg",
  "/assets/images/python.svg",
  "/assets/images/rolls-royce.svg",
  "/assets/tesla-motors.svg",
  "/assets/images/twilio.svg",
];

const colors = [
  "transparent",
  "#eeeeee",
  "#fa8072",
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

const CodeNote = ({ url }) => (
  <p>
    Have a look{" "}
    <a href={url} target="_blank" rel="noreferrer">
      at the original, full code for this example
    </a>{" "}
    or just the basic, simplified gist:
  </p>
);

const PerfMarquee = React.memo(
  ({
    artificialKey,
    direction,
    velocity,
    scatterRandomly,
    minScale,
    maxScale,
    scale,
    resetAfterTries,
    iconsAmount,
    iconsMeta,
    onInit,
    onFinish,
    motionVelocity,
    motionRadius,
    palette,
  }) => (
    <Marquee
      key={artificialKey}
      direction={direction}
      velocity={velocity}
      scatterRandomly={scatterRandomly}
      minScale={minScale}
      maxScale={maxScale}
      resetAfterTries={resetAfterTries}
      onInit={onInit}
      onFinish={onFinish}
    >
      {times(iconsAmount, Number).map((index) => (
        <Scale scale={iconsMeta[index].scale} key={`marquee-example-playground-${index}`}>
          {motionVelocity > 0 && (
            <Motion
              {...iconsMeta[index]}
              velocity={motionVelocity}
              radius={motionRadius}
              backgroundColors={palette}
            >
              <Company scale={scale}>
                <Circle scale={scale}>
                  <Logo src={icons[index]} alt="" />
                </Circle>
              </Company>
            </Motion>
          )}
          {motionVelocity === 0 && (
            <IconPadding>
              <Company scale={scale}>
                <Circle scale={scale}>
                  <Logo src={icons[index]} alt="" />
                </Circle>
              </Company>
            </IconPadding>
          )}
        </Scale>
      ))}
    </Marquee>
  ),
);

const PlaygroundDemo = ({
  artificialKey,
  scatterRandomly,
  height,
  direction,
  velocity,
  scale,
  resetAfterTries,
  motionVelocity,
  motionRadius,
  iconsAmount,
  iconsMeta,
  palette,
  loading,
  showLoading,
  setLoading,
  setKey,
  size,
  onStartPerformance,
  onEndPerformance,
}) => {
  useEffect(() => {
    setKey(nanoid());
  }, [size, size.width]);

  let transformScale = 0.5;

  if (size && size.width > 800) {
    transformScale = 0.65;
  }

  if (size && size.width > 1100) {
    transformScale = 0.8;
  }

  if (size && size.width > 1400) {
    transformScale = 1;
  }

  return (
    <FullWidth>
      <Height height={scatterRandomly ? height : undefined} background={palette.container}>
        <PerfMarquee
          artificialKey={artificialKey}
          direction={direction}
          velocity={velocity}
          scatterRandomly={scatterRandomly}
          scale={transformScale}
          resetAfterTries={resetAfterTries}
          motionVelocity={motionVelocity}
          motionRadius={motionRadius}
          iconsAmount={iconsAmount}
          iconsMeta={iconsMeta}
          palette={palette}
          minScale={scale[0]}
          maxScale={scale[1]}
          onInit={onStartPerformance}
          onFinish={({ totalTries }) => {
            onEndPerformance({ totalTries });
            setLoading(false);
          }}
        />
        <Loading loading={scatterRandomly && showLoading ? loading.toString() : false.toString()}>
          <LoadingIcon />
        </Loading>
      </Height>
    </FullWidth>
  );
};

const Playground = ({ perfData, onStartPerformance, onEndPerformance }) => {
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [palette, setPalette] = useState({
    container: "transparent",
    buffer: "transparent",
    earth: "transparent",
    solarSystem: "transparent",
  });
  const [iconsAmount, setIconsAmount] = useState(8);
  const [direction, setDirection] = useState("ltr");
  const [scatterRandomly, setScatterRandomly] = useState(true);
  const [height, setHeight] = useState(500);
  const [resetAfterTries, setResetAfterTries] = useState(200);
  const [velocity, setVelocity] = useState(15);
  const [motionVelocity, setMotionVelocity] = useState(15);
  const [motionRadius, setMotionRadius] = useState(100);
  const [scale, setScale] = useState([0.7, 1]);
  const [key, setKey] = useState(nanoid());

  const prevVelocityRef = useRef(velocity);

  const [sizeRef, size] = useSize();

  const iconsMeta = React.useMemo(() => {
    const metaArr = [];
    for (let i = 0; i < icons.length; i++) {
      metaArr.push({
        initDeg: randomIntFromInterval(0, 360),
        direction: Math.random() > 0.5 ? "clockwise" : "counterclockwise",
        scale: randomFloatFromInterval(scale[0], scale[1]),
      });
    }
    return metaArr;
  }, [scale, scale[0], scale[1]]);

  return (
    <div>
      <Row>
        <ColorPickers>
          <Label label="Container background color:" color={palette.container} />
          <GithubPicker
            color={palette.container}
            onChange={(val) => setPalette({ ...palette, container: val.hex })}
            colors={colors}
            triangle="hide"
          />
          <Separator height={20} />

          <Label label="Child background color:" color={palette.buffer} />
          <GithubPicker
            color={palette.buffer}
            onChange={(val) => setPalette({ ...palette, buffer: val.hex })}
            colors={colors}
            triangle="hide"
          />
          <Separator height={20} />

          <Label label="SolarSystem background color:" color={palette.solarSystem} />
          <GithubPicker
            color={palette.solarSystem}
            onChange={(val) => setPalette({ ...palette, solarSystem: val.hex })}
            colors={colors}
            triangle="hide"
          />
          <Separator height={20} />

          <Label label="Earth background color:" color={palette.earth} />
          <GithubPicker
            color={palette.earth}
            onChange={(val) => setPalette({ ...palette, earth: val.hex })}
            colors={colors}
            triangle="hide"
          />
        </ColorPickers>

        <Settings>
          <Label
            label="Icons amount:"
            value={iconsAmount}
            help="How many icons to show. The less icons, the easier it is to find space for icons. The higher you put this, the higher you should set the container height, too. Wide screens also help."
          />
          <Slider
            min={1}
            max={icons.length}
            value={iconsAmount}
            step={1}
            getAriaValueText={(v) => v}
            valueLabelDisplay="auto"
            onChange={(_, val) => {
              setLoading(true);
              setKey(nanoid());
              setIconsAmount(val);
            }}
          />
          <Separator height={25} />

          <Label label="Direction:" />
          <RadioGroup defaultValue="ltr" name="customized-radios">
            <FormControlLabel
              value="ltr"
              control={
                <Radio
                  color="primary"
                  checked={direction === "ltr"}
                  onChange={(evt) => setDirection(evt.target.value)}
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
                  onChange={(evt) => setDirection(evt.target.value)}
                />
              }
              label="Right to left"
            />
          </RadioGroup>
          <Separator height={25} />

          <Label label="Random positioning:" />
          <FormControlLabel
            control={
              <Switch
                checked={scatterRandomly}
                onChange={() => {
                  setLoading(true);
                  setKey(nanoid());
                  setScatterRandomly(!scatterRandomly);
                }}
                color="primary"
              />
            }
            label="Scatter randomly"
          />
          <Separator height={25} />

          {scatterRandomly && (
            <Fragment>
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
                getAriaValueText={(v) => v}
                valueLabelDisplay="auto"
                onChange={(_, val) => {
                  setLoading(true);
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
                getAriaValueText={(v) => v}
                valueLabelDisplay="auto"
                onChange={(_, val) => {
                  setLoading(true);
                  setKey(nanoid());
                  setResetAfterTries(val);
                }}
              />

              <Separator height={25} />

              <FormControlLabel
                control={
                  <Switch
                    checked={showLoading}
                    onChange={() => {
                      setLoading(true);
                      setKey(nanoid());
                      setShowLoading(!showLoading);
                    }}
                    color="primary"
                  />
                }
                label="Show loading overlay"
              />
              <Separator height={25} />
            </Fragment>
          )}

          <Label label="Velocity:" value={`${velocity}px / s`} />
          <Slider
            min={0}
            max={1000}
            value={velocity}
            getAriaValueText={(v) => v}
            valueLabelDisplay="auto"
            onChange={(_, val) => {
              setVelocity(val);
            }}
          />
          <Separator height={25} />

          <Label
            label="Pause / Resume:"
            help="This is a shortcut to toggling velocity to 0 and back, without going through all the other values of the slider that come before 0."
          />
          <Button
            onClick={() => {
              if (velocity === 0) {
                setVelocity(prevVelocityRef.current);
              } else {
                prevVelocityRef.current = velocity;
                setVelocity(0);
              }
            }}
            color="primary"
            variant="contained"
            disableElevation
          >
            {velocity === 0 ? "Resume slider" : "Pause slider"}
          </Button>
          <Separator height={25} />

          <Label label="Motion velocity:" value={`${motionVelocity}px / s`} />
          <Slider
            min={0}
            max={1000}
            value={motionVelocity}
            getAriaValueText={(v) => v}
            valueLabelDisplay="auto"
            onChange={(_, val) => {
              setMotionVelocity(val);
            }}
          />
          {motionVelocity > 0 && (
            <>
              <Separator height={25} />
              <Label
                label="Motion radius:"
                value={`${motionRadius}px`}
                help="The icons each are encapsuled in another `div`, which rotates (hence the circular motion). However, these motion containers are the actual children and larger than the icons (play around with `SolarSystem` color palette to make the visible). Therefore: Don't make the radius too large, because it will cloak up the available space and slow down computation."
              />
              <Slider
                min={50}
                max={500}
                step={10}
                value={motionRadius}
                getAriaValueText={(v) => v}
                valueLabelDisplay="auto"
                onChange={(_, val) => {
                  setLoading(true);
                  setKey(nanoid());
                  setMotionRadius(val);
                }}
              />
            </>
          )}
          <Separator height={25} />
          <Label label="Scale:" value={`min(${scale[0]}) max(${scale[1]})`} />
          <Slider
            min={0.1}
            max={1}
            step={0.1}
            value={scale}
            getAriaValueText={(v) => v}
            valueLabelDisplay="auto"
            onChange={(_, val) => {
              setLoading(true);
              setKey(nanoid());
              setScale(val);
            }}
          />
        </Settings>
      </Row>

      <div ref={sizeRef}>
        <PlaygroundDemo
          size={size}
          artificialKey={key}
          scatterRandomly={scatterRandomly}
          height={height}
          direction={direction}
          velocity={velocity}
          scatterRandomly={scatterRandomly}
          scale={scale}
          resetAfterTries={resetAfterTries}
          motionVelocity={motionVelocity}
          motionRadius={motionRadius}
          iconsAmount={iconsAmount}
          iconsMeta={iconsMeta}
          palette={palette}
          loading={loading}
          showLoading={showLoading}
          setLoading={setLoading}
          setKey={setKey}
          onStartPerformance={onStartPerformance}
          onEndPerformance={onEndPerformance}
        />
      </div>
      <Separator height={15} />
      <ComputationTime perfData={perfData} />
      <Separator height={15} />
      <CodeNote url="https://github.com/mxmzb/react-marquee-slider/blob/master/example/src/components/playground.js" />

      <CodePlayground
        height={height}
        iconsAmount={iconsAmount}
        palette={palette}
        direction={direction}
        velocity={velocity}
        motionVelocity={motionVelocity}
        motionRadius={motionRadius}
        scatterRandomly={scatterRandomly}
        minScale={scale[0]}
        maxScale={scale[1]}
        resetAfterTries={resetAfterTries}
        loading={loading}
        showLoading={showLoading}
      />
    </div>
  );
};

export default Playground;
