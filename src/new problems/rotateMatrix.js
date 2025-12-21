const mtrx = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function rotate(matrix) {
  const rotated = matrix.map((_) => []);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      rotated[j][matrix.length - 1 - i] = matrix[i][j];
    }
  }
  return rotated;
}

function rotate180(matrix) {
  return rotate(rotate(matrix));
}

function rotate270(matrix) {
  return rotate180(rotate(matrix));
}

function printMatrix(arr) {
  arr.forEach((row) => console.log(row));
}

function rotate360(matrix) {
  return rotate270(rotate(matrix));
}

printMatrix(rotate(mtrx));
console.log("---------------");
printMatrix(rotate180(mtrx));
console.log("---------------");
printMatrix(rotate270(mtrx));
console.log("---------------");
printMatrix(rotate360(mtrx));
// 0:0 0:1 0:2    0:2 1:2 2:2
// 1:0 1:1 1:2 => 0:1 1:1 2:1
// 2:0 2:1 2:2    0:0 1:0 2:0

// [1,2,3],    [7,4,1],
// [4,5,6], => [8,5,2],
// [7,8,9],    [9,6,3],
