// вернуть индекс где лежит элемент в массиве
function simpleSearch(array,number) {
    let start = 0;
    let end = array.length - 1;
    if (number < array[start] || number > array[end]) return -1;

    while (true) {
        if (number === start) return start
        if (number === end) return end
        if (end - start <=1) return -1;

        const middle = Math.floor((start + end) / 2);

        if (number > array[middle]) {
            start = middle + 1
        }
        if (number < array[middle]) {
            end = middle - 1
        }
        if (number === array[middle]) return middle
    }
};

console.log(simpleSearch([1,2,3,6,9,13],9)) // 4
// console.log(simpleSearch([1,2,2,5,8,13,15,19,23,25,66],5)) // 3
// console.log(simpleSearch([1,2,2,5,8,13,15,19,23,25,66],11)) // -1