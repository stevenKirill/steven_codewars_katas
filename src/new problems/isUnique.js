// уникальность всех символов с строке
function isUnique(str) {
  const unique = [];
  for (let i = 0; i < str.length; i++) {
    if (!unique.includes(str[i])) {
      unique.push(str[i]);
    }
  }
  return unique.length === str.length;
}

function isUnique2(str) {
  // for (let i = 0; i < str.length; i++) {
  //     const char = str[i];
  //     if (str.lastIndexOf(char) !== i) {
  //         return false
  //     }
  // }
  // return true

  // const set = new Set();
  // for (let i = 0; i < str.length; i++) {
  //     if (set.has(char)) {
  //         return false
  //     }
  //     set.add(char)
  // }
  // return true;
  return new Set(str).size === str.length;
}

console.log(isUnique2("abcdef")); // true
console.log(isUnique2("abcdeafc")); // false
