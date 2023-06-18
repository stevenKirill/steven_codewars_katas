function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
}


console.log(bubbleSort([6,5,3,1,8,7,2,4]))

function bubbleSort2(arr) {
  let swapped = true;

  while (swapped) {
      swapped = false;

      for (let i = 0; i < arr.length - 1; i++) {
          if(arr[i] > arr[i + 1]) {
              swap(arr, i, i + 1);
              swapped = true;
          }
      }
  }

  return arr;
}

function swap(arr, i, j) {
  const tmp = arr[i];

  arr[i] = arr[j];
  arr[j] = tmp;
}
