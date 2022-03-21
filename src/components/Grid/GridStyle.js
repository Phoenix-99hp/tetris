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
    padding-top: 5px;
  }
`;

export const StyledInner = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.gameBorder};
  border-radius: 5px;
  position: relative;
`;

// export const StyledDrawBorder = styled.div`
//   height: ${({ theme }) => theme.squareSizes.small}px;
//   width: ${({ theme }) => theme.squareSizes.small * 10}px;
//   box-sizing: border-box;
//   border: 2px solid red;
//   position: absolute;
//   top: 0;
// `;

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

  @media screen and (max-height: ${({ theme }) => theme.totalHeight.small}),
    screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
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
  width: 100%;
  justify-content: center;
  align-self: flex-start;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;

  > span {
    display: flex;
    flex: 1 1 100%;
    // height: 40px;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
  }

  ${({ hideAtSmallBP }) =>
    hideAtSmallBP === true &&
    css`
      display: flex;

      @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
        display: none;
      }
    `}

  ${({ hideAtSmallBP }) =>
    hideAtSmallBP === "reveal" &&
    css`
      display: none;

      @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
        display: flex;
        max-width: 100%;
        justify-content: between;
        flex: 1 1 100%;
        order: 3;
        align-items: center;

        > div {
          :nth-of-type(1) {
            order: 2;
          }
        }
      }

      @media screen and (max-width: ${({ theme }) =>
          theme.breakpoints.extraSmall}) {
        display: block;
        > div {
          margin: 20px auto auto auto;
          :nth-of-type(2) {
            order: 5;
            margin-top: 0;
          }
        }
      }
    `}
`;

export const StyledNextShape = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 200px;
  align-items: center;
  margin-top: 20px;
  height: ${({ controls }) => (controls ? "fit-content" : "130px")};
  // height: fit-content;
  // width: fit-content;
  width: 200px;
  width: 130px;
  box-sizing: content-box;
  height: 120px;
  ${({ border }) =>
    border &&
    css`
      border: 3px solid ${({ theme }) => theme.colors.white};
    `}
  // border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 10px;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};

  // &:nth-of-type(2) {
  //   height: fit-content;
  // }

  // > p {
  //   width: 100%;
  // }

  // > span {
  //   wi
  // }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    display: ${({ show }) => (show ? "flex" : "none")};
  }
`;

export const StyledNextShapeGrid = styled.div`
  display: grid;
  ${({ border }) =>
    border &&
    css`
      border-top: ${({ theme }) =>
        border.grid.top ? `1px solid ${theme.colors.gridBorder}` : "none"};
      border-bottom: ${({ theme }) =>
        border.grid.bottom ? `1px solid ${theme.colors.gridBorder}` : "none"};
      border-left: ${({ theme }) =>
        border.grid.left ? `1px solid ${theme.colors.gridBorder}` : "none"};
      border-right: ${({ theme }) =>
        border.grid.right ? `1px solid ${theme.colors.gridBorder}` : "none"};
    `}
  ${({ color }) =>
    color &&
    css`
      grid-template-rows: repeat(
        ${({ rows }) => rows},
        ${({ theme }) => theme.squareSizes.medium}px
      );
      grid-template-columns: repeat(
        ${({ cols }) => cols},
        ${({ theme }) => theme.squareSizes.medium}px
      );
    `};
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}),
    screen and (max-height: ${({ theme }) => theme.totalHeight.medium}) {
    ${({ color }) =>
      color &&
      css`
        grid-template-rows: repeat(
          ${({ rows }) => rows},
          ${({ theme }) => theme.squareSizes.small}px
        );
        grid-template-columns: repeat(
          ${({ cols }) => cols},
          ${({ theme }) => theme.squareSizes.small}px
        );
      `};
  }

  @media screen and (max-height: ${({ theme }) => theme.totalHeight.small}), {
    ${({ color }) =>
      color &&
      css`
        grid-template-rows: repeat(
          ${({ rows }) => rows},
          ${({ theme }) => theme.squareSizes.extraSmall}px
        );
        grid-template-columns: repeat(
          ${({ cols }) => cols},
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
          ${({ rows }) => rows},
          ${({ theme }) => theme.squareSizes.last}px
        );
        grid-template-columns: repeat(
          ${({ cols }) => cols},
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
    max-width: 200px;
    flex: 1 1 100%;
  }

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mediumSmall}) {
    max-width: 180px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.last}) {
    order: 1;
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  // width: fit-content;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  // padding-top: 10px;

  > button {
    height: 25px;
    max-width: 156px;
    cursor: pointer;
      border: 1px solid ${({ theme }) => theme.colors.white};
      flex: 1 1 100%;
      padding: 5px;
    height: 28px;

    }
  }
`;

export const StyledKeysStartPauseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: content-box;
  // width: 130px;
  max-width: 156px;
  width: 100%;
  justify-content: center;
  // border: 3px solid ${({ theme }) => theme.colors.white};
  // border-radius: 5px;
  padding: 40px 0 10px;

  > button {
    :nth-of-type(1) {
      border: 1px solid ${({ theme }) => theme.colors.white};
      // border-radius: 1px;
      flex: 1 1 100%;
      padding: 5px;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 20px;
  }
`;

export const StyledScore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  // height: 150px;
  width: 200px;
  // border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 100px;
    // height: 120px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    display: none;
  }
`;

export const StyledCountdown = styled.div`
  display: flex;
  flex: 1 1 100%;
  padding: 20px 0;
`;

export const StyledToast = styled.div`
  display: flex;
  flex: 1 1 100%;
  padding: 20px 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 0;
  }
`;

export const StyledToastValue = styled.span`
  opacity: ${({ show }) => (show ? "1" : "0")};
  font-size: 20px;
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.green};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    font-size: 18px;
  }
`;

export const StyledScoreValueContainer = styled.div`
  display: flex;
  // max-width: 300px;
  flex: 1 1 100%;
  align-items: center;
  justify-content: center;
  // height: 40px;
  position: relative;
  font-size: 20px;

  > h2 {
    position: relative;
  }

  // @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
  //   max-width: 200px;
  // }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: fit-content;
    max-width: 200px;
  }

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mediumSmall}) {
    max-width: 180px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding-bottom: 5px;
    > h2 {
      font-size: 18px;
    }
    > span {
      font-size: 18px;
    }
  }
`;

export const StyledScoreValue = styled.span`
  position: relative;
  // font-size: 20px;
  padding-left: 5px;
  max-width: calc(300px - 70px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.green};

  // @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
  //   font-size: 20px;
  // }
`;

// export const StyledHeading = styled.h2`
//   // font-weight: normal;
//   // margin: 0;
//   // font-size: 25px;
// `;

export const StyledSideColumn = styled.div`
display: flex;
justify-content: center;
flex 1 1 100%;
flex-wrap: wrap;
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

export const StyledMessageContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  position: absolute;
  top: 50%;
  transform: translateY(calc(-50% - 150px));
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  padding: 10px;
  // height: 200px;
  // height: 100%;
  flex-wrap: wrap;
  border: 2px solid ${({ theme }) => theme.colors.red};
  border-radius: 5px;
  max-width: 300px;
  > p {
    flex: 1 1 100%;
    font-size: 12px;
  }
`;

export const StyledGameOver = styled.h2`
  padding-bottom: 20px;
  color: ${({ theme }) => theme.colors.red};
  font-size: 25px;
  flex: 1 1 100%;
`;

export const StyledFinalScoreHeading = styled.h2`
  padding: 0 0 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledControlsContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  // flex: 1 1 100%;
  // height: 150px;
  // width: 200px;
  // max-width: 300px;
  // display: flex;
  // align-items: center;
  // justify-content: center;

  > a {
    font-size: 20px;
    cursor: pointer;
    height: fit-content;
    // &:hover {
    //   color: ${({ theme }) => theme.colors.blue};
    // }
  }

  // @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
  //   max-width: 200px;
  // }
`;

export const StyledControlsInner = styled.div``;

export const StyledControlsHeading = styled.h2`
  // &:hover {
  //   color: ${({ theme }) => theme.colors.blue};
  // }

  > button {
    width: 115px;
  }
`;

export const StyledMoveRotateContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1 1 100%;
  // padding: 5px;
  flex-wrap: wrap;
  width: fit-content;

  &:first-of-type {
    padding-bottom: 5px;
  }

  > span {
    padding-left: 5px;
    color: ${({ theme }) => theme.colors.purple};
  }

  // @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
  //   > span {
  //     padding: 0;
  //     margin: 0 auto;
  //   }
  // }
`;

export const StyledButtonControls = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.white};
`;

export const StyledChangeControls = styled.div`
  font-size: 10px;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-end;
  justify-content: center;

  > span {
    flex: 1 1 100%;
    padding-bottom: 2px;
  }

  > button {
    color: ${({ theme }) => theme.colors.blue};
    background: none;
    outline: none;
    border: none;
    font-size: 10px;
    font-family: "GeoramaLight";
    text-decoration: underline;
    cursor: pointer;
    // &:hover {
    //   opacity: 0.7;
    // }
  }
`;

export const StyledButtonControlGroup = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-wrap: wrap;


  :nth-of-type(2) {
    margin-top: 10px;
    flex: 1 1 100%;
  }

    > button {
      // font-size: 30px;
      flex: 1 1 100%;
      padding: 5px;
      :last-of-type {
        border: 1px solid ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export const StyledDownContainer = styled.div`
  // border: 1px solid blue;
  flex: 1 1 100%;

  // > button {
  //   font-size: 30px;
  //   height: 30px;
  //   width: 30px;
  //   padding: 5px;
  // }

  > span {
    cursor: pointer;
    font-size: 30px;
    height: 30px;
    width: 30px;
    padding: 5px;
    box-sizing: border-box;
  }

  // display: flex;
  // flex-wrap: wrap;
`;

export const StyledLeftRightContainer = styled.div`
  // border: 1px solid red;
  display: flex;
  flex: 1 1 100%;
  justify-content: space-between;
  cursor: pointer;

  // > button {
  //   // margin: 0 10px;
  //   font-size: 30px;
  //   height: 30px;
  //   width: 30px;
  //   padding: 5px;
  // }

  > span {
    display: flex;
    align-items: center;
    font-size: 30px;
    height: 30px;
    width: 30px;
    padding: 5px;
    box-sizing: border-box;
  }
`;

export const StyledStartPauseButton = styled.button`
  margin-bottom: 20px;

  // &:hover {
  //   background-color: ${({ theme }) => theme.colors.green};
  // }
`;

export const StyledButtonWrapper = styled.div`
  border: 2px solid green;
  padding: 2px;
`;

export const StyledControlsButton = styled.button`
  color: #2ac3de;
  background: none;
  outline: none;
  padding: 0;
  border: none;
  font-size: 10px;
  font-family: "GeoramaLight";
  text-decoration: underline;

  // &:hover {
  //   opacity: 0.7;
  // }
`;

export const StyledShowHideControlsButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.white};
  padding: 5px;
  flex: 1 1 100%;
`;

export const StyledControlsButtonWrapper = styled.div`
  height: 28px;
  display: flex;
  flex: 1 1 100%;
  justify-content: space-between;
`;
