var fs = require('fs');
var path = require('path');
var jsFile = /[.]js$/i;
var RedisKey = require('./lib/Key');

var redisTypes = module.exports = function (opts) {
  if (!opts || !opts.redisClient) {
    throw new Error('redisClient is required');
  }
  else {
    RedisKey.prototype.redisClient = opts.redisClient;
  }
  return redisTypes;
};

fs.readdirSync(path.join(__dirname, 'lib'))
  .filter(jsFiles)
  .map(basename)
  .forEach(function (filename) {
    redisTypes[filename] = require('.'+path.join('/', 'lib', filename));
  });

function jsFiles (filename) {
  return jsFile.test(filename);
}

function basename (filename) {
  return path.basename(filename, '.js');
}
