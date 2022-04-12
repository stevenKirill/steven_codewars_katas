// уникальность всех символов с строке
function isUnique(str) {
    const unique = [];
    for (let i = 0; i < str.length; i++) {
        if (!unique.includes(str[i])) {
            unique.push(str[i]);
        }
    }
    return unique.length === str.length
};

function isUnique2(str) {
    // for (let i = 0; i < str.length; i++) {
    //     const char = str[i];
    //     if (str.lastIndexOf(char) !== i) {
    //         return false
    //     }
    // }
    // return true

    // const set = new Set();
    // for (let i = 0; i < str.length; i++) {
    //     if (set.has(char)) {
    //         return false
    //     }
    //     set.add(char)
    // }
    // return true;

    return new Set(str).size === str.length
};

console.log(isUnique2('abcdef')) // true
console.log(isUnique2('abcdeafc')) // false

// плоский массив
function flatten(array) {
    return array.reduce((acc,curr) => Array.isArray(curr) ? acc.concat(flatten(curr)) : acc.concat(curr),[])
};

console.log(flatten([1,[2,3,[4,5,[6,[7,8,[9,[10]]]]]]])) // [1,2,3,4,5,6,7,8,9,10];

// удаление всех повторяющихся значений
function removeDupes(str) {
    return [...new Set(str)].join('');
};

// console.log(removeDupes('abc'));
// console.log(removeDupes('abcdaddcc'));
// console.log(removeDupes('xyzzzttstduyyy'));

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

// console.log(highestFrequency(['a','b','c','c','c','d','e']))
// console.log(highestFrequency(['abc','abc','c','abc','c','def','def','def','ab','ab','def']))