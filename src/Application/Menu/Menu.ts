import * as PIXI from "pixi.js";
import { CANVAS_WIDTH } from "../../shared/const";
import { DifficultyLevel } from "../../shared/types";
import Background from "../Game/Background/Background";
import Button from "./Button/Button";

class Menu {
  stage: PIXI.Container;
  loader: PIXI.Loader;
  background: Background;
  buttons: Button[] = [];
  moveToGame: any;

  constructor(stage: PIXI.Container, loader: PIXI.Loader, moveToGame: any) {
    this.stage = stage;
    this.loader = loader;
    this.background = new Background(this.stage, this.loader);
    this.moveToGame = moveToGame;
    this.setup();
  }

  setup() {
    const title = new PIXI.Text("SPACE SHOOTER", {
      fontFamily: "Press Start 2P",
      fontSize: 48,
      fill: 0xcccccc,
      align: "center",
    });
    title.x = (CANVAS_WIDTH - title.width) / 2;
    title.y = 30;
    this.stage.addChild(title);

    [
      {
        text: "Game 1 - Easy",
        handler: () => this.moveToGame(DifficultyLevel.EASY),
      },
      {
        text: "Game 2 - Medium",
        handler: () => this.moveToGame(DifficultyLevel.MEDIUM),
      },
      {
        text: "Game 3 - Hard",
        handler: () => this.moveToGame(DifficultyLevel.HARD),
      },
      {
        text: "Exit",
        handler: () => (window.location.href = "https://google.com"),
      },
    ].forEach((btn, i) => {
      this.buttons.push(
        new Button(this.stage, this.loader, btn.text, i * 60, btn.handler)
      );
    });
  }

  loop(delta: number) {
    this.background.loop(delta);
  }
}

export default Menu;
