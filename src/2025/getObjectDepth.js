// Напишите функцию, которая определяет глубину объекта. Эта функция определяет,
// сколько раз мы можем максимально «спуститься вниз», обращаясь по ключу.
// Глубину не объектов и пустых объектов мы считаем равной нулю.

const obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  e: {
    f: {
      g: 4,
      h: 5,
    },
  },
  i: 6,
};

function getObjectDepth(obj) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return 0;
  }

  if (Object.keys(obj).length === 0) {
    return 0;
  }

  let maxDepth = 0;

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const depth = getObjectDepth(obj[key]);
      maxDepth = Math.max(maxDepth, depth);
    }
  }

  return maxDepth + 1;
}

console.log(getObjectDepth(obj)); // 3
