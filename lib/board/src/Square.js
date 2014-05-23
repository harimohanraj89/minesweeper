// Square constructor
// ------------------
// A square consists of
//  - board : the board object it belongs to
//  - x     : its column number in its board
//  - y     : its row number in its board
//  - el    : the DOM element that constitutes its DOM representation

function Square(options) {
  options = options || {};
  var defaultEl = $('<div>').addClass('square');
  this.el = options.el || defaultEl;
  this.x = options.x;
  this.y = options.y;
  this.board = options.board;
  this.size = options.size;
}

// beforeRender
// -----
// This function is run before the square is appended
// to the DOM on render
Square.prototype.beforeRender = function() {};

// render
// -----
// Appends the square to the specified parent element
// after running the `beforeRender` hook
Square.prototype.render = function(x, y, parent, object) {
  this.beforeRender();
  this.applyStyle();
  this.el.appendTo(parent);
}

Square.prototype.applyStyle = function() {
  this.el.css('width', this.size + 'px')
         .css('height', this.size + 'px')
         .css('margin-top', '1px')
         .css('margin-left', '1px')
         .css('float', 'left')
         .css('position', 'relative');
}
