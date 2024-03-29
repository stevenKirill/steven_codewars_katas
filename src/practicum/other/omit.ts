// omit
// Реализуйте функцию, которая исключает из объекта указанные свойства.
// omit({ name: 'Benjy', age: 18 }, [ 'name' ]); // => { age: 18 }
// omit(obj: Object, fields: string[]): Object

function omit<T extends object>(obj: T, fields: (keyof T)[]) {
    const result = { ...obj };
    for (let key in obj) {
    if (fields.includes(key)) {
      delete result[key]
    }
  }
  return result;
}
