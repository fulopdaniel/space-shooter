import * as PIXI from "pixi.js";
import { DIFFICULTIES } from "../../shared/const";
import { DifficultyLevel } from "../../shared/types";
import Game from "../Game/Game";
import Menu from "../Menu/Menu";
import Splash from "../Splash/Splash";
import StateChanger from "./StateChanger/StateChanger";

class ApplicationState {
  state: Game | Splash | Menu;
  stage: PIXI.Container;
  loader: PIXI.Loader;
  stateChanger: StateChanger;

  constructor(stage: PIXI.Container, loader: PIXI.Loader) {
    this.loader = loader;
    this.stage = stage;
    this.stateChanger = new StateChanger(
      this.stage,
      this.loader,
      this.createGame.bind(this),
      this.createMenu.bind(this)
    );
    this.state = new Splash(this.stage, this.loader, this.stateChanger);
  }

  createGame(difficulty: DifficultyLevel) {
    const settings = DIFFICULTIES[difficulty];
    this.state = new Game(
      this.stage,
      this.loader,
      settings.enemyFrequency,
      settings.enemySpeed,
      this.stateChanger
    );
  }

  createMenu() {
    this.state = new Menu(this.stage, this.loader, this.stateChanger);
  }

  loop(delta: number) {
    this.state.loop(delta);
  }
}

export default ApplicationState;
