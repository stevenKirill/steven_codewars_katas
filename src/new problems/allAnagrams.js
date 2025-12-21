function allAnagrams(array) {
  const first = [...array[0]];
  const sliced = array.slice(1);
  return first.every((char) => {
    let allTrue = true;
    sliced.forEach((word) => {
      if (!word.includes(char)) {
        allTrue = false;
      }
    });
    return allTrue;
  });
}

console.log(allAnagrams(["abcd", "bdac", "cabd"])); // true
console.log(allAnagrams(["abcd", "bdxc", "cabd"])); // false
