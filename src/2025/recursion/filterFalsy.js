// Необходимо написать функцию, которая на вход принимает объект и убирает из него все falsy значения.

// falsy значение — это такое значение value, для которого Boolean(value) === false
// считаем, что obj — результат выполнения JSON.parse, то есть plain object

console.log(filterFalsy([null, 0, false, 1]));
// => [1]

console.log(filterFalsy({ a: null, b: [false, 1] }));
// => { 'b': [1] }

console.log(filterFalsy([null, 0, 5, [0], [false, 16]]));
// => [5, [], [16]]

function filterFalsy(data) {
  // 1. Если это МАССИВ
  if (Array.isArray(data)) {
    return data
      .map((item) => filterFalsy(item)) // Сначала рекурсивно чистим внутренности
      .filter((item) => Boolean(item)); // Потом удаляем всё, что стало falsy (или было им)
  }

  // 2. Если это ОБЪЕКТ (не null и не массив)
  else if (typeof data === "object" && data !== null) {
    const result = {}; // Создаем новый пустой объект

    for (let key in data) {
      const cleanedValue = filterFalsy(data[key]); // Рекурсивно чистим значение

      // Если очищенное значение "truthy" (существует), добавляем его в новый объект
      if (cleanedValue) {
        result[key] = cleanedValue;
      }
    }

    return result; // Возвращаем собранный объект
  }

  // 3. Если это ПРИМИТИВ (число, строка и т.д.)
  else {
    return data; // Возвращаем как есть (фильтрация произойдет на уровень выше, в родительском if)
  }
}

// ТЕСТЫ:

// Пример 1 из твоего запроса
console.log(filterFalsy({ a: null, b: [false, 1] }));
// Ожидание: { 'b': [1] }
// Результат: { 'b': [1] }

// Пример 2
console.log(filterFalsy([null, 0, 5, [0], [false, 16]]));
// Разбор:
// null -> удален
// 0 -> удален
// 5 -> остался
// [0] -> рекурсия превратит в [], пустой массив это truthy в JS -> останется []
// [false, 16] -> рекурсия превратит в [16] -> останется [16]
// Результат: [ 5, [], [ 16 ] ]
