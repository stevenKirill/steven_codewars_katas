const arr = [1, [2, [[3, [4]], 5, 6], 7], [[[8]]]];

console.log(smartSum(arr)); // 36

function smartSum(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result += smartSum(arr[i]);
    } else {
      result += arr[i];
    }
  }
  return result;
}
