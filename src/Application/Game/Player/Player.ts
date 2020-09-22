import * as PIXI from "pixi.js";
import Input from "../../Input/Input";
import { isColliding } from "../../../shared/util";
import Enemy from "../Enemy/Enemy";
import Spaceship from "../Spaceship/Spaceship";

const DEFAULT_VELOCITY = 5;

class Player extends Spaceship {
  vx: number;
  vy: number;
  enemies: Enemy[];

  constructor(stage: PIXI.Container, loader: PIXI.Loader, enemies: Enemy[]) {
    const spriteImage = "img/spaceship/spaceship.png";
    const position = { x: 200, y: 200 };
    const scale = 0.9;
    const direction = 1;
    super(stage, loader, spriteImage, position, scale, direction);
    this.enemies = enemies;
    this.setupControls();
  }

  setupControls() {
    this.controls = {};
    this.controls["ArrowRight"] = new Input(
      "ArrowRight",
      () => {
        this.vx += DEFAULT_VELOCITY;
      },
      () => {
        this.vx -= DEFAULT_VELOCITY;
      }
    );
    this.controls["ArrowUp"] = new Input(
      "ArrowUp",
      () => {
        this.vy -= DEFAULT_VELOCITY;
      },
      () => {
        this.vy += DEFAULT_VELOCITY;
      }
    );
    this.controls["ArrowLeft"] = new Input(
      "ArrowLeft",
      () => {
        this.vx -= DEFAULT_VELOCITY;
      },
      () => {
        this.vx += DEFAULT_VELOCITY;
      }
    );
    this.controls["ArrowDown"] = new Input(
      "ArrowDown",
      () => {
        this.vy += DEFAULT_VELOCITY;
      },
      () => {
        this.vy -= DEFAULT_VELOCITY;
      }
    );
    this.controls[" "] = new Input(
      " ",
      () => {
        super.shoot();
      },
      () => {}
    );
  }

  destroyShip(endGame?: any) {
    super.destroyShip();
    this.explosion.onComplete = () => {
      endGame();
    };
    Object.keys(this.controls).forEach((key) => {
      this.controls[key].unsubscribe();
    });
  }
}

export default Player;
