
var nodeSeedFactory = require('../');

describe('A NodeSeed project', function() {
  var nodeSeed;
  beforeEach(function() {
    nodeSeed = nodeSeedFactory();
  });

  it('should have a functionality', function() {
    expect(nodeSeed).to.respondTo('functionality');
  });
});
