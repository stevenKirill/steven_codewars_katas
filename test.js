function namespace(str) {
  const array = str.split(".");
  const result = {};
  let current = result;
  for (let i = 0; i < array.length; i++) {
    current[array[i]] = {};
    current = current[array[i]];
  }
  return result;
}

console.log(JSON.stringify((namespace("a.b.c.d.e")))); // {"a":{"b":{"c":{"d":{"e":{}}}}}
