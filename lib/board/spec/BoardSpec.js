describe("Board", function() {
  var board = new Board({
    width: 15,
    height: 10
  });

  describe("#xSize", function() {
    it("returns the X size of the board", function() {
      var actual = board.xSize();
      var expected = 15;
      expect(actual).toEqual(expected);
    });

    it("returns 0 if the board has no rows", function() {
      var emptyBoard = new Board({
        width: 5,
        height: 0
      });
      var actual = emptyBoard.xSize();
      var expected = 0;
      expect(actual).toEqual(expected);
    });

    it("returns 0 if the board has no columns", function() {
      var emptyBoard = new Board({
        width: 0,
        height: 5
      });
      var actual = emptyBoard.xSize();
      var expected = 0;
      expect(actual).toEqual(expected);
    });

    it("returns 0 if the board is empty", function() {
      var emptyBoard = new Board({
        width: 5,
        height: 0
      });
      var actual = emptyBoard.xSize();
      var expected = 0;
      expect(actual).toEqual(expected);
    });
  });

  describe("#ySize", function() {
    it("returns the Y size of the board", function() {
      var actual = board.ySize();
      var expected = 10;
      expect(actual).toEqual(expected);
    });

    it("returns 0 if the board has no rows", function() {
      var emptyBoard = new Board({
        width: 5,
        height: 0
      });
      var actual = emptyBoard.ySize();
      var expected = 0;
      expect(actual).toEqual(expected);
    });

    it("returns 0 if the board has no columns", function() {
      var emptyBoard = new Board({
        width: 0,
        height: 5
      });
      var actual = emptyBoard.ySize();
      var expected = 0;
      expect(actual).toEqual(expected);
    });

    it("returns 0 if the board is empty", function() {
      var emptyBoard = new Board({
        width: 5,
        height: 0
      });
      var actual = emptyBoard.ySize();
      var expected = 0;
      expect(actual).toEqual(expected);
    });
  });

  describe("#eachSquare", function() {
    it("should iterate over each square in the board", function() {
      board.eachSquare(function() {
        this.foo = 'bar';
      });
      var actual = true;
      for (var i = 0; i < 100; i++) {
        var x = Math.floor(Math.random() * board.xSize());
        var y = Math.floor(Math.random() * board.ySize());
        actual = actual && (board.square(x,y).foo == 'bar');
      }
      var expected = true;
      expect(actual).toEqual(expected);
    });

    it("should pass in x position as first arg", function() {
      board.eachSquare(function(x, y) {
        this.fooX = 2 * x;
      });
      var actual = board.row(0).every(function(el, index) {
        return el.fooX === 2 * index;
      });
      var expected = true;
      expect(actual).toEqual(expected);
    });

    it("should pass in y position as second arg", function() {
      board.eachSquare(function(x, y) {
        this.fooY = 3 * y;
      });
      var actual = board.column(0).every(function(el, index) {
        return el.fooY === 3 * index;
      });
      var expected = true;
      expect(actual).toEqual(expected);
    });
  });

});
