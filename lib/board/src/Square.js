function Square(options) {
  options = options || {};
  var defaultEl = $('<div>').addClass('square');
  this.el = options.el || defaultEl;
  this.x = options.x;
  this.y = options.y;
  this.board = options.board;
}

Square.prototype.render = function(x, y, parent, object) {
  this.beforeRender();
  $(this.el).appendTo(parent);
}
