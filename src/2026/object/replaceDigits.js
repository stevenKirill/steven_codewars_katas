// Замените в предложении все слова, обозначающие цифры, на цифры.

const s = "The score is four nil";


function replaceDigits(string) {
  const result = [];
  const arr = string.split(' ');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 'nil') {
      result.push(0);
    } else if (dictionary[arr[i]]) {
      result.push(dictionary[arr[i]])
    } else {
      result.push(arr[i]);
    }
  }
  return result.join(' ');
}

const dictionary = Object.create(null);
  dictionary.one = 1;
  dictionary.two = 2;
  dictionary.three = 3;
  dictionary.four = 4;
  dictionary.five = 5;
  dictionary.six = 6;
  dictionary.seven = 7;
  dictionary.eight = 8;
  dictionary.nine = 9;


console.log(replaceDigits(s)); // "The score is 4 0"
