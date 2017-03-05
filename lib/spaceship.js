'use strict';

class SpaceShip { // eslint-disable-line

  constructor(stage) {
    this.linearSpeed    = 0;
    this.angularSpeed   = 0;
    this.direction      = 0;
    this.position       = { x: 70, y: 50 };
    this.targetPosition = { x: 70, y: 50 };

    const texture = PIXI.utils.TextureCache['carrier.png'];
    this.sprite   = new PIXI.Sprite(texture);
    this.stage    = stage;

    utils.resizeSprite(this.sprite, 100);
    stage.addChild(this.sprite);

    this.sprite.anchor.x = 0.4;
    this.sprite.anchor.y = 0.5;
  }

  setTargetPosition(x, y) {
    this.targetPosition.x = x;
    this.targetPosition.y = y;
  }

  update() {
    // Compute forces
    const dx               = this.targetPosition.x - this.position.x;
    const dy               = this.targetPosition.y - this.position.y;
    const distanceToTarget = Math.sqrt(dx *  dx + dy * dy);
    let acceleration       = utils.keepInBounds((distanceToTarget - 50) * 0.01, 0, 0.1);

    const targetAngle      = Math.atan2(this.targetPosition.y - this.position.y, this.targetPosition.x - this.position.x);
    const diffAngle        = utils.keepAngleInBounds(targetAngle - this.direction);
    let torque             = utils.keepInBounds(diffAngle * 0.007, -0.005, 0.005);

    if (distanceToTarget < 30) {
      acceleration = 0;
      torque       = 0;
    }

    // Update speeds
    this.linearSpeed  += acceleration;
    this.linearSpeed  = utils.keepInBounds(this.linearSpeed, 0, 5);

    this.angularSpeed += torque;
    this.angularSpeed = utils.keepInBounds(this.angularSpeed, -0.1, 0.1);

    // Update direction and position
    this.direction  += this.angularSpeed;
    this.direction  = utils.keepAngleInBounds(this.direction);
    this.position.x += this.linearSpeed * Math.cos(this.direction);
    this.position.y += this.linearSpeed * Math.sin(this.direction);

    // Apply damping
    this.angularSpeed *= 0.9;

    if (distanceToTarget < 150) {
      this.linearSpeed  *= 0.95;
    }

    // Update sprite
    this.sprite.x        = this.position.x;
    this.sprite.y        = this.position.y;
    this.sprite.rotation = this.direction;
  }

}
