// Строка является анаграммой другой строки, если может быть получена путем перестановки
// символов в этой строке.

// Проверьте, что первая строка является анаграммой второй строки.

console.log(isAnagram("bacd", "cdab")); // true
console.log(isAnagram("aaabbaaa", "aaaaaabb")); // true
console.log(isAnagram("ababa", "babab")); // false

// { b: 1, a: 1, c: 1, d: 1 }

// { a: 6, b: 2 }

function isAnagram(str1, str2) {
  // Если длины не равны, это точно не анаграмма
  if (str1.length !== str2.length) {
    return false;
  }

  const charCount = {};

  // Заполняем частотный словарь по первой строке
  for (const char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Проверяем вторую строку
  for (const char of str2) {
    // Если символа нет в словаре или счётчик уже на 0 — это не анаграмма
    if (!charCount[char]) {
      return false;
    }
    // Уменьшаем счетчик
    charCount[char]--;
  }

  return true;
}

console.log(isAnagram("bacd", "cdab")); // true
console.log(isAnagram("aaabbaaa", "aaaaaabb")); // true
console.log(isAnagram("ababa", "babab")); // false
