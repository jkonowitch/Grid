var React = require('react');

var Piece = React.createClass({
  render: function() {
    var classes = "piece ";

    if (typeof(this.props.status) === 'string') {
      classes += this.props.status;
    }

    return (
      <div className={classes}>
      </div>
    );
  }
})

var Row = React.createClass({
  render: function() {
    var ps = this.props.row.map(function(p, x) {
      return <Piece x={x} status={p} y={this.props.y} />
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
      return <Row row={row} y={y} />
    });

    return (
      <div className="grid">
        { rows }
      </div>
    );
  }
});

module.exports = GridElement;