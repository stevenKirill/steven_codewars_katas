

// A small 'g' is 'happy', but only if a small 'g' follows before or after it. Return true if all g's are happy.

function gHappy(string) {
  if (string === '') return false;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === 'g') {
      const hasLeft = string[i] === string[i - 1];
      const hasRight = string[i] === string[i + 1];

      if (!hasLeft && !hasRight) {
        return false
      }
    }
  }
  return true;
}

console.log(gHappy('xyggxyz')); // true
console.log(gHappy('Huggy Wuggy')); // true
console.log(gHappy('garage of eggs')); // false
console.log(gHappy('gg')) // true
console.log(gHappy('egg')) // true
