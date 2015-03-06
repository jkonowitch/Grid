var React = require('react');

var Piece = React.createClass({
  render: function() {
    var classes = "piece ";
    var divStyle = {};
    var m;

    if (typeof(this.props.status) === 'string') {
      if (m = this.props.status.match(/color (.+)/i)) {
        divStyle.backgroundColor = m[1];
        classes += 'block';
      } else {
        classes += this.props.status;  
      }
    }

    return (
      <div className={classes} style={divStyle}>
      </div>
    );
  }
})

var Row = React.createClass({
  render: function() {
    var ps = this.props.row.map(function(p, x) {
      return <Piece x={x} status={p} y={this.props.y} key={x} />
    }.bind(this));

    return (
      <div className="row">
        {ps}
      </div>
    );
  }
});

var GridElement = React.createClass({
  getInitialState: function() {
    return { pieces: [] }
  },

  render: function() {
    var rows = this.state.pieces.map(function(row, y) { 
      return <Row key={y} row={row} y={y} />
    });

    return (
      <div className="grid">
        { rows }
      </div>
    );
  }
});

module.exports = GridElement;