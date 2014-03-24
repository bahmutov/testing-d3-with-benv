/* global window */
if (typeof $ === 'undefined') {
  throw new Error('missing $');
}
if (typeof window === 'undefined') {
  throw new Error('undefined window object');
}

window.append = function () {
  'use strict';
  $('body').append('<h2>added</h2>');
};



