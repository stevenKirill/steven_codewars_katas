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

// Алгоритм
// Начинаем с полного n и пустого набора: вызывать helper(n, []).
// Если n === 0, значит, мы ровно подобрали числа на сумму n — кладём последовательность в результат.
// В цикле от 1 до n перебираем кандидаты на следующее слагаемое:Главное условие: либо это первое число (prev.length === 0), либо текущее не меньше последнего добавленного (prev[prev.length - 1] <= i).
// Это условие заставляет последовательности быть неубывающими.

// Кладём текущее число в новую комбинацию: helper(n - i, [...prev, i]).
// Рассмотрим для n = 3
// Начинаем: helper(3, [])
// Цикл по i: 1, 2, 3
// i = 1:
// helper(2, [1])здесь снова цикл по i: 1, 2i=1: helper(1, [1, 1])цикл: i=1helper(0, [1, 1, 1]) — сумма = 3, сохраняем [1,1,1]

// i=2: можно ли 2? последний был 1, а 2>=1, даhelper(0, [1, 2]) — сумма = 3, сохраняем [1,2]

// i = 2:
// helper(1, [2])здесь цикл по i: 1но 2>1, а последнее = 2, 2<=1 — неверно, значит не идёт

// i = 3:
// helper(0, [3]) — сумма = 3, сохраняем [3].

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

combos(3); // [ [ 3 ], [ 1, 1, 1 ], [ 1, 2 ] ]

