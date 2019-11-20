import React from "react";
import Code from "../Code";

const code = `import React from "react";
import Marquee from "react-marquee-slider";
import times from "lodash/times";

const Reviews = () => (
  <Marquee key={key} velocity={25} scatterRandomly minScale={0.7} debug>
    {times(5, String).map(id => (
      <Box key={\`marquee-example-review-\${id}\`} scale={scale}>
        <Review scale={scale}>
          <Avatar scale={scale}>
            <img src="https://randomuser.me/api/portraits/women/68.jpg" />
          </Avatar>
          <Content scale={scale}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </Content>
        </Review>
      </Box>
    ))}
  </Marquee>
);
`;

export default () => <Code>{code}</Code>;
