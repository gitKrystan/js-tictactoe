function Board() {
  this.spaces = this.generateBoard();
  this.players = [];
}

Board.prototype.forEachSpace = function (callback) {
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      callback(x, y);
    }
  }
};

Board.prototype.generateBoard = function () {
  var spaces = []
  this.forEachSpace(function(x, y) {
    spaces.push(new Space(x, y));
  })
  return spaces;
};

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

Board.prototype.winner = function () {
  var players = this.players;
  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    var playerSpaces = this.spacesMarkedBy(player);
    // if any win conditions are met, return that player
    if (winConditionIsMet(playerSpaces)) {return player;}
  }
  return false;
  // if no players are returned, return 'not over'
};

var winConditionIsMet = function(playerSpaces) {
  if (threeInSameLine(playerSpaces, 'xCoordinate')) {return true;}
  else if (threeInSameLine(playerSpaces, 'yCoordinate')) {return true;}
  else if (threeInDiagonal(playerSpaces)) {return true;}
  else {return false;}
  // there is an assortment of three spaces where neither the x or y is repeated
}

var threeInSameLine = function(playerSpaces, coordinateType) {
  var zeroCount = 0;
  var oneCount = 0;
  var twoCount = 0;

  for (var i = 0; i < playerSpaces.length; i++) {
    var space = playerSpaces[i];
    switch (space[coordinateType]) {
      case 0:
        zeroCount += 1;
        if (zeroCount === 3) {return true;}
        break;
      case 1:
        oneCount += 1;
        if (oneCount === 3) {return true;}
        break;
      case 2:
        twoCount += 1;
        if (twoCount === 3) {return true;}
        break;
    }
  }
  return false;
};

var threeInDiagonal = function(playerSpaces) {
  // middleSquare = [1,1]
  var middleSquare = 0;
  // diagonals1 = [0,0] & [2,2]
  var diagonals1 = 0;
  // diagonals1 = [0,2] & [2,0]
  var diagonals2 = 0;

  for (var i = 0; i < playerSpaces.length; i++) {
    var space = playerSpaces[i];
    var middleSquareTest = space.xCoordinate === 1 && space.yCoordinate === 1
    var diagonals1Test = (space.xCoordinate === 0 && space.yCoordinate === 0) ||
      (space.xCoordinate === 2 && space.yCoordinate === 2)
    var diagonals2Test = (space.xCoordinate === 0 && space.yCoordinate === 2) ||
      (space.xCoordinate === 2 && space.yCoordinate === 0)

    if (middleSquareTest) {
      middleSquare += 1;
    } else if (diagonals1Test) {
      diagonals1 += 1;
    } else if (diagonals2Test) {
      diagonals2 += 1;
    }
  }

  if (middleSquare + diagonals1 === 3 || middleSquare + diagonals2 === 3) {
    return true;
  } else {
    return false;
  }
}

Board.prototype.spacesMarkedBy = function (player) {
  var markedSpaces = [];
  var spaces = this.spaces;
  for (var i = 0; i < spaces.length; i++) {
    var space = spaces[i]
    if (space.markedBy === player) {
      markedSpaces.push(space);
    }
  }
  return markedSpaces;
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
