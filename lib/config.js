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

var convict = require('convict'),
    findRoot = require('find-root'),
    path = require('path');

var conf = module.exports = convict({
  every: {
    doc: 'The delay between writes (milliseconds)',
    default: 1000,
    format: 'duration',
    env: 'VA_EVERY',
    arg: 'every'
  },
  iterations: {
    doc: 'The number of traces to write',
    default: 100,
    format: 'nat',
    env: 'VA_ITERATIONS',
    arg: 'iterations'
  },
  template: {
    doc: 'Path to the template trace to write (see https://github.com/marak/Faker.js/)',
    default: path.join(__dirname, '..', 'lib', 'templates', 'tid.tpl'),
    format: String,
    env: 'VA_TEMPLATE',
    arg: 'template'
  },
  templateStr: {
    doc: 'String with the template trace to write (see https://github.com/marak/Faker.js/)',
    default: '',
    format: String
  },
  stream: {
    doc: 'A Node Stream to write to (API usage only only)',
    default: {write: function() {}},
    format: function(stream) {
      if (!isFunction(stream.write)) {
        throw new Error('must be an object with a write function');
      }
    }
  },
  esurl: {
    doc: 'The Elastic Search endpoint (add your user pass if Shield is enabled)',
    default: 'http://localhost:9200',
    format: 'url',
    env: 'VA_ESURL',
    arg: 'esurl'
  },
  esindex: {
    doc: 'The ElasticSearch index to write to (faker format supported)',
    default: `${require(path.join(findRoot(__dirname), 'package.json')).name}-{{tid.yyyymmdd}}`,
    format: String,
    env: 'VA_ESINDEX',
    arg: 'esindex'
  },
  verbose: {
    doc: 'Write debug info to the stderr',
    default: false,
    format: Boolean,
    env: 'VA_VERBOSE',
    arg: 'verbose'
  }
});

try {
  //Specify your configuration file
  conf.loadFile('config.json');
} catch (err) {
  //Do nothing
}

////////

//http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
