import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body {
  max-height: 100vh;
  max-width: 100vw;
  height: 100%;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 0;
}
`;

export default GlobalStyle;
