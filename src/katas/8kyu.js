// Bin to Decimal => https://www.codewars.com/kata/57a5c31ce298a7e6b7000334

function binToDec(bin) {
  return bin
    .split("")
    .reverse()
    .map((element, i) => (element == 1 ? Math.pow(2, i) : 0))
    .reduce((prev, curr) => prev + curr, 0);
}

function numToSting(num) {
  const str = String(num); // преобразуешь число в строку
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (i % 3 === 0) {
      result += str[i] + " ";
    } else {
      result += str[i];
    }
  }
  return result;
}

console.log(numToSting(1000000000));

console.log(1 + 1);
console.log("1" + "1000");
console.log("hello" + " world");
