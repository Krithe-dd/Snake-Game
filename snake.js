import { inputDirection } from "./game.js";
export const snakeBody = [

  { x: 11, y: 7},
  { x: 11, y: 8 },
  { x: 11, y: 9 },
  { x: 11, y: 10 },
  { x: 11, y: 11 },
  { x: 11, y: 12 },

];

export function update() {

  const direction = inputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].y += direction.y;
  snakeBody[0].x += direction.x;
}
export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

export function onFood(food) {
  return snakeBody.some(part=>{
    return equalPositions(part,food)
  })
}
function equalPositions(pos1,pos2){
  return pos1.x === pos2.x && pos1.y === pos2.y
}
export function expandSnake() {
  snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
}
export function checkDeath() {
  return bodyPartCollide() || outOfRange();
}
function outOfRange() {
  return (
    snakeBody[0].x < 1 ||
    snakeBody[0].x > 21 ||
    snakeBody[0].y < 1 ||
    snakeBody[0].y > 21
  );
}
function bodyPartCollide() {
  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeBody[0].x === snakeBody[i].x &&
      snakeBody[0].y === snakeBody[i].y
    ) {
      return true;
    }
  }
  return false;
}
