const first = () => new Promise(r => setTimeout(r, 1000, 'first'));
const second = () => new Promise(r => setTimeout(r, 2000, 'second'));


first().then(function () {
  return second();
}).then(console.log); // { log: "second", time: 3000 },


first().then(function () {
  second();
}).then(console.log); // { log: "undefined", time: 3000 },


first().then(second()).then(console.log); // // { log: "first", time: 1000 },

first().then(second).then(console.log); // { log: "second", time: 3000 },
