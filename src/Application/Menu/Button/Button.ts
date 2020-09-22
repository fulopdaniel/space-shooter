import * as PIXI from "pixi.js";
import { CANVAS_WIDTH } from "../../../shared/const";

class Button {
  stage: PIXI.Container;
  loader: PIXI.Loader;
  button: PIXI.Text;
  style: PIXI.TextStyle;

  constructor(
    stage: PIXI.Container,
    loader: PIXI.Loader,
    text: string,
    position: number,
    onActivate: any
  ) {
    this.stage = stage;
    this.loader = loader;
    this.style = new PIXI.TextStyle({
      fontFamily: "Press Start 2P",
      fontSize: 32,
      fill: 0xffffff,
      align: "center",
    });
    this.button = new PIXI.Text(text, this.style);
    this.button.interactive = true;
    this.button.y = position + 200;
    this.button.x = (CANVAS_WIDTH - this.button.width) / 2;
    this.button.buttonMode = true;
    this.button.on("mouseover", () => {
      this.style.fill = 0xff0000;
    });
    this.button.on("mouseout", () => {
      this.style.fill = 0xffffff;
    });
    this.button.on("click", () => onActivate());

    this.setup();
  }

  setup() {
    this.stage.addChild(this.button);
  }
}

export default Button;
