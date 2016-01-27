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

var config = require('./config'),
    errors = require('./errors'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    elastic = require('./elastic'),
    stdout = require('./stdout');

module.exports = function(conf) {
  try {
    config.load(conf || {}).validate();
  } catch (err) {
    throw errors.BadConfig(err);
  }

  return {
    elastic: loopWith(elastic),
    stdout: loopWith(stdout)
  };
};

function loopWith(writer) {
  return function() {

    logger.info('Using %s writer', writer.name);

    let writeOnce = Promise.method(writer());
    let allWentFine = true;

    return Promise.resolve(1)
        .then(function loop(count) {
          logger.info('Writting document #%d', count);
          return writeOnce()
              .catch(err => {  // pass if fail
                logger.error(err);
                allWentFine = false;
              })
              .then(() => {
                if (count >= config.get('iterations')) {
                  return count;
                } else {
                  return Promise.delay(config.get('every'))
                      .then(loop.bind(null, ++count));
                }
              });
        })
        .return(allWentFine);
  };
}
