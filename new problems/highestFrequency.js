// какая строка встречается чаще всего ?
function highestFrequency(array) {
    // const reduced = array.reduce((acc,curr) => {
    //     if (!acc[curr]) {
    //         return {
    //             ...acc,
    //             [curr]: 1
    //         }
    //     }
    //     return {
    //         ...acc,
    //         [curr]: acc[curr]+1
    //     }
    // }, {});
    // let max = 0;
    // Object.entries(reduced).map(([_, value]) => max < value ? max = value : null);
    // return max;
    let max = 1;
    Object.entries(array.reduce((acc,curr) => acc[curr] ? { ...acc, [curr]: acc[curr] + 1 } : { ...acc, [curr]: 1 }, {})).map(([_, value]) => max < value ? max = value : null);
    return max
};

console.log(highestFrequency(['a','b','c','c','c','d','e']))
console.log(highestFrequency(['abc','abc','c','abc','c','def','def','def','ab','ab','def']))