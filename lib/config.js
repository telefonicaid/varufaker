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
    path = require('path');

var conf = module.exports = convict({
  esurl: {
    doc: 'The Elastic Search endpoint',
    default: 'http://localhost:9200',
    format: 'url',
    env: 'IF_ESURL',
    arg: 'esurl'
  },
  token: {
    doc: 'The Iris token',
    default: '9b010b1f-e8fc-4afd-9a1b-31b2572d38fb"',
    format: String,
    env: 'IF_TOKEN',
    arg: 'token'
  },
  every: {
    doc: 'The delay between writes (milliseconds or a human readable string (e.g. 3000, "5 days"))',
    default: 1000,
    format: 'duration',
    env: 'IF_EVERY',
    arg: 'every'
  },
  iterations: {
    doc: 'The number of traces to write',
    default: 100,
    format: 'nat',
    env: 'IF_ITERATIONS',
    arg: 'iterations'
  },
  template: {
    doc: 'The template trace to write (see https://github.com/marak/Faker.js/)',
    default: path.join(__dirname, '..', 'lib', 'templates', 'tid.tpl' ),
    format: String,
    env: 'IF_TEMPLATE',
    arg: 'template'
  }
});

try {
  //Specify your configuration file
  conf.loadFile('config.json');
} catch (err) {
  //Do nothing
}
