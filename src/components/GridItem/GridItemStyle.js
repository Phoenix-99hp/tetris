import styled, { css } from "styled-components";

export const StyledGridSquare = styled.div`
  box-sizing: border-box;
  background-color: ${({ color }) => color};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gridBorder};
  border-right: 1px solid ${({ theme }) => theme.colors.gridBorder};
  ${({ next }) =>
    next &&
    css`
      border: none;
    `};
`;
