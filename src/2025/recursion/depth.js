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

const obj2 = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  i: 6,
};


// обратились три раза и дошли до примитива:
// obj.e.f.g

console.log(depth(obj)); // 3
console.log(depth(obj2));

function depth(obj) {
  if (
    typeof obj !== "object" ||
    obj === null ||
    Object.keys(obj).length === 0
  ) {
    return 0;
  }

  let maxDepth = 0;

  for (let key in obj) {
    // Рекурсивно считаем глубину для каждого значения
    const currentDepth = depth(obj[key]);

    // Сохраняем максимум
    if (currentDepth > maxDepth) {
      maxDepth = currentDepth;
    }
  }

  // +1 потому что мы спустились на один уровень
  return maxDepth + 1;
}

