jest.dontMock('../grid.js');
var Grid = require('../grid.js');

describe('Grid', function() {
  var g;

  beforeEach(function() {
    g = new Grid(10);
  })

  it('is 0 by default', function() {
    expect(g.get(0, 0)).toBe(0);
  });

  it('can set', function() {
    g.set(1, 1, 'monkey');

    expect(g.get(1,1)).toBe('monkey');
  });

  it('throws if out of bounds', function() {
    expect(function() { g.set(11, 9) }).toThrow('out of bounds');
  });

  it('fills in', function() {
    expect(g.isFilled(1, 0)).toBe(false);

    g.fill(1, 0)

    expect(g.isFilled(1, 0)).toBe(true);
    expect(g.isFilled(0, 1)).toBe(false);
  });
});
