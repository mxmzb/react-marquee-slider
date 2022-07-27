import React from "react";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import styled from "styled-components";

const Container = styled.div`
  margin: 0;
  width: 100%;
  max-width: 100%;

  @media (min-width: 42rem) {
    margin: 0 -16px;
  }

  span.token {
    white-space: pre-wrap !important;
    word-break: break-all !important;
  }
`;

SyntaxHighlighter.registerLanguage("jsx", jsx);

const Code = ({ children }) => (
  <Container>
    <SyntaxHighlighter language="jsx" style={atomDark}>
      {children}
    </SyntaxHighlighter>
  </Container>
);

export default Code;
