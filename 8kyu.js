// Bin to Decimal => https://www.codewars.com/kata/57a5c31ce298a7e6b7000334

function binToDec(bin) {
    return bin.split('').reverse().map((element,i) => element == 1 ? Math.pow(2,i) : 0).reduce((prev,curr) => prev + curr,0);
}