const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let cellSize = 20;
let snake = [{ x: 100, y: 100 }];
let direction = { x: cellSize, y: 0 };
let food = {};
let score = 0;
let paused = false;
let gameLoop;

function drawRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cellSize, cellSize);
}

function spawnFood() {
  food.x = Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize;
  food.y = Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach(part => drawRect(part.x, part.y, "lime"));
  drawRect(food.x, food.y, "red");
  ctx.fillStyle = "white";
  ctx.fillText("Punkty: " + score, 10, 20);
}

function move() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.some(p => p.x === head.x && p.y === head.y)
  ) {
    clearInterval(gameLoop);
    alert("Koniec gry! Punkty: " + score);
    location.reload();
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    spawnFood();
  } else {
    snake.pop();
  }
}

function gameStep() {
  if (!paused) {
    move();
    draw();
  }
}

function startGame() {
  document.getElementById("menu").style.display = "none";
  spawnFood();
  gameLoop = setInterval(gameStep, 100);
}

function resumeGame() {
  paused = false;
  document.getElementById("pauseMenu").style.display = "none";
}

function restartGame() {
  location.reload();
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    paused = !paused;
    document.getElementById("pauseMenu").style.display = paused ? "block" : "none";
  } else if (e.key === "ArrowUp" && direction.y === 0)
    direction = { x: 0, y: -cellSize };
  else if (e.key === "ArrowDown" && direction.y === 0)
    direction = { x: 0, y: cellSize };
  else if (e.key === "ArrowLeft" && direction.x === 0)
    direction = { x: -cellSize, y: 0 };
  else if (e.key === "ArrowRight" && direction.x === 0)
    direction = { x: cellSize, y: 0 };
});

// Pokaz menu startowe
document.getElementById("menu").style.display = "block";