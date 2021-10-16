import React from "react";
import {
  StyledPageContainer,
  StyledMainContent,
  StyledHeader,
  StyledFooter
} from "./LayoutStyle";

const Layout = ({ children }) => {
  return (
    <StyledPageContainer>
      <StyledHeader>Tokyo Tetris</StyledHeader>
      <StyledMainContent>{children}</StyledMainContent>
      <StyledFooter></StyledFooter>
    </StyledPageContainer>
  );
};

export default Layout;
