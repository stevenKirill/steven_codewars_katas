function isStringRotated(source, test) {
  //return ([...source].every(char => test.includes(char)) && source.length === test.length)
  if (source.length !== test.length) return false;

  for (let i = 0; i < source.length; i++) {
    const rotate = source.slice(i, source.length) + source.slice(0, i);
    if (rotate === test) {
      return true;
    }
  }
  return false;
}

console.log(isStringRotated("apple", "elppa"));
console.log(isStringRotated("javascript", "scriptjava"));
console.log(isStringRotated("javascript", "scriptava"));
