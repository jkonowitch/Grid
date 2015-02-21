var EE = require('events').EventEmitter;
var e = new EE;

Grid = function(n) {
  this.points = [];
  this.size = n;
  this._E = e;

  for (var i = 0; i < this.size; i++) {
    this.points[i] = Array.apply(null, Array(this.size)).map(Boolean).map(Number);
  };
}

Grid.prototype.get = function(x, y) {
  return this.points[y][x];
}

Grid.prototype.set = function(x, y, val) {
  if (this.outOfBounds(x, y)) {
    throw new Error('out of bounds');
  }
  
  this.points[y][x] = val;

  e.emit('changed');
}

Grid.prototype.outOfBounds = function(x, y) {
   return (x > this.size - 1 || y > this.size - 1);
}

Grid.prototype.isFilled = function(x, y) {
  return this.get(x, y) == 'fill';
}

Grid.prototype.fill = function(x, y) {
  this.set(x, y, 'fill');
}

module.exports = Grid;