/* global window */
if (typeof window.d3 === 'undefined') {
  throw new Error('missing d3');
}

window.drawBars = function (el, dataset) {
  if (!Array.isArray(dataset) || !dataset.length) {
    throw new Error('Need non empty array to plot');
  }
  window.d3.select(el)
    .selectAll('div')
    .data(dataset)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .attr('width', '20')
    .style('height', function (d) {
      var barHeight = d * 5;
      return barHeight + 'px';
    });
};
