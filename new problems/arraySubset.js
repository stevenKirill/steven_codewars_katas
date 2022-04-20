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

console.log(arraySubset([1,2,3],[2,1,3])) // true
console.log(arraySubset([1,1,1,3],[1,3,3])) // false
console.log(arraySubset([1,1,1,3,5],[1,3,3,5,5,5])) // false