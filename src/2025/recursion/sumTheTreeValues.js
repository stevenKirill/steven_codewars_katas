// Дерево — структура данных, состоящая из узлов со значениями. В бинарном дереве у каждого узла
// не более 2 детей. В этой задаче нужно посчитать сумму элементов в бинарном дереве.

// Гарантируется, что у каждого объекта есть ровно три поля: value, left и right.
// В полях left и right может находиться либо такой же объект, либо null.

const root = {
  value: 3,
  left: {
    value: 5,
    left: {
      value: 1,
      left: null,
      right: null,
    },
    right: null,
  },
  right: {
    value: 2,
    left: null,
    right: {
      value: 8,
      left: null,
      right: null,
    },
  },
};

console.log(sumTheTreeValues(root)); // 19

function sumTheTreeValues(root) {
  if (root === null) return 0;

  let result = root.value;

  if (root.left) {
    result += sumTheTreeValues(root.left);
  }

  if (root.right) {
    result += sumTheTreeValues(root.right);
  }

  return result;
}
