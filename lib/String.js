var util = require('util');
var RedisKey = require('./Key');
var wrapRedisMethod = require('./utils/wrapRedisMethod');

module.exports = RedisString;

function RedisString (key, opts) {
  return RedisKey.apply(this, arguments);
}

util.inherits(RedisString, RedisKey);

[
  "APPEND",
  "BITCOUNT",
  "BITOP",
  "BITPOS",
  "DECR",
  "DECRBY",
  "GET",
  "GETBIT",
  "GETRANGE",
  "GETSET",
  "INCR",
  "INCRBY",
  "INCRBYFLOAT",
  "MGET",
  "MSET",
  "MSETNX",
  "PSETEX",
  "SET",
  "SETBIT",
  "SETEX",
  "SETNX",
  "SETRANGE",
  "STRLEN"
].forEach(wrapRedisMethod(RedisString));