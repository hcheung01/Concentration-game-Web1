
      var resetButton = document.getElementById("reset-button");
      var firstSquare = null;
      var gameSquares = [];
      // Loop to push square color values
      var colors = [];
      for (var i = 0; i < 10; i++) {
        colors.push('square-' + i);
      }
      // Function to return random integer for assigning square colors
      function random(n) {
        return Math.floor(Math.random() * n);
      }
      // Function to assign some random colors
      function getSomeColors() {
        var colorscopy = colors.slice();
        var randomColors = [];
        for (var i = 0; i < 8; i++) {
          var index = random(colorscopy.length);
          randomColors.push(colorscopy.splice(index, 1)[0]);
        }
        return randomColors.concat(randomColors.slice());
      }
      // Function to randomize colors at new game
      function randomizeColors() {
        var randomColors = getSomeColors();
        // For each game square, assign a random color
        gameSquares.forEach(function(gameSquare) {
          var color = randomColors.splice(random(randomColors.length), 1)[0];
          gameSquare.setColor(color);
        });
      }
      resetButton.onclick = function() {
        clearGame();
      }
      // Function for a game square's behavior
      function GameSquare(el, color) {
        this.el = el;
        this.isOpen = false;
        this.isLocked = false;
        this.el.addEventListener("click", this, false);
        this.setColor(color); // <-- Set the color!
      }
      // Method to decide action in response to event listener
      GameSquare.prototype.handleEvent = function(e) {
        switch (e.type) {
          case "click":
            if (this.isOpen || this.isLocked) {
              return;
            }
            this.isOpen = true;
            this.el.classList.add('flip');
            checkGame(this); // <- check the game here!
        }
      }
      // Method to reset game square to initial state
      GameSquare.prototype.reset = function() {
        this.isOpen = false;
        this.isLocked = false;
        this.el.classList.remove('flip');
      }
      // Method to lock square pairs on correct match
      GameSquare.prototype.lock = function() {
        this.isLocked = true;
        this.isOpen = true;
      }
      // Method to set and alter colors of each square
      GameSquare.prototype.setColor = function(color) {
        this.el.children[0].children[1].classList.remove(this.color);
        this.color = color;
        this.el.children[0].children[1].classList.add(color);
      }
      // Function to set up and initialize game
      function setupGame() {
        var array = document.getElementsByClassName("game-square");
        var randomColors = getSomeColors();             // Get an array of 8 random color pairs
        for (var i = 0; i < array.length; i++) {
          var index = random(randomColors.length);      // Get a random index
          var color = randomColors.splice(index, 1)[0]; // Get the color at that index
          // Use that color to initialize the GameSquare
          gameSquares.push(new GameSquare(array[i], color));
        }
      }
      // Function for game square logic
      function checkGame(gameSquare) {
        if (firstSquare === null) {
          firstSquare = gameSquare;
          return
        }
        if (firstSquare.color === gameSquare.color) {
          firstSquare.lock();
          gameSquare.lock();
        } else {
          var a = firstSquare;
          var b = gameSquare;
          setTimeout(function() {
            a.reset();
            b.reset();
            firstSquare = null;
          }, 400);
        }
        firstSquare = null;
      }
            // Function to clear game
            function clearGame() {
              // Reset each game square
              gameSquares.forEach(function(gameSquare) {
                gameSquare.reset();
              });
              // Timeout that randomizes colors and gives squares a chance to close
              setTimeout(function() {
                randomizeColors();
              }, 500);
            }
      // Call function to start game
      setupGame();
