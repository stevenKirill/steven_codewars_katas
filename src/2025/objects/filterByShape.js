// Реализуйте функцию filterByShape, принимающую массив объектов и объект со значениями,
// по которым необходимо фильтровать.

const arr = [
  { a: 1, b: 1, c: 1 },
  { a: 2, b: 1, c: 1 },
  { a: 1, b: 2, c: 1 },
  { a: 1, b: 1, c: 2 },
  { a: 1, b: 2, c: 2 },
  { a: 2, b: 1, c: 2 },
  { a: 2, b: 2, c: 2 },
];

console.log(filterByShape(arr, { a: 1 })); [['a', 1]]
// [
//   { a: 1, b: 1, c: 1 },
//   { a: 1, b: 2, c: 1 },
//   { a: 1, b: 1, c: 2 },
//   { a: 1, b: 2, c: 2 },
// ]

console.log(filterByShape(arr, { a: 1, b: 2 }));
// [
//   { a: 1, b: 2, c: 1 },
//   { a: 1, b: 2, c: 2 },
// ]

function filterByShape(array, object) {
  return array.filter((obj) => {
    const entries = Object.entries(object);

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];

      // Если ключа нет или значение не совпадает - элемент не подходит
      if (!(key in obj) || obj[key] !== value) {
        return false;
      }
    }

    return true;
  });
}
