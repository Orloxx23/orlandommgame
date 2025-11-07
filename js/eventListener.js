const inputElement = document.getElementById('message');
let isFocused = false;

window.addEventListener("keydown", (e) => {
  if (isFocused) return;
  if (player.preventInput) return;
  switch (e.key) {
    case "w":
      playerJump();
      break;
    case " ":
      playerJump();
      break;
    case "ArrowUp":
      playerJump();
      break;

    case "a":
      keys.a.pressed = true;
      break;
    case "ArrowLeft":
      keys.a.pressed = true;
      break;

    case "d":
      keys.d.pressed = true;
      break;
    case "ArrowRight":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  if (isFocused) return;
  switch (e.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "ArrowLeft":
      keys.a.pressed = false;
      break;

    case "d":
      keys.d.pressed = false;
      break;
    case "ArrowRight":
      keys.d.pressed = false;
      break;
  }
});

function playerJump() {
  player.jump();
}

let clicked = false;

inputElement.addEventListener('mousedown', () => {
  isFocused = true;
});

inputElement.addEventListener('blur', () => {
  isFocused = false;
});

