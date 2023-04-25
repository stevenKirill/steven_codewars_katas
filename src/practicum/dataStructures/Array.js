class MyArray {
  constructor(initialSize = 1) {
    if (Number(initialSize) !== initialSize || Math.round(initialSize) !== initialSize) {
      throw new Error('Длина массива должна быть целым числом');
    }

    if (!(initialSize > 0)) {
      throw new Error('Размер массива должен быть больше нуля');
    }

    this.size = initialSize;
    this.memory = allocate(initialSize);
    this.length = 0;
  }

  // Возвращает значение по индексу.
  // Если индекс за пределами — кидает ошибку.
  get(index) {
    if (index > this.size || index < 0) {
      throw new Error('Индекса массива не существует');
    }
    return this.memory[Number(index)];
  }

  // Устанавливает значение по индексу.
  // Если индекс за пределами — кидает ошибку.
  set(index, value) {
    if (index > this.size || index < 0) {
      throw new Error('Индекса массива не существует');
    }
    this.memory[index] = value;
    this.length++;
  }

  // Добавляет новый элемент в массив.
  // Если index не определён — добавляет в конец массива.
  // В противном случае — добавляет по индексу со сдвигом
  // всех последующих элементов.
  // Если индекс за пределами - кидает ошибку.
  // Увеличивает выделенную память вдвое, если необходимо.
  // Возвращает новую длину массива.
  add(value, index) {
    if (index > this.size || index < 0) {
      throw new Error('Индекса массива не существует');
    }
    if (index === undefined) {
      this.memory[this.length] = value;
      this.length++;
      this.checkAvailableMemory();
      return this.length;
    } else {
      const { keys: memoryKeys, values: memoryValues } = this.getMemoryKeysAndValues();

      const newKeys = [...memoryKeys.slice(0, index), index, ...memoryKeys.slice(index).map((idx) => Number(idx) + 1)];
      const newValuevalues = [...memoryValues.slice(0, index), value, ...memoryValues.slice(index)];

      for (let i = 0; i < newKeys.length; i++) {
        this.memory[i] = newValuevalues[i];
      }
      this.length++;
      this.checkAvailableMemory()
      return this.length;
    }
  }

  checkAvailableMemory() {
    if (this.length === this.size) {
      const newMemory = allocate(this.size * 2);
      for (let i = 0; i < this.length; i++) {
        newMemory[i] = this.memory[i];
      }
      this.memory = newMemory;
      this.size *= 2;
    }
  }

  getMemoryKeysAndValues() {
    const keys = Object.keys(this.memory);
    const values = Object.values(this.memory);
    return { keys, values }
  }

  // Удаляет элемент по индексу со сдвигом всех последующих элементов.
  // Если индекс за пределами - кидает ошибку.
  // Возвращает новую длину массива.
  delete(index) {
    if (index > this.size || index < 0) {
      throw new Error('Индекса массива не существует');
    }

    const { keys, values } = this.getMemoryKeysAndValues();
    const keysBefore = keys.slice(0, index);
    const keysAfter = keys.slice(index + 1).map((el) => --el);

    const valuesBefore = values.slice(0, index);
    const valuesAfter = values.slice(index + 1);

    const newKeys = [...keysBefore, ...keysAfter];
    const newValues = [...valuesBefore, ...valuesAfter];

    for(let i = 0; i < newKeys.length; i++) {
      this.memory[newKeys[i]] = newValues[i];
    }

    this.length--;
    return this.length;
  }
}

function allocate(size) {
  const memory = {};

  for (let i = 0; i < size; i++) {
    memory[i] = undefined;
  }

  return memory;
}


const arr = new MyArray(20);
