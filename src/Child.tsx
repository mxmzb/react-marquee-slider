import React, { ReactNode, FC } from "react";
import styled from "styled-components";

const Container = styled.div<{ position: string }>`
  display: inline-block;
  position: ${props => props.position};
`;

type Props = {
  children: ReactNode;
  x: number;
  y: number;
  scale: number;
  scatterRandomly: boolean;
};

const Child: FC<Props> = ({ children, x, y, scale, scatterRandomly }: Props) => (
  <Container
    position={scatterRandomly ? "absolute" : "relative"}
    style={{
      left: x,
      top: y,
      transform: `scale(${scale})`,
    }}
  >
    {children}
  </Container>
);

Child.defaultProps = {
  x: 0,
  y: 0,
  scale: 1,
  scatterRandomly: false,
};

export default Child;
