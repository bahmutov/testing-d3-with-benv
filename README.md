# testing-d3-with-benv

Testing D3 event functions from command line without an actual browser.

[index.html](index.html), [d3 source file](d3-drawing.js), [unit test file](d3-gt-test.js)

This is a refactoring for CLI testability of the
["Dispatching events"](http://bl.ocks.org/mbostock/5872848) example.

This little application loads population data from [data.csv](data.csv)
and creates 3 entities: drop down selection with US states (plus District of Columbia),
bar chart to show the total population of a chosen state, plus doughnut chart
with the number of state's residents per age bracket. It uses a
[d3.dispatch](https://github.com/mbostock/d3/wiki/Internals#d3_dispatch)
object to route custom events among the 3 entities. The final look and feel are
below

![state population dispatch](state-population-dispatch.png)

### install

    npm install
    grunt
    npm test // runs unit tests

Previous parts:

* [Step 1 - DOM testing](https://github.com/bahmutov/testing-d3-with-benv/tree/dom-testing)
* [Step 2 - simple D3 testing](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-testing)
* [Step 3 - D3 user function testing](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-function-testing)
* [Step 4 - D3 event testing](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-mouseover-testing)
* [Step 5 - D3 load test](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-load-test)

## Step 5 - testing custom D3 events

## Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/testing-d3-with-benv/issues) on Github
