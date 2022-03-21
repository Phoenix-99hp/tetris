import React, { useEffect, useRef, useReducer, useCallback } from "react";
import { useTheme } from "styled-components";
import initialState from "../../initialState";
import data from "../../data";
import reducer from "../../reducer";
import {
  StyledNextShapeContainer,
  StyledNextShape,
  StyledNextShapeGrid,
  StyledSideColumn,
  StyledButtonContainer,
  StyledKeysStartPauseContainer,
  StyledScoreValueContainer,
  StyledScoreValue,
  StyledToast,
  StyledToastValue,
  StyledOuter,
  StyledInner,
  StyledGridContainer,
  StyledMessageContainer,
  // StyledMessageInner,
  StyledGameOver,
  StyledFinalScoreHeading,
  StyledMoveRotateContainer,
  StyledControlsInner,
  StyledButtonControlGroup,
  StyledChangeControls,
  StyledDownContainer,
  StyledLeftRightContainer,
  StyledStartPauseButton,
  StyledControlsButton,
  StyledShowHideControlsButton,
  StyledControlsButtonWrapper,
} from "./GridStyle";
import GridItem from "../GridItem/GridItem.jsx";

const Grid = () => {
  const { nextShape } = data;
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(false);
  const theme = useTheme();

  const keydownHandler = useCallback(e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (state.activeKeyCode) {
      return;
    } else {
      dispatch({ type: "SET_ACTIVE_KEYCODE", payload: e.keyCode });
      switch (e.keyCode) {
        case 40: // arrowdown
          return dispatch({ type: "TRIGGER_MANUAL_DOWN" });
        case 39: // arrowright
          return dispatch({ type: "TRIGGER_MANUAL_RIGHT" });
        case 37: //arrowleft
          return dispatch({ type: "TRIGGER_MANUAL_LEFT" });
        case 32: // spacebar;
          if (!e.repeat) {
            return dispatch({ type: "TRIGGER_MANUAL_ROTATE" });
          }
      }
    }
  }, []);

  const keyupHandler = useCallback(e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (state.activeKeyCode) {
      dispatch({ type: "KEYUP" });
    }
  }, []);

  const keyupHandlerTouchButtons = useCallback(e => {
    e.preventDefault();
    e.stopImmediatePropagation();
  }, []);

  const touchStartHandler = (e, touchArea) => {
    e.preventDefault();
    if (state.useTouch) {
      dispatch({ type: "SET_TOUCH_ACTIVE", payload: touchArea });
      switch (touchArea) {
        case 40: // arrowdown
          dispatch({ type: "TRIGGER_MANUAL_DOWN" });
          setInterval(longTouchHandler, 300);
          break;
        case 39: // arrowright
          dispatch({ type: "TRIGGER_MANUAL_RIGHT" });
          setInterval(longTouchHandler, 300);
          break;
        case 37: //arrowleft
          dispatch({ type: "TRIGGER_MANUAL_LEFT" });
          setInterval(longTouchHandler, 300);
          break;
      }
    }
  };

  const longTouchHandler = () => {
    switch (state.activeKeyCode) {
      case 40: // arrowdown
        return dispatch({ type: "TRIGGER_MANUAL_DOWN" });

      case 39: // arrowright
        return dispatch({ type: "TRIGGER_MANUAL_RIGHT" });

      case 37: //arrowleft
        return dispatch({ type: "TRIGGER_MANUAL_LEFT" });

      default:
        clearInterval(longTouchHandler);
    }
  };

  const touchEndHandler = e => {
    e.preventDefault();
    if (state.useKeys || state.useButtons) {
      return;
    } else if (state.activeKeyCode) {
      clearInterval(longTouchHandler);
      dispatch({ type: "TOUCH_END" });
    }
  };

  const checkIfSupported = () => {
    if (
      window.innerWidth >= theme.unsupported.minWidth &&
      window.innerHeight >= theme.unsupported.minHeight
    ) {
      dispatch({
        type: "SUPPORTED",
        payload: { supported: true },
      });
    } else {
      dispatch({
        type: "SUPPORTED",
        payload: { supported: false, paused: true },
      });
      dispatch({
        type: "START_PAUSE_TEXT",
        payload: "Start",
      });
    }
  };

  const pauseHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    if (state.startPauseText) {
      dispatch({
        type: "START_PAUSE_TEXT",
        payload: null,
      });
    }
    if (state.paused && !state.countdown) {
      dispatch({ type: "SET_COUNTDOWN" });
    } else {
      dispatch({ type: "PAUSE" });
    }
  };

  const playAgainHandler = () => {
    isMounted.current = false;
    dispatch({ type: "RESET_STATE" });
  };

  const toggleShowControls = () => {
    dispatch({ type: "TOGGLE_SHOW_CONTROLS" });
  };

  const clearToast = () => {
    dispatch({ type: "HIDE_TOAST" });
  };

  const switchControlsHandler = (e, switchTo) => {
    e.preventDefault();
    if (switchTo === "buttons" && !state.useButtons) {
      dispatch({ type: "USE_BUTTONS" });
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
      window.addEventListener("keyup", keyupHandlerTouchButtons);
    } else if (switchTo === "keys" && !state.useKeys) {
      dispatch({ type: "USE_KEYS" });
      window.removeEventListener("keyup", keyupHandlerTouchButtons);
      window.addEventListener("keydown", keydownHandler);
      window.addEventListener("keyup", keyupHandler);
    } else if (switchTo === "touch" && !state.useTouch) {
      dispatch({ type: "USE_TOUCH" });
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
      window.addEventListener("keyup", keyupHandlerTouchButtons);
    }
  };

  useEffect(() => {
    if (isMounted.current && state.breakCountdown) {
      dispatch({ type: "BREAK_COUNTDOWN" });
    } else if (
      isMounted.current &&
      state.countdown &&
      state.countdown !== "START" &&
      !state.breakCountdown
    ) {
      setTimeout(() => dispatch({ type: "COUNTDOWN" }), 500);
    } else if (isMounted.current) {
      setTimeout(() => dispatch({ type: "HIDE_COUNTDOWN" }), 500);
      dispatch({ type: "START" });
    }
  }, [state.countdown]);

  useEffect(() => {
    checkIfSupported();
    dispatch({ type: "SET_ACTIVE_SHAPE" });
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
    window.addEventListener("resize", checkIfSupported);
  }, [state.togglePlayAgain]);

  useEffect(() => {
    if (state.gameOver) {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    } else if (state.shouldGenerateNewShape) {
      dispatch({ type: "CHECK_FOR_FULL_ROWS" });
      dispatch({ type: "SET_TOAST" });
      clearTimeout(clearToast);
      setTimeout(clearToast, 300);
      dispatch({ type: "RESET_ROWS" });
      dispatch({ type: "SET_ACTIVE_SHAPE" });
      console.log("SET_ACTVE");
    }
  }, [state.shouldGenerateNewShape, state.gameOver]);

  useEffect(() => {
    if (state.nextShape) {
      dispatch({
        type: "UPDATE_NEXT_SQUARES",
        payload:
          nextShape[state.nextShape.coordinates.toString()].rows *
          nextShape[state.nextShape.coordinates.toString()].cols,
      });
    } else {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
      dispatch({ type: "END_GAME" });
    }
  }, [state.nextShape]);

  useEffect(() => {
    if (state.nextShape) {
      if (!isMounted.current) {
        isMounted.current = true;
      } else if (state.keyPressed) {
        console.log("KEYUP");
        dispatch({ type: "KEYUP" });
      } else if (!state.paused) {
        setTimeout(() => dispatch({ type: "SLIDE_COORDINATES" }), 300);
      }
    } else if (isMounted.current) {
      dispatch({ type: "END_GAME" });
      setTimeout(() => dispatch({ type: "SLIDE_COORDINATES" }), 300);
    }
  }, [state.activeCoordinates, state.paused]);

  return (
    <>
      {state.supported && !state.gameOver ? (
        <>
          <StyledSideColumn>
            <StyledNextShapeContainer hideAtSmallBP={true}>
              <StyledScoreValueContainer>
                <h2>Next Shape</h2>
              </StyledScoreValueContainer>
              <StyledNextShape show={true} border={true}>
                <StyledNextShapeGrid
                  color={state.nextShape ? state.nextShape.shape.color : ""}
                  shape={state.nextShape ? state.nextShape.shape.num : ""}
                  cols={
                    state.nextShape
                      ? nextShape[state.nextShape.coordinates.toString()].cols
                      : ""
                  }
                  rows={
                    state.nextShape
                      ? nextShape[state.nextShape.coordinates.toString()].rows
                      : ""
                  }
                >
                  {state.nextSquares.total.map(square => (
                    <GridItem
                      border={
                        state.nextShape
                          ? nextShape[state.nextShape.coordinates.toString()]
                              .border
                          : ""
                      }
                      color={
                        state.initial
                          ? ""
                          : state.nextShape &&
                            state.nextSquares.colored &&
                            state.nextSquares.colored.includes(square)
                          ? theme.colors[state.nextShape.shape.color]
                          : ""
                      }
                      key={square}
                    />
                  ))}
                </StyledNextShapeGrid>
              </StyledNextShape>
            </StyledNextShapeContainer>
          </StyledSideColumn>
          <StyledOuter>
            <StyledInner>
              <StyledGridContainer>
                {/* <StyledDrawBorder /> */}
                {state.squares.map(({ coordinate, color, row }, index) => (
                  <GridItem
                    row={row}
                    color={
                      state.initial
                        ? theme.colors.grid
                        : coordinate
                        ? theme.colors[color]
                        : state.activeCoordinates &&
                          state.activeCoordinates.includes(index)
                        ? theme.colors[state.activeShape.color]
                        : color
                        ? color
                        : theme.colors.grid
                    }
                    key={index}
                  />
                ))}
              </StyledGridContainer>
            </StyledInner>
          </StyledOuter>
          <StyledSideColumn>
            <StyledNextShapeContainer hideAtSmallBP={false}>
              <StyledScoreValueContainer>
                <h2>Score:</h2>
                <StyledScoreValue>{state.commifiedScore}</StyledScoreValue>
              </StyledScoreValueContainer>
              <StyledToast>
                {state.showCountdown ? (
                  <StyledToastValue show={state.showCountdown}>
                    {state.countdown}
                  </StyledToastValue>
                ) : (
                  <StyledToastValue show={state.showToast}>
                    {`+ ${state.toast}`}
                  </StyledToastValue>
                )}
              </StyledToast>
            </StyledNextShapeContainer>
            <StyledNextShapeContainer hideAtSmallBP={true}>
              <StyledNextShape
                show={state.showControls}
                controls={true}
                border={true}
              >
                {state.useButtons ? (
                  <>
                    <StyledButtonControlGroup>
                      <StyledLeftRightContainer>
                        <span
                          onClick={() =>
                            dispatch({ type: "TRIGGER_MANUAL_LEFT" })
                          }
                        >
                          ←
                        </span>
                        <span
                          onClick={() =>
                            dispatch({ type: "TRIGGER_MANUAL_RIGHT" })
                          }
                        >
                          →
                        </span>
                      </StyledLeftRightContainer>
                      <StyledDownContainer>
                        <span
                          onClick={() =>
                            dispatch({ type: "TRIGGER_MANUAL_DOWN" })
                          }
                        >
                          ↓
                        </span>
                      </StyledDownContainer>
                    </StyledButtonControlGroup>
                    <StyledButtonControlGroup>
                      <button
                        onClick={() =>
                          dispatch({ type: "TRIGGER_MANUAL_ROTATE" })
                        }
                      >
                        Rotate
                      </button>
                    </StyledButtonControlGroup>
                  </>
                ) : state.useTouch ? (
                  <>
                    <StyledButtonControlGroup>
                      <StyledLeftRightContainer>
                        <span
                          onTouchStart={e => touchStartHandler(e, 37)}
                          onTouchEnd={e => touchEndHandler(e)}
                        >
                          ←
                        </span>
                        <span
                          onTouchStart={e => touchStartHandler(e, 39)}
                          onTouchEnd={e => touchEndHandler(e)}
                        >
                          →
                        </span>
                      </StyledLeftRightContainer>
                      <StyledDownContainer>
                        <span
                          onTouchStart={e => touchStartHandler(e, 40)}
                          onTouchEnd={e => touchEndHandler(e)}
                        >
                          ↓
                        </span>
                      </StyledDownContainer>
                    </StyledButtonControlGroup>
                    <StyledButtonControlGroup>
                      <button
                        onClick={() =>
                          dispatch({ type: "TRIGGER_MANUAL_ROTATE" })
                        }
                      >
                        Rotate
                      </button>
                    </StyledButtonControlGroup>
                  </>
                ) : (
                  <>
                    <StyledControlsInner>
                      <StyledMoveRotateContainer>
                        <h3>Move:</h3>
                        <span>Arrow Keys</span>
                      </StyledMoveRotateContainer>
                      <StyledMoveRotateContainer>
                        <h3>Rotate:</h3>
                        <span>Spacebar</span>
                      </StyledMoveRotateContainer>
                    </StyledControlsInner>
                    <StyledChangeControls>
                      <span>On mobile, or no keyboard?</span>
                      <button
                        onClick={e => switchControlsHandler(e, "buttons")}
                      >
                        Use Buttons
                      </button>
                      <button onClick={e => switchControlsHandler(e, "touch")}>
                        Use Touch
                      </button>
                    </StyledChangeControls>
                  </>
                )}
              </StyledNextShape>
              <StyledScoreValueContainer>
                <StyledKeysStartPauseContainer>
                  <StyledStartPauseButton onClick={e => pauseHandler(e)}>
                    {state.startPauseText
                      ? state.startPauseText
                      : (!state.paused || !state.breakCountdown) &&
                        !state.initial
                      ? "Pause"
                      : "Start"}
                  </StyledStartPauseButton>
                  {state.useButtons ? (
                    <StyledControlsButtonWrapper>
                      <StyledControlsButton
                        onClick={e => switchControlsHandler(e, "keys")}
                      >
                        Use Keys
                      </StyledControlsButton>
                      <StyledControlsButton
                        onClick={e => switchControlsHandler(e, "touch")}
                      >
                        Use Touch
                      </StyledControlsButton>
                    </StyledControlsButtonWrapper>
                  ) : state.useTouch ? (
                    <StyledControlsButtonWrapper>
                      <StyledControlsButton
                        onClick={e => switchControlsHandler(e, "keys")}
                      >
                        Use Keys
                      </StyledControlsButton>
                      <StyledControlsButton
                        onClick={e => switchControlsHandler(e, "buttons")}
                      >
                        Use Buttons
                      </StyledControlsButton>
                    </StyledControlsButtonWrapper>
                  ) : (
                    <StyledShowHideControlsButton onClick={toggleShowControls}>
                      {state.showControls ? "Hide Controls" : "Show Controls"}
                    </StyledShowHideControlsButton>
                  )}
                </StyledKeysStartPauseContainer>
              </StyledScoreValueContainer>
            </StyledNextShapeContainer>
          </StyledSideColumn>
          <StyledNextShapeContainer hideAtSmallBP={"reveal"}>
            <StyledNextShape
              show={state.showControls}
              controls={true}
              border={true}
            >
              {state.useButtons ? (
                <>
                  <StyledButtonControlGroup>
                    <StyledLeftRightContainer>
                      <span
                        onClick={() =>
                          dispatch({ type: "TRIGGER_MANUAL_LEFT" })
                        }
                      >
                        ←
                      </span>
                      <span
                        onClick={() =>
                          dispatch({ type: "TRIGGER_MANUAL_RIGHT" })
                        }
                      >
                        →
                      </span>
                    </StyledLeftRightContainer>
                    <StyledDownContainer>
                      <span
                        onClick={() =>
                          dispatch({ type: "TRIGGER_MANUAL_DOWN" })
                        }
                      >
                        ↓
                      </span>
                    </StyledDownContainer>
                  </StyledButtonControlGroup>
                  <StyledButtonControlGroup>
                    <button
                      onClick={() =>
                        dispatch({ type: "TRIGGER_MANUAL_ROTATE" })
                      }
                    >
                      Rotate
                    </button>
                  </StyledButtonControlGroup>
                </>
              ) : state.useTouch ? (
                <>
                  <StyledButtonControlGroup>
                    <StyledLeftRightContainer>
                      <span
                        onTouchStart={e => touchStartHandler(e, 37)}
                        onTouchEnd={e => touchEndHandler(e)}
                      >
                        ←
                      </span>
                      <span
                        onTouchStart={e => touchStartHandler(e, 39)}
                        onTouchEnd={e => touchEndHandler(e)}
                      >
                        →
                      </span>
                    </StyledLeftRightContainer>
                    <StyledDownContainer>
                      <span
                        onTouchStart={e => touchStartHandler(e, 40)}
                        onTouchEnd={e => touchEndHandler(e)}
                      >
                        ↓
                      </span>
                    </StyledDownContainer>
                  </StyledButtonControlGroup>
                  <StyledButtonControlGroup>
                    <button
                      onClick={() =>
                        dispatch({ type: "TRIGGER_MANUAL_ROTATE" })
                      }
                    >
                      Rotate
                    </button>
                  </StyledButtonControlGroup>
                </>
              ) : (
                <>
                  <StyledControlsInner>
                    <StyledMoveRotateContainer>
                      <h3>Move:</h3>
                      <span>Arrow Keys</span>
                    </StyledMoveRotateContainer>
                    <StyledMoveRotateContainer>
                      <h3>Rotate:</h3>
                      <span>Spacebar</span>
                    </StyledMoveRotateContainer>
                  </StyledControlsInner>
                  <StyledChangeControls>
                    <span>On mobile, or no keyboard?</span>
                    <button onClick={e => switchControlsHandler(e, "buttons")}>
                      Use Buttons
                    </button>
                    <button onClick={e => switchControlsHandler(e, "touch")}>
                      Use Touch
                    </button>
                  </StyledChangeControls>
                </>
              )}
            </StyledNextShape>
            <StyledScoreValueContainer>
              <StyledKeysStartPauseContainer>
                <StyledStartPauseButton onClick={e => pauseHandler(e)}>
                  {state.startPauseText
                    ? state.startPauseText
                    : (!state.paused || !state.breakCountdown) && !state.initial
                    ? "Pause"
                    : "Start"}
                </StyledStartPauseButton>
                {state.useButtons ? (
                  <StyledControlsButtonWrapper>
                    <StyledControlsButton
                      onClick={e => switchControlsHandler(e, "keys")}
                    >
                      Use Keys
                    </StyledControlsButton>
                    <StyledControlsButton
                      onClick={e => switchControlsHandler(e, "touch")}
                    >
                      Use Touch
                    </StyledControlsButton>
                  </StyledControlsButtonWrapper>
                ) : state.useTouch ? (
                  <StyledControlsButtonWrapper>
                    <StyledControlsButton
                      onClick={e => switchControlsHandler(e, "keys")}
                    >
                      Use Keys
                    </StyledControlsButton>
                    <StyledControlsButton
                      onClick={e => switchControlsHandler(e, "buttons")}
                    >
                      Use Buttons
                    </StyledControlsButton>
                  </StyledControlsButtonWrapper>
                ) : (
                  <StyledShowHideControlsButton onClick={toggleShowControls}>
                    {state.showControls ? "Hide Controls" : "Show Controls"}
                  </StyledShowHideControlsButton>
                )}
              </StyledKeysStartPauseContainer>
            </StyledScoreValueContainer>
          </StyledNextShapeContainer>
        </>
      ) : state.supported && state.gameOver ? (
        <StyledMessageContainer>
          {/* <StyledMessageInner> */}
          <StyledGameOver>Game Over</StyledGameOver>
          <StyledFinalScoreHeading>
            Final Score:
            <StyledScoreValue>{state.commifiedScore}</StyledScoreValue>
          </StyledFinalScoreHeading>
          <StyledButtonContainer>
            <button onClick={playAgainHandler}>Play Again</button>
          </StyledButtonContainer>
          {/* </StyledMessageInner> */}
        </StyledMessageContainer>
      ) : !state.supported ? (
        <StyledMessageContainer>
          {/* <StyledMessageInner> */}
          <StyledGameOver>Error</StyledGameOver>
          <p>Game is not supported at current screen dimensions.</p>
          <p>Increase dimensions, or use a larger device to play.</p>
          {/* </StyledMessageInner> */}
        </StyledMessageContainer>
      ) : (
        <StyledMessageContainer>
          <StyledGameOver>Error</StyledGameOver>
          <p>An unknown error occurred.</p>
          {/* </StyledMessageInner> */}
        </StyledMessageContainer>
      )}
    </>
  );
};

export default Grid;
