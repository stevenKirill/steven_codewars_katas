const cart = {
  shopName: "TechStore",
  items: ["Смартфон", "Ноутбук", "Наушники"],

  // Метод должен выводить товары в формате: "[Название магазина] Товар: [Имя товара]"
  logItems() {
    // Внутри forEach контекст теряется! Исправьте это тремя разными способами (см. Шаг 2)
    this.items.forEach((item) => {
      console.log(`${this.shopName} Товар: ${item}`);
    });
  },
  logItems2() {
    const context = this;
    this.items.forEach(function (item) {
      console.log(`${context.shopName} Товар: ${item}`);
    });
  },
};

cart.logItems2();

function showStoreName(greeting) {
  return `${greeting}, вы покупаете в ${this.shopName}`;
}

const boundFunc = showStoreName.bind(cart);


console.log(boundFunc('kirill'))

this.shopName = 'ru-store'

const cart2 = {
  shopName: "TechStore",
  sayHello: () => {
    console.log(this, '=> this');
    console.log(`Добро пожаловать в ${this.shopName}`);
  }
};

cart2.sayHello();

console.log(this === globalThis);     // false
console.log(this === module.exports); // true
