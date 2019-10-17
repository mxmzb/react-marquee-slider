import React, { useState } from "react";
import styled from "styled-components";

import "../css/style.css";

import Reviews from "../components/reviews";
import Companies from "../components/companies";
import People from "../components/people";
import Playground from "../components/playground";

// import Tweets from "../components/tweets";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Loading = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center center;
  transition: linear 0.5s all;
  opacity: ${props => (props.loading === "true" ? 1 : 0)};
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: ${props => (props.height ? props.height + "px" : "auto")};
`;

const Separator = styled.div`
  height: ${props => props.height}px;
`;

const IndexPage = () => {
  const [loading, setLoading] = useState({
    reviews: true,
    companies: true,
    people: true,
    playground: true,
  });

  const showLoading = true;

  return (
    <Wrapper>
      <Content>
        {/*  <h1>React-Marque</h1>

        <h2>Reviews</h2>
      </Content>
      <Container height={600}>
        <Reviews
          onFinish={() =>
            setLoading(
              Object.assign({}, loading, {
                reviews: false,
              }),
            )
          }
        />
        <Loading loading={showLoading && loading.reviews ? "true" : "false"} />
      </Container>

      <Content>
        <h2>Companies</h2>
      </Content>
      <Container height={500}>
        <Companies
          onFinish={() =>
            setLoading(
              Object.assign({}, loading, {
                companies: false,
              }),
            )
          }
        />
        {showLoading && loading.companies && <Loading />}
      </Container>

      <Content>
        <h2>People</h2>
      </Content>
      <Container height={460}>
        <People
          onFinish={() =>
            setLoading(
              Object.assign({}, loading, {
                people: false,
              }),
            )
          }
        />
        {showLoading && loading.people && <Loading />}
      </Container> */}

        <h2>Playground</h2>
        <Playground />
      </Content>

      <Separator height={100} />
    </Wrapper>
  );
};

export default IndexPage;
