import styled from "styled-components";

export const StyledOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  // border: 4px solid ${({ theme }) => theme.colors.gameBorder};
  // border-radius: 5px;
  // box-sizing: border-box;
  // padding: 1px 0 0 1px;
`;

// export const StyledInner = styled.div`
//   padding: 3px;
// `;

export const StyledGridContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  // grid-gap: 1px 1px;
  grid-template-rows: repeat(20, ${({ theme }) => theme.squareSizes.medium}px);
  grid-template-columns: repeat(
    10,
    ${({ theme }) => theme.squareSizes.medium}px
  );
  // border-radius: 5px;
  // border: 1px solid ${({ theme }) => theme.colors.gridBorder};
  border-top: 1px solid ${({ theme }) => theme.colors.gridBorder};
  border-left: 1px solid ${({ theme }) => theme.colors.gridBorder};
`;
