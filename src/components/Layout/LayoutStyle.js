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
  height: 100%;
  // position: relative;
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
  font-size: 43px;
  // text-shadow: 1px 1px 1px blue;
  box-sizing: border-box;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.blue};

  > span {
    border-bottom: 3px solid ${({ theme }) => theme.colors.white};
    font-family: GeoramaSemiBoldItalic;
    text-shadow: 1px 1px 1px blue;
  }

  // > p {
  //   margin-top: 10px;
  //   font-size: 8px;
  //   color: ${({ theme }) => theme.colors.white};
  //   flex: 1 1 100%;
  // }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 20px 0;
  }

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.extraSmall}) {
    font-size: 30px;
    padding: 10px 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.unsupported.minWidth}) {
    // font-size: 30px;

    > span {
      border-bottom: none;
    }
  } ;
`;

export const StyledFooter = styled.footer`
  display: flex;
  height: 40px;
  // flex: 0 1 40px;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledPageInner = styled.div`
  max-width: 1200px;
  width: 100%;
`;
