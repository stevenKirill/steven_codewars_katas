/*
Создайте объект calculator с методами add и multiply.
Напишите функцию, которая позволит использовать эти методы для любого объекта с числовым свойством value.
*/

// Решение:
const calculator = {
  add(a) {
    return this.value + a;
  },
  multiply(a) {
    return this.value * a;
  },
};

const box1 = { value: 5 };
const box2 = { value: 10 };

console.log(calculator.add.call(box1, 3)); // 8
console.log(calculator.multiply.call(box2, 2)); // 20

// Бонус: создание универсальной функции
function calculate(obj, operation, number) {
  return calculator[operation].call(obj, number);
}

console.log(calculate(box1, "add", 5)); // 10
console.log(calculate(box2, "multiply", 3)); // 30

/*
Создайте функцию formatUserData, которая будет форматировать данные пользователя.
Функция должна работать как с объектами пользователей, так и с массивами данных.
*/

// Решение:
function formatUserData(separator = " ") {
  return `${this.firstName}${separator}${this.lastName}, ${this.age} лет`;
}

const user1 = {
  firstName: "Иван",
  lastName: "Петров",
  age: 25,
};

const users = [
  { firstName: "Мария", lastName: "Иванова", age: 30 },
  { firstName: "Петр", lastName: "Сидоров", age: 35 },
];

console.log(formatUserData.call(user1, " ")); // "Иван Петров, 25 лет"
console.log(users.map((user) => formatUserData.apply(user, [" "])));
// ["Мария Иванова, 30 лет", "Петр Сидоров, 35 лет"]

/*
Создайте систему валидации, которая может проверять различные типы данных
в зависимости от контекста и правил.
*/

// Решение:
const validators = {
  isPositive() {
    return this.value > 0;
  },
  isEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.value);
  },
  isPasswordStrong() {
    return (
      this.value.length >= 8 &&
      /[A-Z]/.test(this.value) &&
      /[0-9]/.test(this.value)
    );
  },
};

function validate(validatorName, value) {
  return validators[validatorName].call({ value });
}

// Примеры использования:
console.log(validate("isPositive", 5)); // true
console.log(validate("isPositive", -5)); // false
console.log(validate("isEmail", "test@example.com")); // true
console.log(validate("isPasswordStrong", "Password123")); // true


/*
Создайте декоратор, который добавляет функциональность логирования к методам объекта,
сохраняя их контекст выполнения.
*/

// Решение:
function addLogging(originalMethod, methodName) {
  return function (...args) {
    console.log(`Вызов метода ${methodName} с аргументами:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Результат метода ${methodName}:`, result);
    return result;
  };
}

class Calculator {
  constructor() {
    // Декорируем методы при создании экземпляра
    this.add = addLogging(this.add, "add");
    this.multiply = addLogging(this.multiply, "multiply");
  }

  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }
}

// Пример использования:
const calc = new Calculator();
calc.add(2, 3);
// Вызов метода add с аргументами: [2, 3]
// Результат метода add: 5

calc.multiply(4, 5);
// Вызов метода multiply с аргументами: [4, 5]
// Результат метода multiply: 20
