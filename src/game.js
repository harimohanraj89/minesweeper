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
  this.hud = $("#hud-container")
  this.result = $('<div>').attr('id', 'result');

  this.mines = [8, 20, 40];
  this.widths = [6, 10, 15];
  this.heights = [8, 10, 12];

  this.flag = false
  initMenuInput(this);
  initGameInput(this);
}

MinesweeperGame.prototype.start = function() {
  this.board.parent.hide();
}

MinesweeperGame.prototype.startGame = function(difficulty) {

  var mines = this.mines[difficulty];
  var width = this.widths[difficulty];
  var height = this.heights[difficulty];

  this.newBoard(width, height, 40);
  this.spawnMines(mines);
  this.minesRemaining = mines;

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
    this.flagged = false;
    $(this.el).empty();
    this.score = $('<div>').addClass('score');
    this.flag = $('<div>').addClass('flag').text('X');
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
      this.reveal(true);
    }
  });
}

MinesweeperGame.prototype.renderHud = function() {
  this.hud.text('remaining: ' + this.minesRemaining);
}

MinesweeperGame.prototype.render = function() {
  this.renderHud();
  this.board.render();
}

MinesweeperGame.prototype.checkResult = function(){
  var win = true;
  var lose = false;
  this.minesRemaining = this.mines[this.difficulty];
  var that = this;
  this.board.eachSquare(function() {
    win = win && (this.mine || this.revealed);
    lose = lose || (this.mine && this.revealed);
    if (this.flagged && !this.revealed) {
      that.minesRemaining -= 1;
    }
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
Square.prototype.handleClick = function(flag) {
  if (flag) {
    this.flagged = !this.flagged
  } else {
    this.reveal();
  }
}

Square.prototype.reveal = function(forced) {
  if (this.revealed || (this.flagged && !forced)) {
    return;
  }
  this.revealed = true;
  if (this.neighborCount() === 0 && !this.mine) {
    this.revealNeighbors(forced);
  }
}

Square.prototype.revealNeighbors = function(forced) {
  square = this.board.square(this.x+1, this.y);
  square.reveal && !square.revealed ? square.reveal(forced) : false;
  square = this.board.square(this.x+1, this.y+1);
  square.reveal && !square.revealed ? square.reveal(forced) : false;
  square = this.board.square(this.x, this.y+1);
  square.reveal && !square.revealed ? square.reveal(forced) : false;
  square = this.board.square(this.x-1, this.y+1);
  square.reveal && !square.revealed ? square.reveal(forced) : false;
  square = this.board.square(this.x-1, this.y);
  square.reveal && !square.revealed ? square.reveal(forced) : false;
  square = this.board.square(this.x-1, this.y-1);
  square.reveal && !square.revealed ? square.reveal(forced) : false;
  square = this.board.square(this.x, this.y-1);
  square.reveal && !square.revealed ? square.reveal(forced) : false;
  square = this.board.square(this.x+1, this.y-1);
  square.reveal && !square.revealed ? square.reveal(forced) : false;
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
    this.renderFlag();
  }
}

Square.prototype.renderScore = function() {
  var scoreClasses = ['zero', 'one',  'two', 'three',
                      'four', 'five', 'six', 'seven',
                      'eight'];
  var neighbors = this.neighborCount();
  this.score.addClass(scoreClasses[neighbors]);
  var neighborsText;
  neighbors > 0 ? neighborsText = neighbors : neighborsText = '';
  this.score.text(neighborsText);
  $(this.el).append(this.score);
}

Square.prototype.renderFlag = function() {
  if (this.flagged) {
    $(this.el).append(this.flag);
  } else {
    this.flag.detach();
  }
}

// UI
Cursor.prototype.beforeRender = function() {
  if (this.board.square(this.x, this.y).revealed) {
    this.visible = false;
  }
}
