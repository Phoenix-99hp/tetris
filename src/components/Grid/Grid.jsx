import React, { useEffect, useRef, useReducer, useCallback } from "react";
import { useTheme } from "styled-components";
import { StyledOuter, StyledInner, StyledGridContainer } from "./GridStyle";
import GridItem from "../GridItem/GridItem.jsx";

const generateSquares = () => {
  const generated = [];
  let currentRow = 0;
  for (let i = 0; i < 200; i++) {
    i % 10 === 0 && i < 100
      ? (currentRow = parseInt(i.toString().charAt(0)))
      : i % 10 === 0 && i > 99
      ? (currentRow = parseInt(i.toString().slice(0, 2)))
      : currentRow;
    if (i.toString().endsWith("0")) {
      generated.push({
        edge: "left",
        row: currentRow,
        coordinate: null
      });
    } else if (i.toString().endsWith("9")) {
      generated.push({
        edge: "right",
        row: currentRow,
        coordinate: null
      });
    } else {
      generated.push({ row: currentRow, coordinate: null });
    }
  }
  return generated;
};

const generated = generateSquares();

const initialState = {
  activeShape: { num: null, color: null },
  activeOrientation: null,
  activeCoordinates: null,
  shouldUpdateCoordinates: true,
  shouldGenerateNewShape: true,
  squares: generated,
  keyPressed: false,
  direction: null,
  squaresToReset: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHECK_FOR_FULL_ROWS":
      const coordinateRow = [];
      const rowsToReset = [];
      state.activeCoordinates.forEach(coordinate => {
        let filtered = state.squares.filter(
          square =>
            square.coordinate && state.squares[coordinate].row == square.row
        );
        if (filtered[9] && !coordinateRow.includes(filtered[9].row)) {
          coordinateRow.push(filtered[9].row);
          rowsToReset.push(filtered);
        }
      });
      if (rowsToReset[0]) {
        rowsToReset.forEach(arr => {
          arr.forEach(square => {
            if (state.squares.includes(square)) {
              state.squares.splice(state.squares.indexOf(square), 1, {
                ...square,
                coordinate: null,
                color: "black"
              });
            }
          });
        });
        const highestResetRow = rowsToReset[0][0].row;
        const numberOfRowsReset = rowsToReset.length;
        for (let i = 199; i > 0; i--) {
          if (state.squares[i].row < highestResetRow) {
            state.squares.splice(i + numberOfRowsReset * 10, 1, {
              ...state.squares[i],
              row: state.squares[i].row + numberOfRowsReset,
              coordinate: state.squares[i].coordinate
                ? state.squares[i].coordinate + numberOfRowsReset * 10
                : null
            });
          }
        }
      }
    case "SET_ACTIVE_SHAPE":
      const shape = determineShape();
      const orientation = determineOrientation();
      const direction =
        shape.num === 2 || shape.num === 3
          ? Math.floor(Math.random() * 2)
          : null;
      const coordinates = determineStartingCoordinates(
        shape.num,
        orientation,
        direction
      );
      // console.log(state.squares, "STATE SQUARES");
      let filtered = state.squares.filter(
        square => square.coordinate && coordinates.includes(square.coordinate)
      );
      if (filtered[0]) {
        // if (filtered[0] && filtered.filter(coordinate => coordinate < 10)[0]) {
        //   return {
        //     ...state,
        //     gameOver: true
        //   };
        // } else if (filtered[0]) {
        //   filtered.forEach(overlapping =>
        //     coordinates.splice(coordinates.indexOf(overlapping.coordinate), 1)
        //   );
        //   coordinates.forEach(coordinate => {
        //     if (
        //       coordinate < filtered[0].coordinate &&
        //       coordinate + 10 <= filtered[0].coordinate
        //     ) {
        //       console.log("CHECK");
        //       state.squares.splice(state.squares.indexOf(coordinate), 1, {
        //         coordinate: coordinate,
        //         color: shape.color
        //       });
        //     }
        //   });
        return {
          ...state,
          gameOver: true
        };
      } else {
        return {
          ...state,
          activeShape: shape,
          activeOrientation: orientation,
          activeCoordinates: coordinates,
          shouldGenerateNewShape: false,
          shouldUpdateCoordinates: true,
          direction: direction
        };
      }
    case "SLIDE_COORDINATES":
      if (
        !state.activeCoordinates.filter(
          coordinate =>
            coordinate > 189 || state.squares[coordinate + 10].coordinate
        )[0]
      ) {
        const newSlideCoordinates = state.activeCoordinates.map(
          coordinate => coordinate + 10
        );
        return {
          ...state,
          keyPressed: false,
          activeCoordinates: newSlideCoordinates
        };
      } else {
        return {
          ...state,
          squares: state.squares.map((square, i) =>
            state.activeCoordinates.includes(i)
              ? {
                  ...square,
                  coordinate: i,
                  color: state.activeShape.color
                }
              : { ...square }
          ),
          shouldGenerateNewShape: true,
          keyPressed: false
        };
      }
    case "TRIGGER_MANUAL_DOWN":
      if (
        !state.activeCoordinates.filter(
          coordinate =>
            coordinate > 189 || state.squares[coordinate + 10].coordinate
        )[0]
      ) {
        const manualCoordinates = state.activeCoordinates.map(
          coordinate => coordinate + 10
        );
        return {
          ...state,
          keyPressed: true,
          activeCoordinates: manualCoordinates
        };
      } else {
        return {
          ...state,
          squares: state.squares.map((square, i) =>
            state.activeCoordinates.includes(i)
              ? {
                  ...square,
                  coordinate: i,
                  color: state.activeShape.color
                }
              : { ...square }
          ),
          shouldGenerateNewShape: true,
          keyPressed: true
        };
      }
    case "TRIGGER_MANUAL_RIGHT":
      if (state.activeCoordinates.filter(coordinate => coordinate > 189)[0]) {
        return {
          ...state,
          squares: state.squares.map((square, i) =>
            state.activeCoordinates.includes(i)
              ? {
                  ...square,
                  coordinate: i,
                  color: state.activeShape.color
                }
              : { ...square }
          ),
          shouldGenerateNewShape: true,
          keyPressed: true
        };
      } else if (
        !state.activeCoordinates.filter(
          coordinate =>
            state.squares[coordinate + 1].coordinate ||
            state.squares[coordinate].edge === "right"
        )[0]
      ) {
        const rightCoordinates = state.activeCoordinates.map(
          coordinate => coordinate + 1
        );
        return {
          ...state,
          keyPressed: true,
          activeCoordinates: rightCoordinates
        };
      } else {
        return {
          ...state,
          keyPressed: true
        };
      }
    case "TRIGGER_MANUAL_LEFT":
      if (state.activeCoordinates.filter(coordinate => coordinate > 189)[0]) {
        return {
          ...state,
          squares: state.squares.map((square, i) =>
            state.activeCoordinates.includes(i)
              ? {
                  ...square,
                  coordinate: i,
                  color: state.activeShape.color
                }
              : { ...square }
          ),
          shouldGenerateNewShape: true,
          keyPressed: true
        };
      } else if (
        !state.activeCoordinates.filter(
          coordinate =>
            state.squares[coordinate - 1].coordinate ||
            state.squares[coordinate].edge === "left"
        )[0]
      ) {
        const leftCoordinates = state.activeCoordinates.map(
          coordinate => coordinate - 1
        );
        return {
          ...state,
          keyPressed: true,
          activeCoordinates: leftCoordinates
        };
      } else {
        return {
          ...state,
          keyPressed: true
        };
      }
    case "TRIGGER_MANUAL_ROTATE":
      if (state.activeCoordinates.filter(coordinate => coordinate > 189)[0]) {
        return {
          ...state,
          squares: state.squares.map((square, i) =>
            state.activeCoordinates.includes(i)
              ? {
                  ...square,
                  coordinate: i,
                  color: state.activeShape.color
                }
              : { ...square }
          ),
          shouldGenerateNewShape: true,
          keyPressed: true
        };
      } else if (state.activeShape.num === 1) {
        if (state.activeOrientation === 0 || state.activeOrientation === 2) {
          let sortedNewCoordinates = state.activeCoordinates
            .map((coordinate, index) => {
              if (index === 0) {
                return coordinate - 9;
              } else if (index === 1) {
                return coordinate;
              } else if (index === 2) {
                return coordinate + 9;
              } else if (index === 3) {
                return coordinate + 18;
              }
            })
            .sort((a, b) => a - b);
          let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            coordinate =>
              coordinate.toString().endsWith("9") &&
              sortedNewCoordinates.filter(newCoordinate =>
                newCoordinate.toString().endsWith("0")
              ).length >= 1
          )[0]
            ? true
            : false;
          return {
            ...state,
            keyPressed: true,
            activeOrientation: shouldUpdateToNewCoordinates ? 1 : 0,
            activeCoordinates: shouldUpdateToNewCoordinates
              ? sortedNewCoordinates
              : state.activeCoordinates
          };
        } else {
          let sortedNewCoordinates = state.activeCoordinates
            .map((coordinate, index) => {
              if (index === 0) {
                return coordinate + 9;
              } else if (index === 1) {
                return coordinate;
              } else if (index === 2) {
                return coordinate - 9;
              } else if (index === 3) {
                return coordinate - 18;
              }
            })
            .sort((a, b) => a - b);
          let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            coordinate =>
              coordinate.toString().endsWith("9") &&
              sortedNewCoordinates.filter(newCoordinate =>
                newCoordinate.toString().endsWith("0")
              ).length >= 1
          )[0]
            ? true
            : false;
          return {
            ...state,
            keyPressed: true,
            activeOrientation: shouldUpdateToNewCoordinates ? 0 : 1,
            activeCoordinates: shouldUpdateToNewCoordinates
              ? sortedNewCoordinates
              : state.activeCoordinates
          };
        }
      } else if (state.activeShape.num === 2) {
        if (state.direction === 0) {
          if (state.activeOrientation === 0) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate - 9;
                } else if (index === 1) {
                  return coordinate;
                } else if (index === 2) {
                  return coordinate + 9;
                } else if (index === 3) {
                  return coordinate - 2;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 1 : 0,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          } else if (state.activeOrientation === 1) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate + 11;
                } else if (index === 1) {
                  return coordinate;
                } else if (index === 2) {
                  return coordinate - 20;
                } else if (index === 3) {
                  return coordinate - 11;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 2 : 1,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          } else if (state.activeOrientation === 2) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate + 2;
                } else if (index === 1) {
                  return coordinate - 9;
                } else if (index === 2) {
                  return coordinate;
                } else if (index === 3) {
                  return coordinate + 9;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 3 : 2,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          } else if (state.activeOrientation === 3) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate + 11;
                } else if (index === 1) {
                  return coordinate + 20;
                } else if (index === 2) {
                  return coordinate;
                } else if (index === 3) {
                  return coordinate - 11;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 0 : 3,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          }
        } else {
          if (state.activeOrientation === 0) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate + 20;
                } else if (index === 1) {
                  return coordinate - 9;
                } else if (index === 2) {
                  return coordinate;
                } else if (index === 3) {
                  return coordinate + 9;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 1 : 0,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          } else if (state.activeOrientation === 1) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate + 11;
                } else if (index === 1) {
                  return coordinate;
                } else if (index === 2) {
                  return coordinate - 11;
                } else if (index === 3) {
                  return coordinate - 2;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 2 : 1,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          } else if (state.activeOrientation === 2) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate - 9;
                } else if (index === 1) {
                  return coordinate;
                } else if (index === 2) {
                  return coordinate + 9;
                } else if (index === 3) {
                  return coordinate - 20;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 3 : 2,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          } else if (state.activeOrientation === 3) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate + 2;
                } else if (index === 1) {
                  return coordinate + 11;
                } else if (index === 2) {
                  return coordinate;
                } else if (index === 3) {
                  return coordinate - 11;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 0 : 3,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          }
        }
      } else if (state.activeShape.num === 3) {
        if (state.direction === 0) {
          if (state.activeOrientation === 0 || state.activeOrientation === 2) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate;
                } else if (index === 1) {
                  return coordinate + 20;
                } else if (index === 2) {
                  return coordinate + 2;
                } else if (index === 3) {
                  return coordinate;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 1 : 0,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          } else if (
            state.activeOrientation === 1 ||
            state.activeOrientation === 3
          ) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate;
                } else if (index === 1) {
                  return coordinate;
                } else if (index === 2) {
                  return coordinate - 10;
                } else if (index === 3) {
                  return coordinate - 12;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 0 : 1,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          }
        } else {
          if (state.activeOrientation === 0 || state.activeOrientation === 2) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate + 21;
                } else if (index === 1) {
                  return coordinate + 1;
                } else if (index === 2) {
                  return coordinate;
                } else if (index === 3) {
                  return coordinate;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 1 : 0,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          } else if (
            state.activeOrientation === 1 ||
            state.activeOrientation === 3
          ) {
            let sortedNewCoordinates = state.activeCoordinates
              .map((coordinate, index) => {
                if (index === 0) {
                  return coordinate - 2;
                } else if (index === 1) {
                  return coordinate;
                } else if (index === 2) {
                  return coordinate;
                } else if (index === 3) {
                  return coordinate - 20;
                }
              })
              .sort((a, b) => a - b);
            let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
              coordinate =>
                coordinate.toString().endsWith("9") &&
                sortedNewCoordinates.filter(newCoordinate =>
                  newCoordinate.toString().endsWith("0")
                ).length >= 1
            )[0]
              ? true
              : false;
            return {
              ...state,
              keyPressed: true,
              activeOrientation: shouldUpdateToNewCoordinates ? 0 : 1,
              activeCoordinates: shouldUpdateToNewCoordinates
                ? sortedNewCoordinates
                : state.activeCoordinates
            };
          }
        }
      } else if (state.activeShape.num === 4) {
        if (state.activeOrientation === 0) {
          let sortedNewCoordinates = state.activeCoordinates
            .map((coordinate, index) => {
              if (index === 0) {
                return coordinate;
              } else if (index === 1) {
                return coordinate;
              } else if (index === 2) {
                return coordinate - 11;
              } else if (index === 3) {
                return coordinate;
              }
            })
            .sort((a, b) => a - b);
          let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            coordinate =>
              coordinate.toString().endsWith("9") &&
              sortedNewCoordinates.filter(newCoordinate =>
                newCoordinate.toString().endsWith("0")
              ).length >= 1
          )[0]
            ? true
            : false;
          return {
            ...state,
            keyPressed: true,
            activeOrientation: shouldUpdateToNewCoordinates ? 1 : 0,
            activeCoordinates: shouldUpdateToNewCoordinates
              ? sortedNewCoordinates
              : state.activeCoordinates
          };
        } else if (state.activeOrientation === 1) {
          let sortedNewCoordinates = state.activeCoordinates
            .map((coordinate, index) => {
              if (index === 0) {
                return coordinate;
              } else if (index === 1) {
                return coordinate;
              } else if (index === 2) {
                return coordinate;
              } else if (index === 3) {
                return coordinate - 9;
              }
            })
            .sort((a, b) => a - b);
          let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            coordinate =>
              coordinate.toString().endsWith("9") &&
              sortedNewCoordinates.filter(newCoordinate =>
                newCoordinate.toString().endsWith("0")
              ).length >= 1
          )[0]
            ? true
            : false;
          return {
            ...state,
            keyPressed: true,
            activeOrientation: shouldUpdateToNewCoordinates ? 2 : 1,
            activeCoordinates: shouldUpdateToNewCoordinates
              ? sortedNewCoordinates
              : state.activeCoordinates
          };
        } else if (state.activeOrientation === 2) {
          let sortedNewCoordinates = state.activeCoordinates
            .map((coordinate, index) => {
              if (index === 0) {
                return coordinate;
              } else if (index === 1) {
                return coordinate + 11;
              } else if (index === 2) {
                return coordinate;
              } else if (index === 3) {
                return coordinate;
              }
            })
            .sort((a, b) => a - b);
          let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            coordinate =>
              coordinate.toString().endsWith("9") &&
              sortedNewCoordinates.filter(newCoordinate =>
                newCoordinate.toString().endsWith("0")
              ).length >= 1
          )[0]
            ? true
            : false;
          return {
            ...state,
            keyPressed: true,
            activeOrientation: shouldUpdateToNewCoordinates ? 3 : 2,
            activeCoordinates: shouldUpdateToNewCoordinates
              ? sortedNewCoordinates
              : state.activeCoordinates
          };
        } else if (state.activeOrientation === 3) {
          let sortedNewCoordinates = state.activeCoordinates
            .map((coordinate, index) => {
              if (index === 0) {
                return coordinate + 9;
              } else if (index === 1) {
                return coordinate;
              } else if (index === 2) {
                return coordinate;
              } else if (index === 3) {
                return coordinate;
              }
            })
            .sort((a, b) => a - b);
          let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            coordinate =>
              coordinate.toString().endsWith("9") &&
              sortedNewCoordinates.filter(newCoordinate =>
                newCoordinate.toString().endsWith("0")
              ).length >= 1
          )[0]
            ? true
            : false;
          return {
            ...state,
            keyPressed: true,
            activeOrientation: shouldUpdateToNewCoordinates ? 0 : 3,
            activeCoordinates: shouldUpdateToNewCoordinates
              ? sortedNewCoordinates
              : state.activeCoordinates
          };
        }
      }
      return {
        ...state,
        keyPressed: true
      };

    case "KEYUP":
      return {
        ...state,
        keyPressed: false
      };
    default: {
      return {
        ...state
      };
    }
  }
};

const determineShape = () => {
  const shapeNumber = Math.floor(Math.random() * 5);
  switch (shapeNumber) {
    case 0:
      return { num: 0, color: "blue" };
    case 1:
      return { num: 1, color: "red" };
    case 2:
      return { num: 2, color: "purple" };
    case 3:
      return { num: 3, color: "orange" };
    case 4:
      return { num: 4, color: "green" };
  }
};

const determineOrientation = () => {
  return Math.floor(Math.random() * 4);
};

const determineStartingCoordinates = (shape, orientation, direction) => {
  if (shape === 0) {
    // square
    return [4, 5, 14, 15];
  } else if (shape === 1) {
    // line
    if (orientation === 0 || orientation === 2) {
      return [3, 4, 5, 6];
    } else {
      return [4, 14, 24, 34];
    }
  } else if (shape === 2) {
    // L
    if (direction === 0) {
      if (orientation === 0) {
        return [3, 4, 5, 15];
      } else if (orientation === 1) {
        return [4, 14, 23, 24];
      } else if (orientation === 2) {
        return [3, 13, 14, 15];
      } else if (orientation === 3) {
        return [4, 5, 14, 24];
      }
    } else {
      if (orientation === 0) {
        return [5, 13, 14, 15];
      } else if (orientation === 1) {
        return [4, 14, 24, 25];
      } else if (orientation === 2) {
        return [3, 4, 5, 13];
      } else if (orientation === 3) {
        return [4, 5, 15, 25];
      }
    }
  } else if (shape === 3) {
    // Z
    if (direction === 0) {
      if (orientation === 0 || orientation === 2) {
        return [4, 5, 13, 14];
      } else if (orientation === 1 || orientation === 3) {
        return [4, 14, 15, 25];
      }
    } else {
      if (orientation === 0 || orientation === 2) {
        return [3, 4, 14, 15];
      } else if (orientation === 1 || orientation === 3) {
        return [5, 14, 15, 24];
      }
    }
  } else if (shape === 4) {
    //camel
    if (orientation === 0) {
      return [3, 4, 5, 14];
    } else if (orientation === 1) {
      return [4, 13, 14, 24];
    } else if (orientation === 2) {
      return [4, 13, 14, 15];
    } else {
      return [4, 14, 15, 24];
    }
  }
};

const Grid = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(false);
  const theme = useTheme();

  const keydownHandler = useCallback(e => {
    e.stopImmediatePropagation();
    if (!state.keyPressed) {
      switch (e.keyCode) {
        case 40: // arrowdown
          return dispatch({ type: "TRIGGER_MANUAL_DOWN" });
        case 39: // arrowright
          return dispatch({ type: "TRIGGER_MANUAL_RIGHT" });
        case 37: //arrowleft
          return dispatch({ type: "TRIGGER_MANUAL_LEFT" });
        case 32: // spacebar;
          return dispatch({ type: "TRIGGER_MANUAL_ROTATE" });
      }
    }
  }, []);

  const keyupHandler = useCallback(e => {
    e.stopImmediatePropagation();
    if (state.keyPressed) {
      dispatch({ type: "KEYUP" });
    }
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      dispatch({ type: "SET_ACTIVE_SHAPE" });
      window.addEventListener("keydown", keydownHandler);
      window.addEventListener("keyup", keyupHandler);
    } else if (state.gameOver) {
      console.log("GO");
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    } else if (state.shouldGenerateNewShape) {
      dispatch({ type: "CHECK_FOR_FULL_ROWS" });
      dispatch({ type: "SET_ACTIVE_SHAPE" });
    }
    // return () => {
    //   window.removeEventListener("keydown", keydownHandler);
    //   window.removeEventListener("keyup", keyupHandler);
    // };
  }, [state.shouldGenerateNewShape, state.gameOver]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else if (state.keyPressed) {
      dispatch({ type: "KEYUP" });
    } else if (!state.keyPressed) {
      setTimeout(() => {
        dispatch({ type: "SLIDE_COORDINATES" });
      }, 400);
    }
  }, [state.activeCoordinates]);

  return (
    <StyledOuter>
      {/* <StyledInner> */}
      <StyledGridContainer>
        {state.squares.map(({ coordinate, color, row }, index) => (
          <GridItem
            row={row}
            color={
              coordinate
                ? theme.colors[color]
                : state.activeCoordinates &&
                  state.activeCoordinates.includes(index)
                ? theme.colors[state.activeShape.color]
                : theme.colors.grid
            }
            key={index}
          />
        ))}
      </StyledGridContainer>
      {/* </StyledInner> */}
    </StyledOuter>
  );
};

export default Grid;
