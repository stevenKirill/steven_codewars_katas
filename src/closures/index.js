/* Счетчик
Создайте функцию createCounter, которая создает счетчик и возвращает объект с методами:
- increment() - увеличивает счетчик на 1
- decrement() - уменьшает счетчик на 1
- getValue() - возвращает текущее значение счетчика
*/

// Решение:
function createCounter(initialValue = 0) {
  let count = initialValue;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
  };
}

// Пример использования:
const counter = createCounter(5);
console.log(counter.getValue()); // 5
counter.increment(); // 6
counter.increment(); // 7
counter.decrement(); // 6
console.log(counter.getValue()); // 6

/* Банковский счет
Создайте функцию createBank, которая будет создавать объект для работы с банковским счетом.
Должны быть методы:
- deposit(amount) - пополнение счета
- withdraw(amount) - снятие со счета
- getBalance() - получение баланса
Бонус: добавьте проверку на отрицательный баланс
*/

// Решение:
function createBank(initialBalance = 0) {
  let balance = initialBalance;

  return {
    deposit: (amount) => {
      if (amount > 0) {
        balance += amount;
        return `Внесено: ${amount}. Баланс: ${balance}`;
      }
      return "Некорректная сумма";
    },
    withdraw: (amount) => {
      if (amount > balance) {
        return "Недостаточно средств";
      }
      if (amount > 0) {
        balance -= amount;
        return `Снято: ${amount}. Баланс: ${balance}`;
      }
      return "Некорректная сумма";
    },
    getBalance: () => balance,
  };
}

// Пример использования:
const account = createBank(1000);
console.log(account.getBalance()); // 1000
console.log(account.deposit(500)); // Внесено: 500. Баланс: 1500
console.log(account.withdraw(2000)); // Недостаточно средств
console.log(account.withdraw(700)); // Снято: 700. Баланс: 800

/* Кеширование результатов
Создайте функцию memoize, которая кэширует результаты вызова другой функции.
Если функция вызывается с теми же аргументами, должен возвращаться кэшированный результат.
*/

// Решение:
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Возврат из кэша");
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    console.log("Вычисление результата");
    return result;
  };
}

// Пример использования:
const slowSum = (a, b) => {
  // Имитация медленной операции
  const start = Date.now();
  while (Date.now() - start < 1000) {} // Задержка 1 секунда
  return a + b;
};

const fastSum = memoize(slowSum);

console.log(fastSum(2, 3)); // Вычисление результата (медленно)
console.log(fastSum(2, 3)); // Возврат из кэша (быстро)

/* Каррирование
Создайте функцию curry, которая превращает обычную функцию в каррированную.
Каррированная функция должна принимать аргументы по одному и возвращать новую функцию,
пока не будут переданы все аргументы.
*/

// Решение:
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

// Пример использования:
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6

/*
Создайте систему логирования, которая позволяет:
- Устанавливать минимальный уровень логирования (DEBUG, INFO, WARN, ERROR)
- Логировать сообщения только если их уровень выше или равен установленному
- Каждое сообщение должно включать временную метку

Уровни:
DEBUG = 0
INFO = 1
WARN = 2
ERROR = 3
*/

// Решение:
function createLogger(minLevel = 0) {
  const levels = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
  };

  function formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${level}: ${message}`;
  }

  return {
    debug: (message) => {
      if (minLevel <= levels.DEBUG) {
        console.log(formatMessage("DEBUG", message));
      }
    },
    info: (message) => {
      if (minLevel <= levels.INFO) {
        console.log(formatMessage("INFO", message));
      }
    },
    warn: (message) => {
      if (minLevel <= levels.WARN) {
        console.log(formatMessage("WARN", message));
      }
    },
    error: (message) => {
      if (minLevel <= levels.ERROR) {
        console.log(formatMessage("ERROR", message));
      }
    },
    setLevel: (level) => (minLevel = levels[level]),
  };
}

// Пример использования:
const logger = createLogger(1); // INFO и выше
logger.debug("Отладочное сообщение"); // не выводится
logger.info("Информационное сообщение"); // выводится
logger.warn("Предупреждение"); // выводится
logger.setLevel("ERROR");
logger.warn("Новое предупреждение"); // не выводится

/*
Создайте функцию createIdGenerator, которая:
- Принимает префикс для ID
- Возвращает функцию, генерирующую уникальные ID с этим префиксом
- Позволяет установить начальное значение счетчика
- Имеет метод для сброса счетчика
*/

// Решение:
function createIdGenerator(prefix = "") {
  let counter = 0;

  function generateId() {
    return `${prefix}${++counter}`;
  }

  generateId.setStart = (value) => {
    counter = value;
  };

  generateId.reset = () => {
    counter = 0;
  };

  generateId.getCurrentCounter = () => counter;

  return generateId;
}

// Пример использования:
const generateUserId = createIdGenerator("user_");
console.log(generateUserId()); // user_1
console.log(generateUserId()); // user_2

generateUserId.setStart(100);
console.log(generateUserId()); // user_101

generateUserId.reset();
console.log(generateUserId()); // user_1

/*
Создайте конструктор запросов, который позволяет:
- Добавлять условия WHERE
- Добавлять сортировку ORDER BY
- Устанавливать лимит LIMIT
- Собирать финальный SQL-запрос
*/

// Решение:
function createQueryBuilder(tableName) {
  let conditions = [];
  let orderByClause = "";
  let limitValue = "";

  return {
    where: (field, operator, value) => {
      const formattedValue = typeof value === "string" ? `'${value}'` : value;
      conditions.push(`${field} ${operator} ${formattedValue}`);
      return this;
    },
    orderBy: (field, direction = "ASC") => {
      orderByClause = ` ORDER BY ${field} ${direction}`;
      return this;
    },
    limit: (limit) => {
      limitValue = ` LIMIT ${limit}`;
      return this;
    },
    build: () => {
      let query = `SELECT * FROM ${tableName}`;

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(" AND ")}`;
      }

      query += orderByClause + limitValue;
      return query;
    },
    reset: () => {
      conditions = [];
      orderByClause = "";
      limitValue = "";
    },
  };
}

// Пример использования:
const query = createQueryBuilder("users");
console.log(
  query
    .where("age", ">", 18)
    .where("status", "=", "active")
    .orderBy("created_at", "DESC")
    .limit(10)
    .build()
);
// SELECT * FROM users WHERE age > 18 AND status = 'active' ORDER BY created_at DESC LIMIT 10
