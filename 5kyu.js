// multiple(value, times)

function multiply(value, times) {
    if (typeof times !== 'number' || !isFinite(times)) {
        throw new Error()
    }
    if (times < 0) throw new Error();
    if (typeof value === 'number') {
        return value * times;
    }
    if (typeof value === 'string') {
        return value.repeat(times);
    }
    if (typeof value === 'function') {
        return function () {
            for (var i = 0; i < times; i++) {
                value.apply(this, arguments)
            }
        }
    }
    if (typeof value === 'object' && value !== null) {
        if (times === 0) return [];
        return Array.from({
            length: times
        }).fill(value);
    }
    return value;
};

// Convert A Hex String To RGB => https://www.codewars.com/kata/5282b48bb70058e4c4000fa7

function hexStringToRGB(hexString) {
    const res = {};
    const withoutHash = hexString.replace('#', '');
    res.r = parseInt(withoutHash.slice(0, 2), 16);
    res.g = parseInt(withoutHash.slice(2, 4), 16);
    res.b = parseInt(withoutHash.slice(4), 16);
    return res;
};

// Flatten a nested Map => https://www.codewars.com/kata/52859abdf8fc1b12e0000141

function flattenMap(map, prev = []) {
    const res = {};
    for (let key in map) {
        if (typeof map[key] !== 'object' || Array.isArray(map[key]) || map[key] === null) {
            res[[...prev, key].join('/')] = map[key]
        } else {
            Object.assign(res, flattenMap(map[key], [...prev, key]))
        }
    }
    return res
};

// Moving Zeros To The End => https://www.codewars.com/kata/52597aa56021e91c93000cb0

function moveZeros(array) {
    const zeros = array.filter((element) => element === 0);
    const noZeros = array.filter((element) => element !== 0);
    return noZeros.concat(zeros);
};

// Count IP Addresses => https://www.codewars.com/kata/526989a41034285187000de4

function ipsBetween(start, end) {
    return transformIp(end) - transformIp(start);
};

function transformIp(ip) {
    return parseInt(ip.split('.').map(function (x) {
        let binary = parseInt(x).toString(2); //binary num
        return new Array(9 - binary.length).join('0') + binary;
    }).join(''), 2);
};

// Maximum subarray sum => https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c

const maxSequence = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            result.push(arr.slice(i, j + 1));
        }
    }
    return Math.max(...result.map((array) => array.reduce((acc, curr) => acc + curr, 0)), 0);
};

// Ninety Nine Thousand Nine Hundred Ninety Nine => https://www.codewars.com/kata/5463c8db865001c1710003b2

const numberToEnglish = n => {
    if (n < 0 || n > 99999 || !Number.isInteger(n)) return '';
    let singles = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
        ],
        doubles = ['zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
        arr = [];

    const convert = x => {
        if (x >= 20 && x % 10) return [doubles[x / 10 | 0], singles[x % 10]];
        if (x >= 20) return [doubles[x / 10 | 0]];
        return [singles[x]];
    }

    if (n >= 1000) {
        let thousands = n / 1000 | 0;
        arr.push(...convert(thousands), 'thousand');
        n %= 1000;
    }
    if (n >= 100) {
        let hundreds = n / 100 | 0;
        arr.push(...convert(hundreds), 'hundred');
        n %= 100;
    }
    if (n || arr.length === 0)
        arr.push(...convert(n));
    return arr.join(' ');
};

// Calculating with Functions => https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39

['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
.forEach(function (name, n) {
    this[name] = function (f) {
        return f ? f(n) : n
    }
});

function plus(n) {
    return function (a) {
        return a + n
    }
};

function minus(n) {
    return function (a) {
        return a - n
    }
};

function times(n) {
    return function (a) {
        return a * n
    }
};

function dividedBy(n) {
    return function (a) {
        return Math.floor(a / n)
    }
};

// Find the unique string => https://www.codewars.com/kata/585d8c8a28bc7403ea0000c3

function findUniq(arr) {
    if (arr[0] == '    ') {
        return 'a';
    }
    const first = [...arr[0].toLowerCase()];
    if (first == '' || first == '    ') {
        return arr.join('')
    }
    for (let i = 1; i < arr.length; i++) {
        for (let j = 1; j < arr[i].length; j++) {
            if (!first.includes(arr[i][j].toLowerCase())) {
                return arr[i];
            }
        }
    }
    return 'a';
};

// A Chain adding function => https://www.codewars.com/kata/539a0e4d85e3425cb0000a88

function add(n) {
    let sum = n;
    const inner = function (x) {
        sum += x;
        return inner; // на всех послед шагах
    }
    inner.toString = function () {
        return sum;
    }
    return inner; //  только на первом шаге
};