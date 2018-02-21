'use strict';

const PIXI             = require('pixi.js');
const FxParticle       = require('./fx-particle');
const FxParticleConfig = require('./fx-particleconfig');

class FxEmitter {

  constructor(container) {
    this.particlesConfig     = new FxParticleConfig();
    this.particlesDiffConfig = new FxParticleConfig();
    this.maxParticles        = 1000;
    this.continuous          = true;
    this.duration            = 0;
    this.delay               = 0;
    this.x                   = 0;
    this.y                   = 0;
    this.gravityX            = 0;
    this.gravityY            = 0;

    this._container        = container;
    this._texture          = PIXI.utils.TextureCache['particle.png'];
    this._particles        = [];
    this._currentTime      = 0;
    this._nextParticleTime = 0;
    this._killed           = false;
  }

  scaleBy(scale) {
    this.particlesConfig.scaleBy(scale);
    this.particlesDiffConfig.scaleBy(scale);
  }

  getFullDuration() {
    return this.delay + this.duration + this.particlesConfig.lifespan;
  }

  getProgress() {
    const duration = this.getFullDuration();
    if (this.continuous || duration === 0) { return -1; }
    return this._currentTime / duration;
  }

  kill() {
    this._killed = true;
  }

  isKilled() {
    return this._killed;
  }

  restart() {
    this._killed           = false;
    this._currentTime      = 0;
    this._nextParticleTime = 0;
  }

  restartIfKilled() {
    if (this.isKilled()) {
      this.restart();
    }
  }

  isFinished() {
    return this._killed || this._currentTime > this.getFullDuration();
  }

  getParticlesCount() {
    return this._particles.length;
  }

  update(elapsedTime) {
    this._currentTime += elapsedTime;

    const shouldUpdate = !this._killed
      && (this.continuous || this._currentTime > this.delay && this._currentTime < this.delay + this.duration)
      && this.maxParticles > 0
      && this.particlesConfig.lifespan > 0;

    if (shouldUpdate) {
      const step = this.particlesConfig.lifespan / this.maxParticles;

      while (this._nextParticleTime < this._currentTime) {
        this._nextParticleTime += step;

        const newConfig = new FxParticleConfig();
        newConfig.copyFrom(this.particlesConfig);
        newConfig.x += this.x;
        newConfig.y += this.y;
        newConfig.randomize(this.particlesDiffConfig);
        newConfig.clamp();

        const newParticle = new FxParticle(this._texture, this._container, newConfig);
        this._particles.push(newParticle);
      }
    }

    for (let i = this._particles.length - 1; i >= 0; --i) {
      const particle = this._particles[i];
      if (!particle.enabled) {
        particle.dispose();
        this._particles.splice(i, 1);
      }
    }

    for (let i = 0; i < this._particles.length; ++i) {
      this._particles[i].update(elapsedTime, this.gravityX, this.gravityY);
    }
  }

}

module.exports = FxEmitter;
