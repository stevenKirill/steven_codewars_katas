// Промис может находиться в одном из трех состояний: pending, fulfilled, rejected.

// При этом никакого стандартного способа получить текущее состояние промиса нет.
// Единственный способ взаимодействия с промисом — это методы then, catch и finally.

// Ваша задача — реализовать функцию getState, которая возвращает статус промиса.
// Синхронно определить статус не получится, поэтому getState возвращает промис со строкой.

const p1 = Promise.resolve();
getState(p1).then((actual) => {
  console.log({ actual, expected: "fulfilled" });
});

const p2 = Promise.reject();
getState(p2).then((actual) => {
  console.log({ actual, expected: "rejected" });
});

const p3 = new Promise(() => {});
getState(p3).then((actual) => {
  console.log({ actual, expected: "pending" });
});

function getState(promise) {
  const pending = { state: "pending" };

  return Promise.race([
    promise.then(
      () => "fulfilled",
      () => "rejected"
    ),
    new Promise((resolve) => setTimeout(() => resolve(pending.state), 0)),
  ])
}

// Промис резолвится через 2 секунды
const p = new Promise((resolve) => {
  setTimeout(() => resolve("xxx"), 2000);
});

// Через 1 секунду функция говорит, что он pending
setTimeout(() => {
  getState(p).then((status) => console.log(status)); // "pending"
}, 1000);

// Через 3 секунды тот же промис уже fulfilled
setTimeout(() => {
  getState(p).then((status) => console.log(status)); // "fulfilled"
}, 3000);
