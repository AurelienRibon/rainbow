'use strict';

class SpaceShip { // eslint-disable-line

  constructor(stage) {
    const texture = PIXI.utils.TextureCache['carrier.png'];
    const sprite  = new PIXI.Sprite(texture);

    utils.resizeSprite(sprite, 100);
    stage.addChild(sprite);

    this.sprite         = sprite;
    this.stage          = stage;
    this.speed          = 0;
    this.direction      = 0;
    this.position       = { x: 70, y: 50 };
    this.targetPosition = { x: 70, y: 50 };

    this.sprite.x = 70;
    this.sprite.y = 50;
    this.sprite.anchor.x = 0.4;
    this.sprite.anchor.y = 0.5;
  }

  setTargetPosition(x, y) {
    this.targetPosition.x = x;
    this.targetPosition.y = y;
  }

  update() {
    // Compute speed
    const dx               = this.targetPosition.x - this.position.x;
    const dy               = this.targetPosition.y - this.position.y;
    const distanceToTarget = Math.sqrt(dx *  dx + dy * dy);
    const acceleration     = utils.keepInBounds((distanceToTarget - 50) * 0.01, 0, 0.1);

    this.speed += acceleration;
    this.speed = utils.keepInBounds(this.speed, 0, 5);

    // Compute direction
    const targetAngle = Math.atan2(this.targetPosition.y - this.position.y, this.targetPosition.x - this.position.x);
    const diffAngle   = utils.keepAngleInBounds(targetAngle - this.direction);
    const torque      = utils.keepInBounds(diffAngle * this.speed * 0.007, -0.05, 0.05);

    this.direction += torque;
    this.direction = utils.keepAngleInBounds(this.direction);

    // Update position
    this.position.x += this.speed * Math.cos(this.direction);
    this.position.y += this.speed * Math.sin(this.direction);

    // Apply damping
    if (distanceToTarget < 150) {
      this.speed *= 0.95;
    }

    // Update sprite
    this.sprite.x        = this.position.x;
    this.sprite.y        = this.position.y;
    this.sprite.rotation = this.direction;
  }

}
