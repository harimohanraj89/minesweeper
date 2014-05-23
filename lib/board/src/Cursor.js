// Cursor constructor
// ------------------
// A cursor consists of
//
//  - x : its x position on the board
//  - y : its y position on the
function Cursor(options) {
  options = options || {};
  var defaultEl = $('<div>').addClass('cursor');

  this.el = options.el || defaultEl;
  this.x = options.x;
  this.y = options.y;
  this.board = options.board;
  this.board.cursor = this;
  this.visible = false;
}

// square
// -----
// Returns the square object that the cursor is
// currently highlighting
Cursor.prototype.square = function() {
  return this.board.square(this.x, this.y);
}

// right
// -----
// Moves the cursor 1 square to the right
// Cursor is clipped to the right edge of the parent board
Cursor.prototype.right = function() {
  this.x = Math.min(this.x + 1, this.board.xSize() - 1);
}

// left
// -----
// Moves the cursor 1 square to the left
// Cursor is clipped to the left edge of the parent board
Cursor.prototype.left = function() {
  this.x = Math.max(this.x - 1, 0);
}

// up
// -----
// Moves the cursor 1 square up
// Cursor is clipped to the top edge of the parent board
Cursor.prototype.up = function() {
  this.y = Math.max(this.y - 1, 0);
}

// down
// -----
// Moves the cursor 1 square down
// Cursor is clipped to the bottom edge of the parent board
Cursor.prototype.down = function() {
  this.y = Math.min(this.y + 1, this.board.ySize() - 1);
}

// to(x,y)
// -----
// Moves the cursor to the specified (x,y) location
// Cursor is clipped to the edges of the board
Cursor.prototype.to = function(x, y) {
  this.x = Math.max(Math.min(x, this.board.xSize() - 1), 0);
  this.y = Math.max(Math.min(y, this.board.ySize() - 1), 0);
}

// beforeRender
// -----
// This function is run before the cursor is appended
// to the DOM on render
Cursor.prototype.beforeRender = function() {};

// render
// -----
// Appends the cursor to the appropriate square depending
// on the `visible` property
//
Cursor.prototype.render = function() {
  this.beforeRender();
  this.applyStyle();
  if (this.visible) {
    this.board.square(this.x, this.y).el.append(this.el);
  } else {
    this.el.remove();
  }
}

Cursor.prototype.applyStyle = function() {
  this.el.css('width', this.square().size + 'px')
         .css('height', this.square().size + 'px')
         .css('position', 'absolute')
         .css('top', '0px')
         .css('left', '0px');
}
