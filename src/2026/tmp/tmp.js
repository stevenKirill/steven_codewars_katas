console.log(filterHomogenous([
  [1, 2, 3],
  [],
  [5, true, 8],
  ["qwe", "yyy"],
  ["uio", 6],
])); // [[1, 2, 3],  ["qwe", "yyy"]]


function filterHomogenous(arrays) {
  let res = [];
  arrays = arrays.filter((arr) => arr.length)

  for (let i = 0; i < arrays.length; i++) {
    let first = arrays[i][0];
    let firstType = typeof first;
    let all = true;
    for (let j = 1; j < arrays[i].length; j++) {
      if (firstType !== typeof arrays[i][j]) {
        all = false;
        break;
      }
    }
    if (all) {
      res.push(arrays[i])
    }
  }
  return res;
}

function filterHomogenous(arrays) {
  return arrays.filter(arr =>
    arr.length > 0 && arr.every(item => typeof item === typeof arr[0])
  );
}


function smallEnough(numbers, limit) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > limit) {
      return false
    }
  }
  return true;
}
console.log(smallEnough([1, 2, 3], 5)); // true
console.log(smallEnough([-5, 5], 5)); // true
console.log(smallEnough([1, 12, 3], 5)); // false


function template(str, dict) {
  let res = str;
  const arr = Object.entries(dict);
  for(const [key, value] of arr) {
res = res.replace(`{${key}}`, value)
  }
  return res
}

console.log(template(
  `Купить {size}-комнатную квартииру в городе {city} за {price} млн рублей`,
  { size: 2, city: "Тверь", price: 7 },
)); //  "Купить 2-комнатную квартииру в городе Тверь за 7 млн рублей"

// Условие: Напишите функцию reverseString, которая корректно разворачивает строку,
//  даже если она содержит эмодзи (включая составные эмодзи с модификаторами кожи, ZWJ-последовательности вроде 👨‍👩‍👧‍👦 и флаги).

const reverseString = (str) => {};

const tests = [
  { input: "👋🏽🌍🚀", expected: "🚀🌍👋🏽" },
  { input: "a🔥b", expected: "b🔥a" },
  { input: "👨‍👩‍👧‍👦❤️", expected: "❤️👨‍👩‍👧‍👦" },
  { input: "🏳️‍🌈✨", expected: "✨🏳️‍🌈" },
  { input: "Привет🌟", expected: "🌟тевирП" },
];


tests.forEach(({ input, expected }) => {
  const result = reverseString(input);
  const passed = result === expected;
  console.log(
    `${passed ? "✅" : "❌"} "${input}" → "${result}" ${
      passed ? "" : `(ож: "${expected}")`
    }`
  );
});


const tree = {
  name: "project",
  type: "folder",
  children: [
    {
      name: "docs",
      type: "folder",
      children: [{ name: "readme.txt", type: "file", ext: "txt" }],
    },
    {
      name: "src",
      type: "folder",
      children: [
        { name: "index.js", type: "file", ext: "js" },
        {
          name: "utils",
          type: "folder",
          children: [{ name: "helper.js", type: "file", ext: "js" }],
        },
      ],
    },
  ],
};

findFilesByExtension(tree, "js");
// → ['/project/src/index.js', '/project/src/utils/helper.js']

// 1  пройти
function findFilesByExtension(tree, extension) {
}

