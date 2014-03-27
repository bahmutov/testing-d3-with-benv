/* global window */
var Q = require('q');
var benv = require('benv');
var _ = require('lodash');

QUnit.module('d3-drawing.js', {
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

QUnit.test('try load drawing code twice', function () {
  QUnit.raises(function () {
    benv.require('./d3-drawing.js');
    benv.require('./d3-drawing.js');
  }, Error, 'cannot load drawing code second time');
});

QUnit.test('background color', function () {
  benv.require('./d3-drawing.js');
  var data = [5, 10];
  window.drawBars('body', data);

  var firstBar = $('div.bar')[0];
  var color = $(firstBar).css('background-color');
  QUnit.equal(color, 'teal', 'correct background color');
});

QUnit.async('on mouseover calls function', function () {
  benv.require('./d3-drawing.js');

  var called = false;
  function onMouseOver() {
    called = true;
    window.d3.select(this).style('background-color', 'red');
  }

  var data = [5, 10];
  window.drawBars('body', data, onMouseOver);

  var evt = window.document.createEvent('MouseEvents');
  QUnit.ok(evt, 'created mouse event');

  // https://developer.mozilla.org/en-US/docs/Web/API/event.initMouseEvent
  evt.initMouseEvent('mouseover', true, true, window,
    0, 0, 0, 5, 5,
    false, false, false, false, 0, null);

  $('div.bar')[0].dispatchEvent(evt);

  _.defer(function () {
    QUnit.ok(called, 'mouse over function has been called');
    var color = $($('div.bar')[0]).css('background-color');
    QUnit.equal(color, 'red', 'background color has been changed');
    QUnit.start();
  });
});
