import React from "react";
import {
  StyledPageContainer,
  StyledPageInner,
  StyledMainContent,
  StyledHeader
} from "./LayoutStyle";

const Layout = ({ children }) => {
  return (
    <StyledPageContainer>
      <StyledPageInner>
        <StyledHeader>
          <span>Tokyo Tetris</span>
        </StyledHeader>
        <StyledMainContent>{children}</StyledMainContent>
      </StyledPageInner>
    </StyledPageContainer>
  );
};

export default Layout;
