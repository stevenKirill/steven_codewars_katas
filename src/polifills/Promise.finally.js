// Полифилл для Promise.prototype.finally
// Реализуйте полифилл для Promise.prototype.finally.
// .finally(fn) вызывается всегда и «проксирует» значение промиса:

// resolve
// const resolvedPromise = Promise.resolve()
//   .finally(() => console.log('cleanup')); // Сработает

// // reject
// const rejectedPromise = Promise.reject('Error')
//   .finally(() => console.log('cleanup')); // Сработает

// При ошибке внутри fn, весь промис реджектится этой новой ошибкой:
// const promise = Promise.reject('Error')
//   .finally(() => { throw 'foo'; })
//   .catch(e => console.log(e)) // => 'foo'

// Если fn возвращает промис, его успешный resolve не влияет
// на финальное значение, но его reject влияет:
// // resolve
// const resolvedPromise = Promise.resolve(50)
//   .finally(() => Promise.resolve(42))
//   .then(result => console.log(result));  // => Response 50

// // reject
// const rejectedPromise = Promise.reject('Error')
//   .finally(() => Promise.reject('foo'))
//   .catch(e => console.log(e));           // => 'foo'

Promise.prototype.finally = function (fn) {
  const instance = this;
  try {
    const result = fn();
    if (result instanceof Promise) {
      return new Promise((resolve, reject) => {
        instance
        .then((data) => resolve(data))
        .catch(() => result.catch((e) => reject(e)))
      })
    }
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
}

const resolvedPromise = Promise.resolve()
  .finally(() => console.log(' cleanup')); // Сработает


const rejectedPromise = Promise.reject('Error')
  .finally(() => console.log('cleanup e')); // Сработает

const promise = Promise.reject('Error')
  .finally(() => { throw 'foo'; })
  .catch(e => console.log(e)) // => 'foo'
