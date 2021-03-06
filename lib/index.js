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
    fs = require('fs'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    elastic = require('./elastic'),
    stream = require('./stream');

module.exports = varufaker;

function varufaker(conf) {
  conf = conf || {};
  config.load(conf).validate();

  config.set('templateStr', config.get('templateStr') || fs.readFileSync(config.get('template'), 'utf-8'));

  return {
    elastic: loopWith(elastic),
    stdout: loopWith(stream.bind(null, process.stdout)),
    // access conf API object directly to have stream only in the API config,
    // as convict does not allow to have functions as configurations values
    stream: loopWith(stream.bind(null, conf.stream))
  };
}
// export faker to be able to hook into our custom values and allow api usage
// customization
varufaker.faker = require('./faker');

function loopWith(writer) {
  return function() {

    logger.info('Using %s writer', writer.name);

    let writeOnce = Promise.method(writer());
    let allWentFine = true;

    return Promise.resolve(1)
        .then(function loop(count) {
          logger.info('Writing document #%d', count);
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
