# testing-d3-with-benv

Simple JavaScript DOM / D3 manipulation testing from command line
without an actual browser.

This repository shows how to unit test DOM manipulation and
D3 drawing code without using a browser, with just Nodejs synthetic
browser environment. The tests are fast, provide code coverage information
and could be run continuously.

The repository shows different aspects of testing using different branches:

* branch dom-testing - [DOM testing](https://github.com/bahmutov/testing-d3-with-benv/tree/dom-testing)
* branch d3-testing - [D3 testing](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-testing)
* branch d3-function-testing - [D3 function testing](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-function-testing)
* branch d3-mouseover-testing - [D3 events testing](https://github.com/bahmutov/testing-d3-with-benv/tree/d3-mouseover-testing)

Each branch has its own code and detailed README

To try these yourself (d3 tests for example):

    git clone https://github.com/bahmutov/testing-d3-with-benv.git
    cd testing-d3-with-benv
    git checkout d3-testing // or dom-testing
    npm install
    grunt
    npm test

## Alternatives

I am showing how to test D3 code using the browser emulation under Node.
If you would like to use an actual browser, even a headless Phantomjs, see the existing
literature:

* Chapter "Test Drive your Visualization" in
[Data Visualization with D3.js Cookbook](http://www.packtpub.com/data-visualization-with-d3-js-cookbook/book)
by Nick Qi Zhu
* Chapter "Unit Testing / Test Suites" in
[Developing a D3.js Edge](http://www.amazon.com/Developing-D3-js-Edge-Roland-Dunn-ebook/dp/B00DNJ1UMM)
by Chris Viau

## Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/testing-d3-with-benv/issues) on Github
