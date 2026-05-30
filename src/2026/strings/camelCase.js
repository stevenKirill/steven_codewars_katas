function camelCase(n) {
  let parts = n.split(" ");

  let result = "";

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "") continue;

    let word = parts[i];

    if (i === 0) {
      result += word[0].toLowerCase() + word.slice(1);
    } else {
      result += word[0].toUpperCase() + word.slice(1);
    }
  }

  return result;
}

console.log(camelCase("Nice Challenge hello"));
console.log(camelCase("String not found"));
console.log(camelCase('Is not found '))
