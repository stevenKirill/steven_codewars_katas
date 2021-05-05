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

//Напиши функцию, считающую число свойств в объекте:
function countProps(object) {
    return Object.keys(object).length;
};

// продвинутая реализация curry c 5 аргументами
function curry(fn) {
    return function curried(...args) {
        if(args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}

// пример функции суммы которую будем каррировать
function sumNums(a,b,c,d,e) {
    return a + b + c + d + e
}

var curriedFunc = curry(sumNums);
curriedFunc(1,2)(3,4)(5);

// бесконченая curry chain по одному аргументу

function chainSum(x) {
    let counter = x;
    return function adder(y) {
        counter += y;
        adder.result = counter;
        return adder
    }
};
chainSum(1)(2)(3)(4)(10)(100).result;

// функции это объекты и у них есть методы =>> метод valuoOf преобразует функцию в 
// примитив в число а toString преобразует функцию в строку

function chainSum2(x) {
    let counter = x;
    function adder(y) {
        counter += y;
        return adder
    }
    adder.valueOf = function() {
        return counter;
    }
    return adder
};
chainSum2(10)(10)(10).valueOf();

// inherit функция наследования
function inherit(parent, child) {
    const Temp = function() {};
    Temp.prototype = parent.prototype;
    child.prototype = new Temp();
}

const F = function(arg) {
    this.arg = arg;
};
F.prototype.name = 'Steven';
F.prototype.logOne = function() {
    console.log(1)
}
const F2 = function(arg2) {
    this.arg2 = arg2;
};

inherit(F,F2);

F2.prototype.logOne = function() {
    console.log(1,'and this is F2')
}

const f1 = new F('Argument');
const f2 = new F2('Argument2');
f2.logOne()
f1.logOne()

// декларативная реализация flattenArray
function declarativeFlatten(array,result = []) {
    for(let i = 0, length = array.length; i < length; i++) {
        const value = array[i];
        if(Array.isArray(value)) {
             declarativeFlatten(value,result)
        } else {
            result.push(value)
        }
    }
    return result;
}
// функциональная реализация flattenArray
function functionalFlatten(array) {
    return array.reduce((acc,curr) => {
        return Array.isArray(curr) ? 
        acc.concat(functionalFlatten(curr)) : acc.concat(curr)
    },[])
};

//Реализовать алгоритм сжатия строки "AAADDDGFFFAAR" → "3A3DG3F2AR"
// Собеседование Сбербанк (не очень красивое решение)
function convertString(str) {
    let resultStr = '';
    let counter = 0;
    for(let i = 0; i < str.length; i++) {
        if(str[i] === str[i + 1]) {
            counter++;
        } else {
            resultStr += `${counter+1}${str[i]}`;
            counter = 0;
        }
    }
    return [...resultStr].filter(char => char !== '1').join('')
}

// создать массив случайных чисел от 1 до 200 чтобы они не повторялись
function getRandomArray() {
    const result = [];
    while(result.length < 100) {
        const rand = Math.floor(Math.random() * (200 - 1) + 1);
        if(!result.includes(rand)) {
            result.push(rand)
        }
    }
    return result
}
// функция throttle тормозилка
function throttle(f,wait) {
    let arrest = false;
    let lastPostPonedCall = false;
    let lastContext, lastArgs;
    let lastResult;

    const invokeFunc = (context, args) => {
        lastResult = f.apply(context,args); 
        arrest = true;

        setTimeout(() => {
            arrest = false;
            if (lastPostPonedCall) {
                invokeFunc(lastContext,lastArgs);
                lastContext = undefined;
                lastArgs = undefined;
                lastPostPonedCall = false;
            }
        },wait);
    }

    return function(...args) {
        if(!arrest) {
            invokeFunc(this,args)
        } else {
            lastPostPonedCall = true;
            lastContext = this;
            lastArgs = args
        }
        return lastResult;
    }
};

// test throttle function
function work(arg) {
    return arg;
}

const func = throttle(work,100);

func('A')

setTimeout(() => {
    func('B')
},50);

setTimeout(() => {
    func("C")
},75);

setTimeout(() => {
    func("D")
},110);

// Полифилл функции BIND кастомная реализация
 Function.prototype.myBind = function(...args) {
     const instance = this;
     const context = args[0];
     const otherArguments = args.slice(1);
     return function(...args2) {
         instance.apply(context,[...otherArguments,...args2])
     }
 };

 let my = {
     num: '1',
 };

 function logger(...args) {
     console.log(this.num)
     const arr = Array.from(args);
     arr.push(this.num);
     console.log(arr);
 }

 let boundLogger = logger.myBind(my,'2');

 boundLogger('3','4','5')

 /** Банк открытие собес
  * 
  Необходимо написать функцию, создающую пространство имен.
  На вход подается строка вида: "a.b.c.d.e", 
  на выходе ожидаем получить вложенные друг в друга объекты.

  **/

  function namespace(str) {
    const array = str.split('.');
    const result = {};
    let current = result;
    for(let i = 0; i < array.length; i++) {
      current[array[i]] = {};
      current = current[array[i]];
    }
    return result;
  }

  console.log(namespace('a.b.c.d.e')); // {"a":{"b":{"c":{"d":{"e":{}}}}}