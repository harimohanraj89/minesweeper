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

  this.mines = [8, 20, 40];
  this.widths = [6, 10, 15];
  this.heights = [8, 10, 12];

  initMenuInput(this);
  initGameInput(this);
}

MinesweeperGame.prototype.start = function() {
  this.board.parent.hide();
}

MinesweeperGame.prototype.startGame = function(difficulty) {

  var probability = this.mines[difficulty];
  var width = this.widths[difficulty];
  var height = this.heights[difficulty];

  this.newBoard(width, height, 40);
  this.spawnMines(probability);
  console.log('Probability: ' + probability);

  if (this.board.parent.css('display') === 'none') {
    this.board.parent.fadeIn(500);
  }
  this.cursor.visible = false;
  this.status = "game";
  this.difficulty = difficulty;
  this.render();
  initGameInput(this);
}

MinesweeperGame.prototype.newBoard = function(width, height, size) {
  if (this.board) {
    this.board.parent.empty();
  }
  this.board = new Board({
    width: width,
    height: height,
    squareSize: size,
    parent: $('#board-container')
  })
  this.cursor = new Cursor({
    board: this.board,
    x: 0,
    y: 0
  });
  this.resetSquares();
}

MinesweeperGame.prototype.resetSquares = function() {
  this.board.eachSquare(function() {
    this.revealed = false;
    this.mine = false;
    $(this.el).empty();
    this.score = $('<div>').addClass('score');
  });
}

MinesweeperGame.prototype.spawnMines = function(mines) {
  minesRemaining = Math.min(mines, this.board.xSize() * this.board.ySize());
  while (minesRemaining > 0) {
    x = Math.floor(Math.random() * this.board.xSize());
    y = Math.floor(Math.random() * this.board.ySize());
    if (!this.board.square(x, y).mine) {
      this.board.square(x, y).mine = true;
      minesRemaining--;
    }
  }
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
  this.applyResultStyle();
  this.showResult('w i n');
}

MinesweeperGame.prototype.loseGame = function() {
  this.status = "lose";
  this.revealMines();
  this.render();
  this.applyResultStyle();
  this.showResult('l o s e');
}

MinesweeperGame.prototype.applyResultStyle = function() {
  this.result.css('width', this.board.parent.css('width'))
             .css('height', this.board.parent.css('height'))
             .css('line-height', this.board.parent.css('height'))
}

MinesweeperGame.prototype.showResult = function(text) {
  this.result.text(text)
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
