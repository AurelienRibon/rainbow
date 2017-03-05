'use strict';

class Keyboard {

  constructor() {
    this.states  = new Array(300).fill(0);
    this.keysMap = {
      left  : 37,
      up    : 38,
      right : 39,
      down  : 40
    };

    const keyCodes    = Object.keys(this.keysMap).map(it => this.keysMap[it]);
    const keyCodesSet = new Set(keyCodes);

    window.addEventListener('keydown', event => {
      if (!keyCodesSet.has(event.keyCode)) { return; }
      this.states[event.keyCode] = true;
      event.preventDefault();
    });

    window.addEventListener('keyup', event => {
      if (!keyCodesSet.has(event.keyCode)) { return; }
      this.states[event.keyCode] = false;
      event.preventDefault();
    });
  }

  isKeyDown(keyName) {
    const keyCode = this.keysMap[keyName];
    return this.states[keyCode];
  }

}

module.exports = Keyboard;
