// Дана строка, состоящая из нескольких слов. Необходимо переставить слова так,
// чтобы сначала шли самые частые.

// Если какие-то слова встречаются одинаковое число раз,
// раньше должно идти то, которое идет раньше алфавиту (то есть в лексикографическом порядке).

// {
//   it: 1,
//   is: 2,
//   true: 1,
//   for: 1,
//   all: 1,
//   that: 11,
//   refers: 2,
//   to: 2,
//   not: 1,
//   the: 1,
//   same: 1
// }

// [
//   [ 'it', 1 ],
//   [ 'is', 2 ],
//   [ 'true', 1 ],
//   [ 'for', 1 ],
//   [ 'all', 1 ],
//   [ 'that', 11 ],
//   [ 'refers', 2 ],
//   [ 'to', 2 ],
//   [ 'not', 1 ],
//   [ 'the', 1 ],
//   [ 'same', 1 ]
// ]

function sortByFreq(str) {
  if (!str.trim()) return "";
  const words = str.trim().split(/\s+/);

  // 2. Считаем частоту каждого слова
  const freqMap = Object.create(null);
  for (const word of words) {
    freqMap[word] = (freqMap[word] || 0) + 1;
  }

  // 3. Сортируем массив
  words.sort((a, b) => {
    const countA = freqMap[a];
    const countB = freqMap[b];

    // Сначала сравниваем частоты (по убыванию)
    // countB - countA: Если у слова B частота больше,
    // результат будет положительным, и B встанет перед A. Это
    // обеспечивает сортировку от самых частых к самым редким.
    if (countB !== countA) {
      return countB - countA;
    }

    // Если частоты равны, сравниваем лексикографически (по возрастанию)
    // localeCompare корректно сравнивает строки
    return a.localeCompare(b);
  });

  // 4. Собираем обратно в строку
  return words.join(' ');
}

const s1 =
  "it is true for all that that that that that that that refers to is not the same that that that that refers to";
// console.log(sortByFreq(s1));
// "that that that that that that that that that that that is is refers refers to to all for it not same the true"

// const s2 =
// "2 46 38 1 \
// 116 14 20 \
// 15 14 21 \
// 14 0 17";
// console.log(sortByFreq(s2));
// "14 14 14 0 1 116 15 17 2 20 21 38 46"
