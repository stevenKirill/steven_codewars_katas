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

function sumTheTreeValues(tree) {

};

console.log(sumTheTreeValues(root)); // 19
