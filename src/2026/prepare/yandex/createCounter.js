/**
 * Реализуйте функцию, которая создаёт объект счётчика
 * с базовыми методами: increment, decrement, reset.
 *
 * @param {number} init - начальное значение счётчика
 * @returns {object} объект с методами increment, decrement, reset
 */
export function createCounter(init) {
  let counter = init;
  return {
    increment: () => {
      counter++;
      return counter;
    },
    decrement: () => {
      counter--;
      return counter;
    },
    reset: () => {
      counter = init;
      return counter;
    },
  };
}

const counter = createCounter(5)

console.log(counter.increment())
console.log(counter.reset())
console.log(counter.decrement())
