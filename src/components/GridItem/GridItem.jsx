import React from "react";
import { StyledGridSquare } from "./GridItemStyle";

const GridItem = ({ color, next }) => (
  <StyledGridSquare next={next} color={color} />
);

export default GridItem;
