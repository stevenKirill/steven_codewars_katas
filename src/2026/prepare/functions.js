const loggerConfig = {
  moduleName: "AuthModule",
  criticalCodes: [401, 403, 500],
  formatLog: function(array) {
    return array.map((item) => {
      console.log(`[${item}] - ${this.moduleName}`)
    })
  }
};


console.log(checkIsCritical(403));

function checkIsCritical(code) {
  return loggerConfig.criticalCodes.includes(code);
}

// потому что function declaration поднимаются
const sumErrorsExpression = function() {
  // Превращаем псевдомассив arguments в реальный массив
  const argsArray = Array.from(arguments);
  return argsArray.reduce((acc, curr) => acc + curr, 0);
};

console.log(sumErrorsExpression(10, 20, 30)); // Выведет: 60
