import * as PIXI from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, DIFFICULTIES } from "../shared/const";
import { ApplicationState, DifficultyLevel } from "../shared/types";
import Game from "./Game/Game";
import Menu from "./Menu/Menu";
import Splash from "./Splash/Splash";

class Application {
  app: PIXI.Application;
  state: ApplicationState;
  stage: PIXI.Container;
  loader: PIXI.Loader;
  ticker: PIXI.Ticker;
  splash: Splash;
  menu: Menu;
  game: Game;

  constructor(root: HTMLElement) {
    this.app = new PIXI.Application({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    root.appendChild(this.app.view);
    this.stage = this.app.stage;
    this.ticker = this.app.ticker;
    this.loader = new PIXI.Loader();
    this.state = ApplicationState.SPLASH;
    this.splash = new Splash(
      this.stage,
      this.loader,
      this.moveToMenu.bind(this)
    );

    this.ticker.add((delta) => this.loop(delta));
  }

  resetStage() {
    this.stage.removeChildren();
  }

  moveToMenu() {
    this.resetStage();
    this.menu = new Menu(this.stage, this.loader, this.moveToGame.bind(this));
    this.state = ApplicationState.MENU;
  }

  moveToGame(difficulty: DifficultyLevel) {
    this.resetStage();
    const settings = DIFFICULTIES[difficulty];
    this.game = new Game(
      this.stage,
      this.loader,
      settings.enemyFrequency,
      settings.enemySpeed,
      this.moveToMenu.bind(this)
    );
    this.state = ApplicationState.GAME;
  }

  loop(delta: number) {
    switch (this.state) {
      case ApplicationState.SPLASH: {
        this.splash.loop(delta);
        break;
      }
      case ApplicationState.MENU: {
        this.menu.loop(delta);
        break;
      }
      case ApplicationState.GAME: {
        this.game.loop(delta);
        break;
      }
      default: {
        break;
      }
    }
  }
}

export default Application;
