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
  font-family: GeoramaLight;
  -webkit-tap-highlight-color: transparent;
}
button {
  cursor: pointer;
  font-family: GeoramaLightItalic;
  // &:hover {
  //   opacity: 0.7;
  // }
  &:focus {
    outline: none;
  }
}
h2 {
  font-weight: normal;
  margin: 0;
  font-size: 20px;
}
h3 {
   font-weight: normal;
  margin: 0;
  font-size: 16px;
}
p {
  margin: 0;
}
button {
  background: none;
  border: none;
  border-radius: 3px;
  color: white;
  outline: none;
}
`;

export default GlobalStyle;
