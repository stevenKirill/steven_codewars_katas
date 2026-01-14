function filter(array, callback) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    const x = callback(array[i], i, array);
    if (x) {
      result.push(array[i])
    }
  }
  return result;
}

console.log(filter([1, 2, 3, 4], x => x > 2));
// [3, 4]

console.log(filter(["a", "b", "c", "d"], (x, i) => x.length >= i));
// ["a", "b"]

