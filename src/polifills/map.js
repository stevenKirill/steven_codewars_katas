module.exports = function () {
  if (!Array.prototype.myMap) {
    Array.prototype.myMap = function (callback) {
      if (typeof callback !== "function") {
        throw new Error(
          `${arguments[0]} is wrong parameter, you should pass callback function`
        );
      }

      if (!Array.isArray(this)) {
        throw new Error(`${this} should be array, call it only on arrays`);
      }

      let result = [];

      for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
      }

      return result;
    };
  }
};
