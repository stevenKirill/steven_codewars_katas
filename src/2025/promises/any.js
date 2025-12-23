const rand = () => Math.random() * 2000;

const p1 = new Promise((r) => setTimeout(r, rand(), "A"));
const p2 = new Promise((r) => setTimeout(r, rand(), "B"));
const p3 = new Promise((r) => setTimeout(r, rand(), "C"));
const p4 = new Promise((r) => setTimeout(r, rand(), "D"));

any([p1, p2, p3, p4]).then(
  (value) => console.log("1 >>>", value),
  (reason) => console.log("2 >>>", reason)
);

function any(promises) {
  return new Promise((resolve, reject) => {
    let errors = [];
    let c = 0;
    promises = Array.from(promises); // ...promises
    if (!promises.length) {
      const mainError = new AggregateError([], "All promises were rejected");
      reject(mainError);
    }
    for (const [index, promise] of promises.entries()) {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          errors[index] = err;
          c++;
          if (c === promises.length && errors.length === promises.length) {
            const mainError = new AggregateError(
              errors,
              "All promises were rejected"
            );
            reject(mainError);
          }
        });
    }
  });
}
