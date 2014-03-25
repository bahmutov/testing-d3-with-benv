/* global window */
if (typeof window.d3 === 'undefined') {
  throw new Error('missing d3');
}

if (typeof window.drawBars === 'function') {
  throw new Error('drawBars has been registered already');
}

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
