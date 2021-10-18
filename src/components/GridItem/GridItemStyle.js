import styled, { css } from "styled-components";

export const StyledGridSquare = styled.div`
  box-sizing: border-box;
  background-color: ${({ color }) => color};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gridBorder};
  border-right: 1px solid ${({ theme }) => theme.colors.gridBorder};
  ${({ border }) =>
    border &&
    css`
      border-top: ${({ border }) =>
        border.squares.top ? border.squares.top : "none"};
      border-left: ${({ border }) =>
        border.squares.left ? border.squares.left : "none"};
      border-right: ${({ border }) =>
        border.squares.right ? border.squares.right : "none"};
      border-bottom: ${({ border }) =>
        border.squares.bottom ? border.squares.bottom : "none"};
    `}
`;
