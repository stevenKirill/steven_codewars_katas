/**
 * Реализуйте функцию, которая принимает на вход два объекта Promise
 * с типом `number` и возвращает Promise с их суммой
 */
export const addTwoPromises = async function (promise1, promise2) {
  const promises = await Promise.allSettled([promise1, promise2]);
  let counter = 0;
  for (const p of promises) {
    if (p.status === "fulfilled") {
      counter += p.value;
    } else {
      counter += p.reason;
    }
  }
  return counter;
};

// console.log(addTwoPromises(Promise.resolve(2), Promise.resolve(2)));
// console.log(addTwoPromises(Promise.reject(3), Promise.resolve(2)));

export async function addTwoPromises2(promise1, promise2) {
    // Используем хелпер для обработки значения, даже если промис упал
    const handleValue = (p) => p.catch((error) => {
      return error;
    });

    // Дожидаемся завершения обоих промисов одновременно
    const [val1, val2] = await Promise.all([
        handleValue(promise1),
        handleValue(promise2)
    ]);

    return val1 + val2;
}

// console.log(addTwoPromises2(Promise.resolve(2), Promise.resolve(2)));
console.log(addTwoPromises2(Promise.reject(3), Promise.resolve(2)));
