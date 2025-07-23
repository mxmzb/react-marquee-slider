"use client";

import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";

import Reviews from "./Reviews";
import Companies from "./Companies";
import People from "./People";
import Playground from "./Playground";
import ComputationTime from "./ComputationTime";

import CodeReviews from "./code/Reviews";
import CodeCompanies from "./code/Companies";
import CodePeople from "./code/People";

import { __safePerformanceNow } from "../lib/util";

const Separator = styled.div`
  height: ${(props) => props.height}px;
`;

const AlertBox = styled.div`
  border: 3px rgb(255, 190, 110, 0.5) solid;
  background: rgb(255, 190, 110, 0.1);
  border-radius: 0.75rem;

  p {
    margin: 1.5rem;
  }
`;

const AlertNote = ({ children }) => <AlertBox>{children}</AlertBox>;

const CodeNote = ({ url }) => (
  <p>
    Here is the essential code for the above example, or you can have a more in depth look{" "}
    <a href={url} target="_blank" rel="noreferrer">
      at the original, full code
    </a>
    :
  </p>
);

const CompiledDemo = () => {
  const t0 = useRef({});
  const [perfData, setPerfData] = useState({});

  const onReviewsStartPerformance = useCallback(
    () => (t0.current = Object.assign({}, t0.current, { reviews: __safePerformanceNow() })),
    [],
  );

  const onReviewsEndPerformance = useCallback(({ totalTries }) => {
    setPerfData((prevPerfData) =>
      Object.assign({}, prevPerfData, {
        reviews: {
          computationTime: Math.floor(__safePerformanceNow() - t0.current["reviews"]),
          totalTries,
        },
      }),
    );
  }, []);

  const onCompaniesStartPerformance = useCallback(
    () => (t0.current = Object.assign({}, t0.current, { companies: __safePerformanceNow() })),
    [],
  );

  const onCompaniesEndPerformance = useCallback(({ totalTries }) => {
    setPerfData((prevPerfData) =>
      Object.assign({}, prevPerfData, {
        companies: {
          computationTime: Math.floor(__safePerformanceNow() - t0.current["companies"]),
          totalTries,
        },
      }),
    );
  }, []);

  const onPeopleStartPerformance = useCallback(
    () => (t0.current = Object.assign({}, t0.current, { people: __safePerformanceNow() })),
    [],
  );

  const onPeopleEndPerformance = useCallback(({ totalTries }) => {
    setPerfData((prevPerfData) =>
      Object.assign({}, prevPerfData, {
        people: {
          computationTime: Math.floor(__safePerformanceNow() - t0.current["people"]),
          totalTries,
        },
      }),
    );
  }, []);

  const onPlaygroundStartPerformance = useCallback(
    () => (t0.current = Object.assign({}, t0.current, { playground: __safePerformanceNow() })),
    [],
  );

  const onPlaygroundEndPerformance = useCallback(({ totalTries }) => {
    setPerfData((prevPerfData) =>
      Object.assign({}, prevPerfData, {
        playground: {
          computationTime: Math.floor(__safePerformanceNow() - t0.current["playground"]),
          totalTries,
        },
      }),
    );
  }, []);

  return (
    <div>
      <AlertNote>
        <p>
          <b>Note:</b> The flickering ("jumping") of the items in the Marquee is not a bug. When you
          want to position items inside the slider randomly, the slider needs to actually render
          them, to see if the random positioning will fit inside the given area. If it doesn't (e.g.
          items are overlapping), it tries to find another place for the overlapping item. Depending
          on the number and size of items, and the size of the available space, overlapping items
          are more or less likely.
        </p>
        <p>
          You can hide the flickering by overlaying the slider with a loading div, until it
          finishes. The slider provides an <code>onFinish</code> callback for this very reason. You
          can see an example with an overlaying loading div further down.
        </p>
      </AlertNote>
      <h2>Reviews</h2>
      <Reviews
        onStartPerformance={onReviewsStartPerformance}
        onEndPerformance={onReviewsEndPerformance}
      />
      <Separator height={15} />
      <ComputationTime perfData={perfData.reviews} />
      <Separator height={15} />
      <CodeNote url="https://github.com/mxmzb/react-marquee-slider/blob/master/example/src/components/reviews.js" />
      <CodeReviews />
      <Separator height={50} />
      <h2>Companies</h2>
      <Companies
        onStartPerformance={onCompaniesStartPerformance}
        onEndPerformance={onCompaniesEndPerformance}
      />
      <Separator height={15} />
      <ComputationTime perfData={perfData.companies} />
      <Separator height={15} />
      <CodeNote url="https://github.com/mxmzb/react-marquee-slider/blob/master/example/src/components/companies.js" />
      <CodeCompanies />
      <Separator height={50} />
      <h2>People</h2>
      <People
        onStartPerformance={onPeopleStartPerformance}
        onEndPerformance={onPeopleEndPerformance}
      />
      <Separator height={15} />
      <ComputationTime instant />
      <Separator height={15} />
      <CodeNote url="https://github.com/mxmzb/react-marquee-slider/blob/master/example/src/components/people.js" />
      <CodePeople />
      <Separator height={50} />
      <h2>Playground</h2>
      <Playground
        onStartPerformance={onPlaygroundStartPerformance}
        onEndPerformance={onPlaygroundEndPerformance}
        perfData={perfData.playground}
      />
    </div>
  );
};

export default CompiledDemo;
