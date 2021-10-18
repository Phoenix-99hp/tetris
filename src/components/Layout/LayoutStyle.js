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
  user-select: none;
`;

export const StyledMainContent = styled.main`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
  color: white;
  flex: 1 1 100%;
  align-content: start;
  padding-bottom: 40px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    flex-wrap: wrap;
  }
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
  text-shadow: 1px 1px 1px blue;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.blue};

  > span {
    border-bottom: 2px solid ${({ theme }) => theme.colors.white};
    font-family: GeoramaSemiBoldItalic;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 30px 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.last}) {
    font-size: 30px;

    > span {
      border-bottom: none;
    }
  } ;
`;

// export const StyledFooter = styled.footer`
//   display: flex;
//   flex: 0 1 40px;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   box-sizing: border-box;
// `;

export const StyledPageInner = styled.div`
  max-width: 1200px;
  width: 100%;
`;
