import * as PIXI from "pixi.js";
import Background from "./Background/Background";
import Player from "./Player/Player";
import Enemy from "./Enemy/Enemy";
import { isColliding } from "../../shared/util";

class Game {
  stage: PIXI.Container;
  background: Background;
  player: Player;
  enemies: Enemy[];
  loader: PIXI.Loader;
  elapsedTime = 0;
  enemyFrequency: number;
  enemySpeed: number;
  moveToMenu: any;

  constructor(
    stage: PIXI.Container,
    loader: PIXI.Loader,
    enemyFrequency: number,
    enemySpeed: number,
    moveToMenu: any
  ) {
    this.stage = stage;
    this.loader = loader;
    this.enemyFrequency = enemyFrequency;
    this.enemySpeed = enemySpeed;
    this.moveToMenu = moveToMenu;
    this.setup();
  }

  addEnemy() {
    const enemy = new Enemy(this.stage, this.loader, this.enemySpeed);
    this.enemies.push(enemy);
  }

  setup() {
    this.background = new Background(this.stage, this.loader);
    this.enemies = [];
    this.addEnemy();
    this.player = new Player(this.stage, this.loader, this.enemies);
  }

  loop(delta: number) {
    this.elapsedTime += delta;
    this.background.loop(delta);
    this.player.loop(delta);

    this.player.projectiles.forEach((projectile) => {
      this.enemies.forEach((enemy) => {
        const enemyHitbox = enemy.getHitBox();
        if (
          enemyHitbox &&
          isColliding(projectile.getHitBox(), enemy.getHitBox())
        ) {
          projectile.hitEnemy();
          enemy.destroyShip();
        }
      });
    });

    const playerHitbox = this.player.getHitBox();
    this.enemies.forEach((enemy) => {
      const enemyHitbox = enemy.getHitBox();
      if (
        enemyHitbox &&
        playerHitbox &&
        isColliding(enemyHitbox, playerHitbox)
      ) {
        this.player.destroyShip(this.moveToMenu);
      }
    });

    this.enemies.forEach((enemy) => {
      enemy.loop(delta);
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.isDestroyed);

    if (this.elapsedTime > this.enemyFrequency) {
      this.addEnemy();
      this.elapsedTime = 0;
    }
  }
}

export default Game;
