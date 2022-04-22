const reduceInit = require('./reduce');

reduceInit();

const ex = [1,2,3,4].myReduce((acc,curr) => acc + curr);

// console.log(ex)

const ex2 = [
    { name: 'kirill'},
    { name: 'tina'},
    { name: 'anna'}
]
.myReduce((acc,curr) =>  acc + ' ' + curr.name, '')
// .reduce((acc,curr) =>  acc + ' ' + curr.name, '')

console.log(ex2)

