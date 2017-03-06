'use strict';

const Keyboard  = require('./io/keyboard');
const SpaceShip = require('./spaceship');
const utils     = require('./utils');

class App {

  constructor() {
    this.renderer = new PIXI.WebGLRenderer(800, 400);
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
    utils.resizeSprite(sprite, 800);
    this.stage.addChild(sprite);

    this.keyboard  = new Keyboard();
    this.spaceShip = new SpaceShip(this.stage);

    this.stage.on('mousedown', evt => {
      const pos = evt.data.global;
      this.spaceShip.setTargetPosition(pos.x, pos.y);
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
    this.spaceShip.update(elapsedTime);
  }

  render() {
    this.renderer.render(this.stage);
  }

}

// -----------------------------------------------------------------------------
// STARTUP
// -----------------------------------------------------------------------------

const app = new App();
app.load();
