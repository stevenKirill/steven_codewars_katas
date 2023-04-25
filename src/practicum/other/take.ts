// take
// Напишите функцию, которая создаёт часть массива с n элементами,
// взятыми с начала. Необходимо валидировать входные значения.
// В случае ошибки — выбросьте исключение ValidationError: bad value.
// Сделайте реализацию через класс. Ошибка в консоли должна выглядеть в
// точности как в примере.

/**
	take([1, 2, 3]); // => [1]
	take([1, 2, 3], 2); // => [1, 2]
	take([1, 2, 3], 5); // => [1, 2, 3]
	take([1, 2, 3], 0); // => []

	const testErrCase1 = [123, [1, 2, 3], [1, 2, 3], [1, 2, 3]]
	const testErrCase2 = [1, [1], '1', true]

	for (let i = 0; i<4; i++) {
	  try {
	    take(testErrCase1[i], testErrCase2[i])
	  }
	  catch(err) {
	    console.log(err.toString()) / ValidationError: bad value
	  }
	 }
*/

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

function take<T>(list: T[], num: number = 1): T[] {
  if (!Array.isArray(list) || typeof num !== 'number') {
    throw new ValidationError('bad value')
  }
  if (num === 0) return [];
  let res: T[] = [];
  list.forEach((item, index) => {
    if (index < num && typeof item === 'number') {
      res.push(item);
    }
  })
  return res;
}

console.log(take([1, 2, 3])); // => [1]
console.log(take([1, 2, 3], 2)); // => [1, 2]
console.log(take([1, 2, 3], 5)); // => [1, 2, 3]
console.log(take([1, 2, 3], 0)); // => []

const testErrCase1 = [123, [1, 2, 3], [1, 2, 3], [1, 2, 3]]
const testErrCase2 = [1, [1], '1', true]

for (let i = 0; i<4; i++) {
  try {
    // @ts-ignore
    take(testErrCase1[i], testErrCase2[i])
  }
  catch(err) {
    console.log(err)
  }
 }
