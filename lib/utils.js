'use strict';

var Promise = require('bluebird'),
    fs = require('fs-extra-promise'),
    config = require('./config'),
    faker = require('./faker');

module.exports = {
  makePayload
};

function makePayload() {
  return readTemplate()
      .then(tpl => faker.fake(tpl))
      .then(str => JSON.parse(str));
}

function readTemplate() {
  if (readTemplate.cache) {
    return Promise.resolve(readTemplate.cache);
  }
  return fs.readFileAsync(config.get('template'), 'utf-8')
      .tap(data => { readTemplate.cache = data; });

}
readTemplate.cache = null;
