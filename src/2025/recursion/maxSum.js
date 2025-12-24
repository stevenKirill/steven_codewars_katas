// Дано бинарное дерево, в вершинах которого хранятся целые числа.
// Определите максимальную сумму значений, которую можно получить,
// спускаясь от корня дерева до листа.

const root = {
  value: 1, // ←
  left: {
    value: 5,
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
  },
  right: {
    value: 2, // ←
    left: {
      value: 8,
      left: null,
      right: null,
    },
    right: {
      value: 9, // ←
      left: null,
      right: null,
    },
  },
};

const second = {
  "value": 5,
  "left": {
    "value": 4,
    "left": {
      "value": -80,
      "left": null,
      "right": null
    },
    "right": {
      "value": -60,
      "left": null,
      "right": null
    }
  },
  "right": {
    "value": 10,
    "left": {
      "value": -90,
      "left": null,
      "right": null
    },
    "right": null
  }
};

console.log(maxSum(root)); // 1 + 2 + 9 === 12

console.log(maxSum(second)); // -51

function maxSum(object) {
  if (object === null) {
    return -Infinity;
  }

  if (object.left === null && object.right === null) {
    return object.value;
  }

  const leftSum = maxSum(object.left);
  const rightSum = maxSum(object.right);

  return object.value + Math.max(leftSum, rightSum);
}

  //      1
  //     / \
  //    5   2
  //   / \ / \
  //  1  3 8  9

// Шаг 2: Рекурсивно идем в left (узел 5)
// Запускаем maxSum(left) для узла 5
// Узел 5 снова вызывает рекурсию для своих детей

// Шаг 3: Доходим до листов
// maxSum({value: 1, left: null, right: null}) → возвращает 1
// maxSum({value: 3, left: null, right: null}) → возвращает 3


// Шаг 4: Возвращаемся к узлу 5
// leftSum = 1
// rightSum = 3
// return 5 + Math.max(1, 3) = 5 + 3 = 8


// Шаг 5: Аналогично для правого поддерева (узел 2)
// leftSum = 8
// rightSum = 9
// return 2 + Math.max(8, 9) = 2 + 9 = 11

// Шаг 6: Возвращаемся к корню (узел 1)
// leftSum = 8   // от узла 5
// rightSum = 11 // от узла 2
// return 1 + Math.max(8, 11) = 1 + 11 = 12 ✅
