var Promise = require('bluebird'),
    elasticsearch = require('elasticsearch'),
    config = require('./config');



var client = new elasticsearch.Client({
  host: config.get('esurl'),
  defer: function () {
    return Promise.defer();
  }
});

module.exports = client;

