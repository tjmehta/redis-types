var redis = require('redis');
var wrapRedisMethod = require('./utils/wrapRedisMethod');

module.exports = RedisKey;

function RedisKey (key, opts) {
  if (!key) {
    throw new Error('key is required');
  }
  this.key = key;
  if (opts && opts.redisClient) {
    this.redisClient = opts.redisClient;
  }
}

[
  'DEL',
  'DUMP',
  'EXISTS',
  'EXPIRE',
  'EXPIREAT',
  // 'KEYS',      // N/A
  // 'MIGRATE',   // N/A
  'MOVE',
  // 'OBJECT',    // N/A
  'PERSIST',
  'PEXPIRE',
  'PEXPIREAT',
  'PTTL',
  // 'RANDOMKEY', // N/A
  'RENAME',       // TODO: support RedisKey as arg
  'RENAMENX',     // TODO: support RedisKey as arg
  'RESTORE',
  'SET',
  'SORT',
  'TTL',
  'TYPE',
  // 'SCAN'       // N/A
].forEach(wrapRedisMethod(RedisKey));
