import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Theme from "./theme/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/globalStyle";
import "./theme/globalFonts.css";

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
