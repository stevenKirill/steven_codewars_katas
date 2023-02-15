// удаление всех повторяющихся значений
function removeDupes(str) {
    return [...new Set(str)].join('');
};

console.log(removeDupes('abc'));
console.log(removeDupes('abcdaddcc'));
console.log(removeDupes('xyzzzttstduyyy'));