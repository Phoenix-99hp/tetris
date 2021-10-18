import React from "react";
import { StyledGridSquare } from "./GridItemStyle";

const GridItem = ({ color, border }) => (
  <StyledGridSquare border={border} color={color} />
);

export default GridItem;
