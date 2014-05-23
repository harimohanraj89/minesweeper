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

Cursor.prototype.beforeRender = function() {};

Cursor.prototype.square = function() {
  return this.board.square(this.x, this.y);
}

Cursor.prototype.right = function() {
  this.x = Math.min(this.x + 1, this.board.xSize() - 1);
}

Cursor.prototype.left = function() {
  this.x = Math.max(this.x - 1, 0);
}

Cursor.prototype.up = function() {
  this.y = Math.max(this.y - 1, 0);
}

Cursor.prototype.down = function() {
  this.y = Math.min(this.y + 1, this.board.ySize() - 1);
}

Cursor.prototype.to = function(x, y) {
  this.x = Math.max(Math.min(x, this.board.xSize() - 1), 0);
  this.y = Math.max(Math.min(y, this.board.ySize() - 1), 0);
}

Cursor.prototype.render = function() {
  this.beforeRender();
  if (this.visible) {
    this.board.square(this.x, this.y).el.append(this.el);
  } else {
    this.el.remove();
  }
}
