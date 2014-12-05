redis-types
===========

redis type objects - hashes, lists, sets, etc

## Installation

```js
npm install redis-types
```

## Usage

Uses [redis node module](https://github.com/mranney/node_redis) under the hood.
Syntax is identical except that the redis-key is specified through the constructor.

### Key

* SET
* DEL
* DUMP
* EXISTS
* EXPIRE
* EXPIREAT
* MOVE
* PERSIST
* PEXPIRE
* PEXPIREAT
* PTTL
* RENAME
* RENAMENX
* RESTORE
* SORT
* TTL
* TYPE
* Lowercase works too

```js
var RedisKey = require('redis-types').Key;
var redisKey = new RedisKey('foo');
redisKey.del(function (err, success) {
  // ...
});
```

### Strings

* Inherits from Keys
* APPEND
* BITCOUNT
* BITOP
* BITPOS
* DECR
* DECRBY
* GET
* GETBIT
* GETRANGE
* GETSET
* INCR
* INCRBY
* INCRBYFLOAT
* MGET
* MSET
* MSETNX
* PSETEX
* SET
* SETBIT
* SETEX
* SETNX
* SETRANGE
* STRLEN
* Lowercase works too

```js
var RedisString = require('redis-types').String;
var redisString = new RedisString('foo');
redisString.set('bar', function (err, success) {
  // ...
});
```

### Lists

* Inherits from Keys
* BLPOP
* BRPOP
* BRPOPLPUSH
* LINDEX, INDEX
* LINSERT, INSERT
* LLEN, LEN
* LPOP
* LPUSH
* LPUSHX
* LRANGE
* LREM
* LSET, SET
* LTRIM
* RPOP
* RPOPLPUSH
* RPUSH
* RPUSHX
* Lowercase works too

```js
var RedisList = require('redis-types').RedisList;
var fooList = new RedisList('foo');
fooList.rpush("1", function (err) {
  fooList.rpush("2", function (err) {
    fooList.rpush("3", function (err) {
      fooList.lrange(0, -1, function (err, items) {
        console.log(items); // ["1", "2", "3"]
      });
    });
  });
});
```

### Hashes

* Inherits from Keys
* HDEL, DEL
* HEXISTS, EXISTS
* HGET, GET
* HGETALL, GETALL
* HINCRBY, INCRBY
* HINCRBYFLOAT, INCRBYFLOAT
* HKEYS, KEYS
* HLEN, LEN
* HMGET, MGET
* HMSET, MSET
* HSET, SET
* HSETNX, SETNX
* HVALS, VALS
* HSCAN, SCAN
* Lowercase works too

```js
var RedisHash = require('redis-types').RedisHash;
var fooHash = new RedisHash('foo');
fooHash.hset("bar", "1", function (err) {
  fooList.hget("bar", function (err, val) {
    console.log(val); // "1"
  });
});
```

### Set

* Inherits from Keys
* SADD, ADD
* SCARD, CARD
* SDIFF, DIFF
* SDIFFSTORE, DIFFSTORE
* SINTER, INTER
* SINTERSTORE, INTERSTORE
* SISMEMBER, ISMEMBER
* SMEMBERS, MEMBERS
* SMOVE, MOVE
* SPOP, POP
* SRANDMEMBER, RANDMEMBER
* SREM, REM
* SUNION, UNION
* SUNIONSTORE, UNIONSTORE
* SSCAN, SCAN
* Lowercase works too

```js
var RedisSet = require('redis-types').RedisSet;
var fooSet = new RedisSet('foo');
fooSet.sadd("1", function (err) {
  fooSet.spop(function (err, val) {
    console.log(val); // "1"
  });
});
```

### SortedSet

* Inherits from Keys
* ZADD, ADD
* ZCARD, CARD
* ZCOUNT, COUNT
* ZINCRBY, INCRBY
* ZINTERSTORE, INTERSTORE
* ZLEXCOUNT, LEXCOUNT
* ZRANGE, RANGE
* ZRANGEBYLEX, RANGEBYLEX
* ZRANGEBYSCORE, RANGEBYSCORE
* ZRANK, RANK
* ZREM, REM
* ZREMRANGEBYLEX, REMRANGEBYLEX
* ZREMRANGEBYRANK, REMRANGEBYRANK
* ZREMRANGEBYSCORE, REMRANGEBYSCORE
* ZREVRANGE, REVRANGE
* ZREVRANGEBYSCORE, REVRANGEBYSCORE
* ZREVRANK, REVRANK
* ZSCORE, SCORE
* ZUNIONSTORE, UNIONSTORE
* ZSCAN, SCAN
* Lowercase works too

```js
var RedisSortedSet = require('redis-types').RedisSortedSet;
var fooSortedSet = new RedisSortedSet('foo');
fooSortedSet.zadd("1", function (err) {
  fooSortedSet.zrange(0, -1, function (err, items) {
    console.log(items); // ["1"]
  });
});
```

### Pub/Sub

Not yet implemented

## License
MIT
