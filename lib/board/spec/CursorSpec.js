describe("Cursor", function() {
  var board = new Board({
    width: 15,
    height: 10
  });

  describe("#square", function() {
    it("returns the board square that the cursor is on", function() {
      var cursor = new Cursor({
        x: 3,
        y: 5,
        board: board
      });
      var actual = cursor.square();
      var expected = board.square(3, 5);
      expect(actual).toEqual(expected);
    });
  });

  describe("#right", function() {
    it("moves the cursor to the right", function() {
      var cursor = new Cursor({
        x: 3,
        y: 5,
        board: board
      });
      cursor.right();
      var actual = cursor.x;
      var expected = 4;
      expect(actual).toEqual(expected);
    });
    it("doesn't move past the right edge of the board", function() {
      var cursor = new Cursor({
        x: 14,
        y: 3,
        board: board
      });
      cursor.right();
      var actual = cursor.x;
      var expected = 14;
      expect(actual).toEqual(expected);
    });
  });

  describe("#left", function() {
    it("moves the cursor to the left", function() {
      var cursor = new Cursor({
        x: 3,
        y: 5,
        board: board
      });
      cursor.left();
      var actual = cursor.x;
      var expected = 2;
      expect(actual).toEqual(expected);
    });
    it("doesn't move past the left edge of the board", function() {
      var cursor = new Cursor({
        x: 0,
        y: 3,
        board: board
      });
      cursor.left();
      var actual = cursor.x;
      var expected = 0;
      expect(actual).toEqual(expected);
    });
  });

  describe("#up", function() {
    it("moves the cursor to the up", function() {
      var cursor = new Cursor({
        x: 3,
        y: 5,
        board: board
      });
      cursor.up();
      var actual = cursor.y;
      var expected = 4;
      expect(actual).toEqual(expected);
    });
    it("doesn't move past the top edge of the board", function() {
      var cursor = new Cursor({
        x: 14,
        y: 0,
        board: board
      });
      cursor.up();
      var actual = cursor.y;
      var expected = 0;
      expect(actual).toEqual(expected);
    });
  });

  describe("#down", function() {
    it("moves the cursor to the down", function() {
      var cursor = new Cursor({
        x: 3,
        y: 9,
        board: board
      });
      cursor.down();
      var actual = cursor.y;
      var expected = 9;
      expect(actual).toEqual(expected);
    });
    it("doesn't move past the bottom edge of the board", function() {
      var cursor = new Cursor({
        x: 14,
        y: 3,
        board: board
      });
      cursor.down();
      var actual = cursor.x;
      var expected = 14;
      expect(actual).toEqual(expected);
    });
  });

  describe("#to", function() {
    var cursor = new Cursor({
      x: 0,
      y: 0,
      board: board
    });

    it("moves the cursor to specified location", function() {
      cursor.to(5, 4);
      expect(cursor.x).toEqual(5);
      expect(cursor.y).toEqual(4);
    });

    it("doesn't move past the right edge of the board", function() {
      cursor.to(17, 3);
      var actual = cursor.x;
      var expected = 14;
      expect(actual).toEqual(expected);
    });

    it("doesn't move past the left edge of the board", function() {
      cursor.to(-4, 9);
      var actual = cursor.x;
      var expected = 0;
      expect(actual).toEqual(expected);
    });

    it("doesn't move past the top edge of the board", function() {
      cursor.to(8, 15);
      var actual = cursor.y;
      var expected = 9;
      expect(actual).toEqual(expected);
    });

    it("doesn't move past the bottom edge of the board", function() {
      cursor.to(2, -8);
      var actual = cursor.y;
      var expected = 0;
      expect(actual).toEqual(expected);
    });
  });

});
