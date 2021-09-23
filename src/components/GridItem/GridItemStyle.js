import styled from "styled-components";

export const StyledGridSquare = styled.div`
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  background-color: ${({ color }) => color};
`;
