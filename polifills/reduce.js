module.exports = function () {
  if (!Array.prototype.myReduce) {
    Array.prototype.myReduce = function (callback,accInitial) {
      if (typeof callback !== "function") {
        throw new Error(
          `${arguments[0]} is wrong parameter, you should pass callback function`
        );
      }

      if (!Array.isArray(this)) {
        throw new Error(`${this} should be array, call it only on arrays`);
      }

      let acc = accInitial !== undefined ? accInitial : this[0]
      let start = accInitial !== undefined ? 0 : 1;
      
      for (let i = start; i < this.length; i++) {
        acc = callback(acc, this[i]);
      }

      return acc
    };
  }
};
