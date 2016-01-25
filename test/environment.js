var sinon = require ('sinon'),
  chai = require ('chai'),
  sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.expect = chai.expect;

beforeEach(function(){
  global.sandbox = sinon.sandbox.create();
});

afterEach(function(){
  global.sandbox.restore();
});

process.stderr.write = function() {};
process.stdout.write = function() {};
