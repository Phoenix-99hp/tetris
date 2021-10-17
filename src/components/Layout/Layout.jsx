import React from "react";
import {
  StyledPageContainer,
  StyledMainContent,
  StyledHeader,
  StyledLetter,
  StyledFooter,
} from "./LayoutStyle";
import { useTheme } from "styled-components";

const Layout = ({ children }) => {
  // const theme = useTheme();

  return (
    <StyledPageContainer>
      <StyledHeader>
        <span>Tokyo Tetris</span>
      </StyledHeader>
      <StyledMainContent>{children}</StyledMainContent>
      {/* <StyledFooter></StyledFooter> */}
    </StyledPageContainer>
  );
};

export default Layout;
