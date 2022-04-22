module.exports = function () {
  if (!Array.prototype.myFlat) {
    Array.prototype.myFlat = function (depth = 1) {
      if (!Array.isArray(this)) {
        throw new Error(`${this} should be array, call it only on arrays`);
      };

      if (isNaN(depth) || depth <= 0 ) {
        return this;
      };

      function flatten(arr,arrDepth) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i]) && depth > 0) {
                result.push(...flatten(arr[i], arrDepth - 1))
            } else {
                result.push(arr[i]);
            }
          }
          return result;
      };

      return flatten(this, depth);
    };
  }
};
