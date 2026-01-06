// Один из видов бинарных деревьев — бинарные деревья поиска (BST — binary search tree).

// Это такое бинарное дерево, для каждой вершины которого верно,
// что все вершины в ее левом поддереве меньше, чем она, а все вершины справа — больше.

// Такое дополнительное условие нужно, чтобы в бинарном дереве можно было искать значение
// не полным перебором всех вершин, а спускаясь по дереву, все время выбирая одно направление.

const root = {
  value: 2,
  left: {
    value: 1,
    left: null,
    right: null,
  },
  right: {
    value: 3,
    left: null,
    right: null,
  },
};

const root2 = {};

// console.log(isBST(root)); // true

// 10-
//      /  \
//     5    15
//         /
//        6

// Пример сломанного дерева
const badRoot = {
  value: 10,
  right: {
    value: 15,
    left: { value: 6, left: null, right: null } // 6 меньше 10, но стоит справа — ошибка!
  }
};

function isBST(root, min = -Infinity, max = Infinity) {
  if (!root) {
    return true;
  }

  if (root.value <= min || root.value >= max) {
    return false;
  }

  return isBST(root.left, min, root.value) && isBST(root.right, root.value, max);
}

console.log('bad root');
console.log(isBST(badRoot));
