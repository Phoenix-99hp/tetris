export const generateSquares = () => {
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

export const determineShape = () => {
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

export const determineOrientation = () => {
  return Math.floor(Math.random() * 4);
};

export const determineStartingCoordinates = (shape, orientation, direction) => {
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

export const commifyScore = value => {
  const score = value.toString().split("");
  let x = 0;
  const mapped = score.reverse().map((num, i) => {
    if (score.length >= 4 && i > 2 && score[x + 3]) {
      x += 3;
      return `${num}comma`;
    } else {
      return num;
    }
  });
  return mapped.reverse().toString().replace(/,/g, "").replace(/comma/g, ",");
};

export const shouldUpdateCoordinatesOnRotate = (
  sortedNewCoordinates,
  squares
) => {
  if (
    !sortedNewCoordinates.filter(
      coordinate =>
        coordinate.toString().endsWith("9") &&
        sortedNewCoordinates.filter(newCoordinate =>
          newCoordinate.toString().endsWith("0")
        ).length >= 1
    )[0] &&
    !squares.filter(({ coordinate }) =>
      sortedNewCoordinates.includes(coordinate)
    )[0]
  ) {
    return true;
  } else {
    return false;
  }
};

// export const generated = generateSquares();

// export const nextShape = determineShape();
// export const nextOrientation = determineOrientation();
// export const nextDirection =
//   nextShape.num === 2 || nextShape.num === 3
//     ? Math.floor(Math.random() * 2)
//     : null;
// export const nextCoordinates = determineStartingCoordinates(
//   nextShape.num,
//   nextOrientation,
//   nextDirection
// );
