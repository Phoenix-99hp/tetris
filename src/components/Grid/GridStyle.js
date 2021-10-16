import styled, { keyframes, css } from "styled-components";

const flash = keyframes`
  0% {
    opacity: 0
  }
  50% {
    opacity: 1
  }
  100% {
   opacity: 0
  }
`;

export const StyledOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  border: 3px solid ${({ theme }) => theme.colors.gameBorder};
  border-radius: 5px;
`;

export const StyledGridContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-rows: repeat(20, ${({ theme }) => theme.squareSizes.medium}px);
  grid-template-columns: repeat(
    10,
    ${({ theme }) => theme.squareSizes.medium}px
  );
  border-top: 1px solid ${({ theme }) => theme.colors.gridBorder};
  border-left: 1px solid ${({ theme }) => theme.colors.gridBorder};
`;

export const StyledNextShapeContainer = styled.div`
  display: flex;
  // width: 100%;
  max-width: 300px;
  justify-content: center;
  align-self: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  width: 300px;

  > span {
    display: flex;
    flex: 1 1 100%;
    height: 40px;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
  }
`;

export const StyledNextShape = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 200px;
  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
`;

export const StyledNextShapeGrid = styled.div`
  display: grid;
  ${({ color }) =>
    color &&
    css`
      grid-template-rows: repeat(
        ${({ shape, theme }) => theme.nextShape[shape].rows},
        ${({ theme }) => theme.squareSizes.medium}px
      );
      grid-template-columns: repeat(
        ${({ shape, theme }) => theme.nextShape[shape].cols},
        ${({ theme }) => theme.squareSizes.medium}px
      );
    `};
  grid-gap: 1px;
`;

export const StyledScoreContainer = styled.div`
  display: flex;
  max-width: 300px;
  // width: 200px;
  // width: 100%;
  justify-content: center;
  align-self: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // position: relative;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: fit-content;
  align-items: center;
  justify-content: center;
  padding-top: 10px;

  > button {
    height: 25px;
    width: 75px;
    cursor: pointer;
  }
`;

export const StyledScore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 150px;
  width: 200px;
  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
`;

export const StyledToast = styled.div`
  opacity: 0;
  display: flex;
  flex: 1 1 100%;

  ${({ show }) =>
    show &&
    css`
      animation: ${flash} 0.7s ease;
    `}
`;

export const StyledToastValue = styled.span`
  font-size: 20px;
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.green};
`;

export const StyledScoreValueContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  height: 40px;

  // width: 200px;
  // position: absolute;
  // left: 0;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
`;

export const StyledScoreValue = styled.span`
  font-size: 25px;
  padding-left: 5px;
  color: ${({ theme }) => theme.colors.green};
`;
