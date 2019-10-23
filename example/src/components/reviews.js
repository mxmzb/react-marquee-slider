import React from "react";
import Marquee from "react-marquee";
import styled from "styled-components";

import FullWidth from "../components/FullWidth";

const Height = styled.div`
  position: relative;
  width: 100%;
  height: ${props => (props.height ? props.height + "px" : "auto")};
`;

const Reviews = () => (
  <FullWidth>
    <Height height={600}>
      <Marquee velocity={25} scatterRandomly minScale={0.7} debug>
        <div style={{ padding: 25 }}>
          <div className="review">
            <div className="avatar">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="" />
            </div>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: 25 }}>
          <div className="review">
            <div className="avatar">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="" />
            </div>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: 25 }}>
          <div className="review">
            <div className="avatar">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="" />
            </div>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: 25 }}>
          <div className="review">
            <div className="avatar">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="" />
            </div>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </Marquee>
    </Height>
  </FullWidth>
);

export default Reviews;
