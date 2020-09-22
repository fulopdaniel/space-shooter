import * as PIXI from "pixi.js";

class Exhaust {
  exhaust: PIXI.AnimatedSprite;
  stage: PIXI.Container;
  loader: PIXI.Loader;
  width: number;
  direction: number;

  constructor(
    stage: PIXI.Container,
    loader: PIXI.Loader,
    width: number,
    direction: number
  ) {
    this.stage = stage;
    this.loader = loader;
    this.width = width;
    this.direction = direction;
  }

  setup() {
    this.exhaust = new PIXI.AnimatedSprite([
      this.loader.resources["img/spaceship/exhaust/exhaust1.png"].texture,
      this.loader.resources["img/spaceship/exhaust/exhaust2.png"].texture,
      this.loader.resources["img/spaceship/exhaust/exhaust3.png"].texture,
      this.loader.resources["img/spaceship/exhaust/exhaust4.png"].texture,
    ]);
    const aspectRatio = this.exhaust.width / this.exhaust.height;
    this.exhaust.width = this.width;
    this.exhaust.height = this.exhaust.width / aspectRatio;
    this.exhaust.animationSpeed = 0.1;
    this.exhaust.visible = false;
    this.exhaust.position.x = -this.width;
    this.exhaust.play();
  }

  loop(vx: number) {
    if (this.direction === 1 ? vx > 0 : vx < 0) {
      this.exhaust.visible = true;
    } else {
      this.exhaust.visible = false;
    }
  }
}

export default Exhaust;
