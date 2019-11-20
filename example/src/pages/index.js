import React from "react";
import styled from "styled-components";

import "../css/style.css";

import CompiledDemo from "../components/CompiledDemo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;

  & > p {
    line-height: 1.5rem;
  }
`;

const Separator = styled.div`
  height: ${props => props.height}px;
`;

const IndexPage = () => (
  <Wrapper>
    <Content>
      <CompiledDemo />
    </Content>

    <Separator height={100} />
  </Wrapper>
);

export default IndexPage;
