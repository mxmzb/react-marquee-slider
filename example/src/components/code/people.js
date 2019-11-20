import React from "react";
import Code from "../Code";

const code = `import React from "react";
import Marquee from "react-marquee-slider";
import styled from "styled-components";
import times from "lodash/times";

const Photo = styled.img\`
  width: 368px;
  height: 200px;
  border-radius: 4px;
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.12);
  object-fit: cover;
  object-position: top;
\`;

const Reviews = () => (
  <div>
    <div style={{ height: 200, paddingBottom: 60 }}>
      <Marquee key={key} velocity={25} debug>
        {times(7, Number).map(id => (
          <Photo src={photos[id]} key={\`marquee-example-people-\${id}\`} style={{ 
            marginLeft: "87px",
          }} />
        ))}
      </Marquee>
    </div>

    <div style={{ height: 200 }}>
      <Marquee key={key} velocity={25}>
        {times(7, Number).map(id => (
          <Photo
            src={photos[id + 7]}
            key={\`marquee-example-people-\${id + 7}\`}
            style={{ 
              marginLeft: "7px",
              marginRight: "80px",
            }}
          />
        ))}
      </Marquee>
    </div>
  </div>
);
`;

export default () => <Code>{code}</Code>;
