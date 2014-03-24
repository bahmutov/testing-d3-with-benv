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
        $: require('./bower_components/jquery/dist/jquery.js')
      });
      window.d3 = require('./bower_components/d3/d3.js');
      defer.resolve();
    });
    return defer.promise;
  },
  teardown: function () {
    benv.teardown();
  }
});

QUnit.test('window', function () {
  QUnit.equal(typeof window, 'object', 'window exists');
});

QUnit.test('jQuery $', function () {
  QUnit.equal(typeof $, 'function', '$ exists');
});

QUnit.test('window.d3', function () {
  QUnit.equal(typeof window.d3, 'object', 'window.d3 exists');
});

QUnit.async('draws 20 bars', function () {
  // load d3-drawing.js and avoid caching by the node runtime
  benv.require('./d3-drawing.js');
  QUnit.equal(typeof window.drawBars, 'function', 'drawBars function registered');
  window.drawBars('body', [5, 10]);

  // allows D3 logic to run
  _.defer(function () {
    QUnit.equal($('div.bar').length, 2, 'D3 created 2 div bars');
    console.log($('body').html());
    var bar1 = $('div.bar')[0];
    var bar2 = $('div.bar')[1];
    // console.log('bar1', bar1);
    var w1 = +$(bar1).attr('width');
    var w2 = +$(bar2).attr('width');
    QUnit.ok(w1 > 0, 'bars have positive width', w1);
    QUnit.equal(w1, w2, 'bars have equal width', w1, w2);
    QUnit.start();
  });
});
