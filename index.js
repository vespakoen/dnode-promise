module.exports = function (promiseMethods) {
  var dnodeMethods = {};
  Object.keys(promiseMethods).forEach(function (methodName) {
    dnodeMethods[methodName] = function () {
      var args = Array.prototype.slice.apply(arguments, [0, -1]);
      var cb = arguments[arguments.length - 1];
      var res = promiseMethods[methodName].apply(promiseMethods, args);
      if (res.then) {
        res.then(function (result) {
          cb(result);
        });
      }
    }
  });
  return dnodeMethods;
};
