const flatInit = require('./flat');

flatInit();

const arr = [1,2,3,[4,5,[6,[7,8]]],[5],['1']].myFlat(1)

console.log(arr)