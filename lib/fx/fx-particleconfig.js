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
    this.lifespan     = config.lifespan;
    this.startSize    = config.startSize;
    this.endSize      = config.endSize;
    this.startRot     = config.startRot;
    this.endRot       = config.endRot;
    this.startColor.r = config.startColor.r;
    this.startColor.g = config.startColor.g;
    this.startColor.b = config.startColor.b;
    this.startColor.a = config.startColor.a;
    this.endColor.r   = config.endColor.r;
    this.endColor.g   = config.endColor.g;
    this.endColor.b   = config.endColor.b;
    this.endColor.a   = config.endColor.a;
    this.x            = config.x;
    this.y            = config.y;
    this.speed        = config.speed;
    this.angle        = config.angle;
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
