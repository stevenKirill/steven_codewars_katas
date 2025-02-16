console.log(typeof null);
console.log(typeof {});
console.log(typeof []);
console.log(typeof undefined);

/////////////////////////////////////

// Фактически движок JavaScript преобразует её в что-то подобное:
// function async2() {
//   return Promise.resolve().then(() => {
//       console.log('async2 end')
//       return undefined; // неявный return, если нет явного
//   });
// }

console.log('script  start')

async function async1 () {
	await async2()
	console.log('async1 end')
}
async function async2 () {
	console.log('async2 end')
}
async1()

setTimeout(() => {
	console.log('setTimeout')
})

new Promise(resolve => {
	console.log('Promise')
	resolve()
})
.then(function () {
  console.log('promise1')
})
.then(function () {
  console.log('promise2')
})
console.log('script  end')

// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout
/////////////////////////////////////

function printing() {
   console.log(1);
   setTimeout(function() { console.log(2); }, 1000);
   setTimeout(function() { console.log(3); }, 0);
   console.log(4);
}

printing();

/////////////////////////////////////

function greet(person) {
  if (person == { name: 'amy' }) {
    return 'hey amy'
  } else {
    return 'hey arnold'
  }
}
greet({ name: 'amy' })

///////////////////////////////////
for (var i = 0; i < 4; i++) {
  setTimeout(() => console.log(i), 0)
}

/////////////////////////////////////

let dog = {
  name: 'doggo',
  sayName() {
    console.log(this.name)
  },
}
let sayName = dog.sayName
sayName()

////////////////////////////////////

function Dog(name) {
  this.name = name
}
Dog.bark = function () {
  console.log(this.name + ' says woof')
}
let fido = new Dog('fido')
fido.bark()

////////////////////////////////////

function isBig(thing) {
  if (thing == 0 || thing == 1 || thing == 2) {
    return false
  }
  return true
}
isBig(1) // false
isBig([2]) // false
isBig([3]) // true

////////////////////////////////////

console.log(0 == '0')
console.log(0 == [])
console.log('0' == [])

////////////////////////////////////

