import * as PIXI from "pixi.js";
import { CANVAS_WIDTH } from "../../../../shared/const";
import { Hitbox } from "../../../../shared/types";

const DEFAULT_VELOCITY = 10;

class Projectile {
  projectile: PIXI.AnimatedSprite;
  explosion: PIXI.AnimatedSprite;
  stage: PIXI.Container;
  loader: PIXI.Loader;
  visible: boolean;

  constructor(stage: PIXI.Container, loader: PIXI.Loader) {
    this.stage = stage;
    this.loader = loader;
    this.visible = true;
  }

  setProjectilePosition(
    spaceshipWidth: number,
    spaceshipHeight: number,
    spaceshipX: number,
    spaceshipY: number
  ) {
    this.projectile.x = spaceshipX + spaceshipWidth / 1.2;
    this.projectile.y =
      spaceshipY + spaceshipHeight / 2 - this.projectile.height / 2;
  }

  getHitBox(): Hitbox {
    const { x, y, width: w, height: h } = this.projectile.getBounds();

    const hitboxHeight = h / 5;
    const hitboxWidth = w / 4;
    const hitbox: Hitbox = {
      x: x + (w - hitboxWidth) / 2,
      y: y + (h - hitboxHeight) / 2,
      height: hitboxHeight,
      width: hitboxWidth,
    };

    return hitbox;
  }

  hitEnemy() {
    this.explosion.x = this.projectile.x;
    this.explosion.y = this.projectile.y;
    this.visible = false;
    this.explosion.play();
    this.explosion.onComplete = () => {
      this.stage.removeChild(this.explosion);
    };
    this.stage.removeChild(this.projectile);
    this.stage.addChild(this.explosion);
  }

  setupAnimatedSpriteProperties(
    spaceshipHeight: number,
    sprite: PIXI.AnimatedSprite,
    animationSpeed: number
  ) {
    const aspectRatio = sprite.width / sprite.height;
    sprite.height = spaceshipHeight;
    sprite.width = aspectRatio * sprite.height;

    sprite.animationSpeed = animationSpeed;
    sprite.loop = false;
  }

  setup(
    spaceshipWidth: number,
    spaceshipHeight: number,
    spaceshipX: number,
    spaceshipY: number
  ) {
    this.projectile = new PIXI.AnimatedSprite([
      this.loader.resources["img/spaceship/projectile/shot1.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot2.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot3.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot4.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot5.png"].texture,
    ]);
    this.explosion = new PIXI.AnimatedSprite([
      this.loader.resources["img/spaceship/projectile/shot_exp1.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot_exp2.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot_exp3.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot_exp4.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot_exp5.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot_exp6.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot_exp7.png"].texture,
      this.loader.resources["img/spaceship/projectile/shot_exp8.png"].texture,
    ]);

    this.setupAnimatedSpriteProperties(spaceshipHeight, this.projectile, 0.3);
    this.setupAnimatedSpriteProperties(spaceshipHeight, this.explosion, 0.3);
    this.setProjectilePosition(
      spaceshipWidth,
      spaceshipHeight,
      spaceshipX,
      spaceshipY
    );
    this.projectile.play();
    this.stage.addChild(this.projectile);
  }

  loop(delta: number) {
    this.projectile.x += delta * DEFAULT_VELOCITY;
    if (this.projectile.x > CANVAS_WIDTH) {
      this.visible = false;
    }
  }
}

export default Projectile;
