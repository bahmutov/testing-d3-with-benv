# testing-d3-with-benv

Testing D3 event functions from command line without an actual browser.

[source file](d3-drawing.js), [unit test file](d3-gt-test.js)

install:

    npm install
    grunt
    npm test // runs unit tests

Previous parts:

* [Step 1 - DOM testing](https://github.com/bahmutov/testing-d3-with-benv/tree/dom-testing)
* [Step 2 - simple D3 testing](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-testing)
* [Step 3 - D3 user function testing](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-function-testing)

## Step 4 - testing D3 event functions

Let's say we are changing element's background color on mouse hover
using D3 event handlers in [index.html](index.html)

```js
$(function drawOnStart() {
  'use strict';

  var dataset = [];
  for (var i = 0; i < 20; i++) {
    var newNumber = Math.random() * 25;
    dataset = dataset.concat(Math.round(newNumber));
  }
  function onMouseOver() {
    d3.select(this).style('background-color', 'red');
  }
  function onMouseOut() {
    d3.select(this).style('background-color', 'teal');
  }
  window.drawBars('body', dataset, onMouseOver, onMouseOut);
});
```

If you open *index.html* in your browser and hover over a bar, it should change
its color

![hover over bar](d3-testing.png)

How do we send a mouse over event to the element in the unit test
so that D3 picks it up and triggers our callback function?
By creating a synthetic event ourselves:

```js
QUnit.async('on mouseover calls function', function () {
  benv.require('./d3-drawing.js');
  var called = false;
  function onMouseOver() {
    called = true;
    window.d3.select(this).style('background-color', 'red');
  }
  var data = [5, 10];
  window.drawBars('body', data, onMouseOver);
  // create synthetic event, jsdom supports all event types
  var evt = window.document.createEvent('MouseEvents');
  evt.initMouseEvent('mouseover', true, true, window,
    0, 0, 0, 5, 5,
    false, false, false, false, 0, null);
  $('div.bar')[0].dispatchEvent(evt);
  // test the results
  _.defer(function () {
    QUnit.ok(called, 'mouse over function has been called');
    var color = $($('div.bar')[0]).css('background-color');
    QUnit.equal(color, 'red', 'background color has been changed');
    QUnit.start();
  });
});
```

For more details on `initMouseEvent` and other event methods in modern
browsers, see [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/event.initMouseEvent)

## Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/testing-d3-with-benv/issues) on Github
