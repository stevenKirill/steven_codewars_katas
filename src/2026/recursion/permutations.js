// Дана строка s, в которой нет повторяющихся символов.

// Верните массив со всеми возможными перестановками символов в строке s.
// Порядок значения не имеет.

function permutations(str) {
  // Базовый случай: если строка состоит из 1 символа (или пустая),
  // возвращаем массив с этой строкой.
  if (str.length <= 1) {
    return [str];
  }

  let result = [];

  for (let i = 0; i < str.length; i++) {
    // 1. Фиксируем текущий символ
    let char = str[i];

    // 2. Получаем остаток строки (вырезаем char)
    // slice(0, i) берет начало, slice(i + 1) берет конец после символа
    let remainingChars = str.slice(0, i) + str.slice(i + 1);

    // 3. Рекурсивно получаем перестановки для остатка
    let innerPermutations = permutations(remainingChars);

    // 4. Склеиваем зафиксированный символ с каждой перестановкой остатка
    for (let j = 0; j < innerPermutations.length; j++) {
      result.push(char + innerPermutations[j]);
    }
  }

  return result;
}

console.log(permutations("ABC"));
// ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]
console.log(permutations("ABC"));
// ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]
