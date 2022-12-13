// можно работать с объектом как с массивом не трансформируя его в массив
const toKeyedArray = obj => {
  const methods = {
    map(target) {
      return callback =>
        Object.keys(target).map(key => callback(target[key], key, target));
    },
    reduce(target) {
      return (callback, accumulator) =>
        Object.keys(target).reduce(
          (acc, key) => callback(acc, target[key], key, target),
          accumulator
        );
    },
    forEach(target) {
      return callback =>
        Object.keys(target).forEach(key => callback(target[key], key, target));
    },
    filter(target) {
      return callback =>
        Object.keys(target).reduce((acc, key) => {
          if (callback(target[key], key, target)) acc[key] = target[key];
          return acc;
        }, {});
    },
    slice(target) {
      return (start, end) => Object.values(target).slice(start, end);
    },
    find(target) {
      return callback => {
        return (Object.entries(target).find(([key, value]) =>
          callback(value, key, target)
        ) || [])[0];
      };
    },
    findKey(target) {
      return callback =>
        Object.keys(target).find(key => callback(target[key], key, target));
    },
    includes(target) {
      return val => Object.values(target).includes(val);
    },
    keyOf(target) {
      return value =>
        Object.keys(target).find(key => target[key] === value) || null;
    },
    lastKeyOf(target) {
      return value =>
        Object.keys(target)
          .reverse()
          .find(key => target[key] === value) || null;
    },
  };
  const methodKeys = Object.keys(methods);

  const handler = {
    get(target, prop, receiver) {
      if (methodKeys.includes(prop)) return methods[prop](...arguments);
      const [keys, values] = [Object.keys(target), Object.values(target)];
      if (prop === 'length') return keys.length;
      if (prop === 'keys') return keys;
      if (prop === 'values') return values;
      if (prop === Symbol.iterator)
        return function* () {
          for (value of values) yield value;
          return;
        };
      else return Reflect.get(...arguments);
    },
  };

  return new Proxy(obj, handler);
};

// Object creation
// const x = toKeyedArray({ a: 'A', b: 'B' });

//=> Accessing properties and values
// x.a;          // 'A'
// x.keys;       // ['a', 'b']
// x.values;     // ['A', 'B']
// [...x];       // ['A', 'B']
// x.length;     // 2

// // Inserting values
// x.c = 'c';    // x = { a: 'A', b: 'B', c: 'c' }
// x.length;     // 3

//=> Exmaples Array methods
// x.forEach((v, i) => console.log(`${i}: ${v}`)); // LOGS: 'a: A', 'b: B', 'c: c'
// x.map((v, i) => i + v);                         // ['aA', 'bB, 'cc]
// x.filter((v, i) => v !== 'B');                  // { a: 'A', c: 'c' }
// x.reduce((a, v, i) => ({ ...a, [v]: i }), {}); 	// { A: 'a', B: 'b', c: 'c' }
// x.slice(0, 2);                                  // ['A', 'B']
// x.slice(-1);                                    // ['c']
// x.find((v, i) => v === i);                      // 'c'
// x.findKey((v, i) => v === 'B');                 // 'b'
// x.includes('c');                                // true
// x.includes('d');                                // false
// x.keyOf('B');                                   // 'b'
// x.keyOf('a');                                   // null
// x.lastKeyOf('c');                               // 'c'
