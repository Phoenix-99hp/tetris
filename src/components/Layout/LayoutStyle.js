import styled from "styled-components";

export const StyledPageContainer = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  height: 100%;
  text-align: center;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  box-sizing: border-box;
`;

export const StyledMainContent = styled.main`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  color: white;
  flex: 1 1 100%;
  flex-wrap: wrap;
  align-content: start;
`;

export const StyledHeader = styled.header`
  display: flex;
  height: fit-content;
  flex: 0 1 70px;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  padding: 40px 0;
  font-size: 40px;
  text-shadow: 1px 1px 1px red;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.red};

  > span {
    border-bottom: 2px solid ${({ theme }) => theme.colors.white};
  }
`;

// export const StyledFooter = styled.footer`
//   display: flex;
//   flex: 0 1 1px;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   box-sizing: border-box;
// `;

export const StyledLetter = styled.span``;
