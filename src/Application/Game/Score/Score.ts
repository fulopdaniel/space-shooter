import * as PIXI from "pixi.js";

class Score {
  score = 0;
  text: PIXI.Text;
  stage: PIXI.Container;
  constructor(stage: PIXI.Container) {
    this.stage = stage;
    this.setup();
  }

  getScoreString() {
    return `Score: ${this.score}`;
  }

  setup() {
    this.text = new PIXI.Text(this.getScoreString(), {
      fontSize: 24,
      fill: 0xffffff,
      fontFamily: "Press Start 2P",
    });
    this.text.x = 10;
    this.text.y = 10;
    this.stage.addChild(this.text);
  }

  loop() {
    this.text.text = this.getScoreString();
  }
}

export default Score;
