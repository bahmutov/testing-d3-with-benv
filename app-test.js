/* global window, require, describe, beforeEach, afterEach, it */
var benv = require('benv');
/* jshint -W098 */
var should = require('should');

describe('without benv setup', function () {
  it('fails to find jQuery', function () {
    (function () {
      require('./app.js');
    }).should.throw(/missing \$/);
  });
});

describe('app.js', function () {
  var read = require('fs').readFileSync;

  beforeEach(function (done) {
    benv.setup(function () {
      benv.expose({
        $: require('./bower_components/jquery/dist/jquery.js')
      });
      done();
    });
  });

  afterEach(function () {
    benv.teardown();
  });

  it('has window object', function () {
    window.should.be.an.Object;
  });

  it('has nothing to do with index.html', function () {
    // load into the "browser" window with cache bust
    benv.require('./app.js');
    $('body').html().should.not.include('app example');
  });

  it('registers append function', function () {
    benv.require('./app.js');
    window.append.should.be.a.Function;
  });

  it('adds to body', function () {
    benv.require('./app.js');
    window.append();
    $('body').html().should.include('added');
  });

  it('can replace html with index.html from disk', function () {
    var html = read('./index.html', 'utf-8');
    $('html').html(html);
    $('body').html().should.include('app example');
  });

  it('does not run scripts when loading index.html from disk', function () {
    var html = read('./index.html', 'utf-8');
    $('html').html(html);
    $('body').html().should.not.include('added');
  });
});
