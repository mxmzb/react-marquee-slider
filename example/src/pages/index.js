import React from "react";
import styled from "styled-components";

import "../css/style.css";

import Reviews from "../components/reviews";
import Companies from "../components/companies";
import People from "../components/people";
import Playground from "../components/playground";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Separator = styled.div`
  height: ${props => props.height}px;
`;

const IndexPage = () => (
  <Wrapper>
    <Content>
      <h2>Companies</h2>
      <Reviews />
      <Separator height={50} />

      <h2>Companies</h2>
      <Companies />
      <Separator height={50} />

      <h2>People</h2>
      <People />
      <Separator height={50} />

      <h2>Playground</h2>
      <Playground />
    </Content>

    <Separator height={100} />
  </Wrapper>
);

export default IndexPage;
