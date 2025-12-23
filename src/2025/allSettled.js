// Допустим, у нас есть три промиса:

// p1 резолвится значением "🐢" через 2 секунды
// p2 реджектится значением "💣" через 3 секунды
// p3 резолвится значением "🐈" через 1 секунду
// allSettled принимает массив [p1, p2, p3] и возвращает новый промис, который
// дожидается, когда все промисы отработают (успешно или неуспешно) и
// резолвится массивом объектов определенного вида.

// Если промис реджектнулся, то для него мы записываем статус rejected и поле reason,
// если промис резолвнулся, то статус fulfilled и поле value.

const rand = () => Math.random() * 2000;

const p1 = new Promise((r) => setTimeout(r, rand(), "A"));
const p2 = new Promise((r) => setTimeout(r, rand(), "B"));
const p3 = new Promise((r) => setTimeout(r, rand(), "C"));
const p4 = new Promise((r) => setTimeout(r, rand(), "D"));

allSettled([p1, p2, p3, p4]).then(
  (value) => console.log("1 >>>", value),
  (reason) => console.log("2 >>>", reason)
);

function allSettled(promises) {
  return new Promise((resolve, _reject) => {
    promises = Array.from(promises);
    if (!promises.length) {
      resolve([]);
    }
    let result = [];
    let counter = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]) // ✅ Оборачиваем в промис
        .then((res) => {
          result[i] = { status: "fulfilled", value: res }; // ✅
          counter++;
          if (counter === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          result[i] = { status: "rejected", reason: err }; // ✅
          counter++;
          if (counter === promises.length) {
            resolve(result);
          }
        });
    }
  });
}
