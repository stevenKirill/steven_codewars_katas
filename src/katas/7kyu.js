// Row Weights => https://www.codewars.com/kata/5abd66a5ccfd1130b30000a9

function rowWeights(array) {
    let newArray = [0, 0];
    for (let i = 0; i < array.length; i++) {
        if (i % 2 == 0) {
            newArray[0] += array[i]
        } else newArray[1] += array[i];
    }
    return newArray;
};

// Magic Index => https://www.codewars.com/kata/57d5fed61a6282bf6f002a5f

function findMagic(arr) {
    let result;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == i) {
            result = arr[i];
        } else -1;
    }
    return result;
};

// Make a square box => https://www.codewars.com/kata/58644e8ddf95f81a38001d8d

function box(n) {
    const str1 = '-'.repeat(n);
    const str2 = `-${' '.repeat(n - 2)}-`;
    const inner = Array(n - 2).fill(str2);
    return [str1, ...inner, str1];
};

// Insert dashes => https://www.codewars.com/kata/55960bbb182094bc4800007b

function insertDash(string) {
    let num = String(string).split('');
    for (let i = 0; i < num.length - 1; i++) {
        if (num[i] % 2 !== 0 && num[i + 1] % 2 !== 0) {
            num[i] += '-';
        }
    }
    return num.join('');
};

// Remove duplicate words => https://www.codewars.com/kata/5b39e3772ae7545f650000fc

function removeDuplicateWords(s) {
    let words = s.split(' ');
    let result = [];
    words.forEach(function (word) {
        if (!result.includes(word)) {
            result.push(word);
        }
    });
    return result.join(' ');
};

// Flatten and sort an array => https://www.codewars.com/kata/57ee99a16c8df7b02d00045f

function flattenAndSort(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result = result.concat(array[i]);
    }
    return result.sort((a, b) => {
        return a - b;
    });
};

// Reverse words => https://www.codewars.com/kata/5259b20d6021e9e14c0010d4

function reverseWords(str) {
    const splited = str.split(' ');
    let result = '';
    splited.forEach((x) => result += reverseMe(x) + ' ')
    return result.trim();
};

function reverseMe(str) {
    let res = '';
    for (let char = str.length - 1; char >= 0; char--) {
        res += str[char];
    }
    return res;
};

// Say me please operations => https://www.codewars.com/kata/5b5e0c0d83d64866bc00001d

const operation = (a, b, c) => {
    return a + b === c ? 'addition' :
        a - b === c ? 'subtraction' :
        a * b === c ? 'multiplication' : 'division';
}

function sayMeOperations(str) {
    const numbers = str.split(' ').map(Number)
    return numbers.slice(2).map((c, i) => {
        return operation(numbers[i], numbers[i + 1], c);
    }).join(', ');
}


// Find the capitals => https://www.codewars.com/kata/53573877d5493b4d6e00050c

function findCapitals(capitals) {
    const res = [];
    for (const obj of capitals) {
        if (obj.state) {
            res.push(`The capital of ${obj.state} is ${obj.capital}`);
        } else {
            res.push(`The capital of ${obj.country} is ${obj.capital}`);
        }
    }
    return res
};

// Genetic Algorithm Series - #1 Generate => https://www.codewars.com/kata/567d609f1c16d7369c000008

const generateAlgo = len => {
    const binary = [0, 1]
    return Array.from({
        length: len
    }, () => Math.floor(Math.random() * binary.length)).join('');
};

// Genetic Algorithm Series - #3 Crossover => https://www.codewars.com/kata/567d71b93f8a50f461000019

const crossover = (chromosome1, chromosome2, index) => {
    let firstMuted = '';
    let secondMuted = '';
    const firstChunk = chromosome1.slice(index)
    const secondChunk = chromosome2.slice(index)
    firstMuted += chromosome1.slice(0, index) + secondChunk;
    secondMuted += chromosome2.slice(0, index) + firstChunk;
    return [firstMuted, secondMuted];
};

// Genetic Algorithm Series - #4 Get population and fitnesses => https://www.codewars.com/kata/567b468357ed7411be00004a

const mapPopulationFit = (population, fitness) => {
    const res = [];
    for (let i = 0; i < population.length; i++) {
        let obj = {};
        obj['chromosome'] = population[i];
        obj['fitness'] = fitness(population[i])
        res.push(obj)
    }
    return res;
};

// Complete The Pattern #2 => https://www.codewars.com/kata/55733d3ef7c43f8b0700007c

function completePattern2(n) {
    let res = '';
    for (let i = n; i > 0; i--) {
        let tmp = '';
        for (let j = 0; j < n; j++) {
            tmp += i;
            i--;
            res += tmp + '\n';
        }
        tmp = '';
        n--;
    }
    return res.split('\n').reverse().join('\n').trim();
};

// Summing a number's digits => https://www.codewars.com/kata/52f3149496de55aded000410

function sumDigits(number) {
    return number.toString().split('').filter(x => x.match(/[0-9]/)).reduce((acc, curr) => Number(acc) + Number(curr), 0)
};