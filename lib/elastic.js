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
    Promise = require('bluebird'),
    es = require('./es'),
    faker = require('./faker'),
    logger = require('./logger'),
    utils = require('./utils');

module.exports = write;

/////////

function write(cb) {
  return Promise.resolve(1)
      .then(function loop(count) {
        logger.info('Writting document #%d', count);
        return writeOnce()
            .catch(err => logger.error(err)) // pass if fail
            .then(() => {
              if (count >= config.get('iterations')) {
                return count;
              }
              else {
                return Promise.delay(config.get('every'))
                    .then(loop.bind(null, ++count));
              }
            });
      })
      .catch(cb);
}

function writeOnce() {
  return utils.makePayload()
      .tap(obj => logger.debug(obj, 'Document'));
}

