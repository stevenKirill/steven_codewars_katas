String.prototype.truncate = function(maxLength) {
  const str = String(this);
  if (str <= maxLength) return str;
  this.slice(0, maxLength + 1);
  return str.slice(0, maxLength) + '...';
}

Array.prototype.latest = function(count) {
  if (isNaN(count)) throw new Error('Should be number');
  return this.slice(-count);
}


class Post {
  constructor(title, content, tags) {
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.createdAt = new Date();
  }
  getPreview(length) {
    return `[${this.title}]: [${this.content.truncate(length)}]`
  }
}

class PremiumPost extends Post {
  constructor(title, content, tags, price) {
    super(title, content, tags);
    this.price = price;
  }
  getPreview(length) {
    return `[🔒 ПЛАТНО - Цена] [${this.title}]: [${this.content.truncate(length)}]`
  }
}


// 1. Проверка встроенных прототипов
const text = "JavaScript — это круто!";
console.log(text.truncate(10)); // Ожидается: "JavaScript..."

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.latest(2)); // Ожидается: [4, 5]

// 2. Проверка классов
const regularPost = new Post("Обновление Git", "Сегодня мы изучили интерактивный режим git add -p, который очень удобен.", ["git"]);
console.log(regularPost.getPreview(20));
// Ожидается: "Обновление Git: Сегодня мы изучили и..."

const vipPost = new PremiumPost("Секреты Прототипов", "Глубокий разбор __proto__ и prototype архитектуры в JS.", ["js"], 500);
console.log(vipPost.getPreview(15));
// Ожидается: "[🔒 ПЛАТНО - 500] Секреты Прототипов: Глубокий разбор..."
