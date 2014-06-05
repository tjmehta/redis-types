var util = require('util');
var RedisKey = require('./Key');
var wrapRedisMethod = require('./utils/wrapRedisMethod');

module.exports = RedisSet;

function RedisSet (key, opts) {
  return Key.apply(this, arguments);
}

util.inherits(RedisSet, RedisKey);

[
  "SADD",
  "SCARD",
  "SDIFF",       // TODO: make this work with multiple RedisSets
  "SDIFFSTORE",  // TODO: make this work with multiple RedisSets
  "SINTER",      // TODO: make this work with multiple RedisSets
  "SINTERSTORE", // TODO: make this work with multiple RedisSets
  "SISMEMBER",
  "SMEMBERS",
  "SMOVE",       // TODO: make this work with multiple RedisSets
  "SPOP",
  "SRANDMEMBER",
  "SREM",
  "SUNION",      // TODO: make this work with multiple RedisSets
  "SUNIONSTORE", // TODO: make this work with multiple RedisSets
  "SSCAN"
].forEach(wrapRedisMethod(RedisSet));


// Same without S
[
  "ADD",
  "CARD",
  "DIFF",       // TODO: make this work with multiple RedisSets
  "DIFFSTORE",  // TODO: make this work with multiple RedisSets
  "INTER",      // TODO: make this work with multiple RedisSets
  "INTERSTORE", // TODO: make this work with multiple RedisSets
  "ISMEMBER",
  "MEMBERS",
  "MOVE",       // TODO: make this work with multiple RedisSets
  "POP",
  "RANDMEMBER",
  "REM",
  "UNION",      // TODO: make this work with multiple RedisSets
  "UNIONSTORE", // TODO: make this work with multiple RedisSets
  "SCAN"
].forEach(function (command) {
  RedisSet.prototype[command] = RedisSet.prototype['S'+command];
  var lower = command.toLowerCase();
  RedisSet.prototype[lower] = RedisSet.prototype['s'+lower];
});