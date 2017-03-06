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
