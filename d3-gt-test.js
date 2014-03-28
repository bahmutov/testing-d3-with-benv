/* global window */
var Q = require('q');
var benv = require('benv');
var read = require('fs').readFileSync;
var beautify = require('js-beautify').html;
var _ = require('lodash');

var groups = [
  'Under 5 Years',
  '5 to 13 Years',
  '14 to 17 Years',
  '18 to 24 Years',
  '25 to 44 Years',
  '45 to 64 Years',
  '65 Years and Over'
];
var data = read('data.csv', 'utf8');

function type(d) {
  d.total = window.d3.sum(groups, function (k) { return d[k] = +d[k]; });
  return d;
}

function loadData() {
  var states = window.d3.csv.parse(data, type);
  var stateById = window.d3.map();
  states.forEach(function (d) { stateById.set(d.id, d); });
  return stateById;
}

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

QUnit.test('CSV file load', function () {
  // cannot use d3.csv directly (no XMLHttpRequest)
  var states = window.d3.csv.parse(data);
  QUnit.equal(states.length, 51, 'loaded 50 states + Washington, D.C.');
});

QUnit.test('CSV file load and sum', function () {
  var states = window.d3.csv.parse(read('data.csv', 'utf8'), type);
  QUnit.equal(typeof states[0].total, 'number', 'first state has total');
});

QUnit.test('dispatch load.menu', function () {
  var states = window.d3.csv.parse(data, type);
  var stateById = window.d3.map();
  states.forEach(function (d) { stateById.set(d.id, d); });

  var dispatch = benv.require('./d3-drawing.js', 'dispatch');
  dispatch.load(stateById, groups);

  var select = window.d3.select('select');
  var options = select[0][0];
  QUnit.equal(options.length, Object.keys(stateById).length,
    'each state has been added to select drop down');
});

QUnit.test('pie chart', function () {
  var stateById = loadData();
  var dispatch = benv.require('./d3-drawing.js', 'dispatch');
  dispatch.load(stateById, groups);
  var pie = window.d3.select('svg#pie');
  var paths = pie.selectAll('path.age-arc')[0];
  QUnit.equal(paths.length, groups.length,
    'a piece of the pie for each age group');
});

QUnit.test('number of kids in MA under 5', function () {
  var expectedNumber = 383568; // from data.csv
  var stateById = loadData();
  var dispatch = benv.require('./d3-drawing.js', 'dispatch');
  dispatch.load(stateById, groups);
  dispatch.statechange(stateById.get('MA'));

  var pie = window.d3.select('svg#pie');
  var paths = pie.selectAll('path.age-arc')[0];
  var kidPath = paths[0];
  var kidData = kidPath.__data__;
  QUnit.object(kidData, 'expected to find __data__ object');
  QUnit.equal(kidData.value, expectedNumber,
    'correct number of children in MA pie chart');
});

QUnit.async('transition from MA to NY', function () {
  var stateById = loadData();
  var dispatch = benv.require('./d3-drawing.js', 'dispatch');
  dispatch.load(stateById, groups);
  dispatch.statechange(stateById.get('MA'));
  _.defer(function () {
    dispatch.statechange(stateById.get('NY'));
    var expectedNumber = 1208495; // from data.csv
    var pie = window.d3.select('svg#pie');
    var paths = pie.selectAll('path.age-arc')[0];
    var kidPath = paths[0];
    var kidData = kidPath.__data__;
    QUnit.object(kidData, 'expected to find __data__ object');
    QUnit.equal(kidData.value, expectedNumber,
      'correct number of children in NY pie chart');
    QUnit.start();
  });
});
