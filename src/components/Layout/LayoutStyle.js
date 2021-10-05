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
  padding: 10px;
  box-sizing: border-box;
`;

export const StyledMainContent = styled.main`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const StyledHeader = styled.header`
  display: flex;
  height: fit-content;
  flex: 0 1 60px;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  padding-bottom: 10px;
`;
