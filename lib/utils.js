'use strict';

const utils = { // eslint-disable-line

  keepAngleInBounds(angle) {
    while (angle > +Math.PI) { angle -= 2 * Math.PI; }
    while (angle < -Math.PI) { angle += 2 * Math.PI; }
    return angle;
  },

  resizeSprite(sprite, targetWidth) {
    const ratio   = sprite.width / sprite.height;
    sprite.width  = targetWidth;
    sprite.height = targetWidth / ratio;
  }

};
