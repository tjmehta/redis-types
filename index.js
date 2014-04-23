var fs = require('fs');
var path = require('path');

var redisTypes = module.exports = {};

fs.readdirSync(path.join(__dirname, 'lib'))
  .filter(ignored)
  .forEach(function (filename) {
    redisTypes[filename] = require(path.join('./lib', filename));
  });


function ignored (filename) {
  var ignore = ['utils'];
  return !~ignore.indexOf(filename);
}