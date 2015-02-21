g = new Grid(10);

g.isFilled(4, 5);
// false

g.fill(4, 5);

g.isFilled(4, 5);
// true

g.unfill(4, 5);

g.isFilled(4, 5);
// false

g.fill(4, 5, 'red');

t = new Traveler(0, 0, g);

t.orient('right');
t.orient('left');
// also up and down
t.move();
// true || false - can't move onto filled in cells