// Мемоизация №1
// Функция getData ходит за данными и возвращает промис.
// Напишите кеширующую функцию memoize со следующим поведением:
// Если getData ещё не была вызвана, вызывает её и кеширует результат;
// Если вызывалась раньше заданного в функции времени — возвращает сохранённый результат;
// Если вызывалась позже заданного в функции времени, нужно заново сходить за данными.
// Она принимает функцию, сигнатура которой описана в getData, и время жизни кеша.
// Возвращает мемоизированную функцию.

function getData() {
	return new Promise(resolve => {
		setTimeout(() => resolve(42), 1000)
	})
}

function memoize(f, cacheTime) {
  let cache = {};
  let cacheTimeExpired = Date.now() + cacheTime;
  return function() {
    let currentTime = Date.now();
    return new Promise((resolve) => {
      if (cache.result) {
          if (currentTime < cacheTimeExpired) {
              resolve(cache.result);
          } else {
              f().then((data) => {
                  cache.result = data;
                  resolve(data);
              })
          }
      } else {
          f().then((data) => {
              cache.result = data;
              resolve(data)
          })
      }
    })
  }
}

const memoized = memoize(getData, 3000);

memoized()
	.then(data1 => console.log(data1)) // получаем долго
	.then(memoized)
	.then(data2 => console.log(data2)) // получаем быстро, из кеша
	.then(memoized)
	.then(data3 => console.log(data3)) // получаем быстро, из кеша
	.then(() => {
	    setTimeout(() => {
	      return memoized().then(data4 => console.log(data4)); // получаем долго, считается заново
	    }, 5000);
	 });
