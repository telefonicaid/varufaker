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

const Promise = require('bluebird'),
      elasticsearch = require('elasticsearch'),
      logger = require('../logger'),
      config = require('../config');

module.exports = function elasticClient() {
  return new elasticsearch.Client({
    host: config.get('esurl'),
    defer: () => Promise.defer(),
    log: LogToLogops
  });
};

//////////////

function LogToLogops() {
  // config is the object passed to the client constructor.
  this.error = logger.error;
  this.warning = logger.warn;
  this.info = logger.info;
  this.debug = logger.debug;
  this.trace = function(method, requestUrl, body, responseBody, responseStatus) {
    logger.debug({
      method: method,
      requestUrl: requestUrl,
      body: body,
      responseBody: responseBody,
      responseStatus: responseStatus
    });
  };
  this.close = function() {};
}

