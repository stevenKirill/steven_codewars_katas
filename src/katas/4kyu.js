// Sum Strings as Numbers => https://www.codewars.com/kata/5324945e2ece5e1f32000370

function sumStrings(a, b) {
  const A = a.split("");
  const B = b.split("");
  let c = 0;
  let res = "";
  while (A.length || B.length || c) {
    c = c + (~~A.pop() + ~~B.pop());
    res = (c % 10) + res;
    c = c > 9;
  }
  return res.replace(/^0+/, "");
}

// Currying vs. Partial Application => https://www.codewars.com/kata/53cf7e37e9876c35a60002c9

function curryPartial(fn) {
  const args = Array.prototype.slice.call(arguments, 1);
  if (args.length >= fn.length) {
    return fn.apply(null, args);
  }
  return function () {
    const rest = Array.prototype.slice.call(arguments);
    return curryPartial.apply(null, [fn].concat(args).concat(rest));
  };
}

// Find all possible number combos that sum to a number => https://www.codewars.com/kata/555b1890a75b930e63000023

function combos(n) {
  const result = [];

  function helper(n, prev) {
    if (n === 0) {
      result.push(prev);
    }
    for (let i = 1; i <= n; i++) {
      if (prev.length === 0 || prev[prev.length - 1] <= i) {
        helper(n - i, [...prev, i]);
      }
    }
  }
  helper(n, []);
  return result;
}
