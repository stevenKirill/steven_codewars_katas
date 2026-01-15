// Дан массив объектов и название ключа. Необходимо вернуть массив значений по этому ключу.

const users = [
  { name: "A", age: 11, location: "Qwe" },
  { name: "B", age: 54, location: "Asd" },
  { name: "C", age: 23, location: "Zxc" },
];

console.log(extractKey(users, "name")); // ["A", "B", "C"]
console.log(extractKey(users, "age")); // [11, 54, 23]

function extractKey(array, key) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(array[i][key])
  }
  return result;
};

