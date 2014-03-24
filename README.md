# testing-d3-with-benv

Simple JavaScript DOM / D3 manipulation testing from command line
without an actual browser.

This repository shows how to unit test DOM manipulation and
D3 drawing code without using a browser, with just Nodejs synthetic
browser environment. The tests are fast, provide code coverage information
and could be run continuously.

The repository shows different aspects of testing using different branches

* [DOM testing](https://github.com/bahmutov/testing-d3-with-benv/tree/dom-testing)
* [D3 testing](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-testing)

To try these yourself (d3 tests for example):

    git clone https://github.com/bahmutov/testing-d3-with-benv.git
    git checkout d3-testing // or dom-testing
    npm install
    grunt
    npm test

## Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/testing-d3-with-benv/issues) on Github
