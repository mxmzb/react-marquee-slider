import React from "react";
import styled from "styled-components";
import get from "lodash/get";

const AlertBox = styled.div`
  border: 3px rgb(255, 190, 110, 0.5) solid;
  background: rgb(255, 190, 110, 0.1);
  border-radius: 0.75rem;

  p {
    margin: 1.5rem;
  }
`;

const ComputationTime = ({ perfData, instant }) => {
  const computationTime = get(perfData, "computationTime", false);
  const totalTries = get(perfData, "totalTries", false);

  console.log("perfData", perfData);

  if (instant) {
    return (
      <AlertBox>
        <p>
          The above Marquee shows instantly and doesn't require computation time, because the child
          elements are not positioned (scattered) randomly.
        </p>
      </AlertBox>
    );
  }

  if (computationTime) {
    return (
      <AlertBox>
        <p>
          The above Marquee took <b>{computationTime}ms</b> and <b>{totalTries} tries</b> to find an
          appropriate positioning.
        </p>
      </AlertBox>
    );
  }

  return (
    <AlertBox>
      <p>The above Marquee is still rendering.</p>
    </AlertBox>
  );
};

export default ComputationTime;
