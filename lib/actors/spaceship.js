'use strict';

const FxEmitter = require('../fx/fx-emitter');
const utils     = require('../utils');

class SpaceShip {

  constructor(stage) {
    this.linearSpeed    = 0;
    this.angularSpeed   = 0;
    this.direction      = 0;
    this.position       = { x: 70, y: 50 };
    this.targetPosition = { x: 70, y: 50 };
    this.stage          = stage;

    const fxStage = new PIXI.Container();
    stage.addChild(fxStage);

    const texture = PIXI.utils.TextureCache['carrier.png'];
    this.sprite   = new PIXI.Sprite(texture);

    utils.resizeSprite(this.sprite, 100);
    stage.addChild(this.sprite);

    this.sprite.anchor.x = 0.4;
    this.sprite.anchor.y = 0.5;

    this._setupEngineFX(fxStage);
  }

  setTargetPosition(x, y) {
    this.targetPosition.x = x;
    this.targetPosition.y = y;
  }

  update(elapsedTime) {
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

    // Update engine FX
    if (acceleration === 0) {
      this.engineEmitter.kill();
    } else if (this.engineEmitter.isKilled()) {
      this.engineEmitter.restart();
    }
    const engineOffset = utils.rotateVector({ x: -25, y: 0 }, this.direction);
    this.engineEmitter.x = this.position.x + engineOffset.x;
    this.engineEmitter.y = this.position.y + engineOffset.y;
    this.engineEmitter.particlesConfig.speed = -acceleration * 1000;
    this.engineEmitter.particlesConfig.angle = this.direction;
    this.engineEmitter.particlesConfig.startSize = acceleration * 300;
    this.engineEmitter.update(elapsedTime);
  }

  _setupEngineFX(fxStage) {
    this.engineEmitter = new FxEmitter(fxStage);
    this.engineEmitter.maxParticles = 50;

    this.engineEmitter.particlesConfig.copyFrom({
      lifespan   : 0.6,
      startColor : { r: 244, g: 10, b: 10, a: 1 },
      endColor   : { r: 255, g: 235, b: 59, a: 0 },
      speed      : 0
    });

    this.engineEmitter.particlesDiffConfig.copyFrom({
      lifespan   : 0.1,
      speed      : 10,
      angle      : 0.3
    });
  }

}

module.exports = SpaceShip;
