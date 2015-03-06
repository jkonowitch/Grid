jest.dontMock('../grid.js');
var Grid = require('../grid.js');

describe('Grid', function() {
  var g;

  beforeEach(function() {
    g = new Grid(10);
  })

  it('is 0 by default', function() {
    expect(g.at(0, 0)).toBe(0);
  });

  it('can fill', function() {
    g.fill(1, 1, 'monkey');

    expect(g.at(1,1)).toBe('monkey');
  });

  it('coords must be integers', function() {
    expect(function() { g.fill('sd', 'ds', 'asd');}).toThrow('coordinates must be numbers');
    expect(function() { g.at('34', 'sd');}).toThrow('coordinates must be numbers');    
  });

  it('cannot fill in something already filled', function() {
    g.fill(1, 1, 'monkey');

    expect(function() { g.fill(1, 1, 'hello') }).toThrow('already occupied with: monkey. use unFill.');
  });

  it('throws if out of bounds', function() {
    expect(function() { g.fill(11, 9) }).toThrow('out of bounds');
    expect(function() { g.fill(9, 11) }).toThrow('out of bounds');
    expect(function() { g.fill(9, -1) }).toThrow('out of bounds');
    expect(function() { g.fill(-1, 9) }).toThrow('out of bounds');
  });

  it('fills in and unfills', function() {
    expect(g.isFilled(1, 0)).toBe(false);

    g.fill(1, 0, 'monkey');

    expect(g.isFilled(1, 0)).toBe(true);

    g.unFill(1, 0);
    expect(g.isFilled(1, 0)).toBe(false);
  });
});
