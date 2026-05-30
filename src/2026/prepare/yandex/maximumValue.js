/**
 * Необходимо написать функцию, возвращающую максимальное числовое значение
 * для строк из массива `strs`.
 * При этом, числовое значение для строки определяется следующим образом:
 * - Если строка состоит только из цифр, то числовое значение — это
 *   результат преобразования строки в число
 * - В ином случае числовое значение — это длина строки
 */

export const maximumValue = (words) => {
  let maxVal = 0;
  const n = words.length;

  for (let i = 0; i < n; i++) {
    const str = words[i];
    let isNumeric = true;

    // Быстрая проверка: состоит ли строка только из цифр
    for (let j = 0; j < str.length; j++) {
      const code = str.charCodeAt(j);
      if (code < 48 || code > 57) {
        // 48-57 — это коды символов '0'-'9'
        isNumeric = false;
        break;
      }
    }

    const currentVal = isNumeric ? Number(str) : str.length;
    if (currentVal > maxVal) {
      maxVal = currentVal;
    }
  }

  return maxVal;
};

export const maxFn = (words) => {
  const set = new Set(words);
  console.log(set, "=> set");
};

console.log(maximumValue(["a", "bb", "ccc"])); // 3
console.log(maximumValue(["1", "01", "001", "0001"])); // 1
console.log(maximumValue(["alic3", "bob", "3", "4", "00000"])); // 5
console.log(maximumValue(["hello", "world", "123"]));
console.log(maximumValue(["007", "070", "700"]));

console.log(maxFn(["a", "bb", "ccc"]));

