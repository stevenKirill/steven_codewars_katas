// =================== Задача 1 ===================
// Создайте объект калькулятора с методами
const calculator = {
  number: 0,
  add: function(x) {
    // Добавьте код здесь
  },
  subtract: function(x) {
    // Добавьте код здесь
  },
  getValue: function() {
    // Добавьте код здесь
  }
};

// Должно работать так:
// calculator.add(5).subtract(3).add(10).getValue() // Должно вернуть 12


// =================== Задача 2 ===================
// Создайте систему управления пользователями
const userSystem = {
  users: [],
  currentId: 1,

  addUser: function(name, age) {
    // Добавьте пользователя в массив users
    // Должен иметь уникальный id (используйте currentId)
    // Добавьте код здесь
  },

  getUserInfo: function(id) {
    // Найдите и верните информацию о пользователе по id
    // Добавьте код здесь
  }
};


// =================== Задача 3 ===================
// Создайте класс для управления библиотекой
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(title, author) {
    // Добавьте код здесь
  }

  removeBook(title) {
    // Добавьте код здесь
  }

  getBooksByAuthor(author) {
    // Добавьте код здесь
  }

  // Добавьте асинхронный метод для "заимствования" книги
  borrowBook(title, user) {
    // Должен вернуть Promise
    // Если книга есть - пометить её как занятую и вернуть успех
    // Если книги нет - вернуть ошибку
  }
}


// =================== Задача 4 ===================
// Создайте класс для управления очередью задач
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    // Добавьте код здесь
  }

  executeNext() {
    // Должен выполнить следующую задачу в очереди
    // Использовать setTimeout для имитации асинхронности
  }

  // Добавьте метод, который будет выполнять все задачи по очереди
  executeAll() {
    // Должен использовать executeNext для выполнения всех задач
  }
}


// =================== Задача 5 ===================
// Создайте класс для работы с событиями
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    // Добавьте код здесь
  }

  emit(eventName, data) {
    // Добавьте код здесь
  }

  off(eventName, callback) {
    // Добавьте код здесь
  }
}

// Пример для задачи 1
calculator.add(5).subtract(3).add(10).getValue(); // 12

// Пример для задачи 2
const user = userSystem.addUser("Иван", 25);
console.log(userSystem.getUserInfo(user.id));

// Пример для задачи 3
const library = new Library("Городская библиотека");
library.addBook("1984", "Джордж Оруэлл");
library.borrowBook("1984", "Иван").then(
  () => console.log("Книга успешно взята"),
  (err) => console.log("Ошибка:", err)
);

// Пример для задачи 4
const taskManager = new TaskManager();
taskManager.addTask(() => console.log("Задача 1"));
taskManager.addTask(() => console.log("Задача 2"));
taskManager.executeAll();

// Пример для задачи 5
const emitter = new EventEmitter();
const handler = (data) => console.log(data);
emitter.on("test", handler);
emitter.emit("test", "Привет, мир!");
emitter.off("test", handler);
