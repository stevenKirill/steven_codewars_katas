type RGB = [number, number, number];
type Color = string | RGB;

type Palette = Record<string, Color>;

// Создайте объект myPalette, который обязан соответствовать типу Palette.
// В объекте должны быть цвета: red (как массив [255, 0, 0])
// и green (как строка "#00ff00").
// Используя satisfies, добейтесь того, чтобы TypeScript
// без дополнительных проверок (if/else) позволял:Вызвать метод .map() у myPalette.red.
// Вызвать метод .toUpperCase() у myPalette.green.

const myPalette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Palette;

console.log(myPalette.green.toUpperCase());
console.log(myPalette.red.map((i) => i));

// Объявите переменную localConfig, используя satisfies ConnectionConfig.
// Установите port как число (например, 8080).
// Напишите код, который умножает localConfig.port на 2.
// Убедитесь, что TS не ругается ("Operator '*' cannot be applied to types 'string | number'").

type ConnectionConfig = {
  host: string;
  port: string | number;
  secure: boolean;
};

const localConfig = {
  port: "11",
  host: "site",
  secure: true,
} satisfies ConnectionConfig;

const newValue = localConfig.port.trim();

type RouteName = "home" | "about" | "login";

// Мы хотим убедиться, что объект содержит только ключи из RouteName,
// а значения — это объекты с url.
type RouteMap = Partial<Record<RouteName, { url: string }>>;

// Создайте объект routes.
// Используйте satisfies RouteMap, чтобы гарантировать правильность структуры.
// Используйте as const для объекта, чтобы урлы стали readonly литералами
// (например, не просто string, а именно "/login").
// Попробуйте создать функцию, которая принимает только конкретный путь
// "/login", и передайте туда routes.login.url. Без satisfies + as const это было бы просто строкой.

// Функция ожидает конкретную строку, а не просто string
function redirect(path: "/login") {
  console.log("Going to", path);
}

const routes = {
  home: { url: "/" },
  login: { url: "/login" },
  // about пропустили (это ок, так как Partial),
  // но если добавить "contact", satisfies выдаст ошибку
} as const satisfies RouteMap;

redirect(routes.login.url);

type User = {
    id: number;
    username: string;
} & Record<string, string | number>; // Разрешаем любые доп. поля, но они должны быть string или number

// Создайте объект currentUser, который имеет id, username, а также поле email (строка) и age (число).
// Используйте satisfies User.
// Напишите код, который обращается к currentUser.email.toLowerCase() и currentUser.age.toFixed(2).

const currentUser = {
  id: 1,
  username: 'Name',
  email: 'hello',
  age: 20,
} satisfies User;

console.log(currentUser.age.toFixed(2));
console.log(currentUser.email.toUpperCase());
