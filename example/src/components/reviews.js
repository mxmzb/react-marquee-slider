import React from "react";
import Marquee from "react-marquee";

const Reviews = ({ onFinish }) => (
  <Marquee velocity={25} scatterRandomly minScale={0.7} onFinish={onFinish} debug>
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
);

export default Reviews;
