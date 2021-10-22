import {
  determineShape,
  determineOrientation,
  determineStartingCoordinates,
  commifyScore,
  shouldUpdateCoordinatesOnRotate
} from "../helpers";
import initialState from "../initialState";
import { nextShape } from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHECK_FOR_FULL_ROWS":
      const coordinateRow = [];
      const RTR = [];
      state.activeCoordinates.forEach(coordinate => {
        const filtered = state.squares.filter(
          square =>
            square.coordinate && state.squares[coordinate].row == square.row
        );
        if (filtered[9] && !coordinateRow.includes(filtered[9].row)) {
          coordinateRow.push(filtered[9].row);
          RTR.push(filtered);
        }
      });
      const RTRcheck = RTR[0] ? RTR : null;
      const toastValue = RTR[0] ? 1000 * RTR.length + 100 : 100;
      const scoreValue = state.score + toastValue;
      const commifiedScore = commifyScore(scoreValue);
      console.log(commifiedScore, "COMMIFIED SCORE AT CFFR");
      return {
        ...state,
        rowsToReset: RTRcheck,
        score: scoreValue,
        commifiedScore: commifiedScore,
        toast: toastValue
      };
    case "TOGGLE_SHOW_CONTROLS":
      return {
        ...state,
        showControls: !state.showControls
      };
    case "USE_BUTTONS":
      console.log("USE_BUTTONS REDUCER");
      return {
        ...state,
        useButtons: true,
        useKeys: false,
        useTouch: false
      };
    case "USE_KEYS":
      return {
        ...state,
        useButtons: false,
        useKeys: true,
        useTouch: false
      };
    case "USE_TOUCH":
      return {
        ...state,
        useButtons: false,
        useKeys: false,
        useTouch: true
      };
    case "SUPPORTED":
      return {
        ...state,
        supported: action.payload.supported,
        paused: action.payload.paused ? action.payload.paused : state.paused
      };
    case "START_PAUSE_TEXT":
      return {
        ...state,
        startPauseText: action.payload
      };
    case "RESET_STATE":
      return {
        ...initialState,
        togglePlayAgain: !state.togglePlayAgain
      };
    case "RESET_ROWS":
      if (state.rowsToReset) {
        state.rowsToReset.forEach(arr => {
          arr.forEach(square => {
            if (state.squares.includes(square)) {
              state.squares.splice(state.squares.indexOf(square), 1, {
                ...square,
                color: "red",
                coordinate: null
              });
            }
          });
        });
        state.rowsToReset.forEach(rowToReset => {
          for (let i = 199; i > 0; i--) {
            if (state.squares[i].row < rowToReset[0].row) {
              state.squares.splice(i + 10, 1, {
                ...state.squares[i],
                row: state.squares[i].row + 1,
                coordinate: state.squares[i].coordinate
                  ? state.squares[i].coordinate + 10
                  : null
              });
            }
          }
        });
      }
    case "SET_TOAST":
      return {
        ...state,
        showToast: true
      };
    case "SET_COUNTDOWN":
      return {
        ...state,
        showCountdown: true,
        countdown: 3,
        breakCountdown: false,
        initial: false
      };
    case "HIDE_COUNTDOWN":
      return {
        ...state,
        countdown: null,
        showCountdown: false,
        countdownInProgress: false
      };
    case "HIDE_TOAST":
      return {
        ...state,
        showToast: false
      };
    case "PAUSE":
      return {
        ...state,
        paused: true,
        countdown: null,
        showCountdown: false,
        breakCountdown: true
      };
    case "BREAK_COUNTDOWN":
      return {
        ...state,
        countdown: null,
        showCountdown: false,
        breakCountdown: true,
        paused: true
      };
    case "COUNTDOWN":
      return {
        ...state,
        countdown: state.countdown - 1 !== 0 ? state.countdown - 1 : "START"
      };
    case "GAME_OVER":
      return {
        ...state,
        gameOver: true,
        keyPressed: false
        // endGame: true
      };
    case "END_GAME":
      return {
        ...state,
        // gameOver: true
        keyPressed: false,
        endGame: true
      };
    case "START":
      return {
        ...state,
        paused: false,
        initial: false
      };
    // }
    case "SET_ACTIVE_KEYCODE":
    case "SET_TOUCH_ACTIVE":
      return {
        ...state,
        activeKeyCode: action.payload
      };
    case "SET_ACTIVE_SHAPE":
      console.log(state.commifiedScore, "commified at set_Active_shape");
      if (state.endGame) {
        return {
          ...state,
          // gameOver: true,
          shouldGenerateNewShape: false,
          nextShape: null,
          // commifiedScore: commifyScore(state.score),
          // gameOver: true,
          // endGame: true,
          keyPressed: false
        };
      } else if (state.nextShape) {
        const overlapping = state.squares.filter(
          square =>
            square.coordinate &&
            state.nextShape.coordinates.includes(square.coordinate)
        );
        const rowZeroOverlap = state.squares.filter(
          square =>
            square.coordinate &&
            state.nextShape.coordinates.includes(square.coordinate) &&
            square.row === 0
        );
        if (rowZeroOverlap[0]) {
          return {
            ...state,
            // gameOver: true,
            shouldGenerateNewShape: false,
            nextShape: null,
            // commifiedScore: commifyScore(state.score),
            gameOver: true,
            // endGame: true,
            keyPressed: false
          };
        } else if (overlapping[0]) {
          const overlappingCoordinates = overlapping.map(
            square => square.coordinate
          );
          const coordinatesToDisplay = state.nextShape.coordinates.filter(
            coordinate => !overlappingCoordinates.includes(coordinate)
          );
          console.log("CTD", coordinatesToDisplay);
          return {
            ...state,
            activeShape: state.nextShape.shape,
            activeOrientation: state.nextShape.orientation,
            activeCoordinates: coordinatesToDisplay,
            direction: state.nextShape.direction,
            shouldGenerateNewShape: false,
            rowsToReset: null,
            endGame: true,
            nextShape: null,
            shouldGenerateNewShape: false
          };
        } else if (state.nextShape.shape.color) {
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
          return {
            ...state,
            activeShape: state.nextShape.shape,
            activeOrientation: state.nextShape.orientation,
            activeCoordinates: state.nextShape.coordinates,
            direction: state.nextShape.direction,
            shouldGenerateNewShape: false,
            rowsToReset: null,
            nextShape: {
              shape: shape,
              orientation: orientation,
              coordinates: coordinates,
              direction: direction
            }
          };
        } else {
          console.log("NO NEXT");
          return {
            ...state,
            gameOver: true,
            keyPressed: false,
            shouldGenerateNewShape: false
          };
        }
      }
    case "UPDATE_NEXT_SQUARES":
      const newSquares = [];
      for (let i = 0; i < action.payload; i++) {
        newSquares.push(i);
      }
      return {
        ...state,
        nextSquares: {
          total: newSquares,
          colored: state.nextShape
            ? nextShape[state.nextShape.coordinates.toString()].colored
            : ""
        }
      };
    case "SLIDE_COORDINATES":
      console.log("SLIDE");
      if (state.endGame) {
        console.log("END GAME");
        return {
          ...state,
          gameOver: true
        };
        // return {
        //   keyPressed: false,
        //   shouldGenerateNewShape: false
        // };
        // return {
        //   ...state,
        //   keyPressed: false,
        //   shouldGenerateNewShape: false,
        //   gameOver: true
        // };
      } else if (
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
      if (state.paused) {
        return {
          ...state
        };
      } else if (
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
          activeKeyCode: null,
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
          activeKeyCode: null,
          shouldGenerateNewShape: true,
          keyPressed: true
        };
      }
    case "TRIGGER_MANUAL_RIGHT":
      if (state.paused) {
        return {
          ...state
        };
      } else if (
        state.activeCoordinates.filter(coordinate => coordinate > 189)[0]
      ) {
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
          keyPressed: true,
          activeKeyCode: null
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
          activeCoordinates: rightCoordinates,
          activeKeyCode: null
        };
      } else {
        return {
          ...state,
          keyPressed: true,
          activeKeyCode: null
        };
      }
    case "TRIGGER_MANUAL_LEFT":
      if (state.paused) {
        return {
          ...state,
          activeKeyCode: null
        };
      } else if (
        state.activeCoordinates.filter(coordinate => coordinate > 189)[0]
      ) {
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
          keyPressed: true,
          activeKeyCode: null
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
          activeCoordinates: leftCoordinates,
          activeKeyCode: null
        };
      } else {
        return {
          ...state,
          keyPressed: true,
          activeKeyCode: null
        };
      }
    case "TRIGGER_MANUAL_ROTATE":
      if (state.paused) {
        return {
          ...state
        };
      } else if (
        state.activeCoordinates.filter(coordinate => coordinate > 189)[0]
      ) {
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
          keyPressed: true,
          activeKeyCode: null
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
          let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
            sortedNewCoordinates,
            state.squares
          );
          // console.log(shouldUpdateToNewCoordinates);
          // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
          //   coordinate =>
          //     coordinate.toString().endsWith("9") &&
          //     sortedNewCoordinates.filter(newCoordinate =>
          //       newCoordinate.toString().endsWith("0")
          //     ).length >= 1
          // )[0]
          //   ? true
          //   : false;
          return {
            ...state,
            keyPressed: true,
            activeKeyCode: null,
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
          let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
            sortedNewCoordinates,
            state.squares
          );
          // console.log(shouldUpdateToNewCoordinates);
          // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
          //   coordinate =>
          //     coordinate.toString().endsWith("9") &&
          //     sortedNewCoordinates.filter(newCoordinate =>
          //       newCoordinate.toString().endsWith("0")
          //     ).length >= 1
          // )[0]
          //   ? true
          //   : false;
          return {
            ...state,
            activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
            let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
              sortedNewCoordinates,
              state.squares
            );
            // console.log(shouldUpdateToNewCoordinates);
            // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
            //   coordinate =>
            //     coordinate.toString().endsWith("9") &&
            //     sortedNewCoordinates.filter(newCoordinate =>
            //       newCoordinate.toString().endsWith("0")
            //     ).length >= 1
            // )[0]
            //   ? true
            //   : false;
            return {
              ...state,
              keyPressed: true,
              activeKeyCode: null,
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
          let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
            sortedNewCoordinates,
            state.squares
          );
          // console.log(shouldUpdateToNewCoordinates);
          // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
          //   coordinate =>
          //     coordinate.toString().endsWith("9") &&
          //     sortedNewCoordinates.filter(newCoordinate =>
          //       newCoordinate.toString().endsWith("0")
          //     ).length >= 1
          // )[0]
          //   ? true
          //   : false;
          return {
            ...state,
            keyPressed: true,
            activeKeyCode: null,
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
          let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
            sortedNewCoordinates,
            state.squares
          );
          // console.log(shouldUpdateToNewCoordinates);
          // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
          //   coordinate =>
          //     coordinate.toString().endsWith("9") &&
          //     sortedNewCoordinates.filter(newCoordinate =>
          //       newCoordinate.toString().endsWith("0")
          //     ).length >= 1
          // )[0]
          //   ? true
          //   : false;
          return {
            ...state,
            keyPressed: true,
            activeKeyCode: null,
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
          let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
            sortedNewCoordinates,
            state.squares
          );
          // console.log(shouldUpdateToNewCoordinates);
          // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
          //   coordinate =>
          //     coordinate.toString().endsWith("9") &&
          //     sortedNewCoordinates.filter(newCoordinate =>
          //       newCoordinate.toString().endsWith("0")
          //     ).length >= 1
          // )[0]
          //   ? true
          //   : false;
          return {
            ...state,
            keyPressed: true,
            activeKeyCode: null,
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
          let shouldUpdateToNewCoordinates = shouldUpdateCoordinatesOnRotate(
            sortedNewCoordinates,
            state.squares
          );
          // console.log(shouldUpdateToNewCoordinates);
          // let shouldUpdateToNewCoordinates = !sortedNewCoordinates.filter(
          //   coordinate =>
          //     coordinate.toString().endsWith("9") &&
          //     sortedNewCoordinates.filter(newCoordinate =>
          //       newCoordinate.toString().endsWith("0")
          //     ).length >= 1
          // )[0]
          //   ? true
          //   : false;
          return {
            ...state,
            keyPressed: true,
            activeKeyCode: null,
            activeOrientation: shouldUpdateToNewCoordinates ? 0 : 3,
            activeCoordinates: shouldUpdateToNewCoordinates
              ? sortedNewCoordinates
              : state.activeCoordinates
          };
        }
      } else {
        return {
          ...state,
          keyPressed: true,
          activeKeyCode: null
        };
      }
    case "KEYUP":
      // if (state.endGame) {
      //   return {
      //     ...state,
      //     keyPressed: false,
      //     gameOver: true
      //   };
      // } else {
      return {
        ...state,
        keyPressed: false
      };
    // }
    // } else {
    //   return;
    // }
    case "TOUCH_END":
      return {
        ...state,
        activeKeyCode: null
      };
    case "KEYDOWN":
      // if (state.useKeys) {
      return {
        ...state,
        keyPressed: true
      };
    // } else {
    //   return;
    // }
    default:
      return {
        ...state
      };
  }
};

export default reducer;
