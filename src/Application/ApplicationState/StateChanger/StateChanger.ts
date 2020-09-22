import { DifficultyLevel } from "../../../shared/types";

class StateChanger {
  stage: PIXI.Container;
  loader: PIXI.Loader;
  createMenu: any;
  createGame: any;

  constructor(
    stage: PIXI.Container,
    loader: PIXI.Loader,
    createGame: any,
    createMenu: any
  ) {
    this.stage = stage;
    this.loader = loader;
    this.createGame = createGame;
    this.createMenu = createMenu;
  }

  resetStage() {
    this.stage.removeChildren();
  }

  moveToMenu() {
    this.resetStage();
    this.createMenu();
  }

  moveToGame(difficulty: DifficultyLevel) {
    this.resetStage();
    this.createGame(difficulty);
  }
}

export default StateChanger;
