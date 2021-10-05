import styled from "styled-components";

export const StyledGridSquare = styled.div`
  // border-radius: 2px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gridBorder};
  border-right: 1px solid ${({ theme }) => theme.colors.gridBorder};
  background-color: ${({ color }) => color};
  border-radius: 1px;
`;
