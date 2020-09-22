import * as PIXI from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../shared/const";

class Background {
  stage: PIXI.Container;
  backgroundFar: PIXI.TilingSprite;
  backgroundNear: PIXI.TilingSprite;
  loader: PIXI.Loader;

  constructor(stage: PIXI.Container, loader: PIXI.Loader) {
    this.stage = stage;
    this.loader = loader;
    this.setup();
  }

  setup() {
    this.backgroundFar = new PIXI.TilingSprite(
      this.loader.resources["img/bg/background_far.png"].texture,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
    this.backgroundNear = new PIXI.TilingSprite(
      this.loader.resources["img/bg/background_near.png"].texture,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
    this.backgroundFar.position.set(0, 0);
    this.backgroundNear.position.set(0, 0);
    this.backgroundFar.tilePosition.set(0, 0);
    this.backgroundNear.tilePosition.set(0, 0);
    this.stage.addChild(this.backgroundFar, this.backgroundNear);
  }

  loop(delta: number) {
    this.backgroundFar.tilePosition.x -= delta * 2;
    this.backgroundNear.tilePosition.x -= delta * 5;
  }
}

export default Background;
