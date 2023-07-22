class DoublyLinkedList {
  constructor() {
      this.size = 0;
      this.head = null;
      this.tail = null;
  }

  // Добавляет элемент в список.
  // Если указан индекс - добавляет по индексу,
  // в противном случае добавляет в конец.
  // Если индекс за пределами — кидает ошибку.
  // DONE
  add(value, index) {
    this.checkIndex(index);
    const newNode = createNode(value);
    if (!this.tail) {
      this.head = this.tail = newNode
    } else if (index !== undefined) {
      const currentNode = this.searchByIndex(index);
      currentNode.prev.next = newNode;
      newNode.prev = currentNode.prev;
      currentNode.prev = newNode;
      newNode.next = currentNode;
    } else {
      let oldTail = this.tail;
      this.tail = newNode;
      this.tail.prev = oldTail;
      oldTail.next = this.tail;
    }
    this.size++;
  }

  // DONE
  checkIndex(index) {
    if (index > this.size || index < 0) {
      throw new Error(`Index must be less than ${this.size}`)
    }
  }

  // Удаляет элемент из списка по значению.
  // Удаляет только первый найденный элемент.
  // Если элемент не найден, ничего делать не нужно.
  removeByValue(value) {
    let current = this.searchByValue(value);
    if (current.prev === null) {
      this.deleteHead();
      return
    }
    if (current.next === null) {
      this.deleteTail();
      return
    }
    const deletedValue = current.value;
    if (current) {
      current.prev.next = current.next;
      current.next.prev = current.prev;
      current = null;
      this.size--;
    }
    return deletedValue;
  }

  // DONE
  deleteHead() {
    if (!this.head) {
      return null;
    } else {
      let removeHead = this.head;
      if (this.head === this.tail) {
        this.head = this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
      return removeHead.value;
    }
  }

  // DONE
  deleteTail() {
    if (!this.tail) {
      return null;
    } else {
      let removeTail = this.tail;
      if (this.head === this.tail) {
        this.head = this.tail = null
      } else {
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
      return removeTail.value;
    }
  }

  // Удаляет элемент из списка по индексу.
  // Если индекс за пределами — кидает ошибку.
  // DONE
  removeByIndex(index) {
    this.checkIndex(index);
    this.size--;
    if (index === 0) {
      this.deleteHead();
      return
    }
    if (index === this.size) {
      this.deleteTail();
      return;
    }
    let currentNode = this.searchByIndex(index);
    const value = currentNode.value;
    const nextNode = this.searchByIndex(index + 1);
    const prevNode = this.searchByIndex(index - 1);
    if (currentNode) {
      prevNode.next = currentNode.next;
      nextNode.prev = currentNode.prev;
      currentNode = null;
    }
    return value;
  }

  // Ищет элемент в списке по индексу.
  // Если индекс за пределами — кидает ошибку.
  // DONE
  searchByIndex(index) {
    this.checkIndex(index);
    let currentNode = this.head;
    let counter = 0;
    while(currentNode) {
      if (counter === index) {
        return currentNode;
      }
      counter++;
      currentNode = currentNode.next;
    }
  }

  // Ищет элемент в списке по значению.
  // Возвращает первый найденный элемент.
  // Опционально можно указать индекс начала поиска.
  // Если индекс за пределами — кидает ошибку.
  // Если элемент не найден, нужно вернуть null.
  // DONE
  searchByValue(value, startIndex = 0) {
    this.checkIndex(startIndex);
    if (startIndex === undefined || startIndex === 0) {
      let currentNode = this.head;
      while(currentNode) {
        if (currentNode.value === value) {
          return currentNode;
        }
        currentNode = currentNode.next;
      }
    } else {
      const currentNode = this.searchByIndex(startIndex);
      while(currentNode) {
        if (currentNode.value === value) {
          return currentNode;
        }
        currentNode = currentNode.next;
      }
    }
    return null;
  }

  // DONE
  toArray() {
    if (this.isEmpty()) {
      return '';
    }

    const linkedListArr = [];
    let current = this.head;
    for (let i = 0; i < this.size && current !== null; i++) {
      linkedListArr.push(current.value);
      current = current.next;
    }

    return linkedListArr.join(', ');
  }

  // DONE
  isEmpty() {
    return this.size === 0;
  }
}

// Создаёт новую ноду, где
// value — её значение,
// next — ссылка на следующую ноду,
// prev — ссылка на предыдущую ноду
function createNode(value) {
return {
  value,
  next: null,
  prev: null,
};
}


const list = new DoublyLinkedList();
list.add(1);
list.add(2);
list.add(3);
// 1 2 3
console.log(list.toArray());
list.add(4, 1)
// 1 4 2 3
console.log(list.toArray());
list.add(6)
// 1, 4, 2, 3, 6
console.log(list.toArray());
list.add(7, 3)
// 1, 4, 2, 7, 3, 6
console.log(list.toArray());
console.log(list.removeByIndex(3))
// 1, 4, 2, 3, 6
console.log(list.toArray());
// console.log(list.removeByValue(4))
// console.log(list.toArray());
// console.log(list.removeByValue(3))
// console.log(list.toArray());
// console.log(list)
// list.add(5, 2)
// // 1 4 5 2 3
// console.log(list.toArray());
// list.removeByIndex(3)
// // 1 4 5 3
// console.log(list.toArray());
// list.removeByValue(5)
// // 1 4 3
// console.log(list.toArray());
// console.log(list.searchByValue(1)) // 3

// {
//     value: 5,
//     prev: null,
//     next: {
//         value: 3,
//         prev: {Ссылка на элемент со значением 5},
//         next: {
//             value: -13,
//             prev: {Ссылка на элемент со значением 3},
//             next: null
//         }
//     }
// }
