function repeater(string, n) {
  if (string === '') return '';

  const sliced = string.slice(0, n);

  let result = '';

  for (let i = 0; i < n; i++) {
    result += sliced;
  }

  return result;
}

console.log(repeater("JSCodebox", 6));

console.log(repeater("Foobar", 2));

console.log(repeater("", 2));

console.log(repeater("Hello coder!", 5));
