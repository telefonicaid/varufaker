
var functionality = require('../lib/elastic'),
    config = require('../lib/config');

describe('A functionality', function() {

  it('should work for users', function(done) {
    functionality(function(err, data) {
      expect(data).to.be.equals('OK');
      done(err);
    });
  });

  it('should not work for admins', function(done) {
    sandbox.stub(config, 'get').withArgs('user').returns('admin');
    functionality(function(err) {
      expect(err).to.match(/NODESEED.NotAllowed/);
      done();
    });
  });

});
