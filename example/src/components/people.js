import React from "react";
import Marquee from "react-marquee";

const baseUrl = "https://assets.zeit.co/image/upload/q_auto/front/jobs/carousel";

const People = () => (
  <div>
    <div style={{ height: 200, paddingBottom: 60 }}>
      <Marquee velocity={25} debug>
        <img src={`${baseUrl}/02.jpg`} className="photo" alt="" />
        <img src={`${baseUrl}/03.jpg`} className="photo" alt="" />
        <img src={`${baseUrl}/04.jpg`} className="photo" alt="" />
        <img src={`${baseUrl}/06.jpg`} className="photo" alt="" />
        <img src={`${baseUrl}/15.jpg`} className="photo" alt="" />
        <img src={`${baseUrl}/07.jpg`} className="photo" alt="" />
        <img src={`${baseUrl}/14.jpg`} className="photo" alt="" />
      </Marquee>
    </div>

    <div style={{ height: 200 }}>
      <Marquee velocity={25}>
        <img src={`${baseUrl}/02.jpg`} className="photo offset" alt="" />
        <img src={`${baseUrl}/03.jpg`} className="photo offset" alt="" />
        <img src={`${baseUrl}/04.jpg`} className="photo offset" alt="" />
        <img src={`${baseUrl}/06.jpg`} className="photo offset" alt="" />
        <img src={`${baseUrl}/15.jpg`} className="photo offset" alt="" />
        <img src={`${baseUrl}/07.jpg`} className="photo offset" alt="" />
        <img src={`${baseUrl}/14.jpg`} className="photo offset" alt="" />
      </Marquee>
    </div>
  </div>
);

export default People;
