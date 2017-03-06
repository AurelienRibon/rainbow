'use strict';

class Color {

  constructor() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
  }

  clamp() {
    this.r = Math.max(this.r, 0);
    this.g = Math.max(this.g, 0);
    this.b = Math.max(this.b, 0);
    this.a = Math.max(this.a, 0);
    this.r = Math.min(this.r, 0xFF);
    this.g = Math.min(this.g, 0xFF);
    this.b = Math.min(this.b, 0xFF);
    this.a = Math.min(this.a, 1);
  }

  toRGBA() {
    return toRGBA(this.r, this.g, this.b, this.a);
  }

  toRGB() {
    return toRGB(this.r, this.g, this.b);
  }

  fromRGBA(rgba) {
    this.r = (rgba >> 24) & 0xFF;
    this.g = (rgba >> 16) & 0xFF;
    this.b = (rgba >> 8) & 0xFF;
    this.a = (rgba & 0xFF) / 0xFF;
    return this;
  }

  fromRGB(rgb) {
    this.r = (rgb >> 16) & 0xFF;
    this.g = (rgb >> 8) & 0xFF;
    this.b = rgb & 0xFF;
    this.a = 1;
    return this;
  }

  interpolateRGBA(targetColor, time) {
    const r = time * (targetColor.r - this.r) + this.r;
    const g = time * (targetColor.g - this.g) + this.g;
    const b = time * (targetColor.b - this.b) + this.b;
    const a = time * (targetColor.a - this.a) + this.a;
    return toRGBA(r, g, b, a);
  }

}

module.exports = Color;

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

function toRGBA(r, g, b, a) {
  return (r << 24) + (g << 16) + (b << 8) + (a * 0xFF);
}

function toRGB(r, g, b) {
  return (r << 16) + (g << 8) + b;
}
