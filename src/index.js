import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Theme from "./theme/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/globalStyle";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
