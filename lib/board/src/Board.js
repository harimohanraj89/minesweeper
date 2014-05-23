function Board(options) {
  var squares = [];
  for(var i=0; i < options.width; i++) {
    squares.push([]);
    for (var j=0; j < options.height; j++) {
      squares[i].push(new Square({
        x: i,
        y: j,
        board: this
      }));
    }
  }
  this.squares = squares;
  this.parent = options.parent;
}

Board.prototype.xSize = function() {
  if (this.squares.length > 0 && this.squares[0].length === 0) {
    return 0;
  }
  return this.squares.length;
}

Board.prototype.ySize = function() {
  if (this.squares.length === 0) {
    return 0;
  }
  return this.squares[0].length;
}

Board.prototype.square = function(x, y) {
  if (x < 0 || y < 0 || x >= this.xSize() || y >= this.ySize()) {
    return {};
  }
  return this.squares[x][y];
}

Board.prototype.column = function(columnNum) {
  var col = [];
  var ySize = this.ySize();
  for(var i = 0; i < ySize; i++) {
    col.push(this.square(columnNum, i));
  }
  return col;
}

Board.prototype.row = function(rowNum) {
  var row = [];
  var xSize = this.xSize();
  for(var i = 0; i < xSize; i++) {
    row.push(this.square(i, rowNum));
  }
  return row;
}

Board.prototype.eachSquare = function(fcn) {
  for(var y = 0; y < this.ySize(); y++) {
    for(var x = 0; x < this.xSize(); x++) {
      fcn.call(this.square(x, y), x, y);
    }
  }
}

Board.prototype.render = function() {
  this.parent.children().detach();
  for(var y = 0; y < this.ySize(); y++) {
    var row = $('<div>').css('clear', 'both').addClass('row').attr('id','row-' + y).appendTo(this.parent);
    for(var x = 0; x < this.xSize(); x++) {
      this.square(x, y).render(x, y, row)
    }
  }
  if (this.cursor) {
    this.cursor.render();
  }
}
