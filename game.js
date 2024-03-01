import {
  update as updateSnake,
  draw as drawSnake,
  checkDeath,
  onFood,
} from "./snake.js";
import { draw as drawFood, update as updateFood, food } from "./food.js";
const gameBoard = document.querySelector(".gameBoard");
const gameOver = document.getElementById("gameOver");
const scoreCard = document.getElementById("scoreCard");
let lastRenderTime = 0;
let score = 0
export let SNAKE_SPEED = 1;
export let inputProcessed = true;
function main(currentTime) {
  if (checkDeath()) {
    gameOver.textContent = "Game Over";
    const restartBtn = document.createElement('button')
    restartBtn.textContent = 'Restart'
    gameOver.append(restartBtn)
    restartBtn.addEventListener('click',()=>{
      window.location.reload()
    })
    return;
  }
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
    window.requestAnimationFrame(main);
    return;
  }
  lastRenderTime = currentTime;
  if (!inputProcessed) {
    inputProcessed = true;
  }
  update();
  draw();
  window.requestAnimationFrame(main);
}
function update() {
  updateSnake();

  if (onFood(food)) {
    scoreCard.textContent = `Score ${++score}`
    SNAKE_SPEED += 2;
  }
  updateFood();
}
function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}
let input = { x: 0, y: -1 };
window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      if (input.y === 1) break;
      input = { x: 0, y: -1 };
      break;
    case "ArrowRight":
      if (input.x === -1) break;
      input = { x: 1, y: 0 };
      break;
    case "ArrowDown":
      if (input.y === -1) break;
      input = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (input.x === 1) break;
      input = { x: -1, y: 0 };
      break;
  }

  inputProcessed = false;
});

export function inputDirection() {
  return input;
}
window.requestAnimationFrame(main);
