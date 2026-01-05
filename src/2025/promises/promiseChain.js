Promise.resolve(1)
  .then(x => x * 2) // 2
  .then(x => x * 3, x => x + 5) // 6
  .catch(x => x + 10) // skip
  .then(x => {
    console.log(x); // 6
    return x + 1; // 7
  })
  .then(x => {
    throw x * 2;
  })
  .then(x => x * 4) // skip
  .then(x => x + 1, x => x + 3) // 17
  .catch(x => { // skip
    console.log(x);
    throw x + 30;
  })
  .catch(x => { // skip
    console.log(x);
    throw x + 50;
  })
  .then(x => x * 20) // 340
  .catch(x => { // skip
    console.log(x);
    return x + 3
  })
  .then(x => {
    console.log(x); // 340
  });

// 6 17 47 97
