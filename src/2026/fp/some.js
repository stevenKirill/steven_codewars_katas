// Реализуйте аналог стандартного метода Array#some.

function some(array, callback) {
  let res = false;
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      res = true;
      return res;
    }
  }
  return false;
}

const numbers = [3, -5, 6, -1, 9, 0, 5];
const isPositive = (x) => x > 0;
console.log(some(numbers, isPositive));

// console.log(some([1, 2, 3, 4], x => x > 2));
// true

// console.log(some([1, 2, 3, 4], x => x > 20));
// false

// console.log(some(["a", "b", "c", "d"], (x, i) => x.length >= i));
// true
