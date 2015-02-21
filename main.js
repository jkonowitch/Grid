var Grid = require('./src/grid');
var GridComponent = require('./src/grid-component.js');
var React = require('react');

Grid.prototype.graft = function(selector) {
  var elt = document.querySelector(selector);
  var gc = <GridComponent />
  var c = React.render(gc, elt);

  c.setState({ pieces: this.points });

  this._E.on('changed', function() {
    c.setState({ pieces: this.points });
  }.bind(this))
}

window.Grid = Grid;