class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations }) {
    super({ imageSrc, frameRate, animations });
    this.position = {
      x: 32,
      y: 200,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 32;
    this.height = 32;
    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 0.5;
    this.jumpForce = -8;
    this.moveSpeed = 1.5;

    this.collisionBlocks = collisionBlocks;
  }

  update(deltaTime) {
    super.update(deltaTime);
    
    const deltaMultiplier = deltaTime / 16.67; // 60 FPS base
    
    this.position.x += this.velocity.x * deltaMultiplier;

    this.updateHitbox();

    this.checkForHorizontalCollision();
    this.applyGravity(deltaMultiplier);

    this.updateHitbox();

    this.checkForVerticalCollision();
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.elapsedTime = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameDuration = this.animations[name].frameDuration || 200;
    this.loop = this.animations[name].loop;
    this.currentAnimation = this.animations[name];
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 35,
        y: this.position.y + 0,
      },
      width: 30,
      height: this.height,
    };
  }

  applyGravity(deltaMultiplier) {
    this.velocity.y += this.gravity * deltaMultiplier;
    this.position.y += this.velocity.y * deltaMultiplier;
  }

  checkForHorizontalCollision() {
    for (const element of this.collisionBlocks) {
      const collisionBlock = element;
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  checkForVerticalCollision() {
    for (const element of this.collisionBlocks) {
      const collisionBlock = element;
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }

  handleInput(keys) {
    if (player.preventInput) return;
    this.velocity.x = 0;
    if (keys.d.pressed) {
      this.switchSprite("runRight");
      this.velocity.x = this.moveSpeed;
      this.lastDirection = "right";
    } else if (keys.a.pressed) {
      this.switchSprite("runLeft");
      this.velocity.x = -this.moveSpeed;
      this.lastDirection = "left";
    } else {
      if (this.lastDirection === "left") this.switchSprite("idleLeft");
      else this.switchSprite("idleRight");
    }
  }

  jump() {
    if (this.velocity.y === 0) this.velocity.y = this.jumpForce;
  }
}
