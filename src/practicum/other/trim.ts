// trim
// Напишите функцию, которая умеет удалять из начала и конца строки пробельные
// или отдельно заданные пользовательские символы. Удаление пробелов из
// начала и конца строк — поведение по умолчанию. Пробел необязательно
// должен быть передан в качестве аргумента.


function trim(string: string, pattern?: string) {
    let method = pattern || ' ';
  let cleanText = string.replace(/\xA0/g, ' ');
  let symbols = '';
  if (method.length > 1) {
    for (let i = 0; i < method.length; i++) {
      symbols +=  i === method.length - 1 ? method[i] : method[i] + '|'
    }
  }
  let matchPattern = symbols ? symbols : method;
  const regExp = new RegExp(matchPattern, 'g');
  return cleanText.replace(regExp, '');
}

// trim('-_-abc-_-', '_-'); // => 'abc'
// trim('\xA0foo'); // "foo"
// trim('\xA0foo', ' '); // " foo"
// trim('-_-ab c -_-', '_-'); // ab c

// ['  foo  ', '  bar  '].map(value => trim(value)); // => ['foo', 'bar']
