/**
 * @license
 * Copyright 2015 Telefónica I+D
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const faker = require('faker'),
      config = require('./config'),
      moment = require('moment'),
      _ = require('lodash');

const LEVELS = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'],
      DEPLOYMENT_GROUPS = ['canary', 'latest'];

let trans,corr;

makeTransCorr();
setInterval(makeTransCorr, config.get('every') * 3).unref();

faker.tid = {
  corr() {
    return corr;
  },

  trans() {
    return trans;
  },

  time() {
    return new Date().toJSON();
  },

  lvl() {
    return _.sample(LEVELS);
  },

  deploymentGroup() {
    return _.sample(DEPLOYMENT_GROUPS);
  },

  yyyymmdd() {
    return faker.tid.formattedDate('YYYY.MM.DD', 'past', true);
  },

  formattedDate(format, mode, api) {
    if (!api) {
      [format, mode] = Array.from(arguments)[0].split(',').map(s => s.trim());
    }
    return moment(faker.date[mode]()).format(format);
  },

  date() {
    return faker.tid.formattedDate('YYYYMMDD', 'future', true);
  },

  datetime() {
    return faker.tid.formattedDate('YYYYMMDDHHmmss', 'future', true);
  },

  float(min, max, precision) {
    if (typeof arguments[0] === 'string') {
      [min, max, precision] = Array.from(arguments)[0].split(',').map(s => s.trim());
    }
    precision = parseInt(precision) || 0;
    min = parseInt(min);
    max = parseInt(max);

    return (Math.random() * (max - min) + min).toFixed(precision);
  },

  bit() {
    return Math.round(Math.random());
  }
};

module.exports = faker;

/////////

function makeTransCorr() {
  trans = faker.random.uuid();
  corr = _.random(0, 1) === 0 ? trans : faker.random.uuid();
}
