'use strict';

class SpaceShip { // eslint-disable-line

  constructor(stage) {
    const texture = PIXI.utils.TextureCache['carrier.png'];
    const sprite  = new PIXI.Sprite(texture);

    utils.resizeSprite(sprite, 100);
    stage.addChild(sprite);

    this.sprite = sprite;
    this.stage  = stage;

    this.vr = 0;
    this.angle = 0;
    this.speed = 0;

    this.sprite.x = 50;
    this.sprite.y = 50;
    this.sprite.anchor.x = 0.25;
    this.sprite.anchor.y = 0.5;
  }

  accelerateToAngle(angle) {
    const dr = utils.keepAngleInBounds(angle - this.angle);

    this.vr += dr / 100;
    this.vr = Math.min(this.vr, 0.03);
    this.vr = Math.max(this.vr, -0.03);

    if (-Math.PI / 3 < dr && dr < Math.PI / 3) {
      this.speed += 0.5;
      this.speed = Math.min(this.speed, 5);
    }
  }

  update() {
    this.angle += this.vr;
    this.angle = utils.keepAngleInBounds(this.angle);

    const dx = this.speed * Math.cos(this.angle);
    const dy = this.speed * Math.sin(this.angle);

    this.vr *= 0.80;
    this.speed *= 0.95;

    this.sprite.x += dx;
    this.sprite.y += dy;
    this.sprite.rotation = this.angle;
  }

}
