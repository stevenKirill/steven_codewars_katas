// Нужно написать декоратор timeLimit, который принимает асинхронную
// функцию fn и время ms (в миллисекундах).

// Декоратор возвращает новую функцию, которая работает как исходная, но реджектится по таймауту.

// Если за время ms исходная функция не вернула ответ,
// то через время ms промис реджектится со строкой "Time Limit Exceeded".

// Если исходная функция успела завершиться раньше (успешно или неуспешно),
// то и новая функция завершается так же в тот же момент.

const fn = (name) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(`Hello, ${name}!`), 500);
  });

const fn250 = timeLimit(fn, 250);

console.time("xxx");

fn250("World").then(
  (value) => {
    console.timeEnd("xxx");
    console.log("1 >>", value);
  },
  (reason) => {
    console.timeEnd("xxx");
    console.log("2 >>", reason); // "Time Limit Exceeded"
  }
);

var timeLimit = function (fn, t) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      // 1. Создаем идентификатор таймера, чтобы можно было его очистить
      const timeoutId = setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t);

      // 2. Запускаем исходную функцию с аргументами
      fn(...args)
        .then((res) => {
          // Если успели, удаляем таймер и возвращаем результат
          clearTimeout(timeoutId);
          resolve(res);
        })
        .catch((err) => {
          // Если во время выполнения упала ошибка, тоже чистим таймер
          clearTimeout(timeoutId);
          reject(err);
        });
    });
  };
};

var timeLimit2 = function (fn, t) {
  return function (...args) {
    // Создаем промис, который всегда реджектится через t миллисекунд
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t);
    });

    // Устраиваем "гонку" между выполнением функции и таймером
    return Promise.race([fn(...args), timeoutPromise]);
  };
};
