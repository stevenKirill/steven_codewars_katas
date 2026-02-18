function reduce(array, callback, initialValue) {
  // Проверяем, был ли передан 3-й аргумент (initialValue).
  // Мы используем arguments.length, чтобы отличить случай, когда
  // аргумент не передан вовсе, от случая, когда передано undefined.
  const hasInitialValue = arguments.length > 2;

  // Если массив пустой и нет начального значения — выбрасываем ошибку
  if (array.length === 0 && !hasInitialValue) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator;
  let startIndex;

  if (hasInitialValue) {
    // Сценарий 1: initialValue передан
    accumulator = initialValue;
    startIndex = 0; // Начинаем с первого элемента (индекс 0)
  } else {
    // Сценарий 2: initialValue НЕ передан
    accumulator = array[0]; // Аккумулятор инициализируется первым элементом массива
    startIndex = 1; // Начинаем перебор со второго элемента (индекс 1)
  }

  // Проходим по массиву начиная с вычисленного индекса
  for (let i = startIndex; i < array.length; i++) {
    // Вызываем callback, обновляя значение аккумулятора
    // Аргументы: accumulator, currentValue, currentIndex, array
    accumulator = callback(accumulator, array[i], i, array);
  }

  return accumulator;
}

// --- Примеры использования для проверки ---

// 1. Сумма чисел с initialValue
const nums = [1, 2, 3, 4];
const sumWithInit = reduce(nums, (acc, cur) => acc + cur, 10);
console.log(sumWithInit); // 20 (10 + 1 + 2 + 3 + 4)

// 2. Сумма чисел без initialValue
const sumNoInit = reduce(nums, (acc, cur) => acc + cur);
console.log(sumNoInit); // 10 (1 + 2 + 3 + 4)

// 3. Обработка ошибки
try {
  reduce([], (acc, cur) => acc + cur);
} catch (e) {
  console.log(e.message); // "Reduce of empty array with no initial value"
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// 10

console.log(reduce([], (a, b) => a + b, 0));
// 0

console.log(reduce([], (a, b) => a + b));
// TypeError: Reduce of empty array with no initial value

console.log(reduce(["a", "b", "c"], (a, b) => ({ [b]: a }), {}));
// { "c": { "b": { "a": {} } } }

console.log(reduce(["a", "b", "c"], (a, b) => ({ [b]: a })));
// { "c": { "b": "a"} }
