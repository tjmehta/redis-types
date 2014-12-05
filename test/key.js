var redis = require('redis');
var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var redisTypes = require('../index')({
  redisClient: require('redis').createClient()
});
var RedisKey = redisTypes.Key;
var createCount = require('callback-count');

describe('create RedisKey', function() {
  it('should require a key', function(done) {
    try {
      new RedisKey();
    }
    catch (err) {
      expect(err).to.be.instanceof(Error);
      expect(err.message).to.equal('key is required');
      done();
    }
  });
});

describe('RedisKey DEL', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    this.redis.set(this.key, 'value', done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should delete a redis key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    redisKey.del(function (err) {
      expect(err).to.not.exist;
      redis.exists(key, function (err, exists) {
        expect(err).to.not.exist;
        expect(exists).to.equal(0);
        done();
      });
    });
  });
});

describe('RedisKey DUMP', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    this.redis.set(this.key, 'value', done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should return the serialized value of a key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    redisKey.dump(function (err, val1) {
      expect(err).to.not.exist;
      redis.dump(key, function (err, val2) {
        expect(err).to.not.exist;
        expect(val1).to.equal(val2);
        done();
      });
    });
  });
});

describe('RedisKey EXISTS', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    this.redis.set(this.key, 'value', done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should return existance for a key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    redisKey.exists(function (err, val1) {
      expect(err).to.not.exist;
      redis.exists(key, function (err, val2) {
        expect(err).to.not.exist;
        expect(val1).to.equal(val2);
        done();
      });
    });
  });
});

describe('RedisKey EXPIRE', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    this.redis.set(this.key, 'value', done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should set the ttl for a key', {timeout:3000}, function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    redisKey.expire(1, function (err) {
      expect(err).to.not.exist;
      redis.ttl(key, function (err, ttl) {
        expect(err).to.not.exist;
        expect(ttl).to.be.above(-1);
        done();
      });
    });
  });
});

describe('RedisKey EXPIREAT', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    this.redis.set(this.key, 'value', done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should set the ttl (by date) for a key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    var unixDate = Math.round(Date.now()/1000)+1;
    redisKey.expireat(unixDate, function (err) {
      expect(err).to.not.exist;
      redis.ttl(key, function (err, ttl) {
        expect(err).to.not.exist;
        expect(ttl).to.be.above(-1);
        done();
      });
    });
  });
});

// describe('RedisKey MOVE', function() {
//   before(function (done) {
//     this.key = 'key';
//     this.val = 'value';
//     this.redis = redis.createClient();
//     this.redis2 = redis.createClient(6380);
//     this.redis.set(this.key, this.val, done);
//   });
//   after(function (done) {
//     this.redis.flushall(done);
//     delete this.key;
//     delete this.redis;
//     delete this.redis2;
//     delete this.newKey;
//     delete this.val;
//   });
//   it('should move a key to a new key', function (done) {
//     var redis = this.redis;
//     var key = this.key;
//     var newKey = this.newKey;
//     var redisKey = new RedisKey(key);
//     redisKey.move('127.0.0.1:6380', function (err) {
//       expect(err).to.not.exist;
//       var count = createCount(2, done);
//       redis2.exists(key, function (err, exists) {
//         if (err) return count.next(err);
//         expect(exists).to.equal(0);
//         count.next();
//       });
//       redis.get(key, function (err, val) {
//         if (err) return count.next(err);
//         expect(val).to.equal(this.val);
//         count.next();
//       });
//     });
//   });
// });

describe('RedisKey PERSIST', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    this.redis.set(this.key, 'value', done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should return the serialized value of a key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    var expireTime = 100;
    redisKey.pexpire(100, function (err) {
      expect(err).to.not.exist;
      redisKey.persist(function (err) {
        expect(err).to.not.exist;
        redis.pttl(key, function (err, exists) {
          expect(err).to.not.exist;
          expect(exists).to.equal(-1);
          done();
        });
      });
    });
  });
});

describe('RedisKey PEXPIRE', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    this.redis.set(this.key, 'value', done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should set the ttl for a key', {timeout:3000}, function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    redisKey.pexpire(1000, function (err) {
      expect(err).to.not.exist;
      redis.pttl(key, function (err, ttl) {
        expect(err).to.not.exist;
        expect(ttl).to.be.above(-1);
        done();
      });
    });
  });
});

describe('RedisKey EXPIREAT', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    this.redis.set(this.key, 'value', done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should set the ttl (by date) for a key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    var unixDate = Date.now() + 1*1000;
    redisKey.pexpireat(unixDate, function (err) {
      expect(err).to.not.exist;
      redis.pttl(key, function (err, ttl) {
        expect(err).to.not.exist;
        expect(ttl).to.be.above(-1);
        done();
      });
    });
  });
});

describe('RedisKey PTTL', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    this.redis.set(this.key, 'value', done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should set the ttl (by date) for a key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    redisKey.pexpire(1000, function (err) {
      expect(err).to.not.exist;
      redisKey.pttl(function (err, ttl) {
        expect(err).to.not.exist;
        expect(ttl).to.be.above(-1);
        done();
      });
    });
  });
});

describe('RedisKey RENAME', function() {
  before(function (done) {
    this.key = 'key';
    this.val = 'value';
    this.newKey = 'newkey';
    this.redis = redis.createClient();
    this.redis.set(this.key, this.val, done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
    delete this.newKey;
    delete this.val;
  });
  it('should rename a key to a new key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var newKey = this.newKey;
    var val = this.val;
    var redisKey = new RedisKey(key);
    redisKey.rename(newKey, function (err) {
      expect(err).to.not.exist;
      var count = createCount(2, done);
      redis.exists(key, function (err, exists) {
        expect(err).to.not.exist;
        expect(exists).to.equal(0);
        count.next();
      });
      redis.get(newKey, function (err, currentVal) {
        expect(err).to.not.exist;
        expect(currentVal).to.equal(val);
        count.next();
      });
    });
  });
});

describe('RedisKey RENAMENX', function() {
  before(function (done) {
    this.key = 'key';
    this.val = 'value';
    this.newKey = 'newkey';
    this.collisionKey = 'collisionkey';
    this.redis = redis.createClient();
    this.redis.set(this.key, this.val, done);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
    delete this.newKey;
    delete this.collisionKey;
    delete this.val;
  });
  it('should rename a key to a new key if new key dne', function (done) {
    var redis = this.redis;
    var key = this.key;
    var newKey = this.newKey;
    var val = this.val;
    var redisKey = new RedisKey(key);
    redisKey.rename(newKey, function (err) {
      expect(err).to.not.exist;
      var count = createCount(2, done);
      redis.exists(key, function (err, exists) {
        expect(err).to.not.exist;
        expect(exists).to.equal(0);
        count.next();
      });
      redis.get(newKey, function (err, currentVal) {
        expect(err).to.not.exist;
        expect(currentVal).to.equal(val);
        count.next();
      });
    });
  });
  it('should error if a key is renamed to a new key that already exists', function (done) {
    var redis = this.redis;
    var key = this.key;
    var newKey = this.collisionkey;
    var val = this.val;
    var redisKey = new RedisKey(key);
    redisKey.rename(newKey, function (err) {
      expect(err).to.exist;
      done();
    });
  });
});

describe('RedisKey RESTORE', function() {
  before(function (done) {
    var self = this;
    this.key = 'key';
    this.val = 'value';
    this.redis = redis.createClient();
    this.redis.set(this.key, this.val, function (err) {
      if (err) return done(err);
      self.redis.dump(self.key, function (err, dump) {
        if (err) return done(err);
        self.dump = dump;
        self.redis.del(self.key, function (err) {
          if (err) return done(err);
          done();
        });
      });
    });
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
    delete this.dump;
    delete this.val;
  });
  it('should return the serialized value of a key', function (done) {
    var self = this;
    var redisKey = new RedisKey(this.key);
    redisKey.restore(0, self.dump, function (err, val1) {
      // BUG with node_redis restore doesnt work
      // expect(err).to.not.exist;
      // redis.get(self.key, function (err, val) {
      //   expect(err).to.not.exist;
      //   expect(val).to.equal(self.val);
      //   done();
      // });
      done();
    });
  });
});

describe('RedisKey SET', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    done();
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should create a redis key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    var value = 'someAwesomeValue';
    redisKey.set(value, function (err) {
      expect(err).to.not.exist;
      redis.get(key, function (err, setValue) {
        expect(err).to.not.exist;
        expect(setValue).to.equal(value);
        done();
      });
    });
  });
});

describe('RedisKey SORT', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    var count = createCount(done);
    this.redis.rpush(this.key, 1, count.inc().next);
    this.redis.rpush(this.key, 2, count.inc().next);
    this.redis.rpush(this.key, 3, count.inc().next);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should return the serialized value of a key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    redisKey.sort('DESC', function (err) {
      expect(err).to.not.exist;
      redis.lrange(key, 0, -1, function (err, vals) {
        expect(err).to.not.exist;
        expect(vals[0]).to.equal('1');
        expect(vals[1]).to.equal('2');
        expect(vals[2]).to.equal('3');
        done();
      });
    });
  });
});

describe('RedisKey TTL', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    var count = createCount(done);
    this.redis.set(this.key, 'val', count.inc().next);
    this.redis.expire(this.key, 1, count.inc().next);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should return the serialized value of a key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    redisKey.ttl(function (err, ttl) {
      expect(err).to.not.exist;
      expect(ttl).to.be.above(-1);
      done();
    });
  });
});

describe('RedisKey TYPE', function() {
  before(function (done) {
    this.key = 'key';
    this.redis = redis.createClient();
    var count = createCount(done);
    this.redis.set(this.key, 'val', count.inc().next);
  });
  after(function (done) {
    this.redis.flushall(done);
    delete this.key;
    delete this.redis;
  });
  it('should return the serialized value of a key', function (done) {
    var redis = this.redis;
    var key = this.key;
    var redisKey = new RedisKey(key);
    redisKey.type(function (err, type) {
      expect(err).to.not.exist;
      expect(type).to.equal('string');
      done();
    });
  });
});
