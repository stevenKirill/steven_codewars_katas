function keyboardError(correct, wrong) {
  let res = [];

  if (correct.length !== wrong.length) {
    return [];
  }

  for (let i = 0; i < correct.length; i++) {
    if (correct[i] !== wrong[i] && !res.includes(correct[i])) {
      res.push(correct[i]);
    }
  }

  return res;
}

console.log(keyboardError("foobar", "fiibnr")); // ['o','a']

console.log(keyboardError("hello there", "hgllu thgrg")); // ['e','o']

console.log(keyboardError("this is awesome!", "thjs js kwesome!")); // ['i','a']

// Foobar => Fiibnr ['o', 'a']
