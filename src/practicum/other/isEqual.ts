// isEqual
// Напишите функцию, которая выполняет глубокое сравнение между двумя значениями
// и определяет — являются ли они эквивалентными. Аргументами могут быть
// только объекты.
// Не используйте JSON.stringify().
// Из-за особенностей его реализации, этот метод — крайне неэффективен
// для решения задач глубокого копирования. Например,
// JSON.stringify(a) === JSON.stringify(b) или JSON.parse(JSON.stringify(obj))


function isEqual(object1: object, object2: object): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key as keyof typeof object1];
    const val2 = object2[key as keyof typeof object1];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !isEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }
  return true;
}


function isObject(object: unknown) {
  return object !== null && typeof object === 'object';
}

const a = {
  a: 1,
  b: {
    c: 22,
  }
};
const b = {
  a: 1,
  b: {
    c: 22,
  }
};

console.log(isEqual(a, b)); // true
