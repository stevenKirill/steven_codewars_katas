// Для защиты данных пользователя необходимо показывать только последние 4 цифры номера кредитной карты.
// Остальные цифры необходимо закрыть символом #.

// Обычно длина номера карты составляет 16 символов, но мы хоти написать универсальную функцию,
// которая работает для любого номера.

function maskify(cc) {
  if (cc.length <= 4) return cc;
  return `${"#".repeat(cc.slice(0, -4).length)}${cc.slice(-4)}`;
}

// console.log(maskify("4556364607935616")); // "############5616"
// console.log(maskify("123456789")); // "#####6789"
// console.log(maskify("789")); // "789"

// Проверьте, что строка состоит только из цифр.

function onlyDigits(str) {
  return str.split("").every((x) => {
    const integer = parseInt(x);
    return typeof integer === "number" && !isNaN(integer);
  });
}

// console.log(onlyDigits("123")); // true
// console.log(onlyDigits("qwerty")); // false
// console.log(onlyDigits("5!")); // false
// console.log(onlyDigits("2e2")); // false

// Дан массив чисел. Необходимо найти индекс элемента такого, что сумма чисел слева от него равна
// сумме чисел справа от него. Если такого элемента нет, вернуть -1.
// Если таких индексов несколько, вернуть минимальный.

function pivotIndex(arr) {
  // Считаем общую сумму массива
  const totalSum = arr.reduce((sum, num) => sum + num, 0);
  let leftSum = 0;

  // Проходим по каждому элементу
  for (let i = 0; i < arr.length; i++) {
    // Правая сумма = общая сумма - текущий элемент - левая сумма
    const rightSum = totalSum - arr[i] - leftSum;

    // Если суммы равны - нашли искомый индекс
    if (leftSum === rightSum) {
      return i;
    }

    // Добавляем текущий элемент к левой сумме для следующей итерации
    leftSum += arr[i];
  }

  // Если не нашли подходящий индекс
  return -1;
}

const arr1 = [4, 2, 1, 3, 7, 6, 4];

// console.log(pivotIndex(arr1)); // 4

const arr2 = [4, 2, -5, 3];

// console.log(pivotIndex(arr2)); // 0

function arrayDiff(a, b) {
  return a.filter((number) => b.indexOf(number) === -1);
}

function arrayDiff(a, b) {
  const set = new Set(b);
  return a.filter((x) => !set.has(x));
}

// console.log(arrayDiff([1, 2, 3, 4, 5, 6], [4, 6, 8, 0,])); // [1, 2, 3, 5]
// console.log(arrayDiff([3, 1, 1, 1, 1, 2, 2, 2], [4, 4, 2, 7, 8, 8])); // [3, 1, 1, 1, 1]

function spy(fn) {
  let callCount = 0;
  let wasCalled = false;
  const map = new Map();
  const returned = new Map();
  return function inner(...args) {
    const result = fn.apply(this, [...args]);
    if (!returned.has(result)) {
      returned.set(result, result);
    }
    wasCalled = true;
    callCount++;
    if (!map.has(...args)) {
      [...args].forEach((arg) => {
        if (!map.has(arg)) {
          map.set(arg, arg);
        }
      });
    }
    inner.callCount = () => {
      if (!wasCalled) return 0;
      return callCount;
    };
    inner.wasCalledWith = (arg) => {
      if (map.has(arg)) {
        return true;
      }
      return false;
    };
    inner.returned = (arg) => {
      if (returned.has(arg)) {
        return true;
      }
      return false;
    };
    return result;
  };
}

function spy2(fn) {
  // Массивы для хранения истории вызовов
  const calls = [];
  const args = [];
  const results = [];

  // Создаем функцию-обертку
  function wrapper(...params) {
    // Сохраняем аргументы
    args.push(...params);

    // Вызываем оригинальную функцию и сохраняем результат
    const result = fn.apply(this, params);
    results.push(result);

    // Увеличиваем счетчик вызовов
    calls.push(true);

    return result;
  }

  // Добавляем метод подсчета вызовов
  wrapper.callCount = function () {
    return calls.length;
  };

  // Добавляем метод проверки использованных аргументов
  wrapper.wasCalledWith = function (arg) {
    return args.includes(arg);
  };

  // Добавляем метод проверки возвращаемых значений
  wrapper.returned = function (value) {
    return results.includes(value);
  };

  return wrapper;
}

function repeat(str, count) {
  return str.repeat(count);
}

const spyRepeat = spy(repeat);

console.log(spyRepeat("abc", 2)); // === "abcabc"
console.log(spyRepeat("xx", 4)); // === "xxxxxxxx"

console.log(spyRepeat.callCount()); // === 2

console.log(spyRepeat.wasCalledWith("abc")); // === true
console.log(spyRepeat.wasCalledWith(4)); // === true
console.log(spyRepeat.wasCalledWith(5)); // === false

console.log(spyRepeat.returned("xxxxxxxx")); // === true
console.log(spyRepeat.returned("qwerty")); // === false
