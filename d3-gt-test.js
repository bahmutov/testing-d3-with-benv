var Q = require('q');
var benv = require('benv');
var _ = require('lodash');

QUnit.module('d3-drawing.js', {
  setupOnce: function () {
    console.log('please wait a couple of seconds, instrumenting D3 and jQuery takes time');
  },
  setup: function () {
    var defer = Q.defer();
    benv.setup(function () {
      benv.expose({
        $: require('./bower_components/jquery/dist/jquery.js'),
        d3: require('./bower_components/d3/d3.js')
      });
      defer.resolve();
    });
    return defer.promise;
  },
  teardown: function () {
    benv.teardown();
  }
});

QUnit.async('draws 20 bars', function () {
  require('./d3-drawing.js');
  // allows D3 registered in $(fn ...) to run
  _.defer(function () {
    // we have loaded jQuery under $ symbol and can use it in unit tests!
    QUnit.equal($('div.bar').length, 20, 'D3 created 20 div bars');
    QUnit.start();
  });
});
