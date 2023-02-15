// плоский массив
function flatten(array) {
    return array.reduce((acc,curr) => Array.isArray(curr) ? acc.concat(flatten(curr)) : acc.concat(curr),[])
};

console.log(flatten([1,[2,3,[4,5,[6,[7,8,[9,[10]]]]]]])) // [1,2,3,4,5,6,7,8,9,10];