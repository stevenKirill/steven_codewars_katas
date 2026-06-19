function debounce(fn, time) {
  let timeoutId = null;
  return function (...args) {
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

const dobouncedFunc = debounce((a, b) => {
  console.log("calling");
  return a + b;
}, 1000);

function throttle(fn, limit) {
  let inTrottle = false; // флаг блокировки
  let lastArgs = null;
  let lastContext = null;

  const execute = () => {
    if (lastArgs) {
      fn.apply(lastContext, lastArgs);
      lastArgs = null;
      lastContext = null;
      setTimeout(execute, limit);
    } else {
      inTrottle = false;
    }
  };

  return function (...args) {
    if (!inTrottle) {
      fn.apply(this, args);
      inTrottle = true;
      setTimeout(execute, limit);
    } else {
      lastArgs = args;
      lastContext = this;
    }
  };
}

Array.prototype.myMap = function (callback) {
  const result = new Array(this);

  for (let i = 0; i < this.length; i++) {
    result[i] = callback(this[i], i, this);
  }

  return result;
};

const arr = [1, 2, 3];
// console.log(arr.myMap((el) => el * 2));

Array.prototype.myFilter = function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    const filtered = callback(this[i], i, this);
    if (filtered) {
      result.push(this[i]);
    }
  }
  return result;
};

const arr2 = [1, 2, 3];
// console.log(arr2.myFilter((el) => el > 1));

Array.prototype.myReduce = function (callback, initial) {
  let acc;
  let startIndex;

  if (arguments.length >= 2) {
    startIndex = 0;
    acc = initial;
  } else {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    startIndex = 1;
    acc = this[0];
  }

  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

// console.log([1, 2, 3, 4].myReduce((sum, x) => sum + x, 0)); // 10

function flatten(arr) {
  return arr.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
}

//console.log(flatten([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]

function deepEqual(a, b) {
  // 1. Проверка на идентичность + правильная обработка NaN
  if (a === b) return true;
  if (Number.isNaN(a) && Number.isNaN(b)) return true;

  // 2. Отсечение null и undefined
  if (a == null || b == null) return false;

  // 3. Если это даты, сравниваем их таймстампы (числа)
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // 4. Если это регулярные выражения, сравниваем их строковое представление
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;

    for (const keyA of a) {
      let found = false;
      for (const keyB of b) {
        if (deepEqual(keyA, keyB)) {
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }

  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;

    for(const [keyA, valA] of a) {
      let foundKeyB = false;
      let valB;

      for(const [keyB, valueB] of b) {
        if (deepEqual(keyA, keyB)) {
          foundKeyB = true;
          valB = valueB;
          break;
        }
      }

      if (!foundKeyB || !deepEqual(valA, valB)) {
        return false;
      }
    }
    return true;
  }

  // 5. Если один из аргументов не объект, то они не равны (примитивы проверены в шаге 1)
  if (typeof a !== "object" || typeof b !== "object") return false;

  // 6. Разделение массивов и объектов
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  // 7. Проверка количества ключей
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  // 8. Рекурсивный обход ключей
  for (const key of keysA) {
    // Оптимизация: Object.prototype.hasOwnProperty.call быстрее и надежнее, чем keysB.includes
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !deepEqual(a[key], b[key])
    ) {
      return false;
    }
  }

  return true;
}

// Проверка NaN
console.log(deepEqual({ x: NaN }, { x: NaN })); // true

// Проверка Дат
console.log(deepEqual(new Date(2026, 5, 1), new Date(2026, 5, 1))); // true
console.log(deepEqual(new Date(2026, 5, 1), new Date(2010, 1, 1))); // false

// Проверка Регулярок
console.log(deepEqual(/abc/g, /abc/g)); // true
console.log(deepEqual(/abc/g, /abc/i)); // false (разные флаги)

const set1 = new Set([{ x: 1 }, { y: 2 }]);
const set2 = new Set([{ x: 1 }, { y: 2 }]);
console.log(deepEqual(set1, set2)); // true
