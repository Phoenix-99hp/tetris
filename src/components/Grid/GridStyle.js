import styled from "styled-components";

export const StyledOuter = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
`;

export const StyledGridContainer = styled.div`\
  display: grid;
  grid-gap: 0;
  grid-template-rows: repeat(20, ${({ theme }) => theme.squareSizes.large}px);
  grid-template-columns: repeat(
    10,
    ${({ theme }) => theme.squareSizes.large}px
  );
  border-top: 1px solid white;
  border-left: 1px solid white;
`;
