import styled from "styled-components";

export const StyledPageContainer = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  height: 100%;
  text-align: center;
  width: 100vw;
  background-color: black;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`;

export const StyledMainContent = styled.main`
  // height: 100%;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  // flex: 1 1 100%;
  position: relative;
  background-color: #070707;
  justify-content: center;
  align-items: center;
`;

export const StyledHeader = styled.header`
  display: flex;
  height: fit-content;
  flex: 0 1 60px;
  justify-content: center;
  align-items: center;
  background-color: #070707;
  width: 100%;
  color: white;
  padding-bottom: 10px;
`;
