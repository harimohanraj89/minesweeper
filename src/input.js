function initMouseInput(game) {
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
  $('#new-game').click(function() {
    game.startGame();
  })
}
