/**
 * Необходимо написать функцию, которая разделит каждую строку
 * в массиве `words` по строке `separator`.
 * Необходимо вернуть массив получившихся после разделения строк,
 * исключая пустые строки
 */
export const splitWordsBySeparator = (words, separator) => {
  let res = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i] === '') continue;
    let splitted = words[i].split(separator);
    splitted.forEach(element => {
      !!element && res.push(element);
    });
  }

  return res
};

export const splitWordsBySeparator2 = (words, separator) => {
  return words.flatMap(word => word.split(separator)).filter(string => Boolean(string))
};


console.log(splitWordsBySeparator(["one.two.three","four.five","six"], "."))


// console.log("three".split('.').length)
