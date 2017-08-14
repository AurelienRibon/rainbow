'use strict';

exports.keepAngleInBounds = function(angle) {
  while (angle > +Math.PI) { angle -= 2 * Math.PI; }
  while (angle < -Math.PI) { angle += 2 * Math.PI; }
  return angle;
};

exports.keepInBounds = function(value, min, max) {
  value = Math.min(value, max);
  value = Math.max(value, min);
  return value;
};

exports.resizeSprite = function(sprite, targetWidth) {
  const ratio   = sprite.width / sprite.height;
  sprite.width  = targetWidth;
  sprite.height = targetWidth / ratio;
};

exports.random = function(min, max) {
  return Math.random() * (max - min) + min;
};

exports.rotateVector = function(vector, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const x   = vector.x;
  const y   = vector.y;
  vector.x = cos * x - sin * y;
  vector.y = sin * x + cos * y;
  return vector;
};
