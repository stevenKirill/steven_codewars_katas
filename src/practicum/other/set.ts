// set
// Напишите функцию set, которая получает путь к вложенному свойству объекта
// и устанавливает значение в это свойство. Если поля не существует,
// его нужно создать по указанному пути.
// Проверьте, что path — строка, иначе нужно выбросить ошибку 'path must be string'.
// Если object не объект, то метод set должен вернуть значение object.
// В решении можно переиспользовать функцию слияния объектов — merge.
// Обратите внимание, что в решении вам нужно мутировать исходный объект,
//  который передали в качестве аргумента, а потом вернуть его из функции при
//  помощи return

type Indexed<T = any> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (let p in rhs) {
      if (!rhs.hasOwnProperty(p)) {
          continue;
      }

      try {
          if (rhs[p].constructor === Object) {
              rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
          } else {
              lhs[p] = rhs[p];
          }
      } catch(e) {
          lhs[p] = rhs[p];
      }
  }

  return lhs;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
      return object;
  }

  if (typeof path !== 'string') {
      throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
      [key]: acc,
  }), value as any);
  return merge(object as Indexed, result);
}

export default set

console.log(set({ foo: 5 }, 'bar.baz', 10))
// console.log(set({ foo: 5 }, 'bar.baz.lol.hi', 10))
