// Нам нужно составить коды длины 2 из цифр [2, 3]
// Напишите функцию generateCodes(digits, length),
// которая находит все возможные варианты кодов заданной длины.
// Цифры в коде могут повторяться, а порядок цифр имеет значение
// (то есть 2+3 и 3+2 — это разные коды).
generateCodes([2, 3], 2);

function generateCodes(digits, length) {

}

// Функция должна вернуть:
// [ "2+2", "2+3", "3+2", "3+3" ]

// Эта задача проще, потому что вам не нужно считать остаток суммы
// и не нужно ограничивать startIndex (ведь 2+3 и 3+2 теперь разрешены).
// Вам просто нужно следить за текущей длиной кода и на каждом шаге перебирать
//  абсолютно все доступные цифры из массива.


function throttle(fn, limit) {
  let inThrottle = false;
  let lastArgs = null;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          fn.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };
}
