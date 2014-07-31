module.exports = function (Class) {
  return function (command) {
    Class.prototype[command] = Class.prototype[command.toLowerCase()] = function (/* args */) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(this.key);
      this.redisClient[command].apply(this.redisClient, args);
      return this;
    };
  };
};