var util = require('util');
var RedisKey = require('./Key');
var wrapRedisMethod = require('./utils/wrapRedisMethod');

module.exports = RedisList;

function RedisList (key, opts) {
  return RedisKey.apply(this, arguments);
}

util.inherits(RedisList, RedisKey);

[
  "BLPOP",
  "BRPOP",
  "BRPOPLPUSH",
  "LINDEX",
  "LINSERT",
  "LLEN",
  "LPOP",
  "LPUSH",
  "LPUSHX",
  "LRANGE",
  "LREM",
  "LSET",
  "LTRIM",
  "RPOP",
  "RPOPLPUSH", // TODO: make this work with two RedisLists
  "RPUSH",
  "RPUSHX",
].forEach(wrapRedisMethod(RedisList));

// Same without L
[
  "INDEX",
  "INSERT",
  "LEN",
  "REM",
  "SET"
].forEach(function (command) {
  RedisList.prototype[command] = RedisList.prototype['L'+command];
  var lower = command.toLowerCase();
  RedisList.prototype[lower] = RedisList.prototype['l'+lower];
});