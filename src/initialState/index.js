import {
  determineShape,
  determineOrientation,
  determineStartingCoordinates,
  generateSquares
} from "../helpers";

const generated = generateSquares();
const nextShape = determineShape();
const nextOrientation = determineOrientation();
const nextDirection =
  nextShape.num === 2 || nextShape.num === 3
    ? Math.floor(Math.random() * 2)
    : null;
const nextCoordinates = determineStartingCoordinates(
  nextShape.num,
  nextOrientation,
  nextDirection
);

const initialState = {
  activeShape: { num: null, color: null },
  activeOrientation: null,
  activeCoordinates: null,
  shouldGenerateNewShape: false,
  squares: generated,
  keyPressed: false,
  activeKeyCode: null,
  direction: null,
  score: 0,
  toast: null,
  showToast: false,
  rowsToReset: null,
  nextShape: {
    shape: nextShape,
    orientation: nextOrientation,
    coordinates: nextCoordinates,
    direction: nextDirection
  },
  nextSquares: {
    total: [],
    colored: []
  },
  paused: true,
  commifiedScore: 0,
  supported: true,
  initial: true,
  togglePlayAgain: false,
  showControls: true,
  countdown: null,
  useButtons: false,
  useKeys: true,
  useTouch: false,
  breakCountdown: false
};

export default initialState;
