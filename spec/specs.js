describe('Player', function() {
  it("returns the player's mark", function() {
    var testPlayer = createXPlayer();
    expect(testPlayer.mark).to.equal("X");
  });
});

describe('Space', function() {
  it('returns its x-coordinate', function() {
    var testSpace = new Space(1, 2);
    expect(testSpace.xCoordinate).to.equal(1);
  });

  it('returns y-coordinate', function() {
    var testSpace = new Space(1, 2);
    expect(testSpace.yCoordinate).to.equal(2);
  });

  it('lets a player mark a space', function() {
    var testPlayer = createXPlayer();
    var testSpace = createTestSpace();
    testSpace.markedBy(testPlayer);
    expect(testSpace.markedBy).to.equal(testPlayer);
  });
});

describe('Board', function() {
  it('creates 9 spaces when it is initialized', function() {
    var testBoard = new Board();
    expect(testBoard.spaces.length).to.equal(9);
    expect(testBoard.spaces[0].coordinates).to.eql([0,0]);
    expect(testBoard.spaces[8].coordinates).to.eql([2,2]);
  });

  describe('.find()', function() {
    it('finds a space within the board by its coordinates', function() {
      var testBoard = new Board();
      expect(testBoard.find(0,0).coordinates).to.eql([0,0]);
      expect(testBoard.find(1,2).coordinates).to.eql([1,2]);
    });
  });

  describe('.spacesMarkedBy()', function() {
    it('finds all of the spaces marked by a player', function() {
      var testBoard = new Board();
      var testPlayer = createXPlayer();
      var testSpace = testBoard.find(0,0);
      testSpace.markedBy(testPlayer);
      expect(testBoard.spacesMarkedBy(testPlayer)).to.eql([testSpace]);
    });
  });

  describe('.winner()', function() {
    it('returns true when there are three contiguous \
        spaces marked by the same player', function() {
      var testBoard = new Board();
      var testPlayer = createXPlayer();
      testBoard.players.push(testPlayer);
      testBoard.find(0,0).markedBy(testPlayer);
      testBoard.find(1,1).markedBy(testPlayer);
      testBoard.find(0,2).markedBy(testPlayer);
      expect(testBoard.winner()).to.equal(false);
      testBoard.find(0,1).markedBy(testPlayer);
      expect(testBoard.winner()).to.equal(testPlayer);
    });

    it('returns true when there are three diagonal \
        spaces marked by the same player', function() {
      var testBoard = new Board();
      var testPlayer = createXPlayer();
      testBoard.players.push(testPlayer);
      testBoard.find(0,0).markedBy(testPlayer);
      testBoard.find(1,1).markedBy(testPlayer);
      testBoard.find(2,2).markedBy(testPlayer);
      expect(testBoard.winner()).to.equal(testPlayer);
    });
  });
});

var createXPlayer = function() {
  return new Player("X");
};

var createTestSpace = function() {
  return new Space(1, 2);
};
