function MinesweeperGame() {
  this.board = new Board({
    width: 10,
    height: 10,
    parent: $('#board-container')
  });

  this.cursor = new Cursor({
    board: this.board,
    x: 0,
    y: 0
  });

  this.status = "game";
  this.result = $('<div>').attr('id', 'result');

  initMouseInput(this);
}

MinesweeperGame.prototype.start = function() {
  this.board.parent.hide();
}

MinesweeperGame.prototype.startGame = function() {
  this.resetSquares();
  this.spawnMines(0.2);
  if (this.board.parent.css('display') === 'none') {
    this.board.parent.fadeIn(500);
  }
  this.cursor.visible = false;
  this.status = "game";
  this.render();
}

MinesweeperGame.prototype.resetSquares = function() {
  this.board.eachSquare(function() {
    this.revealed = false;
    this.mine = false;
    $(this.el).empty();
    this.score = $('<div>').addClass('score');
  });
}

MinesweeperGame.prototype.spawnMines = function(probability) {
  this.board.eachSquare(function() {
    if (Math.random() < probability) {
      this.mine = true;
    } else {
      this.mine = false;
    }
  });
}

MinesweeperGame.prototype.revealMines = function() {
  this.board.eachSquare(function() {
    if (this.mine) {
      this.reveal();
    }
  });
}

MinesweeperGame.prototype.render = function() {
  this.board.render();
}

MinesweeperGame.prototype.checkResult = function(){
  var win = true;
  var lose = false;
  this.board.eachSquare(function() {
    win = win && (this.mine || this.revealed);
    lose = lose || (this.mine && this.revealed);
  });

  if (win) {
    this.winGame();
  }

  if (lose) {
    this.loseGame();
  }
}

MinesweeperGame.prototype.winGame = function() {
  this.status = "win";
  this.result.text('w i n')
              .hide()
              .appendTo(this.board.parent)
              .fadeIn(500);
}

MinesweeperGame.prototype.loseGame = function() {
  this.status = "lose";
  this.revealMines();
  this.render();
  this.result.text('l o s e')
              .hide()
              .appendTo(this.board.parent)
              .fadeIn(500);
}

// Extending Squares
// -----------------
Square.prototype.reveal = function() {
  if (this.revealed) {
    return;
  }
  this.revealed = true;
  var square;
  if (this.neighborCount() === 0 && !this.mine) {
    this.revealNeighbors();
  }
}

Square.prototype.revealNeighbors = function() {
  square = this.board.square(this.x+1, this.y);
  square.reveal && !square.revealed ? square.reveal() : false;
  square = this.board.square(this.x+1, this.y+1);
  square.reveal && !square.revealed ? square.reveal() : false;
  square = this.board.square(this.x, this.y+1);
  square.reveal && !square.revealed ? square.reveal() : false;
  square = this.board.square(this.x-1, this.y+1);
  square.reveal && !square.revealed ? square.reveal() : false;
  square = this.board.square(this.x-1, this.y);
  square.reveal && !square.revealed ? square.reveal() : false;
  square = this.board.square(this.x-1, this.y-1);
  square.reveal && !square.revealed ? square.reveal() : false;
  square = this.board.square(this.x, this.y-1);
  square.reveal && !square.revealed ? square.reveal() : false;
  square = this.board.square(this.x+1, this.y-1);
  square.reveal && !square.revealed ? square.reveal() : false;
}

Square.prototype.neighborCount = function() {
  var neighbors = 0;
  this.board.square(this.x+1, this.y).mine ? neighbors++ : false;
  this.board.square(this.x+1, this.y+1).mine ? neighbors++ : false;
  this.board.square(this.x, this.y+1).mine ? neighbors++ : false;
  this.board.square(this.x-1, this.y+1).mine ? neighbors++ : false;
  this.board.square(this.x-1, this.y).mine ? neighbors++ : false;
  this.board.square(this.x-1, this.y-1).mine ? neighbors++ : false;
  this.board.square(this.x, this.y-1).mine ? neighbors++ : false;
  this.board.square(this.x+1, this.y-1).mine ? neighbors++ : false;
  return neighbors;
}

Square.prototype.beforeRender = function() {
  if (this.revealed) {
    if (this.mine) {
      $(this.el).addClass('mine');
    } else {
      $(this.el).addClass('safe');
      this.renderScore();
    }
  } else {
    $(this.el).removeClass('mine');
    $(this.el).removeClass('safe');
  }
}

Square.prototype.renderScore = function() {
  var scoreClasses = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  var neighbors = this.neighborCount();
  this.score.addClass(scoreClasses[neighbors])
  this.score.text(neighbors);
  $(this.el).append(this.score);
}

// UI
Cursor.prototype.beforeRender = function() {
  if (this.board.square(this.x, this.y).revealed) {
    this.visible = false;
  }
}
