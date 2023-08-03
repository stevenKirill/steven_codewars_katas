function findEqualElements(arr1, arr2) {
  const res = [];
  if (arr1.length === arr2.length) {
    for (let i  = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) {
        res.push(arr1[i])
      }
    }
  } else {
    for (let i  = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        res.push(arr1[i])
      }
    }
  }
  return res;
}

function findEqualElements2(arr1, arr2) {
  let i = 0;
  let j = 0;
  const result = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] > arr2[j]) {
      j++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else {
      result.push(arr1[i]);
      i++;
      j++;
    }
  }

  return result;
}

console.log(findEqualElements([1, 2, 3], [2])) // => [2]
console.log(findEqualElements([2], [1, 2, 3])) // => [2]
console.log(findEqualElements([1, 2, 2, 3], [2, 2, 2, 2])) // => [2, 2]
console.log(findEqualElements([2, 2, 2, 2], [1, 2, 2, 3])) // => [2, 2]
