/* global window, d3, $ */
if (typeof d3 === 'undefined') {
  throw new Error('missing d3');
}

window.drawBars = function (el, dataset) {
  if (!Array.isArray(dataset) || !dataset.length) {
    throw new Error('Need non empty array to plot');
  }
  d3.select(el)
    .selectAll('div')
    .data(dataset)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style('height', function (d) {
      var barHeight = d * 5;
      return barHeight + 'px';
    });
};

$(function drawOnStart() {
  'use strict';

  var dataset = [];
  for (var i = 0; i < 20; i++) {
    var newNumber = Math.random() * 25;
    dataset = dataset.concat(Math.round(newNumber));
  }
  window.drawBars('body', dataset);
});
