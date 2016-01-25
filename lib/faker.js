'use strict';

var faker = require('faker'),
    _ = require('lodash');

var levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'],
    deployment_groups = ['canary', 'latest'];

faker.tid = {
  time() {
    return faker.date.past().toJSON();
  },

  lvl() {
    return _.sample(levels);
  },

  deployment_group() {
    return _.sample(deployment_groups);
  }
};
module.exports = faker;

