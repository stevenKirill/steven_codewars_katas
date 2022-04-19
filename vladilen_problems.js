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

// console.log(isUnique2('abcdef')) // true
// console.log(isUnique2('abcdeafc')) // false

// плоский массив
function flatten(array) {
    return array.reduce((acc,curr) => Array.isArray(curr) ? acc.concat(flatten(curr)) : acc.concat(curr),[])
};

// console.log(flatten([1,[2,3,[4,5,[6,[7,8,[9,[10]]]]]]])) // [1,2,3,4,5,6,7,8,9,10];

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

function isStringRotated(source,test) {
    //return ([...source].every(char => test.includes(char)) && source.length === test.length)
    if (source.length !== test.length) return false

    for (let i = 0; i < source.length; i++) {
        const rotate = source.slice(i, source.length) + source.slice(0,i)
        if (rotate === test) {
            return true
        }
    }
    return false;
};

// console.log(isStringRotated('apple','elppa'))
// console.log(isStringRotated('javascript','scriptjava'))
// console.log(isStringRotated('javascript','scriptava'))

function arraySubset(source,subset) {
    if (source.length < subset.length) return false;
    // for( let i = 0; i < subset.length; i++) {
    //     if (source.indexOf(subset[i]) === -1) return false;
    //     delete source[index]
    // }
    // return true;
    const checked = {};
    for (let i = 0; i < subset.length; i++) {
        if (checked[subset[i]] && source.includes(subset[i])) return false;
        if (!source.includes(subset[i])) return false;
        checked[subset[i]] = true;
    }
    return true
};

// console.log(arraySubset([1,2,3],[2,1,3])) // true
// console.log(arraySubset([1,1,1,3],[1,3,3])) // false
// console.log(arraySubset([1,1,1,3,5],[1,3,3,5,5,5])) // false

function allAnagrams(array) {
    const first = [...array[0]]
    const sliced = array.slice(1);
    return first.every((char) => {
        let allTrue = true;
        sliced.forEach(word => {
            if (!word.includes(char)) {
                allTrue = false;
            }
        });
        return allTrue;
    });
};

// console.log(allAnagrams(['abcd','bdac','cabd'])) // true
// console.log(allAnagrams(['abcd','bdxc','cabd'])) // false


const mtrx = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];

function rotate(matrix) {
    const rotated = matrix.map(_ => [])

    for (let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            rotated[j][matrix.length - 1 -i] = matrix[i][j] 
        }
    }
    return rotated
}

function rotate180(matrix) {
    return rotate(rotate(matrix));
};

function rotate270(matrix) {
    return rotate180(rotate(matrix))
};

function printMatrix(arr) {
    arr.forEach(row => console.log(row))
};

function rotate360(matrix) {
    return rotate270(rotate(matrix))
};

printMatrix(rotate(mtrx))
console.log('---------------')
printMatrix(rotate180(mtrx))
console.log('---------------')
printMatrix(rotate270(mtrx))
console.log('---------------')
printMatrix(rotate360(mtrx))
// 0:0 0:1 0:2    0:2 1:2 2:2
// 1:0 1:1 1:2 => 0:1 1:1 2:1
// 2:0 2:1 2:2    0:0 1:0 2:0

// [1,2,3],    [7,4,1], 
// [4,5,6], => [8,5,2],
// [7,8,9],    [9,6,3],