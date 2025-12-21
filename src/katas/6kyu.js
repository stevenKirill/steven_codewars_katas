// Reverse every other word in the string => https://www.codewars.com/kata/58d76854024c72c3e20000de

function reverse(str) {
  if (str == false) return "";
  const array = str.split(" ");
  const mapped = array.map((word, index) =>
    index % 2 !== 0 ? reverseWord(word) : word
  );
  return mapped.join(" ");
}

function reverseWord(word) {
  let res = "";
  for (let i = word.length - 1; i >= 0; i--) {
    res += word[i];
  }
  return res;
}

// Split strings => https://www.codewars.com/kata/515de9ae9dcfc28eb6000001

function splitStrings(str) {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    if (i % 2 !== 0) {
      continue;
    } else if (i === str.length - 1 && str.length % 2 !== 0) {
      result.push(`${str[str.length - 1]}_`);
    } else {
      result.push(`${str[i]}${str[i + 1]}`);
    }
  }
  return result;
}

function splitStrings(str) {
  const arr = [];
  for (let i = 0; i < str.length; i += 2) {
    const second = str[i + 1] || "_";
    arr.push(str[i] + second);
  }
  return arr;
}

// Basics 08: Find next higher number with same Bits (1's) => https://www.codewars.com/kata/56bdd0aec5dc03d7780010a5

function nextHigher(n) {
  const inputToBinary = n.toString(2);
  const stringNumber = inputToBinary.toString();
  for (let i = n + 1; ; i++) {
    const b = i.toString(2);
    const bStr = b.toString();
    if (count(bStr) === count(stringNumber)) {
      return i;
    }
  }
}

function count(binaryNumber) {
  let countOneBits = 0;
  for (const bit of binaryNumber) {
    if (bit === "1") {
      countOneBits++;
    }
  }
  return countOneBits;
}

// The Vowel Code => https://www.codewars.com/kata/53697be005f803751e0015aa

const pattern = {
  a: 1,
  e: 2,
  i: 3,
  o: 4,
  u: 5,
};

const revertPattern = {
  1: "a",
  2: "e",
  3: "i",
  4: "o",
  5: "u",
};

function encode(string) {
  let res = "";
  for (let i = 0; i < string.length; i++) {
    if (pattern[string[i]] !== undefined) {
      res += pattern[string[i]];
    } else {
      res += string[i];
    }
  }
  return res;
}

function decode(string) {
  let res = "";
  for (let i = 0; i < string.length; i++) {
    if (revertPattern[string[i]] !== undefined) {
      res += revertPattern[string[i]];
    } else {
      res += string[i];
    }
  }
  return res;
}

// Complete the table pattern => https://www.codewars.com/kata/5827e2efc983ca6f230000e0

function completeTablePattern(rows, columns, str) {
  let letters = [...str];
  let res = "";
  for (let i = 0; i < rows; i++) {
    res += "+---".repeat(columns) + "+" + "\n";
    let box = "";
    for (let j = 0; j < columns; j++) {
      if (letters[j] === undefined) {
        box += `|   `;
      } else {
        box += `| ${letters[j]} `;
      }
      res += box;
      box = "";
    }
    res += "|\n";
    letters = letters.slice(columns);
  }
  res += "+---".repeat(columns) + "+" + "\n";
  return res.trim();
}

// Backwards Read Primes => https://www.codewars.com/kata/5539fecef69c483c5a000015

function backwardsPrime(start, stop) {
  let res = [];
  for (let i = start; i <= stop; i++) {
    if (isPrime(i) && isReversedDifferentPrime(i)) {
      res.push(i);
    }
  }
  return res;
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function isReversedDifferentPrime(num) {
  const reversed = +String(num).split("").reverse().join("");
  return reversed === num ? false : isPrime(reversed);
}

// Unary function chainer => https://www.codewars.com/kata/54ca3e777120b56cb6000710

function chained(functions) {
  return function (x) {
    return functions.reduce((ac, f) => f(ac), x);
  };
}

// Delete occurrences of an element if it occurs more than n times => https://www.codewars.com/kata/554ca54ffa7d91b236000023

function deleteNth(arr, n) {
  const obj = {};
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (obj.hasOwnProperty(arr[i])) {
      obj[arr[i]]++;
      if (obj[arr[i]] <= n) {
        res.push(arr[i]);
      }
    } else {
      obj[arr[i]] = 1;
      if (obj[arr[i]] <= n) {
        res.push(arr[i]);
      }
    }
  }
  return res;
}

// More Zeros than Ones => https://www.codewars.com/kata/5d41e16d8bad42002208fe1a

function moreZeros(s) {
  const asciiRepresentation = [...s].map((char, index) =>
    s[index].charCodeAt(char)
  );
  const binaryArray = asciiRepresentation.map((number) => number.toString(2));
  const moreZerosArray = binaryArray.map((str) => {
    let oneCounter = 0;
    let zeroCounter = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "1") {
        oneCounter++;
      }
      if (str[i] === "0") {
        zeroCounter++;
      }
    }
    if (zeroCounter > oneCounter) {
      zeroCounter = 0;
      oneCounter = 0;
      return true;
    } else {
      zeroCounter = 0;
      oneCounter = 0;
      return false;
    }
  });
  const res = [...s].filter((el, index) => (moreZerosArray[index] ? el : null));
  return [...new Set(res)];
}

// Yes No Yes No => https://www.codewars.com/kata/573c84bf0addf9568d001299

function yesNo(arr) {
  return arr.length < 3
    ? arr
    : [arr[0]].concat(yesNo(arr.slice(2).concat([arr[1]])));
}

// Consonant value => https://www.codewars.com/kata/59c633e7dcc4053512000073

function solveConsonantValue(s) {
  const myReg = /[^aeiou]/g;
  const numbers = [];
  let counter = 0;
  const mapped = [...s].map((el) => {
    if (el.match(myReg)) {
      counter += el.charCodeAt(el) - 96;
      numbers.push(counter);
    }
    if (!el.match(myReg)) {
      counter = 0;
    }
  });
  return Math.max.apply(null, numbers);
}

// Reverse or Rotate ? => https://www.codewars.com/kata/56b5afb4ed1f6d5fb0000991

function revrot(int, size) {
  if (size <= 0 || int.length <= 0 || size > int.length) {
    return "";
  }
  const nums = [];
  while (int.length >= size) {
    nums.push(int.slice(0, size));
    int = int.slice(size);
  }

  const newNums = nums
    .map((num) => {
      let sum = 0;
      for (const digit of num) {
        sum += Math.pow(digit, 3);
      }
      if (sum % 2 === 0) {
        return num.split("").reverse().join("");
      } else {
        return num.slice(1) + num.slice(0, 1);
      }
    })
    .join("");
  return newNums;
}

// WeIrD StRiNg CaSe => https://www.codewars.com/kata/52b757663a95b11b3d00062d

function toWeirdCase(string) {
  const arr = string.split(" ");
  let res = "";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (j % 2 === 0) {
        res += arr[i][j].toUpperCase();
      } else {
        res += arr[i][j].toLowerCase();
      }
    }
    res += " ";
  }
  return res.trim();
}

// Give me a Dimond => https://www.codewars.com/kata/5503013e34137eeeaa001648

function getLine(n, i) {
  const count = i < n / 2 ? i * 2 + 1 : (n - i - 1) * 2 + 1;
  const content = "*".repeat(count);
  const spaces = " ".repeat((n - count) / 2);
  return `${spaces}${content}\n`;
}

function diamond(n) {
  if (n < 0 || !(n % 2)) return null;
  return Array.from(
    {
      length: n,
    },
    (_, i) => getLine(n, i)
  ).join("");
}

// Detect Pangram => https://www.codewars.com/kata/545cedaa9943f7fe7b000048

function isPangram(string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const array = string
    .toLowerCase()
    .split("")
    .filter((x) => x.match(/[a-z]/gi))
    .sort((a, b) => {
      if (a > b) {
        return 1;
      } else return -1;
    });
  const uniq = [...new Set(array)].join("");
  console.log(uniq);
  return uniq === alphabet;
}

//Find the nth Reverse Number https://www.codewars.com/kata/600bfda8a4982600271d6069/train/javascript

function findReverseNumber(n) {
  let counter = 0;
  for (let i = 0; ; i++) {
    if (isPalindrom(String(i))) {
      counter++;
      if (counter === n) {
        return i;
      }
    }
  }
}
function isPalindrom(num) {
  return [...num].reverse().join("") === num;
}

// Basic compression https://www.codewars.com/kata/5914e068f05d9a011e000054
function compress(str) {
  const compressed = helper(str);
  return compressed.length > str.length ? str : compressed;
}

function helper(str) {
  let counter = 0;
  let compressed = "[";
  str.split("").forEach((char, index, array) => {
    if (char === array[index + 1]) {
      counter++;
    } else {
      compressed += `[${counter + 1},"${char}"],`;
      counter = 0;
      return array;
    }
  });
  compressed = compressed.slice(0, -1);
  compressed += "]";
  return compressed;
}

function decompressed(compressed) {
  let comp = helper(compressed);
  if (comp !== compressed) {
    return compressed;
  } else {
    let decomp = "";
    compressed
      .split("]")
      .filter((value) => value)
      .map((string) => {
        return string.match(/[0-9A-Z]/gi).join("");
      })
      .forEach((char) => {
        const letter = char.match(/[A-Z]/gi).join("");
        const number = Number(char.match(/[0-9]/gi).join(""));
        decomp += letter.repeat(number);
      });
    return decomp;
  }
}

// console.log(decompressed('[[14,"a"],[1,"b"],[41,"a"],[1,"c"]]'))
// '[[14,a][1,b][41,a][1,c]]'
// '[[14,"a"],[1,"b"],[41,"a"],[1,"c"]]'
// '[[14,"a"][1,"b"][41,"a"][1,"c"]]'

// Valid Braces https://www.codewars.com/kata/5277c8a221e209d3f6000b56
function validBraces(braces) {
  const stack = [];
  for (const symbol of braces) {
    if (symbol === "[" || symbol === "{" || symbol === "(") {
      stack.push(symbol);
    } else if (symbol === ")") {
      if (stack.pop() !== "(") {
        return false;
      }
    } else if (symbol === "}") {
      if (stack.pop() !== "{") {
        return false;
      }
    } else if (symbol === "]") {
      if (stack.pop() !== "[") {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// "(){}[]"   =>  True
// "([{}])"   =>  True
// "(}"       =>  False
// "[(])"     =>  False
// "[({})](]" =>  False

// Roman Encoder codewars.com/kata/51b62bf6a9c58071c600001b/train/javascript
function convertToRoman(num) {
  var roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let result = "";

  for (let i of Object.keys(roman)) {
    const q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    result += i.repeat(q);
    console.log(result, "=> resu");
  }

  return result;
}

// console.log(romanEncoder(1000)) // M
console.log(convertToRoman(1550)); // 1000 500 50 => MDL
// 1550
// [M,D,C,L,X,V,I]
// 1550 / 1000 = 1
// 1550 - 1 * 1000 = 550
// 550 / 500 = 1
// 550 - 1 * 500 = 50
// 50 / 100 = 0,5 => 0
// 50 - 0 * 100 = 50
// 50 / 50 = 1;
// 50 - 50 * 1 = 0
// 0
// console.log(convertToRoman(1763)) /// MDCCLXIII
// console.log(convertToRoman(247)) /// 100 + 100 + 10 + 10 + 10 + 10 + 5 + 1 + 1 CCXXXXVII
