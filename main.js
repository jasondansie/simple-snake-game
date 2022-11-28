let canvas = document.getElementById("Canvas");

let context = canvas.getContext("2d");

let gradient = context.createLinearGradient(0, 0, 400, 0);
gradient.addColorStop(0, "green");
gradient.addColorStop(1, "white");

// Fill with gradient
context.fillStyle = gradient;
context.fillRect(0, 0, 400, 400);

function Snake() {

    const random_num = (min, max) =>{
        return Math.round((Math.random() * (max-min) + min));
      }

    // defing some styling colors for snake body and border
    const colors =["red", "blue", "orange", "magenta", "purple","yellow", "black"]
    const boardColor = 'black';
    let appleColor;
    let snakeBodyColor;
   
    const changeAppleColor = () =>{
        
        appleColor = colors[random_num(3,6)];
        console.log(appleColor);
    }
    const changeSnakeColor = () => {
        snakeBodyColor = colors[random_num(0,6)];
        if (snakeBodyColor == appleColor) {
            changeSnakeColor();
        }
    }
  
      // As using func. prog. approach so no need of constructor func.
      // snake body should be multi arry
  
      let snakebody = [
        {x: 200, y: 200},
        {x: 190, y: 200},
        {x: 180, y: 200},
        {x: 170, y: 200},
        {x: 160, y: 200}
      ]
  
      let changingDirection = false;
      // Horizontal velocity
      let dx = 10;
      // Vertical velocity
      let dy = 0;

      let food_x;
      let food_y;
  
      // Show game on canvas
      const snakeBoarder = canvas.getContext("2d");
      // Start game
      main();
      changeAppleColor();
      changeSnakeColor();
      
  
      document.addEventListener("keydown", change_direction);
  
      // Calling this func. repeatedly to keep the game running
      function main() {
          if (has_game_ended()) return;
          changingDirection = false;
          setTimeout(function onTick() {
          clear_board();
          drawFood();
          move_snake();
          drawSnake();
          // Call main again
          main();
        }, 100)
      }
     
      // draw a border around the canvas
      function clear_board() {
        snakeBoarder.fillStyle = gradient;
        snakeBoarder.strokestyle = boardColor;
        snakeBoarder.fillRect(0, 0, canvas.width, canvas.height);
        snakeBoarder.strokeRect(0, 0, canvas.width, canvas.height);
      }
  
      // Draw the snake on the canvas
      function drawSnake() {
        // Draw each part
        snakebody.forEach(snakepart => {
            draw(snakepart);
        });
      }
  
      // Draw one part of snake body
      function draw(snakePart) {

        snakeBoarder.strokestyle = boardColor;
        snakeBoarder.fillStyle = snakeBodyColor;
        snakeBoarder.fillRect(snakePart.x, snakePart.y, 10, 10);
        
        // Draw a border around the snake part
        snakeBoarder.strokeRect(snakePart.x, snakePart.y, 10, 10);
      }

      const random_food = (min, max) =>{
        return Math.round((Math.random() * (max-min) + min)/ 10) * 10;
      }

   const drawFood = () => {

        snakeBoarder.strokestyle = 'orange';
        snakeBoarder.fillStyle = appleColor;
        snakeBoarder.fillRect(food_x, food_y, 10, 10);
        
        // Draw a border around the snake part
        snakeBoarder.strokeRect(food_x, food_y, 10, 10);
      }

    

    const genFood = () =>{
        food_x = random_food(0,canvas.width -10);
        food_y = random_food(0,canvas.height -10);

        snakebody.forEach(function eatenFood(part){
            const hasEaten = part.x == food_x && part.y == food_y;
            if(hasEaten){
                changeAppleColor();
                changeSnakeColor();
                genFood();
            } 
            changeAppleColor();
            changeSnakeColor();
        });
      }

      genFood();
  
      function has_game_ended() {
        for (let i = 4; i < snakebody.length; i++) {
          if (snakebody[i].x === snakebody[0].x && snakebody[i].y === snakebody[0].y) return true
        }
        const hitLeftWall = snakebody[0].x < 0;
        const hitRightWall = snakebody[0].x > canvas.width - 10;
        const hitToptWall = snakebody[0].y < 0;
        const hitBottomWall = snakebody[0].y > canvas.height - 10;
        return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
      }
  
  
      // keypress func. not work like this, we need keycode to use keypress event
      function change_direction(event) {
        const LEFT_KEY = 65; //     if (keypress === 'a') this.move('left');
        const RIGHT_KEY = 68;   //     if (keypress === 'd') this.move('right');
        const UP_KEY = 87;  //     if (keypress === 'w') this.move('up');
        const DOWN_KEY = 83;   //     if (keypress === 's') this.move('down');
  
        if (changingDirection) return;
        changingDirection = true;
        const keypress = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;
        if (keypress === LEFT_KEY && !goingRight) {
          dx = -10;
          dy = 0;
        }
        if (keypress === UP_KEY && !goingDown) {
          dx = 0;
          dy = -10;
        }
        if (keypress === RIGHT_KEY && !goingLeft) {
          dx = 10;
          dy = 0;
        }
        if (keypress === DOWN_KEY && !goingUp) {
          dx = 0;
          dy = 10;
        }
      }
  
      const move_snake = () => {
        // Create the new Snake's head
        const head = {x: snakebody[0].x + dx, y: snakebody[0].y + dy};
        // Add the new head to the beginning of snake body
        snakebody.unshift(head);
        const hasEatenFood =snakebody[0].x === food_x && snakebody[0].y === food_y;
        if (hasEatenFood) {
            genFood();
        }
        else{
            snakebody.pop();
        }
        
      }
  }
  Snake();
  