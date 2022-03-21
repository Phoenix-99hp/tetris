import React from "react";
import {
  StyledPageContainer,
  StyledPageInner,
  StyledMainContent,
  StyledHeader,
  StyledFooter,
} from "./LayoutStyle";

const Layout = ({ children }) => {
  return (
    <StyledPageContainer>
      <StyledPageInner>
        <StyledHeader>
          <span>Tetris</span>
        </StyledHeader>
        <StyledMainContent>{children}</StyledMainContent>
      </StyledPageInner>
    </StyledPageContainer>
  );
};

export default Layout;
