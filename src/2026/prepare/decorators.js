function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = args.join("_");
    if (cache[key]) {
      return cache[key];
    } else {
      const res = fn.apply(this, args);
      cache[key] = res;
      return res;
    }
  };
}

function calculateDelivery(distance, weight) {
  console.log(
    `[РАСЧЕТ] Считаем доставку на ${distance} км для ${weight} кг...`,
  );
  return distance * 10 + weight * 5;
}

const memoizedDelivery = memoize(calculateDelivery);
console.log(memoizedDelivery(10, 5)); // Должен появиться лог "[РАСЧЕТ]" и вернуть 125
console.log(memoizedDelivery(10, 5)); // Лога "[РАСЧЕТ]" БЫТЬ НЕ ДОЛЖНО, результат 125 берется из кэша!

function curryDelivery(fn) {
  return function (arg) {
    return function (inner) {
      return fn.call(null, arg, inner);
    };
  };
}

const curried = curryDelivery(calculateDelivery); // или ваша кастомная каррированная функция
const localDelivery = curried(50); // Фиксируем расстояние 50 км
console.log(localDelivery(2)); // Передаем вес 2 кг. Результат: 510
console.log(localDelivery(10)); // Передаем вес 10 кг. Результат: 550

function logWithContext(fn, contextName) {
  return function (...args) {
    console.log(
      `[МЕТРИКА - ${contextName}] Вызвана функция с аргументами: ${args}`,
    );
    const res = fn.apply(this, ...args);
    return res;
  };
}

const loggedDelivery = logWithContext(calculateDelivery, "Заказы_Спб");
loggedDelivery(15, 3);
// Ожидается в консоли:
// "[МЕТРИКА - Заказы_Спб] Вызвана функция с аргументами: 15, 3"
// "[РАСЧЕТ] Считаем доставку..."

const sum = (a, b, c, d) => {
  return a + b + c + d;
};

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

function curry2(fn) {
  return function curried(...args) {
    if (fn.length <= args.length) {
      return fn.apply(this, args);
    }
    return function(...next) {
      return curried.apply(this, args.concat(next))
    }
  }
}

const c = curry2(sum);

console.log(c(2, 3)(2)(1));
