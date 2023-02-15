// omit
// Реализуйте функцию, которая исключает из объекта указанные свойства.
// omit({ name: 'Benjy', age: 18 }, [ 'name' ]); // => { age: 18 }
// omit(obj: Object, fields: string[]): Object

type TypeObj<T> = {
  [key in keyof T]: string;
};

function omit<T extends object>(obj: T, fields: (keyof T)[]) {
    const result = {};
    for (let key in obj) {
    if (!fields.includes(key)) {
      result[key] = obj[key]
    }
  }
  return result;
}
