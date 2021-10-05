import React, { useEffect, useReducer } from "react";
import Layout from "../components/Layout/Layout.jsx";
import Grid from "../components/Grid/Grid.jsx";

const Game = () => {
  // const determineShape = () => {
  //   let shapeNumber = Math.floor(Math.random() * 5);
  //   switch (shapeNumber) {
  //     case 0:
  //       return dispatch({
  //         type: "SET_ACTIVE_SHAPE",
  //         payload: { num: 0, color: "red" }
  //       });
  //     // break;
  //     case 1:
  //       return dispatch({
  //         type: "SET_ACTIVE_SHAPE",
  //         payload: { num: 1, color: "yellow" }
  //       });
  //     // break;
  //     case 2:
  //       return dispatch({
  //         type: "SET_ACTIVE_SHAPE",
  //         payload: { num: 2, color: "green" }
  //       });
  //     // break;
  //     case 3:
  //       return dispatch({
  //         type: "SET_ACTIVE_SHAPE",
  //         payload: { num: 3, color: "blue" }
  //       });
  //     // break;
  //     case 4:
  //       return dispatch({
  //         type: "SET_ACTIVE_SHAPE",
  //         payload: { num: 4, color: "orange" }
  //       });
  //     // break;
  //     // default:
  //     //   setActiveShape(null);
  //   }
  //   console.log(state);
  // };

  // const determineOrientation = () => {
  //   let orientationNumber = Math.floor(Math.random() * 4);
  //   console.log(orientationNumber);
  //   switch (orientationNumber) {
  //     case 0:
  //       dispatch({
  //         type: "SET_ACTIVE_ORIENTATION",
  //         payload: 0
  //       });
  //       break;
  //     case 1:
  //       dispatch({
  //         type: "SET_ACTIVE_ORIENTATION",
  //         payload: 1
  //       });
  //       break;
  //     case 2:
  //       dispatch({
  //         type: "SET_ACTIVE_ORIENTATION",
  //         payload: 2
  //       });
  //       break;
  //     case 3:
  //       dispatch({
  //         type: "SET_ACTIVE_ORIENTATION",
  //         payload: 3
  //       });
  //       break;
  //     // default:
  //     //     dispatch({
  //     //       type: "SET_ACTIVE_ORIENTATION",
  //     //       payload: 0
  //     //     });
  //   }
  // };

  // const determineStartingCoordinates = (shape, orientation) => {
  //   if (shape === 0) {
  //     // square
  //     dispatch({
  //       type: "SET_ACTIVE_COORDINATES",
  //       payload: [4, 5, 14, 15]
  //     });
  //   } else if (shape === 1) {
  //     // line
  //     if (orientation === 0 || orientation === 2) {
  //       dispatch({
  //         type: "SET_ACTIVE_COORDINATES",
  //         payload: [3, 4, 5, 6]
  //       });
  //     } else {
  //       dispatch({
  //         type: "SET_ACTIVE_COORDINATES",
  //         payload: [4, 14, 24, 34]
  //       });
  //     }
  //   } else if (shape === 2) {
  //     const Ldirection = Math.floor(Math.random() * 2);
  //     // L
  //     if (Ldirection === 0) {
  //       if (orientation === 0) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [3, 4, 5, 15]
  //         });
  //       } else if (orientation === 1) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [4, 14, 23, 24]
  //         });
  //       } else if (orientation === 2) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [3, 13, 14, 15]
  //         });
  //       } else if (orientation === 3) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [4, 5, 14, 24]
  //         });
  //       }
  //     } else {
  //       if (orientation === 0) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [5, 13, 14, 15]
  //         });
  //       } else if (orientation === 1) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [4, 14, 24, 25]
  //         });
  //       } else if (orientation === 2) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [13, 14, 15, 23]
  //         });
  //       } else if (orientation === 3) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [4, 5, 15, 25]
  //         });
  //       }
  //     }
  //   } else if (shape === 3) {
  //     // Z
  //     const Zdirection = Math.floor(Math.random() * 2);
  //     if (Zdirection === 0) {
  //       if (orientation === 0 || orientation === 2) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [4, 5, 13, 14]
  //         });
  //       } else if (orientation === 1 || orientation === 3) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [4, 14, 15, 25]
  //         });
  //       }
  //     } else {
  //       if (orientation === 0 || orientation === 2) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [3, 4, 14, 15]
  //         });
  //       } else if (orientation === 1 || orientation === 3) {
  //         dispatch({
  //           type: "SET_ACTIVE_COORDINATES",
  //           payload: [5, 14, 15, 24]
  //         });
  //       }
  //     }
  //   } else if (shape === 4) {
  //     //camel
  //     if (orientation === 0) {
  //       dispatch({
  //         type: "SET_ACTIVE_COORDINATES",
  //         payload: [3, 4, 5, 14]
  //       });
  //     } else if (orientation === 1) {
  //       dispatch({
  //         type: "SET_ACTIVE_COORDINATES",
  //         payload: [4, 13, 14, 24]
  //       });
  //     } else if (orientation === 2) {
  //       dispatch({
  //         type: "SET_ACTIVE_COORDINATES",
  //         payload: [4, 13, 14, 15]
  //       });
  //     } else {
  //       dispatch({
  //         type: "SET_ACTIVE_COORDINATES",
  //         payload: [4, 14, 15, 24]
  //       });
  //     }
  //   }
  // };

  // const slideShape = () => {
  //   setTimeout(() => {
  //     dispatch({
  //       type: "SET_ACTIVE_COORDINATES",
  //       payload: state.activeCoordinates.map(coordinate => coordinate - 10)
  //     });
  //   }, 2000);
  // };

  // useEffect(() => {
  //   determineShape();
  //   // determineOrientation();
  //   // console.log(state);
  // }, []);

  // useEffect(() => {
  //   determineOrientation();
  //   console.log(state);
  // }, [state.activeShape]);

  // useEffect(() => {
  //   console.log(state);
  //   determineStartingCoordinates(
  //     state.activeShape.num,
  //     state.activeOrientation
  //   );
  // }, [state.activeOrientation]);

  // useEffect(() => {
  //   slideShape();
  // }, [state.activeCoordinates]);

  return (
    <Layout>
      <Grid />
    </Layout>
  );
};

export default Game;
