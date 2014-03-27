/* global window */
var Q = require('q');
var benv = require('benv');

QUnit.module('dispatching events', {
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

QUnit.test('load d3 code and get dispatch', function () {
  QUnit.equal(typeof dispatch, 'undefined', 'there is no dispatch yet');
  var dispatch = benv.require('./d3-drawing.js', 'dispatch');
  QUnit.object(dispatch, 'dispatch is an object');
});

QUnit.test('no dispatch before loading d3 code', function () {
  QUnit.equal(typeof dispatch, 'undefined', 'there is no dispatch');
});

QUnit.test('dispatch methods', function () {
  QUnit.equal(typeof dispatch, 'undefined', 'there is no dispatch yet');
  var dispatch = benv.require('./d3-drawing.js', 'dispatch');
  QUnit.func(dispatch.load, 'dispatch.load is a function');
  QUnit.func(dispatch.statechange, 'dispatch.statechange is a function');
});
