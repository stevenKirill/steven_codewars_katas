// Задача 1: Базовое использование bind
// Создайте функцию, которая будет приветствовать пользователя с указанным именем
function greet() {
  console.log(`Привет, ${this.name}!`);
}

const user = { name: 'Иван' };
const greetIvan = greet.bind(user);

// Проверка
greetIvan(); // "Привет, Иван!"


// Задача 2: Частичное применение аргументов
// Создайте функцию для умножения числа на указанный множитель
function multiply(a, b) {
  return a * b;
}

const multiplyByTwo = multiply.bind(null, 2);
const multiplyByTen = multiply.bind(null, 10);

// Проверка
console.log(multiplyByTwo(4));  // 8
console.log(multiplyByTen(5));  // 50


// Задача 3: Работа с методами объекта
// Создайте объект с методом для подсчета суммы покупок
const cart = {
  items: [],
  total: 0,
  addItem(item, price) {
    this.items.push({ item, price });
    this.total += price;
  }
};

const addToCart = cart.addItem.bind(cart);

// Проверка
addToCart('книга', 300);
addToCart('ручка', 50);
console.log(cart.total); // 350


// Задача 4: Создание системы логгирования
const logger = {
  logs: [],
  log(message, type) {
    const logEntry = `${type}: ${message}`;
    this.logs.push(logEntry);
  }
};

const errorLog = logger.log.bind(logger, '[ERROR]');
const infoLog = logger.log.bind(logger, '[INFO]');

// Проверка
errorLog('Ошибка в системе');
infoLog('Система запущена');
console.log(logger.logs); // ['[ERROR]: Ошибка в системе', '[INFO]: Система запущена']


// Задача 5: Создание игрового персонажа
const character = {
  name: 'Воин',
  health: 100,
  attack(target, damage) {
    target.health -= damage;
    console.log(`${this.name} атакует ${target.name} на ${damage} урона`);
  }
};

const enemy = {
  name: 'Монстр',
  health: 100
};

const warriorAttack = character.attack.bind(character);

// Проверка
warriorAttack(enemy, 30);
console.log(enemy.health); // 70


// Задача 7: Создание калькулятора с фиксированной операцией
function calculate(operation, a, b) {
  switch(operation) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': return a / b;
  }
}

const add = calculate.bind(null, 'add');
const subtract = calculate.bind(null, 'subtract');

// Проверка
console.log(add(5, 3));      // 8
console.log(subtract(10, 4)); // 6


// Задача 8: Создание таймера с контекстом
const timer = {
  seconds: 0,
  tick() {
    this.seconds++;
    console.log(`Прошло секунд: ${this.seconds}`);
  },
  start() {
    const boundTick = this.tick.bind(this);
    setInterval(boundTick, 1000);
  }
};

// Проверка
// timer.start(); // Будет считать секунды

Function.prototype.myBind = function(context, ...args1) {
  const originalFunction = this;

  return function(...args2) {
    return originalFunction.apply(context, [...args1, ...args2]);
  };
};

// Function.prototype.bind = function(ctx) {
//   const boundArgs = [].slice.call(arguments, 1);
//   const func = this;

//   return function() {
//     const callArgs = boundArgs.concat([].slice.call(arguments))
//     return func.apply(ctx, callArgs)
//   }
// }


// Задача 9: Создание цепочки суммирования
function chainSum(x) {
  let counter = x;
  return function adder(y) {
    counter += y;
    adder.result = counter;
    return adder
  }
};
chainSum(1)(2)(3)(4)(10)(100).result;


/**
* Дан массив. Необходимо отсортировать нечетные по значению числа по возрастанию,
* а четные оставить на своих местах
*/
function oddSort(numbers) {
  // your code here
}

console.log(oddSort([2, 3, 7, 4, 6, 1, 5, 8, 9])); // [2, 1, 3, 4, 6, 5, 7, 8, 9]
console.log(oddSort([2, 4, 6, 8])); // [2, 4, 6, 8]
console.log(oddSort([3, 7, 1, 5, 9])); // [1, 3, 5, 7, 9]


// ... existing code ...

function curry(fn) {
  // Получаем количество параметров исходной функции
  const arity = fn.length;

  // Возвращаем функцию, которая будет собирать аргументы
  return function curried(...args) {
    // Если собрано достаточно аргументов, вызываем исходную функцию
    if (args.length >= arity) {
      return fn.apply(this, args);
    }

    // Иначе возвращаем новую функцию, которая продолжит собирать аргументы
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// Примеры использования:
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6

// ... existing code ...
