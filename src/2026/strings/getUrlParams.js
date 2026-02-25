function getURLParams(url) {
  try {
    return Array.from(new URL(url).searchParams.values());
  } catch (e) {
    return []; // Обработка некорректного URL
  }
}

console.log(getURLParams("https://jscodebox.com/test.xml?id=3&value=file"));
console.log(
  getURLParams(
    "https://jscodebox.com/index.php?kex=Jfs873nj&id=1&action=delete",
  ),
);

// https://jscodebox.com/test.xml?id=3&value=file => [3, 'file']

function getURLParams2(url) {
  const queryStart = url.indexOf("?");

  // 1. Проверка: есть ли вообще параметры
  if (queryStart === -1) return [];

  return url
    .slice(queryStart + 1)
    .split("&")
    .reduce((acc, param) => {
      // 2. Находим индекс первого равно, чтобы не обрезать значения типа "a=b=c"
      const eqIndex = param.indexOf("=");

      if (eqIndex !== -1) {
        // Берем подстроку от знака "=" до конца
        const value = param.slice(eqIndex + 1);

        // 3. Важно! Декодируем URI (например %20 -> пробел)
        acc.push(decodeURIComponent(value));
      }
      return acc;
    }, []);
}

console.log(
  getURLParams(
    "https://jscodebox.com/test.xml?id=3&value=file=txt&name=John%20Doe",
  ),
);
// Результат: [ '3', 'file=txt', 'John Doe' ]
