Traveler = function(x, y, grid) {
  this.orientation = 'right';
  this.x = x;
  this.y = y;
  this.grid = grid;

  this.place();
}

Traveler.prototype.move = function() {
  this.grid.unFill(this.x, this.y);
  this.advanceCoords();
  this.place();
}

Traveler.prototype.moveError = function() {
  this.backupCoords();
  this.place();
  throw new Error("cannot move here");
}

Traveler.prototype.advanceCoords = function() {
  switch(this.orientation) {
    case 'right':
      this.x++;
      break;
    case 'left':
      this.x--;
      break;
    case 'up':
      this.y--;
      break;
    case 'down':
      this.y++;
      break;
  }
}

Traveler.prototype.backupCoords = function() {
  switch(this.orientation) {
    case 'right':
      this.x--;
      break;
    case 'left':
      this.x++;
      break;
    case 'up':
      this.y++;
      break;
    case 'down':
      this.y--;
      break;
  }
}

Traveler.prototype.place = function() {
  try {
    this.grid.fill(this.x, this.y, 'traveler ' + this.orientation);
  } catch(e) {
    this.moveError();
  }
}

Traveler.prototype.orient = function(orientation) {
  this.orientation = orientation;
  this.grid.unFill(this.x, this.y);
  this.place();
}

module.exports = Traveler;