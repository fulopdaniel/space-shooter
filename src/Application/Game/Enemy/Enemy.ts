import * as PIXI from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../shared/const";
import Spaceship from "../Spaceship/Spaceship";

class Enemy extends Spaceship {
  vx: number;
  vy: number;
  elapsedTime: number;
  speed: number;

  constructor(stage: PIXI.Container, loader: PIXI.Loader, speed: number) {
    const spriteImage = "img/enemy/spaceship.png";
    const position = {
      x: CANVAS_WIDTH + 200,
      y: Math.floor(Math.random() * (CANVAS_HEIGHT - 200)),
    };
    const scale = 0.8;
    const direction = -1;
    const canMoveOutOfBounds = true;
    super(
      stage,
      loader,
      spriteImage,
      position,
      scale,
      direction,
      canMoveOutOfBounds
    );

    this.speed = speed;
    this.elapsedTime = 0;
    this.vx = -this.speed;
    this.vy = this.getRandomVerticalSpeedUpTo(this.speed * 2);
  }

  getRandomVerticalSpeedUpTo(maximum: number) {
    return maximum - Math.floor(Math.random() * maximum * 2);
  }

  loop(delta: number) {
    super.loop(delta);
    this.elapsedTime += delta;
    if (!this.spaceship.visible) {
      this.vx = 0;
      this.vy = 0;
    } else if (this.elapsedTime > 20) {
      this.vy = this.getRandomVerticalSpeedUpTo(this.speed * 2);
      this.elapsedTime = 0;
    }
  }
}

export default Enemy;
