jest.dontMock('../traveler.js');
var Traveler = require('../traveler.js');
var Grid = require('../grid.js');

describe('Traveler', function() {
  var g, t;

  beforeEach(function() {
    g = new Grid(10)
    t = new Traveler(0, 0, g);
  });

  it('has default orientation of right', function() {
    expect(t.orientation).toBe('right');
  });

  it('places itself somewhere initially on the grid', function() {
    expect(g.fill.mock.calls[0]).toEqual([0, 0, 'traveler right']);
  });

  it('cannot start on a filled in space', function() {
    g.fill.mockImplementation(function(x, y) {
      if (x === 0 && y === 0) throw 'err';
    });

    expect(function() { new Traveler(0, 0, g) }).toThrow('cannot move here');
  });

  it('moves in the correct direction', function() {
    t.move();
    expect(g.unFill.mock.calls[0]).toEqual([0, 0]);
    expect(g.fill.mock.calls[1]).toEqual([1, 0, 'traveler right']);
  });
});