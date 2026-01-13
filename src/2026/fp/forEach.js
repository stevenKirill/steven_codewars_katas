function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

forEach([1, 2, 3], x => {
  console.log(x ** 2);
});

// console.log выполняется три раза
// со значениями 1, 4, 9
