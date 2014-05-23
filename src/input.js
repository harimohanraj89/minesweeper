function initGameInput(game) {
  // Set up highlight toggling
  game.board.eachSquare(function() {
    $(this.el).click(this.reveal.bind(this));
    $(this.el).mouseover(function() {
      game.cursor.to(this.x, this.y);
      game.cursor.visible = !this.revealed;
      game.cursor.render();
    }.bind(this));
  });
  game.board.parent.click(function() {
    if (game.status === "game") {
      game.board.render();
      game.checkResult();
    }
  });
  game.board.parent.mouseleave(function() {
    if (game.status === "game") {
      game.cursor.visible = false;
      game.board.render();
    }
  });
}

function initMenuInput(game) {
  $('#new-game-easy').click(function() {
    console.log('hi');
    game.startGame(0);
  });
  $('#new-game-medium').click(function() {
    game.startGame(1);
  });
  $('#new-game-hard').click(function() {
    game.startGame(2);
  });
}
