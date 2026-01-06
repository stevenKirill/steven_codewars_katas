// Реализуйте функцию recordDepth, которая принимает объект и добавляет поле depth
// на каждый уровень вложенности. Функция должна мутировать исходный объект и вернуть его.

function recordDepth(obj, count = 0) {
  obj.depth = count;
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      recordDepth(obj[key], count + 1);
    }
  }
  return obj;
}

const obj = {
  a: "a",
  b: {
    u: {
      k: "k",
    },
    c: "c",
  },
  m: {
    f: "f",
  },
};

console.log(recordDepth(obj));

const expected = {
  a: "a",
  b: {
    u: {
      k: "k",
      depth: 2,
    },
    c: "c",
    depth: 1,
  },
  m: {
    f: "f",
    depth: 1,
  },
  depth: 0,
};
