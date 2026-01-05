// Что выведется в консоль?

// 1
console.log("A");

const intervalId = setInterval(() => {
  console.log("B");
}, 10);

setTimeout(() => {
  const promise = new Promise((resolve) => {
    console.log("C");
    resolve("D");
    console.log("E");
  });

  promise.then((value) => {
    console.log(value);
    setTimeout(() => {
      console.log("F");
      clearInterval(intervalId);
    }, 10);
  });

  console.log("G");
}, 10);

// A B C E G D B F

// 2

setTimeout(() => {
  console.log("G");
  Promise.resolve().then(() => console.log("H"));
}, 0);

new Promise(function (resolve) {
  console.log("I");
  setTimeout(function () {
    console.log("J");
    resolve("K");
  }, 0);
}).then((res) => {
  console.log("L");
  setTimeout(() => {
    console.log(res);
  }, 0);
});

// I G H J L K
