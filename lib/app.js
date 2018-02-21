'use strict';

const PIXI      = require('pixi.js');
const Keyboard  = require('./io/keyboard');
const SpaceShip = require('./actors/spaceship');
const utils     = require('./utils');

require('../assets/sprites.json');
require('../assets/sprites.png');
require('../assets/backgrounds/galaxy1.jpg');

const WIDTH  = 800;
const HEIGHT = 500;

module.exports = class App {

  constructor() {
    this.renderer = new PIXI.WebGLRenderer(WIDTH, HEIGHT);
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
    this.renderer.render(this.stage);

    this.stage.interactive = true;
  }

  load() {
    PIXI.loader
      .add('assets/sprites.json')
      .add('assets/backgrounds/galaxy1.jpg')
      .load(() => this.setup());
  }

  setup() {
    const texture = PIXI.utils.TextureCache['assets/backgrounds/galaxy1.jpg'];
    const sprite  = new PIXI.Sprite(texture);
    sprite.x = -WIDTH / 2;
    sprite.y = - HEIGHT / 2;
    utils.resizeSprite(sprite, WIDTH);
    this.stage.addChild(sprite);

    this.keyboard  = new Keyboard();
    this.spaceship = new SpaceShip(this.stage);

    this.stage.on('mousedown', evt => {
      const pos = evt.data.global;
      const tx = pos.x - WIDTH / 2 + this.spaceship.position.x;
      const ty = pos.y - HEIGHT / 2 + this.spaceship.position.y;
      this.spaceship.setTargetPosition(tx, ty);
    });

    let lastMillis = Date.now();

    const gameLoop = () => {
      const currentMillis = Date.now();
      const elapsedTime   = (currentMillis - lastMillis) / 1000;
      lastMillis          = currentMillis;
      this.update(elapsedTime);
      this.render();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }

  update(elapsedTime) {
    if (elapsedTime > 1) { return; }
    this.spaceship.update(elapsedTime);
    this.stage.x = WIDTH / 2 - this.spaceship.position.x;
    this.stage.y = HEIGHT / 2 - this.spaceship.position.y;
  }

  render() {
    this.renderer.render(this.stage);
  }

}
