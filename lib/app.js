'use strict';

class App { // eslint-disable-line

  constructor() {
    this.renderer = new PIXI.WebGLRenderer(400, 400);
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
    this.renderer.render(this.stage);
  }

  load() {
    PIXI.loader
      .add('assets/sprites.json')
      .load(() => this.setup());
  }

  setup() {
    this.keyboard  = new Keyboard();
    this.spaceShip = new SpaceShip(this.stage);

    let lastMillis = Date.now();

    const gameLoop = () => {
      const currentMillis = Date.now();
      const elapsedTime   = currentMillis - lastMillis;
      lastMillis          = currentMillis;
      this.update(elapsedTime);
      this.render();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }

  update(elapsedTime) {
    let dx = 0, dy = 0;

    if (this.keyboard.isKeyDown('left'))  { dx -= 1; }
    if (this.keyboard.isKeyDown('right')) { dx += 1; }
    if (this.keyboard.isKeyDown('up'))    { dy -= 1; }
    if (this.keyboard.isKeyDown('down'))  { dy += 1; }

    if (dx !== 0 || dy !== 0) {
      const angle = Math.atan2(dy, dx);
      this.spaceShip.accelerateToAngle(angle);
    }

    this.spaceShip.update(elapsedTime);
  }

  render() {
    this.renderer.render(this.stage);
  }

}
