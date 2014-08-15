var util = require('util');
var RedisKey = require('./Key');
var wrapRedisMethod = require('./utils/wrapRedisMethod');

module.exports = RedisHash;

function RedisHash (key, opts) {
  return RedisKey.apply(this, arguments);
}

util.inherits(RedisHash, RedisKey);

[
  "HDEL",
  "HEXISTS",
  "HGET",
  "HGETALL",
  "HINCRBY",
  "HINCRBYFLOAT",
  "HKEYS",
  "HLEN",
  "HMGET",
  "HMSET",
  "HSET",
  "HSETNX",
  "HVALS",
  "HSCAN"
].forEach(wrapRedisMethod(RedisHash));


// Same without H
[
  // "DEL", conflict with Key.DEL
  "EXISTS",
  "GET",
  "GETALL",
  "INCRBY",
  "INCRBYFLOAT",
  "KEYS",
  "LEN",
  "MGET",
  "MSET",
  "SET",
  "SETNX",
  "VALS",
  "SCAN"
].forEach(function (command) {
  RedisHash.prototype[command] = RedisHash.prototype['H'+command];
  var lower = command.toLowerCase();
  RedisHash.prototype[lower] = RedisHash.prototype['h'+lower];
});