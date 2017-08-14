'use strict';

const Color = require('../misc/color');
const utils = require('../utils');

class FxParticleConfig {

  constructor() {
    this.lifespan   = 0;
    this.startSize  = 0;
    this.endSize    = 0;
    this.startRot   = 0;
    this.endRot     = 0;
    this.startColor = new Color();
    this.endColor   = new Color();
    this.x          = 0;
    this.y          = 0;
    this.speed      = 0;
    this.angle      = 0;
  }

  copyFrom(config) {
    copyConfig(config, this);
  }

  randomize(diffConfig) {
    this.lifespan     += utils.random(-diffConfig.lifespan, diffConfig.lifespan);
    this.startSize    += utils.random(-diffConfig.startSize, diffConfig.startSize);
    this.endSize      += utils.random(-diffConfig.endSize, diffConfig.endSize);
    this.startRot     += utils.random(-diffConfig.startRot, diffConfig.startRot);
    this.endRot       += utils.random(-diffConfig.endRot, diffConfig.endRot);
    this.startColor.r += utils.random(-diffConfig.startColor.r, diffConfig.startColor.r);
    this.startColor.g += utils.random(-diffConfig.startColor.g, diffConfig.startColor.g);
    this.startColor.b += utils.random(-diffConfig.startColor.b, diffConfig.startColor.b);
    this.startColor.a += utils.random(-diffConfig.startColor.a, diffConfig.startColor.a);
    this.endColor.r   += utils.random(-diffConfig.endColor.r, diffConfig.endColor.r);
    this.endColor.g   += utils.random(-diffConfig.endColor.g, diffConfig.endColor.g);
    this.endColor.b   += utils.random(-diffConfig.endColor.b, diffConfig.endColor.b);
    this.endColor.a   += utils.random(-diffConfig.endColor.a, diffConfig.endColor.a);
    this.x            += utils.random(-diffConfig.x, diffConfig.x);
    this.y            += utils.random(-diffConfig.y, diffConfig.y);
    this.speed        += utils.random(-diffConfig.speed, diffConfig.speed);
    this.angle        += utils.random(-diffConfig.angle, diffConfig.angle);
  }

  clamp() {
    this.lifespan  = Math.max(this.lifespan, 0);
    this.startSize = Math.max(this.startSize, 0.01);
    this.endSize   = Math.max(this.endSize, 0.01);
    this.startColor.clamp();
    this.endColor.clamp();
  }

  scaleBy(scale) {
    this.startSize *= scale;
    this.endSize   *= scale;
    this.x         *= scale;
    this.y         *= scale;
    this.speed     *= scale;
  }

}

module.exports = FxParticleConfig;

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

function copyConfig(source, target) {
  if (source.lifespan !== undefined) {
    target.lifespan = source.lifespan;
  }

  if (source.startSize !== undefined) {
    target.startSize = source.startSize;
  }

  if (source.endSize !== undefined) {
    target.endSize = source.endSize;
  }

  if (source.startRot !== undefined) {
    target.startRot = source.startRot;
  }

  if (source.endRot !== undefined) {
    target.endRot = source.endRot;
  }

  if (source.startColor !== undefined) {
    target.startColor.r = source.startColor.r;
    target.startColor.g = source.startColor.g;
    target.startColor.b = source.startColor.b;
    target.startColor.a = source.startColor.a;
  }

  if (source.endColor !== undefined) {
    target.endColor.r = source.endColor.r;
    target.endColor.g = source.endColor.g;
    target.endColor.b = source.endColor.b;
    target.endColor.a = source.endColor.a;
  }

  if (source.x !== undefined) {
    target.x = source.x;
  }

  if (source.y !== undefined) {
    target.y = source.y;
  }

  if (source.speed !== undefined) {
    target.speed = source.speed;
  }

  if (source.angle !== undefined) {
    target.angle = source.angle;
  }
}
