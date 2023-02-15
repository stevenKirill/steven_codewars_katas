const euclidTwoNumbers = (num1: number, num2: number): number => {
    let result;
    if (num1 === num2) {
        result = num1;
    }
    if (num1 > num2) {
        result = euclidTwoNumbers((num1 - num2), num2)
    }
    if (num2 > num1) {
        result = euclidTwoNumbers(num1, (num2 - num1));
    }
    return result as number;
  };
  

  const euclid = (...array: number[]) => {
    let result = array[0];
    for (let i = 0; i < array.length; i++) {
        result = euclidTwoNumbers(array[i], result)
        if (result === 1) return result;
    }
    return result;
  };
  
  console.log(euclid(36, 48, 54));