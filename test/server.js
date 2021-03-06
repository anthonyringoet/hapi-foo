var Hapi = require('hapi');
var Lab = require('lab');
var server = require('../server');
var expect = Lab.expect;
var describe = Lab.experiment;
var it = Lab.test;
var plugins = Object.keys(server.pack.list);

describe('Server', function(){

  it('should have Homepage plugin', function (done) {
    expect(plugins.indexOf('Homepage')).not.to.equal(-1);
    done();
  });

  it('should have Coffee plugin', function (done) {
    expect(plugins.indexOf('Coffee')).not.to.equal(-1);
    done();
  });

  it('should have Coffeemaker plugin', function (done) {
    expect(plugins.indexOf('Coffeemaker')).not.to.equal(-1);
    done();
  });

});
