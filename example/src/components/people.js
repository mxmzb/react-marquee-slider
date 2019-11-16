import React from "react";
import _ from "lodash";
import Marquee from "react-marquee-slider";

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

const People = () => (
  <div>
    <FullWidth>
      <div style={{ height: 200, paddingBottom: 60 }}>
        <Marquee velocity={25} debug>
          {_.times(7, Number).map(key => (
            <img src={photos[key]} className="photo" alt="" key={`marquee-example-people-${key}`} />
          ))}
        </Marquee>
      </div>

      <div style={{ height: 200 }}>
        <Marquee velocity={25}>
          {_.times(7, Number).map(key => (
            <img
              src={photos[key + 7]}
              className="photo offset"
              alt=""
              key={`marquee-example-people-${key + 7}`}
            />
          ))}
        </Marquee>
      </div>
    </FullWidth>
  </div>
);

export default People;
