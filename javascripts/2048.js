var Game = function() {
  // Game logic and initialization here
  this.gameBoard = [[16, 0, 0, 0], [2, 16, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0]];
  this.gameLost = false;
  // this.addOneTile();
  // this.addOneTile();
  this.showBoard();
  this.score = 0;
};


$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  console.log(game.gameBoard);

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which);
    }
  });
});

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  var self = this;
  if (self.gameLost === false) {
  switch(direction) {
    case 38: //up
      console.log('up');
      self.upMoveTiles();
      self.upTileCollision();
      self.upMoveTiles();
      self.isGameLost();
      self.addOneTile();
      console.log(self.gameBoard);
      self.isGameLost();
      console.log(self.score);
      console.log(self.gameLost);
      this.showBoard();
      break;
    case 40: //down
      console.log('down');
      self.downMoveTiles();
      self.downTileCollision();
      self.downMoveTiles();
      self.isGameLost();
      self.addOneTile();
      console.log(self.gameBoard);
      self.isGameLost();
      console.log(self.score);
      console.log(self.gameLost);
      this.showBoard();
      break;
    case 37: //left
      console.log('left');
      self.leftMoveTiles();
      self.leftTileCollision();
      self.leftMoveTiles();
      self.isGameLost();
      self.addOneTile();
      console.log(self.gameBoard);
      self.isGameLost();
      console.log(self.score);
      console.log(self.gameLost);
      this.showBoard();
      break;
    case 39: //right
      console.log('right');
      self.rightMoveTiles();
      self.rightTileCollision();
      self.rightMoveTiles();
      self.isGameLost();
      self.addOneTile();
      console.log(self.gameBoard);
      self.isGameLost();
      console.log(self.score);
      console.log(self.gameLost);
      this.showBoard();
      break;
  }
}
};

Game.prototype.upMoveTiles = function(){
  var self = this;
  // iterate through each "row" (each array within gameboard array)
  self.gameBoard.forEach(function(row, rowIndex){
    // iterate through each "column" (each item within a row)
    row.forEach(function(column, columnIndex){
      // don't look at tiles that don't have a a value to them, AND don't look left if column is farthest left
      if (column !== 0 && rowIndex !== 0) {
        // iterate through each item further left of current item
        for (var i = rowIndex - 1; i >= 0; i--) {
          // increment numSpaces to move up by 1 if the next tile up is 0
          if (self.gameBoard[i][columnIndex] === 0) {
            self.gameBoard[i][columnIndex] = column;
            self.gameBoard[i + 1][columnIndex] = 0;
          }
        }
      }
    });
  });
};

Game.prototype.downMoveTiles = function(){
  var self = this;
  // iterate through each "row" (each array within gameboard array)
  for (var k = 2; k >= 0; k--) {
    var row = self.gameBoard[k], rowIndex = k;
    // iterate through each "column" (each item within a row)
    for (var j = 0; j <= 3; j++) {
    // row.forEach(function(column, columnIndex){
      var column = row[j], columnIndex = j;
      // don't look at tiles that don't have a a value to them, AND don't look left if column is farthest down already
      if (column !== 0) {
        // iterate through each item further up of current item
        for (var i = rowIndex; i < 3; i++) {
          // increment numSpaces to move down by 1 if the next num down is 0
          if (self.gameBoard[i + 1][columnIndex] === 0) {
            self.gameBoard[i + 1][columnIndex] = column;
            self.gameBoard[i][columnIndex] = 0;
          }
        }
      }
    }
  }
};

Game.prototype.leftMoveTiles = function(){
  var self = this;
  // iterate through each "row" (each array within gameboard array)
  self.gameBoard.forEach(function(row, rowIndex){
    // iterate through each "column" (each item within a row)
    row.forEach(function(column, columnIndex){
      var numSpaces = 0;
      // don't look at tiles that don't have a a value to them, AND don't look left if column is farthest left
      if (column !== 0 && columnIndex !== 0) {
        // iterate through each item further left of current item
        for (var i = columnIndex; i >= 0; i--) {
          // increment numSpaces to move left by 1 if the next left over is 0
          if (row[i - 1] === 0) {
            row[i - 1] = column;
            row[i] = 0;
          }
        }
      }
    });
  });
};

Game.prototype.rightMoveTiles = function(){
  var self = this;
  // iterate through each "row" (each array within gameboard array)
  for (var m = 0; m < self.gameBoard.length; m++) {
    // iterate through each "column" (each item within a row)
    var row = self.gameBoard[m], rowIndex = m;

    for (var j = 3; j >= 0; j--) {
      var column = row[j], columnIndex = j;
      // don't look at tiles that don't have a a value to them, AND don't look right if column is farthest right
      if (column !== 0) {
        for (var i = columnIndex + 1; i <= 3; i++) {
          // increment numSpaces to move right by 1 if the next right over is 0
          if (row[i] === 0) {
            // select current tile and move it appropriate num spaces right
            row[i] = column;
            row[i - 1] = 0;
          }
        }
      }
    }
  }
};

Game.prototype.upTileCollision = function(){
  var self = this;
  for(var i = 1; i <= 3; i++){
    for(var j = 0; j <= 3; j++){
      if(self.gameBoard[i][j] > 0){
        if(self.gameBoard[i - 1][j] === self.gameBoard[i][j]){
          self.gameBoard[i - 1][j] *= 2;
          self.score += self.gameBoard[i - 1][j];
          self.gameBoard[i][j] = 0;
        }
      }
    }
  }
};

Game.prototype.downTileCollision = function(){
  var self = this;
  for (var i = 3; i >= 1; i--) { // iterate through each row
    for (var j = 0; j <= 3; j++) { // iterate through each tile in each row
      if (self.gameBoard[i][j] > 0) {
        if (self.gameBoard[i - 1][j] === self.gameBoard[i][j]) {
          self.gameBoard[i][j] *= 2;
          self.score += self.gameBoard[i][j];
          self.gameBoard[i - 1][j] = 0;
        }
      }
    }
  }
};

Game.prototype.leftTileCollision = function(){
  var self = this;
  for (var i = 0; i <= 3; i++) { // iterate through each row
    for (var j = 1; j <= 3; j++) { // iterate through each tile in each row
      if (self.gameBoard[i][j] > 0) {
        if (self.gameBoard[i][j - 1] === self.gameBoard[i][j]) {
          self.gameBoard[i][j] *= 2;
          self.score += self.gameBoard[i][j];
          self.gameBoard[i][j - 1] = 0;
        }
      }
    }
  }
};

Game.prototype.rightTileCollision = function(){
  var self = this;
  for (var i = 0; i <= 3; i++) { // iterate through each row
    for (var j = 3; j >= 1; j--) { // iterate through each tile in each row
      if (self.gameBoard[i][j] > 0) {
        if (self.gameBoard[i][j - 1] === self.gameBoard[i][j]) {
          self.gameBoard[i][j] *= 2;
          self.score += self.gameBoard[i][j];
          self.gameBoard[i][j - 1] = 0;
        }
      }
    }
  }
};

Game.prototype.flattenNums = function() {
  var flattened = this.gameBoard.reduce(function(a, b) {
    return a.concat(b);
  }, []);
  return flattened;
};

Game.prototype.isGameLost = function() {
  // check if any number in flattened game board is 0
  var flattenedNums = this.flattenNums(), isGameLost = true, self = this;
  for (var i = 0; i < flattenedNums.length; i++) {
    if (flattenedNums[i] === 0) {
      isGameLost = false;
    }
  }

  // check if any tiles can be combined with the tile to the right, or below
  for (var m = 0; m <= 3; m++) {
    for (var j = 0; j <= 3; j++) {
      if (self.gameBoard[m][j] === self.gameBoard[m][j + 1]){
        isGameLost = false;
      }
      if (self.gameBoard[m + 1] !== undefined && self.gameBoard[m][j] === self.gameBoard[m + 1][j]) {
        isGameLost = false;
      }
    }
  }
  self.gameLost = isGameLost;
  return isGameLost;
};

Game.prototype.getFreeSpaces = function(){
  var freeSpaces = [];
// 3. Iterate through the rows and the columns in the gameboard
  for(var i = 0; i <= 3; i++){
    for(var j = 0; j <= 3; j++){
    // and find all that are empty
        if(this.gameBoard[i][j] === 0){
      // keep a list of the indices in a new array saved as a variable
        freeSpaces.push([i, j]);
      }
    }
  }
  return freeSpaces;
};

Game.prototype.addOneTile = function(){
  var num = Math.random();

  var result;
  if (num < 0.9) {
    result = 2;
  } else {
    result = 4;
  }

  var openSpots = this.getFreeSpaces();
  var selectedSpot = openSpots[Math.floor(Math.random() * openSpots.length)];
  this.gameBoard[selectedSpot[0]][selectedSpot[1]] = result;
  console.log(this.gameBoard[selectedSpot[0]][selectedSpot[1]]);
  console.log(selectedSpot, result);
  return result;
};

Game.prototype.showBoard = function() {
  var self = this;
  $('.tile').remove();

  for (var r = 0; r <= 3; r++) {
    for (var c = 0; c <= 3; c++) {
      if (this.gameBoard[r][c] > 0) {
        var tile = this.gameBoard[r][c];
        $('#gameboard').append('<div class="tile" data-row=r' + r + ' data-col=c' + c + ' data-val=' + tile + '>' + tile + '</div>');
      }
    }
  }
};
