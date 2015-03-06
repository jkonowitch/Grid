var Emitter = require('events').EventEmitter;
var util = require('util');
var points = [];

Grid = function(n) {
  this.size = n;

  for (var i = 0; i < this.size; i++) {
    points[i] = Array.apply(null, Array(this.size)).map(Boolean).map(Number);
  };

  // inherit event emitter
  Emitter.call(this);
}

util.inherits(Grid, Emitter);

Grid.prototype.at = function(x, y) {
  this.checkCoordsAreIntegers(x, y);

  return points[y][x];
}

Grid.prototype.points = function() {
  // return a copy
  return points.slice(0);
}

Grid.prototype.fill = function(x, y, val) {
  this.checkCoordsAreIntegers(x, y);

  if (this.outOfBounds(x, y)) {
    throw new Error('out of bounds');
  } else if (this.isFilled(x, y) && val != 0) {
    throw new Error('already occupied');
  }
  
  points[y][x] = val;

  this.emit('changed');
}

Grid.prototype.checkCoordsAreIntegers = function(x, y) {
  if (typeof x != 'number' || typeof y != 'number') {
    throw new Error('coordinates must be numbers');
  }
}

Grid.prototype.outOfBounds = function(x, y) {
  return (x > this.size - 1 || y > this.size - 1 || x < 0 || y < 0);
}

Grid.prototype.isFilled = function(x, y) {
  return this.at(x, y) != 0;
}

Grid.prototype.unFill = function(x, y) {
  this.fill(x, y, 0);
}

module.exports = Grid;