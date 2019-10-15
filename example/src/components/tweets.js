import React from "react";
import Marquee from "react-marquee";
import TweetEmbed from "react-tweet-embed";

const Tweets = ({ onFinish }) => {
  return (
    <Marquee velocity={25} scatterRandomly minScale={0.7} onFinish={onFinish}>
      <div style={{ padding: 25 }}>
        <TweetEmbed id="771763270273294336" options={{ theme: "dark" }} />
      </div>

      <div style={{ padding: 25 }}>
        <TweetEmbed id="771763270273294336" options={{ theme: "dark" }} />
      </div>

      <div style={{ padding: 25 }}>
        <TweetEmbed id="771763270273294336" options={{ theme: "dark" }} />
      </div>
    </Marquee>
  );
};

export default Tweets;
