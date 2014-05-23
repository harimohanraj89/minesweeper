// Board constructor
// -----------------
// A board consists of
//  - squares : 2-D array of square objects
//  - parent : DOM element that contains the board

function Board(options) {
  var squares = [];
  this.squareSize = options.squareSize
  for(var i=0; i < options.width; i++) {
    squares.push([]);
    for (var j=0; j < options.height; j++) {
      squares[i].push(new Square({
        x: i,
        y: j,
        board: this,
        size: options.squareSize
      }));
    }
  }
  this.squares = squares;
  this.parent = options.parent;
}

// xSize
// -----
// Returns the number of columns in the board
Board.prototype.xSize = function() {
  if (this.squares.length > 0 && this.squares[0].length === 0) {
    return 0;
  }
  return this.squares.length;
}

// ySize
// -----
// Returns the number of rows in the board
Board.prototype.ySize = function() {
  if (this.squares.length === 0) {
    return 0;
  }
  return this.squares[0].length;
}

// square(x,y)
// -----
// Returns the square object at row y and column x (0-indexed)
Board.prototype.square = function(x, y) {
  if (x < 0 || y < 0 || x >= this.xSize() || y >= this.ySize()) {
    return {};
  }
  return this.squares[x][y];
}

// column(columnNum)
// -----
// Returns an array of square objects that make up
// column columnNum of the board
Board.prototype.column = function(columnNum) {
  var col = [];
  var ySize = this.ySize();
  for(var i = 0; i < ySize; i++) {
    col.push(this.square(columnNum, i));
  }
  return col;
}

// row(rowNum)
// -----
// Returns an array of square objects that make up
// row rowNum of the board

Board.prototype.row = function(rowNum) {
  var row = [];
  var xSize = this.xSize();
  for(var i = 0; i < xSize; i++) {
    row.push(this.square(i, rowNum));
  }
  return row;
}

// eachSquare(fcn)
// -----
// Iterates through each square of the board
// row-wise and runs fcn in the context of the
// square
Board.prototype.eachSquare = function(fcn) {
  for(var y = 0; y < this.ySize(); y++) {
    for(var x = 0; x < this.xSize(); x++) {
      fcn.call(this.square(x, y), x, y);
    }
  }
}

// render
// -----
// Renders the board by
//  - Clearing its contents
//  - Rendering each square row-wise
//  - Rendering the board's cursor
Board.prototype.render = function() {
  var width = 1 + (this.xSize() * (this.squareSize + 1));
  var height = 1 + (this.ySize() * (this.squareSize + 1));

  this.parent.children().detach();
  this.parent.css('width', width + 'px')
             .css('height', height + 'px')
             .css('position', 'relative');

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
