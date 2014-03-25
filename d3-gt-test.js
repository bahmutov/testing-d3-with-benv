/* global window */
var Q = require('q');
var benv = require('benv');

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

QUnit.test('tooltip function', function () {
  benv.require('./d3-drawing.js');

  var data = [5, 10];
  var tooltipCount = 0;
  function tooltipFn(d, k) {
    tooltipCount += 1;
    console.assert(typeof k === 'number', '1: k is not a number ' + k);
    console.assert(d === data[k], '1: invalid data to tooltip function ' + k);
    return String(d);
  }

  window.drawBars('body', data, tooltipFn);
  QUnit.equal(tooltipCount, data.length, 'tooltip function called correct number of times');
});

QUnit.test('tooltip function with 3 bars', function () {
  benv.require('./d3-drawing.js');

  var data = [5, 10, 11];
  var tooltipCount = 0;
  function tooltipFn2(d, k) {
    tooltipCount += 1;
    console.assert(typeof k === 'number', 'k is not a number ' + k);
    console.assert(d === data[k], 'invalid data to tooltip function ' + k);
    return String(d);
  }

  window.drawBars('body', data, tooltipFn2);
  QUnit.equal(tooltipCount, data.length, 'tooltip function called correct number of times');
});
