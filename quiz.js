
const { useEffect, useState, useCallback } = require('./react.development');

// 1) Как получить результат Hello world!

const fi = (...a) => a[0];

function hi(name) {
    return `Hello ${this(name)}!`
}

const fi2 = (arr) => arr.join(' ');

function hi2(...name) {
  return `Hello ${this(name)}!`;
};

console.log(hi2.apply(fi2, ['Tom', 'John', 'Ben']));

// 2) С помощью какого оператора можно получить результат 3 ?

const values = [NaN, null, undefined, false];

const res = values.reduce((acc,curr) => {
    // return acc + values.findIndex(falthy => falthy |operator| curr);
},0);

// 3) Как получить результат phony/montana

const words = ['', 'phony', 'montana', ''];

// 4) Как получить результат hi man

class X {
    name() { return 'man'; }
    hi() { return `bye ${this.name()}` }
}

class Z extends X {
    name() { return `${super.name()}/son` }
    hi() { return `hi ${this.name()}` }
}

// 5) Жизненный цикл компонента
// mount userId = 1;
// update userId = 2;
// unmount

useEffect(() => {
    console.log(`A: ${userId}`);
    return () => {
        console.log(`B: ${userId}`);
    }
},[userId]);

// 6) Тут есть баг в чем он заключается? 

const [list,setList] = useState([]);
const handleAdd = useCallback((newEl) => {
    setList([...list,newEl]);
},[]);

// 7) Что будет в F

// const f = (s: string) => s.length
// type F = typeof f;























/// Ответы

// hi.call(fi,'world');
// ==
// words.filter(s => s.length > 0).join('/')
// console.log(new Z().hi.call(new X()))
// A:1 A:2 B:2 
// после каждого вызова list будет оставаться пустым
// `(s: string) => number`


