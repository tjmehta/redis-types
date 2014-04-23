var util = require('util');
var RedisKey = require('./Key');
var wrapRedisMethod = require('./utils/wrapRedisMethod');

module.exports = RedisSortedSet;

function RedisSortedSet (key, opts) {
  return Key.apply(this, arguments);
}

utils.inherits(RedisSortedSet, RedisKey);

[
  "ZADD",
  "ZCARD",
  "ZCOUNT",
  "ZINCRBY",
  "ZINTERSTORE",       // TODO: make this work with multiple RedisSortedSets
  "ZLEXCOUNT",
  "ZRANGE",
  "ZRANGEBYLEX",
  "ZRANGEBYSCORE",
  "ZRANK",
  "ZREM",
  "ZREMRANGEBYLEX",
  "ZREMRANGEBYRANK",
  "ZREMRANGEBYSCORE",
  "ZREVRANGE",
  "ZREVRANGEBYSCORE",
  "ZREVRANK",
  "ZSCORE",
  "ZUNIONSTORE",      // TODO: make this work with multiple RedisSortedSets
  "ZSCAN",
].forEach(wrapRedisMethod(RedisSortedSet));


// Same without Z
[
  "ADD",
  "CARD",
  "COUNT",
  "INCRBY",
  "INTERSTORE",       // TODO: make this work with multiple RedisSortedSets
  "LEXCOUNT",
  "RANGE",
  "RANGEBYLEX",
  "RANGEBYSCORE",
  "RANK",
  "REM",
  "REMRANGEBYLEX",
  "REMRANGEBYRANK",
  "REMRANGEBYSCORE",
  "REVRANGE",
  "REVRANGEBYSCORE",
  "REVRANK",
  "SCORE",
  "UNIONSTORE",      // TODO: make this work with multiple RedisSortedSets
  "SCAN"
].forEach(function (command) {
  RedisSortedSet.prototype[command] = RedisSortedSet.prototype['Z'+command];
  var lower = command.toLowerCase();
  RedisSortedSet.prototype[lower] = RedisSortedSet.prototype['z'+lower];
});