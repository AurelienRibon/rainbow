'use strict';

class SpaceShip { // eslint-disable-line

  constructor(stage) {
    const texture = PIXI.utils.TextureCache['carrier.png'];
    const sprite  = new PIXI.Sprite(texture);

    this._resizeSprite(sprite, 100);
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
    const pi = Math.PI;

    let dr = angle - this.angle;

    if (dr < -pi) { dr += pi * 2; }
    if (dr > +pi) { dr -= pi * 2; }

    this.vr += dr / 100;
    this.vr = Math.min(this.vr, 0.03);
    this.vr = Math.max(this.vr, -0.03);

    if (-pi/3 < dr && dr < pi/3) {
      this.speed += 0.5;
      this.speed = Math.min(this.speed, 5);
    }
  }

  update() {
    this.angle += this.vr;

    while (this.angle > Math.PI) {
      this.angle -= 2 * Math.PI;
    }

    while (this.angle < -Math.PI) {
      this.angle += 2 * Math.PI;
    }

    const dx = this.speed * Math.cos(this.angle);
    const dy = this.speed * Math.sin(this.angle);

    this.vr *= 0.80;
    this.speed *= 0.95;

    this.sprite.x += dx;
    this.sprite.y += dy;
    this.sprite.rotation = this.angle;
  }

  _resizeSprite(sprite, width) {
    const ratio   = sprite.width / sprite.height;
    sprite.width  = width;
    sprite.height = width / ratio;
  }

}
