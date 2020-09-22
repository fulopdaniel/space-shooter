import * as PIXI from "pixi.js";
import Input from "../../Input/Input";
import { CANVAS_HEIGHT } from "../../../shared/const";
import Spaceship from "../Spaceship/Spaceship";

const DEFAULT_VELOCITY = 2;
const VERTICAL_VELOCITY_RANGE = 3;

class Enemy extends Spaceship {
  vx: number;
  vy: number;
  elapsedTime: number;
  speed: number;

  constructor(stage: PIXI.Container, loader: PIXI.Loader, speed: number) {
    const spriteImage = "img/enemy/spaceship.png";
    const position = {
      x: 1000,
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
      this.vy = this.getRandomVerticalSpeedUpTo(VERTICAL_VELOCITY_RANGE);
      this.elapsedTime = 0;
    }
  }
}

export default Enemy;
