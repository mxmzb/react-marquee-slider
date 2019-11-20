import React, { useEffect, useState } from "react";
import styled from "styled-components";
import times from "lodash/times";
import Marquee from "react-marquee-slider";
import { withSize } from "react-sizeme";
import nanoid from "nanoid";

import FullWidth from "../components/FullWidth";

import photoPeople1 from "../images/people-1.jpg";
import photoPeople2 from "../images/people-2.jpg";
import photoPeople3 from "../images/people-3.jpg";
import photoPeople4 from "../images/people-4.jpg";
import photoPeople5 from "../images/people-5.jpg";
import photoPeople6 from "../images/people-6.jpg";
import photoPeople7 from "../images/people-7.jpg";
import photoPeople8 from "../images/people-8.jpg";
import photoPeople9 from "../images/people-9.jpg";
import photoPeople10 from "../images/people-10.jpg";
import photoPeople11 from "../images/people-11.jpg";
import photoPeople12 from "../images/people-12.jpg";
import photoPeople13 from "../images/people-13.jpg";
import photoPeople14 from "../images/people-14.jpg";

const Photo = styled.img`
  width: ${props => props.scale * 368}px;
  height: ${props => props.scale * 200}px;
  border-radius: 4px;
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.12);
  object-fit: cover;
  object-position: top;

  margin-left: ${props => (props.offset === "true" ? props.scale * 7 : props.scale * 87)}px;
  margin-right: ${props => (props.offset === "true" ? props.scale * 80 : 0)}px;
`;

const photos = [
  photoPeople1,
  photoPeople2,
  photoPeople3,
  photoPeople4,
  photoPeople5,
  photoPeople6,
  photoPeople7,
  photoPeople8,
  photoPeople9,
  photoPeople10,
  photoPeople11,
  photoPeople12,
  photoPeople13,
  photoPeople14,
];

const People = ({ size }) => {
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
      <div style={{ height: scale * 200 }}>
        <Marquee key={key} velocity={25} debug>
          {times(7, Number).map(id => (
            <Photo src={photos[id]} alt="" key={`marquee-example-people-${id}`} scale={scale} />
          ))}
        </Marquee>
      </div>

      <div style={{ height: scale * 60 }} />

      <div style={{ height: scale * 200 }}>
        <Marquee key={key} velocity={25}>
          {times(7, Number).map(id => (
            <Photo
              src={photos[id + 7]}
              alt=""
              key={`marquee-example-people-${id + 7}`}
              offset="true"
              scale={scale}
            />
          ))}
        </Marquee>
      </div>
    </FullWidth>
  );
};

export default withSize()(People);
