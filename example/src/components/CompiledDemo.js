import React from "react";
import styled from "styled-components";

import Reviews from "./Reviews";
import Companies from "./Companies";
import People from "./People";
import Playground from "./Playground";

import CodeReviews from "./code/Reviews";
import CodeCompanies from "./code/Companies";
import CodePeople from "./code/People";

const Separator = styled.div`
  height: ${props => props.height}px;
`;

const CodeNote = ({ url }) => (
  <p>
    Have a look{" "}
    <a href={url} target="_blank">
      at the original, full code for this example
    </a>{" "}
    or just the basic, simplified gist:
  </p>
);

const CompiledDemo = () => (
  <div>
    <h2>Companies</h2>
    <Reviews />
    <Separator height={15} />
    <CodeNote url="https://github.com/mxmzb/react-marquee-slider/blob/master/example/src/components/reviews.js" />
    <CodeReviews />
    <Separator height={50} />

    <h2>Companies</h2>
    <Companies />
    <Separator height={15} />
    <CodeNote url="https://github.com/mxmzb/react-marquee-slider/blob/master/example/src/components/companies.js" />
    <CodeCompanies />
    <Separator height={50} />

    <h2>People</h2>
    <People />
    <Separator height={15} />
    <CodeNote url="https://github.com/mxmzb/react-marquee-slider/blob/master/example/src/components/people.js" />
    <CodePeople />
    <Separator height={50} />

    <h2>Playground</h2>
    <Playground />
  </div>
);

export default CompiledDemo;
