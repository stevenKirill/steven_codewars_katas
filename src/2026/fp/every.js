function every(array, callback) {
  let res = true;

  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      res = false;
      return res;
    }
  }
  return res;
}

console.log(every([1, 2, 3, 4], x => x > 2));
// false

console.log(every([1, 2, 3, 4], x => x > 0));
// true

console.log(every(["a", "b", "c", "d"], (x, i) => x.length >= i));
// false
