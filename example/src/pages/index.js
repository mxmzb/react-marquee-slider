import React from "react"
import Slider from "react-marquee"

import "../css/style.css"

const IndexPage = () => (
  <div
    className="wrapper"
    style={{ height: 600, background: "#eee", margin: 20 }}
  >
    <Slider duration={40000} scatterRandomly minScale={0.7}>
      <div style={{ padding: 25, background: "red" }}>
        <div className="review">
          <div className="avatar">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt=""
            />
          </div>
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: 25, background: "red" }}>
        <div className="review">
          <div className="avatar">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt=""
            />
          </div>
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: 25, background: "red" }}>
        <div className="review">
          <div className="avatar">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt=""
            />
          </div>
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: 25, background: "red" }}>
        <div className="review">
          <div className="avatar">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt=""
            />
          </div>
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </Slider>
  </div>
)

export default IndexPage
