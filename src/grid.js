var Emitter = require('events').EventEmitter;
var util = require('util');
var points = [];

Grid = function(n) {
  this.size = n;
  this.reset();

  // inherit event emitter
  Emitter.call(this);
}

util.inherits(Grid, Emitter);

Grid.prototype.reset = function() {
  points.length = 0;

  for (var i = 0; i < this.size; i++) {
    points[i] = Array.apply(null, Array(this.size)).map(Boolean).map(Number);
  };

  this.emit('changed');
}

Grid.prototype.at = function(x, y) {
  this.checkCoordsAreIntegers(x, y);

  return points[y][x];
}

Grid.prototype.points = function() {
  // return a copy
  return points.slice(0);
}

Grid.prototype.canFill = function(x, y, val) {
  this.checkCoordsAreIntegers(x, y);

  if (this.outOfBounds(x, y)) {
    throw new Error('out of bounds');
  } else if (this.isFilled(x, y) && val != 0) {
    throw new Error('already occupied with: ' + this.at(x, y) + '. use unFill.');
  }
}

Grid.prototype.fill = function(x, y, val) {
  this.canFill(x, y, val);
  
  points[y][x] = val;
  this.emit('changed');
}

Grid.prototype.batchFill = function(coords) {
  for (var i = 0; i < coords.length; i++) {
    var x = coords[i][0],
        y = coords[i][1],
        val = coords[i][2];

    this.canFill(x, y, val);        
    points[y][x] = val;
  }

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