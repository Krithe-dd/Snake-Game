import { onFood } from "./snake.js";
import { expandSnake } from "./snake.js";
export let food = { x: 10, y: 10 };
export function update() {
  if (onFood(food)) {
    expandSnake();
    food = randomFoodPosition();
  }
}
export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}
function randomFoodPosition() {
    let pos;
  if(pos == null || onFood(pos)){
    pos = foodPosition()
  }
  return pos
}
function foodPosition(){
    return {
        x: Math.floor(Math.random()  * 21) + 1,
        y: Math.floor(Math.random() * 21)+ 1,
      }
}
