import React from "react";
import Code from "../Code";

const code = `import React from "react";
import Marquee, { Motion } from "react-marquee-slider";
import times from "lodash/times";

const Reviews = () => (
  <FullWidth>
    <Height height={500}>
      <Marquee key={key} velocity={12} scatterRandomly minScale={0.7} resetAfterTries={200} debug>
        {_.times(8, Number).map(id => (
          <Motion
            key={\`marquee-example-company-\${id}\`}
            initDeg={randomIntFromInterval(0, 360)}
            direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
            velocity={10}
            radius={scale * 100}
          >
            <Company scale={scale}>
              <Circle scale={scale}>
                <Logo src={icons[id]} />
              </Circle>
            </Company>
          </Motion>
        ))}
      </Marquee>
    </Height>
  </FullWidth>
);
`;

export default () => <Code>{code}</Code>;
