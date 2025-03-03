// Плохой пример - блокировка Event Loop
function blockingOperation() {
  const start = Date.now();
  while (Date.now() - start < 5000) {}
}

// Хороший пример - разбиение на части
function nonBlockingOperation(items) {
  const chunk = items.slice(0, 100);
  if (chunk.length > 0) {
    processChunk(chunk);
    setTimeout(() => {
      nonBlockingOperation(items.slice(100));
    }, 0);
  }
}

/// 1) Что будет в консоли?
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");

// 2) Что будет в консоли?
console.log("start");

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => {
    console.log("promise in timeout");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("promise 1");
  setTimeout(() => {
    console.log("timeout in promise");
  }, 0);
});

console.log("end");
// start end promise 1, temeout 1 promise in timwout timeout in promise

// 3) Что будет в консоли?
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('end');


// 4) Что будет в консоли?
console.log('start');

const promise1 = Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
        console.log('timeout2');
    }, 0);
});

const timer1 = setTimeout(() => {
    console.log('timeout1');
    const promise2 = Promise.resolve().then(() => {
        console.log('promise2');
    });
}, 0);

console.log('end');

// 5) Что будет в консоли?
async function async1() {
  console.log('async1 start');
  await new Promise(resolve => {
      console.log('promise1');
      resolve('promise1 resolve');
  }).then(res => {
      console.log(res);
  });
  console.log('async1 success');
  return 'async1 end';
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1().then(res => console.log(res));

new Promise(resolve => {
  console.log('promise2');
  setTimeout(() => {
      console.log('timeout2');
      resolve('promise2 resolve');
  }, 0);
}).then(res => {
  console.log(res);
});

console.log('script end');

////
setTimeout(() => console.log('Step 1: In setTimeout'));
setTimeout(() => {
  new Promise(resolve => {
    console.log('Step 2: In promise constructor (inside setTimeout)');
    resolve();
  }).then(() => console.log('Step 3: In then (inside setTimeout)'));
});

new Promise(resolve => {
  console.log('Step 4: In promise constructor');
  resolve();
}).then(() => {
  console.log('Step 5: In then');
});

setTimeout(() => console.log('Step 6: In another setTimeout'));
