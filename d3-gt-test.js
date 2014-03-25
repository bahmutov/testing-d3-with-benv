/* global window */
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
        $: benv.require('./bower_components/jquery/dist/jquery.js')
      });
      window.d3 = benv.require('./bower_components/d3/d3.js');
      defer.resolve();
    });
    return defer.promise;
  },
  teardown: function () {
    benv.teardown();
  }
});

QUnit.async('on mouseover calls function', function () {
  benv.require('./d3-drawing.js');

  var called = false;
  function onMouseOver() {
    called = true;
  }

  var data = [5, 10];
  window.drawBars('body', data, onMouseOver);
  _.defer(function () {
    QUnit.ok(called, 'mouse over function has been called');
    QUnit.start();
  });
});
