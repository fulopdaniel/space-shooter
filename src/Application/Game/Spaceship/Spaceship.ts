import * as PIXI from "pixi.js";
import Input from "../../Input/Input";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../shared/const";
import { Coordinate, Dictionary, Hitbox } from "../../../shared/types";
import Exhaust from "./Exhaust/Exhaust";
import Projectile from "./Projectile/Projectile";

class Spaceship {
  stage: PIXI.Container;
  spaceship: PIXI.Sprite;
  exhaust: Exhaust;
  loader: PIXI.Loader;
  vx: number;
  vy: number;
  spaceshipSprite: string;
  controls: Dictionary<Input>;
  projectiles: Projectile[];
  explosion: PIXI.AnimatedSprite;
  scale: number;
  isDestroyed = false;
  container: PIXI.Container;
  direction: number;
  initialPosition: Coordinate;
  canMoveOutOfBounds = false;

  constructor(
    stage: PIXI.Container,
    loader: PIXI.Loader,
    spaceshipSprite: string,
    initialPosition: Coordinate,
    scale: number,
    direction: number,
    canMoveOutOfBounds?: boolean
  ) {
    this.stage = stage;
    this.loader = loader;
    this.spaceshipSprite = spaceshipSprite;
    this.scale = scale;
    this.container = new PIXI.Container();
    this.initialPosition = initialPosition;
    this.direction = direction;
    this.canMoveOutOfBounds = canMoveOutOfBounds;
    this.setup();
  }

  setupShip() {
    this.spaceship = new PIXI.Sprite(
      this.loader.resources[this.spaceshipSprite].texture
    );

    this.explosion = new PIXI.AnimatedSprite([
      this.loader.resources["img/explosion/Explosion1_1.png"].texture,
      this.loader.resources["img/explosion/Explosion1_2.png"].texture,
      this.loader.resources["img/explosion/Explosion1_3.png"].texture,
      this.loader.resources["img/explosion/Explosion1_4.png"].texture,
      this.loader.resources["img/explosion/Explosion1_5.png"].texture,
      this.loader.resources["img/explosion/Explosion1_6.png"].texture,
      this.loader.resources["img/explosion/Explosion1_7.png"].texture,
      this.loader.resources["img/explosion/Explosion1_8.png"].texture,
      this.loader.resources["img/explosion/Explosion1_9.png"].texture,
      this.loader.resources["img/explosion/Explosion1_10.png"].texture,
      this.loader.resources["img/explosion/Explosion1_11.png"].texture,
    ]);

    this.explosion.animationSpeed = 0.2;
    this.explosion.loop = false;
    const ar = this.explosion.width / this.explosion.height;
    this.explosion.height = this.spaceship.height;
    this.explosion.width = ar * this.explosion.height;

    const exhaustWidth = 50;
    this.exhaust = new Exhaust(
      this.stage,
      this.loader,
      exhaustWidth,
      this.direction
    );
    this.exhaust.setup();
    this.exhaust.exhaust.position.y =
      this.spaceship.height / 2 - this.exhaust.exhaust.height / 2;

    this.vx = 0;
    this.vy = 0;

    this.container.addChild(this.exhaust.exhaust);
    this.container.addChild(this.spaceship);
    this.container.addChild(this.explosion);
    this.stage.addChild(this.container);
    this.container.position.set(this.initialPosition.x, this.initialPosition.y);
    this.container.scale.set(this.scale, this.scale);
    this.container.scale.x *= this.direction;
    if (this.direction === -1) {
      this.container.x -= this.container.width;
    }
  }

  setupProjectiles() {
    this.projectiles = [];
  }

  setShipPosition(delta: number) {
    const { x, y, width: w, height: h } = this.spaceship.getBounds();

    const newX = x + this.vx * delta;
    const newY = y + this.vy * delta;
    if ((newX + w < CANVAS_WIDTH && newX > 0) || this.canMoveOutOfBounds) {
      this.container.x += this.vx * delta;
    }
    if (newY + h < CANVAS_HEIGHT && newY > 0) {
      this.container.y += this.vy * delta;
    }
  }

  destroyShip() {
    this.spaceship.visible = false;
    this.vx = 0;
    this.vy = 0;
    this.explosion.play();
    this.explosion.onComplete = () => {
      this.stage.removeChild(this.container);
      this.isDestroyed = true;
    };
    this.container.addChild(this.explosion);
  }

  getHitBox(): Hitbox | undefined {
    const { x, y, width: w, height: h } = this.spaceship.getBounds();

    const hitboxHeight = h / 2;
    const hitboxWidth = w / 1.1;
    const hitbox: Hitbox = {
      x: x + (w - hitboxWidth) / 2,
      y: y + (h - hitboxHeight) / 2,
      height: hitboxHeight,
      width: hitboxWidth,
    };

    if (!this.spaceship.visible) {
      return undefined;
    }

    return hitbox;
  }

  shoot() {
    const projectile = new Projectile(
      this.stage,
      this.loader,
      this.spaceship.height,
      this.spaceship.width
    );
    projectile.setup(this.container.x, this.container.y);
    this.projectiles.push(projectile);
  }

  updateExhaust() {
    this.exhaust.loop(this.vx);
  }

  updateProjectiles(delta: number) {
    const projectilesToRemove: number[] = [];
    this.projectiles.forEach((projectile, i) => {
      projectile.loop(delta);
      if (!projectile.visible) {
        projectilesToRemove.push(i);
      }
    });
    this.projectiles = this.projectiles.filter(
      (_, i) => !projectilesToRemove.includes(i)
    );
  }

  setup() {
    this.setupShip();
    this.setupProjectiles();
  }

  loop(delta: number) {
    this.setShipPosition(delta);
    this.updateExhaust();
    this.updateProjectiles(delta);
  }
}

export default Spaceship;
