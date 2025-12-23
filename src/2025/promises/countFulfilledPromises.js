// Реализуйте функцию countFulfilledPromises, которая принимает произвольное количество
// промисов и возвращет промис, в котором лежит количество успешно завершившихся промисов.

const p1 = new Promise((resolve) => resolve(1));
const p2 = new Promise((resolve) => resolve(2));
const p3 = new Promise((_, reject) => reject(3));

countFulfilledPromises().then(console.log); // 0
countFulfilledPromises(p1).then(console.log); // 1
countFulfilledPromises(p1, p2).then(console.log); // 2
countFulfilledPromises(p1, p2, p3).then(console.log); // 2
countFulfilledPromises(p1, p3).then(console.log); // 1
countFulfilledPromises(p3).then(console.log); // 0

function countFulfilledPromises(...promises) {
  return Promise.allSettled(promises).then((results) => {
    return results.filter(r => r.status === 'fulfilled').length;
  });
}

function countFulfilledPromises(...promises) {
  return new Promise((resolve, reject) => {
    let count = 0;
    let settled = 0;
    let promisesLength = promises.length;

    if (promisesLength === 0) {
      resolve(0);
      return;
    }

    promises.forEach((p) => {
      Promise.resolve(p).then(() => count++).catch(() => {}).finally(() => {
        settled++;
        if (settled === promisesLength) {
          resolve(count);
        }
      })
    })
  });
}
