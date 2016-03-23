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
    logger = require('logops'),
    therror = require('therror');

logger.format = logger.formatters.dev;
logger.stream = {
  write(str) {
    if (config.get('verbose')) {
      process.stderr.write(str, 'utf-8');
    }
  }
};

// Subscribe to every therror error creations, and log them
// (if it has an error.level property)
therror.on('create', function onError(err) {
  logger[err.level] && logger[err.level](err);
});

module.exports = logger;
