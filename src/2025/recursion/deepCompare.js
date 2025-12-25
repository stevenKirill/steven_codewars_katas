const o1 = {
  x: 1,
  y: {
    z: "qwe",
    m: {
      t: false,
    },
  },
};

const o2 = {
  x: 1,
  y: {
    z: "qwe",
    m: {
      t: false,
    },
  },
};

console.log(deepCompare(o1, o2)); // true

function deepCompare(o1, o2) {
  if (typeof o1 !== typeof o2) return false;

  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  if (keys1.length !== keys2.length) return false;

  for (let key in o1) {
    if (
      typeof o1[key] === "object" &&
      o1[key] !== null &&
      typeof o2[key] === "object" &&
      o2[key] !== null
    ) {
      deepCompare(o1[key], o2[key]);
    }
    if (o1[key] !== o2[key]) {
      return false;
    }
  }

  return true;
}

function deepCompare2(o1, o2) {
  // 1. Проверка типов
  if (typeof o1 !== typeof o2) return false;

  // 2. Если примитивы - просто сравниваем
  if (typeof o1 !== "object" || o1 === null || o2 === null) {
    return o1 === o2;
  }

  // 3. Проверяем количество ключей
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  if (keys1.length !== keys2.length) return false;

  // 4. Рекурсивно сравниваем все ключи
  for (let key of keys1) {
    if (!keys2.includes(key)) return false; // Ключ есть в o1, но нет в o2

    // Рекурсия для вложенных объектов
    if (!deepCompare(o1[key], o2[key])) {
      return false;
    }
  }

  return true;
}
