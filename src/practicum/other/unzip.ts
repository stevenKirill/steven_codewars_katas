
// unzip
// Реализуйте функцию, которая группирует значения из массивов по индексам.
// Если хоть один аргумент не массив — нужно выбросить ошибку ${arg} is not array

function unzip(...args: (number[])[]): number[][] {
  const maxLength = args.reduce((result, arg) => {
    if (!Array.isArray(arg)) {
        throw new Error(`${arg} is not array`);
    }
    return Math.max(result, arg.length);
  }, 0);

    const a = [...Array(maxLength)]
    const b = a.map((_, index) => {
        return args.map(arg => arg[index]);
    });
    return b;
}

/**
	* unzip([1, 2, 3], [4], [5, 6]); // => [[1, 4, 5], [2, undefined, 6], [3, undefined, undefined]]
	* unzip([1, 2, 3]); // => [[1], [2], [3]]
	* unzip([1], [1, 2, 3], [4, 6, 7, 8, 9]); // => [[1, 1, 4], [undefined, 2, 6], [undefined, 3, 7], [undefined, undefined, 8], [undefined, undefined, 9]]
	* unzip({}); // => Error: [object Object] is not array
*/

console.log(unzip([1, 2, 3], [4], [5, 6], [6]));
