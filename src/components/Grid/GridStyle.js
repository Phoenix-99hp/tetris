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
  flex: 1 1 100%;
  justify-content: center;
  align-self: start;
  height: fit-content;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    order: 2;
    padding-top: 30px;
  }
`;

export const StyledInner = styled.div`
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

  @media screen and (max-height: ${({ theme }) => theme.totalHeight.medium}),
    screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    grid-template-rows: repeat(20, ${({ theme }) => theme.squareSizes.small}px);
    grid-template-columns: repeat(
      10,
      ${({ theme }) => theme.squareSizes.small}px
    );
  }

  @media screen and (max-height: ${({ theme }) => theme.totalHeight.small}) {
    grid-template-rows: repeat(
      20,
      ${({ theme }) => theme.squareSizes.extraSmall}px
    );
    grid-template-columns: repeat(
      10,
      ${({ theme }) => theme.squareSizes.extraSmall}px
    );
  }

  @media screen and (max-height: ${({ theme }) =>
      theme.totalHeight.extraSmall}),
    screen and (max-width: ${({ theme }) => theme.breakpoints.extraSmall}) {
    grid-template-rows: repeat(20, ${({ theme }) => theme.squareSizes.last}px);
    grid-template-columns: repeat(
      10,
      ${({ theme }) => theme.squareSizes.last}px
    );
  }
`;

export const StyledNextShapeContainer = styled.div`
  display: flex;
  max-width: 300px;
  justify-content: center;
  align-self: flex-start;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;

  > span {
    display: flex;
    flex: 1 1 100%;
    height: 40px;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    max-width: 200px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    display: none;
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 100px;
    height: 120px;
  }
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}),
    screen and (max-height: ${({ theme }) => theme.totalHeight.medium}), {
    ${({ color }) =>
      color &&
      css`
        grid-template-rows: repeat(
          ${({ shape, theme }) => theme.nextShape[shape].rows},
          ${({ theme }) => theme.squareSizes.small}px
        );
        grid-template-columns: repeat(
          ${({ shape, theme }) => theme.nextShape[shape].cols},
          ${({ theme }) => theme.squareSizes.small}px
        );
      `};
  }

  @media screen and (max-height: ${({ theme }) => theme.totalHeight.small}), {
    ${({ color }) =>
      color &&
      css`
        grid-template-rows: repeat(
          ${({ shape, theme }) => theme.nextShape[shape].rows},
          ${({ theme }) => theme.squareSizes.extraSmall}px
        );
        grid-template-columns: repeat(
          ${({ shape, theme }) => theme.nextShape[shape].cols},
          ${({ theme }) => theme.squareSizes.extraSmall}px
        );
      `};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.extraSmall}),
    screen and (max-height: ${({ theme }) => theme.totalHeight.extraSmall}), {
    ${({ color }) =>
      color &&
      css`
        grid-template-rows: repeat(
          ${({ shape, theme }) => theme.nextShape[shape].rows},
          ${({ theme }) => theme.squareSizes.last}px
        );
        grid-template-columns: repeat(
          ${({ shape, theme }) => theme.nextShape[shape].cols},
          ${({ theme }) => theme.squareSizes.last}px
        );
      `};
  }
`;

export const StyledScoreContainer = styled.div`
  display: flex;
  max-width: 300px;
  justify-content: center;
  align-self: flex-start;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    // max-width: 200px;
    flex: 1 1 100%;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.last}) {
    order: 1;
  }
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
  // border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 100px;
    height: 120px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    display: none;
  }
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
  // max-width: 300px;
  flex: 1 1 100%;
  align-items: center;
  justify-content: center;
  height: 40px;
  position: relative;

  > h2 {
    position: relative;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    // max-width: 200px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: fit-content;
  }
`;

export const StyledScoreValue = styled.span`
  position: relative;
  font-size: 25px;
  padding-left: 5px;
  max-width: calc(300px - 70px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.green};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    font-size: 20px;
  }
`;

export const StyledHeading = styled.h2`
  font-weight: normal;
  margin: 0;
  font-size: 25px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    font-size: 20px;
  }
`;

export const StyledSideColumn = styled.div`
display: flex;
justify-content: center;
flex 1 1 100%;
padding: 10px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
box-sizing: border-box;

@media screen and (max-width: ${({ theme }) => theme.breakpoints.small}){
  padding: 0 10px;
  :nth-of-type(1) {
    display: none;
  }
}`;

export const StyledUnsupportedContainer = styled.div`
  display: flex;
  border: 2px solid red;
`;
