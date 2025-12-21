// какая строка встречается чаще всего ?
function highestFrequency(array) {
  let max = 1;
  Object.entries(array.reduce((acc,curr) => acc[curr] ? { ...acc, [curr]: acc[curr] + 1 } : { ...acc, [curr]: 1 }, {})).map(([_, value]) => max < value ? max = value : null);
  return max
};

console.log(highestFrequency(['a','b','c','c','c','d','e']))
console.log(highestFrequency(['abc','abc','c','abc','c','def','def','def','ab','ab','def']))