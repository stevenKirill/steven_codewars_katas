// Реализуйте функцию and, которая принимает два промиса и возвращает промис.

// Если оба входных промиса резолвятся, итоговый промис тоже должен резолвнуться.
// Если хотя бы один из входных промисов реджетится, итоговый промис реджектится.

// Итоговый промис может резолвиться или реджектиться любым значением, это никак не проверяется.

and(Promise.resolve(1), Promise.resolve(2)).then(
  () => console.log("fulfulled"), // ✓
  () => console.log("rejected")
);

and(Promise.reject(1), Promise.resolve(2)).then(
  () => console.log("fulfulled"),
  () => console.log("rejected") // ✓
);

function and(p1, p2) {
  return new Promise((resolve, reject) => {
    Promise.all([p1, p2])
      .then(resolve) // ✓ resolve — это параметр функции
      .catch(reject); // ✓ reject — это параметр функции
  });
}
