function zip(a, b, callback) {
  const short = a.length < b.length ? a : b;
  const result = [];

  for (let i = 0; i < short.length; i++) {
    const r = callback(a[i], b[i]);
    result.push(r);
  }

  return result;
}

console.log(zip(
  [1, 2, 3],
  [5, 6, 7],
  (a, b) => a * b,
));
// [5, 12, 21]

console.log(zip(
  ["abc", "f", "qw"],
  [1, 6, 2, 9, 3],
  (x, i) => x.repeat(i),
));
// ["abc", "ffffff", "qwqw"]

undefined.repeat(9)
