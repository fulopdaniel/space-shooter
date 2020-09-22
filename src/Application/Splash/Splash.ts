import * as PIXI from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../shared/const";

const TIME_TO_WAIT_IN_MS = 2000;

class Splash {
  stage: PIXI.Container;
  loader: PIXI.Loader;
  isLoaded = false;
  initialTime = Date.now();
  moveToMenu: any;
  text: PIXI.Text;

  constructor(stage: PIXI.Container, loader: PIXI.Loader, moveToMenu: any) {
    this.stage = stage;
    this.loader = loader;
    this.moveToMenu = moveToMenu;
    this.setup();
    this.loader
      .add(["img/bg/background_far.png", "img/bg/background_near.png"])
      .add(["img/spaceship/spaceship.png"])
      .add(["img/enemy/spaceship.png"])
      .add([
        "img/spaceship/exhaust/exhaust1.png",
        "img/spaceship/exhaust/exhaust2.png",
        "img/spaceship/exhaust/exhaust3.png",
        "img/spaceship/exhaust/exhaust4.png",
      ])
      .add([
        "img/spaceship/projectile/shot1.png",
        "img/spaceship/projectile/shot2.png",
        "img/spaceship/projectile/shot3.png",
        "img/spaceship/projectile/shot4.png",
        "img/spaceship/projectile/shot5.png",
        "img/spaceship/projectile/shot_exp1.png",
        "img/spaceship/projectile/shot_exp2.png",
        "img/spaceship/projectile/shot_exp3.png",
        "img/spaceship/projectile/shot_exp4.png",
        "img/spaceship/projectile/shot_exp5.png",
        "img/spaceship/projectile/shot_exp6.png",
        "img/spaceship/projectile/shot_exp7.png",
        "img/spaceship/projectile/shot_exp8.png",
      ])
      .add([
        "img/explosion/Explosion1_1.png",
        "img/explosion/Explosion1_2.png",
        "img/explosion/Explosion1_3.png",
        "img/explosion/Explosion1_4.png",
        "img/explosion/Explosion1_5.png",
        "img/explosion/Explosion1_6.png",
        "img/explosion/Explosion1_7.png",
        "img/explosion/Explosion1_8.png",
        "img/explosion/Explosion1_9.png",
        "img/explosion/Explosion1_10.png",
        "img/explosion/Explosion1_11.png",
      ])
      .load(() => (this.isLoaded = true));
  }

  setup() {
    this.text = new PIXI.Text("Loading...", {
      fontSize: 16,
      fill: 0xffffff,
    });
    this.text.position.set(
      (CANVAS_WIDTH - this.text.width) / 2,
      (CANVAS_HEIGHT - this.text.height) / 2
    );

    this.stage.addChild(this.text);
  }

  loop(delta: number) {
    if (Date.now() - this.initialTime > TIME_TO_WAIT_IN_MS && this.isLoaded) {
      this.text.alpha -= delta * 0.03;
      if (this.text.alpha < 0) {
        this.moveToMenu();
      }
    }
  }
}

export default Splash;
