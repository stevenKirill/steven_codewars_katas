// Write a function uniquePalindromeSubstrings that takes a string
// str as input and returns an array of all unique palindrome substrings in the string.
// A substring is a contiguous sequence of characters within a string.
// For example, the string "abc" has the substrings "a", "b", "c", "ab", "bc", and "abc".
// The function should return an array of all unique palindromic substrings in
// the input string. If there are no palindromic substrings
// in the input string, the function should return an empty array.
// Note that palindromic substrings should be considered unique even if they
// occur multiple times in the input string.
// Return the array sorted ASC.

function isPalindrom(str) {
  let arr = str.split("");
  let index = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i] !== str[index]) {
      return false;
    }
    index++;
  }
  return true;
}

function isPalindromOptimize(str) {
  // Достаточно пройти только половину длины
  for (let i = 0; i < str.length / 2; i++) {
    // Сравниваем символ слева и симметричный ему символ справа
    // str.length - 1 - i — это индекс символа с конца
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

console.log(isPalindromOptimize("abcba"));

function uniquePalindromeSubstrings(str) {
  let res = new Set();
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      res.add(str.slice(i, j));
    }
  }
  let uniq = [];
  for (const value of res.values()) {
    if (isPalindromOptimize(value)) {
      uniq.push(value);
    }
  }
  return uniq.sort();
}

// console.log(uniquePalindromeSubstrings("abcbabcba"));
// ['a','abcba','abcbabcba','b','bab','bcb','bcbabcb','c','cbabc']

// console.log(uniquePalindromeSubstrings('abcd'));

console.log(uniquePalindromeSubstrings("racecar")); // ['a','aceca','c','cec','e','r','racecar']
