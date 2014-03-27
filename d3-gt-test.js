/* global window */
var Q = require('q');
var benv = require('benv');

QUnit.module('d3-drawing.js', {
  setup: function () {
    var defer = Q.defer();
    benv.setup(function () {
      benv.expose({
        // using jQuery makes selections simple
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

QUnit.test('window', function () {
  QUnit.equal(typeof window, 'object', 'window exists');
});

QUnit.test('jQuery $', function () {
  QUnit.equal(typeof $, 'function', '$ exists');
});

QUnit.test('window.d3', function () {
  QUnit.equal(typeof window.d3, 'object', 'window.d3 exists');
});

QUnit.test('window.drawBars', function () {
  // load d3-drawing.js and avoid caching by the node runtime
  benv.require('./d3-drawing.js');
  QUnit.equal(typeof window.drawBars, 'function', 'drawBars function registered');
});

QUnit.test('draws a bar for each value', function () {
  benv.require('./d3-drawing.js');
  window.drawBars('body', [5, 10]);
  QUnit.equal($('div.bar').length, 2, 'D3 created 2 div bars');
});

QUnit.test('draws bars with same width', function () {
  benv.require('./d3-drawing.js');
  window.drawBars('body', [5, 10]);
  var bar1 = $('div.bar')[0];
  var bar2 = $('div.bar')[1];
  var w1 = +$(bar1).attr('width');
  var w2 = +$(bar2).attr('width');
  QUnit.ok(w1 > 0, 'bars have positive width', w1);
  QUnit.equal(w1, w2, 'bars have equal width', w1, w2);
});

QUnit.test('draws bars with proportional height', function () {
  benv.require('./d3-drawing.js');
  window.drawBars('body', [5, 10]);

  var bar1 = $('div.bar')[0];
  var bar2 = $('div.bar')[1];
  // parse height from style (includes px suffix)
  var h1 = parseInt($(bar1).css('height'), 10);
  var h2 = parseInt($(bar2).css('height'), 10);
  QUnit.equal(h1 * 2, h2, 'first bar should be half in height');
});

QUnit.test('trying to call without data', function () {
  QUnit.raises(function () {
    benv.require('./d3-drawing.js');
    window.drawBars('body');
  }, 'Error', 'Raises error without data');
});
