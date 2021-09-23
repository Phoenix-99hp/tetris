import React, { useEffect, useReducer } from "react";
import { StyledOuter, StyledGridContainer } from "./GridStyle";
import GridItem from "../GridItem/GridItem.jsx";

const Grid = () => {
  const [activeShape, setActiveShape] = useState(null);

  const [activeOrientation, setActiveOrientation] = useState(null);
  const [activeStartingCoordinates, setActiveStartingCoordinates] =
    useState(null);

  const numOfSquares = 200;
  const squares = [];

  for (let i = 0; i < numOfSquares; i++) {
    squares.push(1);
  }

  const determineShape = () => {
    let shapeNumber = Math.floor(Math.random() * 5);
    console.log(shapeNumber, typeof shapeNumber);
    switch (shapeNumber) {
      case 0:
        setActiveShape({ num: 0, color: "red" });
        break;
      case 1:
        setActiveShape({ num: 1, color: "yellow" });
        break;
      case 2:
        setActiveShape({ num: 2, color: "green" });
        break;
      case 3:
        setActiveShape({ num: 3, color: "purple" });
        break;
      case 4:
        setActiveShape({ num: 4, color: "blue" });
        break;
      // default:
      //   setActiveShape(null);
    }
  };

  const determineOrientation = () => {
    let orientationNumber = Math.floor(Math.random() * 5);
    switch (orientationNumber) {
      case 0:
        setActiveOrientation(0);
        break;
      case 1:
        setActiveOrientation(1);
        break;
      case 2:
        setActiveOrientation(2);
        break;
      case 3:
        setActiveOrientation(3);
        break;
      default:
        setActiveOrientation(null);
    }
  };

  const determineStartingCoordinates = (shape, orientation) => {
    if (shape === 0) {
      // square
      activeStartingCoordinates = [4, 5, 14, 15];
    } else if (shape === 1) {
      // line
      if (orientation === 0 || orientation === 2) {
        activeStartingCoordinates = [3, 4, 5, 6];
      } else {
        activeStartingCoordinates = [4, 14, 24, 34];
      }
    } else if (shape === 2) {
      const Ldirection = Math.floor(Math.random() * 2);
      // L
      if (Ldirection === 0) {
        if (orientation === 0) {
          activeStartingCoordinates = [3, 4, 5, 15];
        } else if (orientation === 1) {
          activeStartingCoordinates = [4, 14, 23, 24];
        } else if (orientation === 2) {
          activeStartingCoordinates = [3, 13, 14, 15];
        } else if (orientation === 3) {
          activeStartingCoordinates = [4, 5, 14, 24];
        }
      } else {
        if (orientation === 0) {
          activeStartingCoordinates = [5, 13, 14, 15];
        } else if (orientation === 1) {
          activeStartingCoordinates = [4, 14, 24, 25];
        } else if (orientation === 2) {
          activeStartingCoordinates = [13, 14, 15, 23];
        } else if (orientation === 3) {
          activeStartingCoordinates = [4, 5, 15, 25];
        }
      }
    } else if (shape === 3) {
      // Z
      const Zdirection = Math.floor(Math.random() * 2);
      if (Zdirection === 0) {
        if (orientation === 0 || orientation === 2) {
          activeStartingCoordinates = [4, 5, 13, 14];
        } else if (orientation === 1 || orientation === 3) {
          activeStartingCoordinates = [4, 14, 15, 25];
        }
      } else {
        if (orientation === 0 || orientation === 2) {
          activeStartingCoordinates = [3, 4, 14, 15];
        } else if (orientation === 1 || orientation === 3) {
          activeStartingCoordinates = [5, 14, 15, 24];
        }
      }
    } else if (shape === 4) {
      //camel
      if (orientation === 0) {
        activeStartingCoordinates = [3, 4, 5, 14];
      } else if (orientation === 1) {
        activeStartingCoordinates = [4, 13, 14, 24];
      } else if (orientation === 2) {
        activeStartingCoordinates = [4, 13, 14, 15];
      } else {
        activeStartingCoordinates = [4, 14, 15, 24];
      }
    }
  };

  const slideShape = () => {
    console.log(activeStartingCoordinates);
    setTimeout(() => {
      setActiveStartingCoordinates(
        activeStartingCoordinates.map(coordinate => coordinate - 10)
      );
    }, 2000);
  };

  useEffect(() => {
    setActiveShape({ num: 0, color: "red" });
    console.log(activeShape);
    determineShape();
    console.log(activeShape);
  }, []);

  useEffect(() => {
    determineOrientation();
    console.log(activeShape);
  }, [activeShape]);

  useEffect(() => {
    console.log(activeShape);
    determineStartingCoordinates(activeShape.num, activeOrientation);
  }, [activeOrientation]);

  useEffect(() => {
    slideShape();
  }, [activeStartingCoordinates]);

  return (
    <StyledOuter>
      <StyledGridContainer>
        {squares.map((square, index) => (
          <GridItem
            color={
              activeStartingCoordinates &&
              activeStartingCoordinates.includes(index)
                ? activeShape.color
                : "black"
            }
            key={index}
          />
        ))}
      </StyledGridContainer>
    </StyledOuter>
  );
};
export default Grid;
