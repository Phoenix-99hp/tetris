import React from "react";
import {
  StyledPageContainer,
  StyledMainContent,
  StyledHeader
} from "./LayoutStyle";

const Layout = ({ children }) => {
  return (
    <StyledPageContainer>
      <StyledHeader>Tokyo Tetris</StyledHeader>
      <StyledMainContent>{children}</StyledMainContent>
    </StyledPageContainer>
  );
};

export default Layout;
