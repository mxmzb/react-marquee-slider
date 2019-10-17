import styled from "styled-components";

// ty Chris https://css-tricks.com/full-width-containers-limited-width-parents/
const FullWidth = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

export default FullWidth;
