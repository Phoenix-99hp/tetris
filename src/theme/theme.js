export default {
  totalHeight: {
    extraSmall: "645.2px",
    small: "745.2px",
    medium: "775.4px"
  },
  unsupported: {
    minHeight: "530.8",
    minWidth: "190"
  },
  colors: {
    green: "#9ece6a",
    red: "#f7768e",
    blue: "#2ac3de",
    purple: "#bb9af7",
    orange: "#e0af68",
    white: "#c0caf5",
    background: "#1a1b26",
    grid: "#414868",
    gridBorder: "#1a1b26",
    gameBorder: "#ff9e64"
  },
  breakpoints: {
    last: "253px",
    extraSmall: "400px",
    small: "660px",
    mediumSmall: "720px",
    medium: "1000px",
    large: "1400px"
  },
  squareSizes: {
    last: "15",
    extraSmall: "20",
    small: "25",
    medium: "30"
  },
  nextShape: {
    0: {
      rows: 2,
      cols: 2,
      border: {
        squares: {
          top: "false",
          right: "false",
          left: "false",
          bottom: true
        },
        grid: {
          top: "false",
          right: "false",
          left: "false",
          bottom: "false"
        }
      }
    },
    1: {
      rows: 4,
      cols: 1,
      border: {
        squares: {
          top: "false",
          right: "false",
          left: "false",
          bottom: true
        },
        grid: "false"
      }
    },
    2: {
      rows: 3,
      cols: 2,
      border: {
        grid: {
          top: "false",
          right: "false",
          left: true,
          bottom: true
        },
        squares: {
          bottom: "false",
          right: "false",
          left: "false",
          top: true
        }
      }
    },
    3: {
      rows: 2,
      cols: 3,
      border: {
        grid: {
          bottom: "false",
          right: "false",
          left: "false",
          top: "false"
        },
        squares: {
          bottom: "false",
          right: "false",
          left: "false",
          top: "false"
        }
      }
    },
    4: {
      rows: 2,
      cols: 3,
      border: {
        grid: {
          bottom: "false",
          right: "false",
          left: "false",
          top: "false"
        },
        squares: {
          bottom: "false",
          right: "false",
          left: "false",
          top: "false"
        }
      }
    }
  }
};
