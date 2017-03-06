'use strict';

const utils = require('../utils');

class FxParticle {

  constructor(texture, container, config) {
    this.config       = config;
    this.enabled      = true;
    this._vx          = config.speed * Math.cos(config.angle);
    this._vy          = config.speed * Math.sin(config.angle);
    this._x           = config.x;
    this._y           = config.y;
    this._currentTime = 0;
    this._sprite      = new PIXI.Sprite(texture);

    this._sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this._sprite.anchor.x = 0.5;
    this._sprite.anchor.y = 0.5;
    utils.resizeSprite(this._sprite, config.startSize);
    container.addChild(this._sprite);
  }

  update(elapsedTime, ax, ay) {
    if (!this.enabled) { return; }

    this._currentTime += elapsedTime;
    this._vx += ax * elapsedTime;
    this._vy += ay * elapsedTime;
    this._x  += this._vx * elapsedTime;
    this._y  += this._vy * elapsedTime;

    const config = this.config;

    if (this._currentTime > config.lifespan) {
      this.enabled = false;
      return;
    }

    const t    = this._currentTime / config.lifespan;
    const size = t * (config.endSize - config.startSize) + config.startSize;
    const rot  = t * (config.endRot - config.startRot) + config.startRot;
    const tint = config.startColor.interpolateRGBA(config.endColor, t);

    this._sprite.x        = this._x;
    this._sprite.y        = this._y;
    this._sprite.rotation = rot + config.angle;
    this._sprite.tint     = tint >>> 8;
    this._sprite.alpha    = (tint & 0xFF) / 0xFF;
    // this._sprite.scale.x  = size / config.startSize;
    // this._sprite.scale.y  = this._sprite.scale.x;
    utils.resizeSprite(this._sprite, size);
  }

}

module.exports = FxParticle;
