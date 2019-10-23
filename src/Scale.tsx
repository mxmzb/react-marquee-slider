import styled from "styled-components";

const Scale = styled.div<{ scale: number }>`
  transform: scale(${props => props.scale});
`;

export default Scale;
