// classnames
// Напишите утилиту для объединения имён классов. Функция должна обрабатывать:
// объекты,
// строки,
// числа, но не 0,
// массивы любой вложенности.

function classNames() {
  const args = Array.prototype.slice.call(arguments);
  const result: string[] = [];
  args.forEach((val) => {
    if (typeof val === 'string') {
      result.push(val);
    }
    if (typeof val === 'number' && val !== 0) {
      result.push(String(val));
    }
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      Object.entries(val).forEach(([key, value]) => {
        if (value) {
          result.push(key);
        }
      });
    }
    if (Array.isArray(val)) {
      // @ts-ignore
      val = val.flat(Infinity);
      val.forEach((item: unknown) => {
        if (typeof item === 'string') {
          result.push(item);
        }
        if (typeof item === 'number' && item !== 0) {
          result.push(String(item));
        }
      });
    }
  });
  return result.join(' ');
}

// console.log(classNames("foo", "bar")); // => 'foo bar'
// console.log(classNames("foo", { bar: true })); // => 'foo bar'
// console.log(classNames({ "foo-bar": true })); // => 'foo-bar'
// console.log(classNames({ "foo-bar": false })); // => ''
// console.log(classNames({ foo: true }, { bar: true })); // => 'foo bar'
// console.log(classNames({ foo: true, bar: true })); // => 'foo bar'
// console.log(
//   classNames("foo", { bar: true, duck: false }, "baz", { quux: true })
// ); // => 'foo bar baz quux'
// console.log(classNames(null, false, "bar", undefined, 0, 1, { baz: null }, "")); // => 'bar 1'
// console.log(classNames('bar', [1, null, 'baz'], {baz: true}, '3')); // => 'bar 1 baz baz 3'
// console.log(classNames('bar', [1, null, 'baz', ['foo', 'test']], {baz: true}, '3')); // => 'bar 1 baz foo test baz 3'
