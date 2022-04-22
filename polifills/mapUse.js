const mapInit = require('./map');

mapInit();

const arr = [1, 2, 3, 5].myMap((num) => num + 1);

console.log(arr);

const arr2 = ['cheese','milk','carrot'].myMap(word => `${word} is delicios`);

console.log(arr2)