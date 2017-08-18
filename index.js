module.exports = {
  toDnode: function (promiseMethods) {
    var dnodeMethods = {};
    Object.keys(promiseMethods).forEach(function (methodName) {
      dnodeMethods[methodName] = function () {
        var args = Array.prototype.slice.call(arguments, 0, -1);
        var cb = arguments[arguments.length - 1];
        var res = promiseMethods[methodName].apply(promiseMethods, args);
        if (res && res.catch){
          res.catch(function(error){
            cb(error)
          })
        }
        if (res && res.then) {
          res.then(function (result) {
            cb(result);
          });
        } else {
          cb(res);
        }
      }
    });
    return dnodeMethods;
  },
  toPromise: function (dnodeMethods, PromiseImplementation) {
    if ( ! PromiseImplementation) {
      var PromiseImplementation = Promise;
    }
    var promiseMethods = {};
    Object.keys(dnodeMethods).forEach(function (methodName) {
      promiseMethods[methodName] = function () {
        var args = Array.prototype.slice.call(arguments, 0, arguments.length);
        return new PromiseImplementation(function (resolve, reject) {
          args.push(resolve);
          args.push(reject);
          dnodeMethods[methodName].apply(dnodeMethods, args);
        });
      }
    });
    return promiseMethods;
  }
};
