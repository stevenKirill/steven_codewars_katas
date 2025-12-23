// Необходимо реализовать фунцию sleep, которая принимает время ms
// (в миллисекундах), на которое замедляется выполнение цепочки промисов.

// Функция multiplyBy3 принимает число и возвращает промис с утроенным числом,
// который резолвится через 500 мс
// Функция divideBy5 аналогично делит на 5 через 1500 мс
// Функция square возодит в квадрат через 2000 мс

const multiplyBy3 = (value) => {
  return new Promise((resolve) => {
    resolve(value * 3);
  });
};
const divideBy5 = (value) => {
  return new Promise((resolve) => {
    resolve(value / 5);
  });
};
const square = (value) => {
  return new Promise((resolve) => {
    resolve(value * value);
  });
};

multiplyBy3(10)
  .then((x) => divideBy5(x))
  .then((x) => square(x))
  .then((x) => console.log(x)); // 36 через 4 секунды

multiplyBy3(10)
  .then((x) => divideBy5(x))
  .then(sleep(10000)) // добавляет дополнительные 2 секунды
  .then((x) => square(x))
  .then((x) => console.log(x)); // 36 через 6 секунд

function sleep(ms) {
  return (value) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value);
      }, ms);
    });
  };
}
