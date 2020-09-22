import * as PIXI from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../shared/const";
import ApplicationState from "./ApplicationState/ApplicationState";

class Application {
  app: PIXI.Application;
  applicationState: ApplicationState;
  stage: PIXI.Container;
  loader: PIXI.Loader;
  ticker: PIXI.Ticker;

  constructor(root: HTMLElement) {
    this.app = new PIXI.Application({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    root.appendChild(this.app.view);
    this.stage = this.app.stage;
    this.ticker = this.app.ticker;
    this.loader = new PIXI.Loader();
    this.applicationState = new ApplicationState(this.stage, this.loader);

    this.ticker.add((delta) => this.loop(delta));
  }

  loop(delta: number) {
    this.applicationState.loop(delta);
  }
}

export default Application;
