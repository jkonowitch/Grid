var Emitter = require('events').EventEmitter;
var util = require('util');

Grid = function(n) {
  this.points = [];
  this.size = n;

  for (var i = 0; i < this.size; i++) {
    this.points[i] = Array.apply(null, Array(this.size)).map(Boolean).map(Number);
  };

  // inherit event emitter
  Emitter.call(this);
}

util.inherits(Grid, Emitter);

Grid.prototype.get = function(x, y) {
  return this.points[y][x];
}

Grid.prototype.set = function(x, y, val) {
  if (this.outOfBounds(x, y)) {
    throw new Error('out of bounds');
  }
  
  this.points[y][x] = val;

  this.emit('changed');
}

Grid.prototype.outOfBounds = function(x, y) {
  return (x > this.size - 1 || y > this.size - 1 || x < 0 || y < 0);
}

Grid.prototype.isFilled = function(x, y) {
  return this.get(x, y) == 'fill';
}

Grid.prototype.unSet = function(x, y) {
  this.set(x, y, 0);
}

Grid.prototype.unFill = function(x, y) {
  if (this.isFilled(x, y)) {
    this.unSet(x, y);
  }
}

Grid.prototype.fill = function(x, y) {
  this.set(x, y, 'fill');
}

module.exports = Grid;