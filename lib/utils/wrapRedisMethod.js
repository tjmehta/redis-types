module.exports = function (Class) {
  return function (command) {
    Class.prototype[command] = Class.prototype[command.toLowerCase()] = function (/* args */) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(this.key);
      if (!this.redisClient) {
        throw new Error('redis-types requires a redisClient');
      }
      this.redisClient[command].apply(this.redisClient, args);
      return this;
    };
  };
};
