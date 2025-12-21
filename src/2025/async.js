// Реализуйте функцию sum, принимающую два промиса, внутри которых лежат числа,
// и возвращающую промис с суммой этих чисел.

const p1 = new Promise((resolve) => resolve(1));
const p2 = new Promise((resolve) => resolve(2));

function sum(p1, p2) {
  return new Promise((resolve, reject) => {
    let res1, res2;
    let count = 0;

    p1.then((result) => {
      res1 = result;
      count++;
      if (count === 2) {
        resolve(res1 + res2);
      }
    });

    p2.then((result) => {
      res2 = result;
      count++;
      if (count === 2) {
        resolve(res1 + res2);
      }
    });
  });
}

sum2(p1, p2).then((result) => {
  console.log(result); // 1 + 2 === 3
});


function sum2(p1, p2) {
  return Promise.all([p1,p2]).then(([one, two]) => one + two);
}


// Реализуйте функцию sumAll, принимающую произвольное количество промисов,
// внутри которых лежат числа, и возвращающую промис с суммой этих чисел.

const pr1 = new Promise(resolve => resolve(1));
const pr2 = new Promise(resolve => resolve(2));
const pr3 = new Promise(resolve => resolve(3));

sumAll().then(console.log);            // 0
sumAll(pr1).then(console.log);          // 1
sumAll(pr1, pr2).then(console.log);      // 3
sumAll(pr1, pr2, pr3).then(console.log);  // 6

function sumAll(...promises) {
  return Promise.all(promises).then((promisesResult) => {
    return promisesResult.reduce((a, b) => a + b, 0);
  });
}
