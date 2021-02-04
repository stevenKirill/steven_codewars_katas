// Напиши функцию создания генератора sequence(start, step). 
// Она при вызове возвращает другую функцию-генератор, которая при каждом вызове дает число 
// на 1 больше, и так до бесконечности. Начальное число, с которого начинать отсчет, 
// и шаг, задается при создании генератора. Шаг можно не указывать, тогда он будет 
// равен одному. Начальное значение по умолчанию равно 0. Генераторов можно создать 
// сколько угодно.
function counter(start = 0, step = 1) {
    let sum = start;
        return function() {
          return sum += step;
      }
};
const counter1 = counter(10,2);
// Также, нужна функция take(gen, x) которая вызвает функцию gen заданное число (x) 
// раз и возвращает массив с результатами вызовов. Она нам пригодится для отладки
function take(fn,time) {
    const calls = [];
    for(let i = 0; i < time; i++) {
        calls.push(fn())
    }
    return calls;
};

// Напиши функцию map(fn, array), которая принимает на вход функцию и массив, и обрабатывает 
// каждый элемент массива этой функцией, возвращая новый массив.
function customMap(fn,array) {
    const resultArray = [];
    for(let i = 0; i < array.length; i++) {
        resultArray.push(fn(array[i]));
    }
    return resultArray;
};
console.log(customMap(function(num) {
    return num + 10;
}, [1,2,3,4,5]));

// Напиши функцию fmap(a, gen), которая принимает на вход 2 функции, 
// a и gen, где gen — функция-генератор вроде той, что была в первом задании. 
// fmap возвращает новую функцию-генератор, которая 
// при каждом вызове берет следующее значение из gen и пропускает его через функцию a.
function fmap(fn1,fn2) {
    return function() {
        let next = fn1();
        return fn2(next);
    }
}
const counter3 = counter(1,1);
function square(x) { return x * x; }
const chain = fmap(counter3,square);

// Напиши функцию partial(fn, a1, a2, ....), которая позволяет зафиксировать один 
// или несколько аргументов функции.
function partial(func,...fixed) {
    return function(...args) {
        const argums = [...fixed,...args].filter(item => item !== undefined);
        if (func.length > argums.length) {
            return `Not enought argunents You should add ${func.length - argums} extra arguments`
        } else {
            return func.call(null,...fixed.concat(args)) 
        }
    }
}

function add(a, b) { return a + b; }

function mult(a, b, c, d) {
     return a * b * c * d; 
}

const add5 = partial(add,5);

const mult23 = partial(mult,2,3)
console.log(mult23(10,2))

// напиши функцию bind, которая позволяет привязать контекст (значение this) к функции:
function bind(fn,ctx) {
    return function(...args) {     
        return fn.call(ctx,args);
    }
};
const testObject = {
    name: 'Steven'
};
function nameLogger(args) {
    console.log(
        `Logging name: ${this.name}\n`,
        args,'=>> function args');
};
const boundNameLogger = bind(nameLogger,testObject);
boundNameLogger(1,2,3);

// напиши функцию pluck, которая берет массив объектов и 
// возвращает массив значений определенного поля:
var characters = [
    { 
        'name': 'barney',
        'age': 36 
    },
    { 
        'name': 'fred',
        'age': 40 
    }
];
function pluck(arrayOfObjects,field) {
    return arrayOfObjects.map(object => {
        if (!object[field]) {
            return 'no such prop'
        }
        return object[field]
    })
};
// [30,40]

function filter(array,fn) {
    const result = [];
    for(let i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            result.push(array[i])
        }
    }
    return result;
};
const arrayNum = [1,2,3,4,5];
function isEven(x) { return x % 2 == 0; };
// console.log(filter(arrayNum,isEven))

//Напиши функцию, считающую число свойств в объекте:
function countProps(object) {
    return Object.keys(object).length;
};