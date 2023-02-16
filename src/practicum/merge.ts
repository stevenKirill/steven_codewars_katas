// Напишите функцию, которая объединит два объекта с сохранением их уникальных ключей.
// Порядок ключей важен.

type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    Object.keys(rhs).forEach((key) => {
    if (typeof rhs[key] === 'object' && rhs[key] !== null) {
      merge(rhs[key] as Indexed, lhs[key] as Indexed)
    } else {
      Object.assign(lhs, { [key]: rhs[key] });
    }
  })
  return lhs
}

console.log(merge({a: {b: {a: 2}}, d: 5}, {a: {b: {c: 1}}}));
/*
{
	a: {
		b: {
			a: 2,
			c: 1,
		}
	},
	d: 5,
}
*/
