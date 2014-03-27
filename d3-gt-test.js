/* global window */
var Q = require('q');
var benv = require('benv');

QUnit.module('d3-drawing.js', {
  setup: function () {
    var defer = Q.defer();
    benv.setup(function () {
      window.d3 = benv.require('./bower_components/d3/d3.js');
      defer.resolve();
    });
    return defer.promise;
  },
  teardown: function () {
    benv.teardown();
  }
});

QUnit.test('try loading drawing code twice', function () {
  QUnit.raises(function () {
    benv.require('./d3-drawing.js');
    benv.require('./d3-drawing.js');
  }, Error, 'cannot load drawing code second time');
});
