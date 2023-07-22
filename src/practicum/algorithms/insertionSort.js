function insertionSort(arr) {
    const sortedArray = [];
	for (let i = 0; i < arr.length; i++) {
        sortedArray.push(arr[i]);
        let j = i;
        while(j > 0 && sortedArray[j] < sortedArray[j - 1]) {
            let buffer = sortedArray[j]
            sortedArray[j] = sortedArray[j - 1];
            sortedArray[j - 1] = buffer;
            j--
        }
	}

	return sortedArray;
}

const first = [6,5,10,24,7,30,1,19,8];
const second = [6,5,10]

console.log(insertionSort(first))


function insertionSort2(arr) {
	for (let i = 1; i < arr.length; i++) {
    const insertionIndex = findInsertionIndex(arr, i);
		shiftElements(arr, insertionIndex, i);
	}

	return arr;
}

function findInsertionIndex(arr, i) {
	for (let j = i - 1; j >= 0; j--) {
		if (arr[j] < arr[i]) {
			return j + 1;
		}
	}

	return 0;
}

function shiftElements(arr, insertionIndex, i) {
	const value = arr[i];

	for (let j = i; j > insertionIndex; j--) {
		arr[j] = arr[j - 1];
	}

	arr[insertionIndex] = value;
}
