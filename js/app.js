const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

const parsedCollisions = collisionsLeve1.parse2D();
const collisionBlocks = parsedCollisions.createObjectsFrom2D();

const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "img/backgrounds/Map1.png",
});

const wizard = new Sprite({
  position: {
    x: 864,
    y: 276,
  },
  imageSrc: "img/characters/wizard/IdleL.png",
  frameRate: 6,
  frameBuffer: 12,
  
});

/*c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);*/

const player = new Player({
  collisionBlocks,
  imageSrc: "img/characters/player/idleR.png",
  frameRate: 4,
  animations: {
    idleRight: {
      frameRate: 4,
      frameBuffer: 24,
      loop: true,
      imageSrc: "img/characters/player/idleR.png",
    },
    idleLeft: {
      frameRate: 4,
      frameBuffer: 24,
      loop: true,
      imageSrc: "img/characters/player/idleL.png",
    },
    runRight: {
      frameRate: 7,
      frameBuffer: 14,
      loop: true,
      imageSrc: "img/characters/player/walkingR.png",
    },
    runLeft: {
      frameRate: 7,
      frameBuffer: 14,
      loop: true,
      imageSrc: "img/characters/player/walkingL.png",
    },
  },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);

  backgroundLevel1.draw();
  collisionBlocks.forEach((block) => {
    block.draw();
  });

  /*chatBubbles.forEach((bubble) => {
    bubble.update();
    bubble.draw();
  });*/

  for (const bubble of chatBubbles) {
    bubble.calculateDimensions(c);
    bubble.update(canvas);
    bubble.draw(c);
  }
  
  wizard.draw();
  player.handleInput(keys);

  player.draw();
  player.update();
}

animate();
