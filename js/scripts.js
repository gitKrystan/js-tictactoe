function Board() {
  this.spaces = this.generateBoard();
}

Board.prototype.find = function (xCoordinate, yCoordinate) {
  // for each space in spaces,
  // check if that space's coordinates match the test coordinates
  // if so, return that space

  var spaces = this.spaces;
  for (var i = 0; i < spaces.length; i++) {
    var space = spaces[i]
    if (space.xCoordinate === xCoordinate && space.yCoordinate === yCoordinate) {
      return space;
    }
  }
};

Board.prototype.generateBoard = function () {
  var spaces = []
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      spaces.push(new Space(x, y));
    }
  }
  return spaces;
};

function Player(mark) {
  this.mark = mark;
}

function Space(xCoordinate, yCoordinate, optionalMark) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.coordinates = [xCoordinate, yCoordinate];
  this.markedBy;
}

Space.prototype.markedBy = function(player) {
  if (player) {
    this.markedBy = player;
  }
  return this.markedBy;
};
