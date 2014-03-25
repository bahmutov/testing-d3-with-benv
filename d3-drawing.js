/* global window */
if (typeof window.d3 === 'undefined') {
  throw new Error('missing d3');
}

if (typeof window.drawBars === 'function') {
  throw new Error('drawBars has been registered already');
}

window.drawBars = function (el, dataset, onMouseOver, onMouseOut) {
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
    })
    .on('mouseover', onMouseOver)
    .on('mouseout', onMouseOut);
};
