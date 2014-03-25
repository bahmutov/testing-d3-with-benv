# testing-d3-with-benv

Simple JavaScript DOM manipulation testing from command line
without an actual browser.

install:

    npm install
    grunt

## Step 1 - testing without a browser

Unit testing DOM manipulation code does not require a browser,
even a headless one like Phantomjs. The synthetic DOM as
exposed by [jsdom](https://github.com/tmpvar/jsdom) and wrapped by
[benv](https://github.com/artsy/benv) is good enough for most basic
HTML manipulation. Here is an example for testing jQuery modification
of an HTML document in [index.html](index.html)

```html
<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="utf-8">
  <title>cli testing using benv</title>
  <script src="bower_components/jquery/dist/jquery.js"></script>
  <script src="app.js"></script>
</head>
<body>
  <h1>app example</h1>
</body>
</html>
```

The document starts with single H1 tag and loads jQuery and [app.js](app.js)
that creates a function `window.append` to append an H2 tag to the body.

```js
/* global window */
if (typeof $ === 'undefined') {
  throw new Error('missing $');
}
window.append = function () {
  'use strict';
  $('body').append('<h2>added</h2>');
};
```

I wrote simple unit tests that run from [node](http://nodejs.org/) command line
and test the DOM updates using [mocha](https://www.npmjs.org/package/mocha) BDD
framework. Before each test, we initialize the new DOM using *benv* module. For
the entire suite of tests, see [app-test.js](app-test.js)

```js
var benv = require('benv');
var should = require('should');
describe('app.js', function () {
  beforeEach(function (done) {
    benv.setup(function () {
      benv.expose({
        $: benv.require('./bower_components/jquery/dist/jquery.js')
      });
      done();
    });
  });
  afterEach(function () {
    benv.teardown();
  });
  it('updates DOM on demand', function () {
    // load into the "browser" window with cache bust
    benv.require('./app.js');
    $('body').html().should.not.include('app example');
    window.append.should.be.a.Function;
    window.append();
    $('body').html().should.include('added');
  });
});
```

You can run unit tests using `npm test` command. Should show something
similar to this:

```
$ npm test

> testing-d3-with-benv@0.0.0 test /Users/gleb/git/testing-d3-with-benv
> node node_modules/mocha/bin/mocha app-test.js -R spec

  without benv setup
    ✓ fails to find jQuery

  app.js
    ✓ has window object
    ✓ has nothing to do with index.html
    ✓ registers append function
    ✓ adds to body
    ✓ can replace html with index.html from disk
    ✓ does not run scripts when loading index.html from disk


  7 passing (134ms)
```

## Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/testing-d3-with-benv/issues) on Github
