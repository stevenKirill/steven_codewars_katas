export function memoize(fn) {
  const cache = {};
  return function(...input) {
    const args = JSON.stringify(input);
    if (cache[args]) {
      return cache[args]
    } else {
      const result = fn.apply(this, input);
      cache[args] = result;
      return result;
    }
  }
}

export function sum(a, b) {
  return a + b;
}

const memoSum = memoize(sum);

console.log(memoSum(2, 2));
console.log(memoSum(2, 2));

console.log(JSON.stringify(1), '1')



export const callingArguments = [
  [1, 2],
  [1, 2],
];
