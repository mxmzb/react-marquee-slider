import React from "react";

const LoadingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="200px"
    height="200px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <defs>
      <path id="path" d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15" fill="none"></path>
      <path id="patha" d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0" fill="none"></path>
    </defs>
    <g transform="rotate(0 50 50)">
      <use xlinkHref="#path" stroke="#f1f2f3" strokeWidth="3"></use>
    </g>
    <g transform="rotate(60 50 50)">
      <use xlinkHref="#path" stroke="#f1f2f3" strokeWidth="3"></use>
    </g>
    <g transform="rotate(120 50 50)">
      <use xlinkHref="#path" stroke="#f1f2f3" strokeWidth="3"></use>
    </g>
    <g transform="rotate(0 50 50)">
      <circle cx="50" cy="15" r="9" fill="#e15b64">
        <animateMotion dur="1s" repeatCount="indefinite" begin="0s">
          <mpath xlinkHref="#patha"></mpath>
        </animateMotion>
      </circle>
    </g>
    <g transform="rotate(60 50 50)">
      <circle cx="50" cy="15" r="9" fill="#f8b26a">
        <animateMotion dur="1s" repeatCount="indefinite" begin="-0.16666666666666666s">
          <mpath xlinkHref="#patha"></mpath>
        </animateMotion>
      </circle>
    </g>
    <g transform="rotate(120 50 50)">
      <circle cx="50" cy="15" r="9" fill="#abbd81">
        <animateMotion dur="1s" repeatCount="indefinite" begin="-0.3333333333333333s">
          <mpath xlinkHref="#patha"></mpath>
        </animateMotion>
      </circle>
    </g>
  </svg>
);

export default LoadingIcon;
