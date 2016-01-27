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

const config = require('../config'),
      es = require('./client'),
      path = require('path'),
      faker = require('../faker'),
      logger = require('../logger'),
      utils = require('../utils');

module.exports = function elastic() {
  let esClient = es();
  let index = faker.fake(config.get('esindex'));
  let type = path.parse(config.get('template')).name;

  logger.info('Writting to %s/%s with payload like %j',
      index, type, getPayload()
  );

  return writeOnce;

  ///////////////

  function writeOnce() {
    return esClient.create({
      index: index,
      type: type,
      body: getPayload()
    });
  }

  function getPayload() {
    return JSON.parse(utils.makeStringPayload());
  }
};
