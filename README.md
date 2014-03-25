# testing-d3-with-benv

Testing D3 functions from command line without an actual browser.

install:

    npm install
    grunt
    npm test // runs unit tests

Previous parts:

* [Step 1 - dom-testing branch](https://github.com/bahmutov/testing-d3-with-benv/tree/dom-testing)
* [Step 2 - d3-testing branch](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-testing)

## Step 3 - testing D3 user functions

D3 allows passing user functions for most of the values, for example to
return tooltip text. For example [d3-drawing.js](d3-drawing.js) uses either
supplied tooltip text function or default one

```js
window.drawBars = function (el, dataset, tooltipFn) {
  if (!Array.isArray(dataset) || !dataset.length) {
    throw new Error('Need non empty array to plot');
  }
  function defaultTooltipFn(d, k) {
    return k + ': ' + d;
  }
  window.d3.select(el)
    .selectAll('div')
    .data(dataset)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .attr('width', '20')
    .attr('title', tooltipFn || defaultTooltipFn)
    .style('height', function (d) {
      var barHeight = d * 5;
      return barHeight + 'px';
    });
};
```

We can test if D3 calls the function with correct parameters for each data item
without using real browser. See [d3-gt-test.js](d3-gt-test.js)

```js
QUnit.async('tooltip function', function () {
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
  _.defer(function () {
    QUnit.equal(tooltipCount, data.length, 'tooltip function called correct number of times');
    QUnit.start();
  });
});
```

If you need more advanced spying (for example to assert number of calls, arguments, etc),
you can use [sinon.js](https://github.com/webjars/sinonjs) library.

## Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/testing-d3-with-benv/issues) on Github
