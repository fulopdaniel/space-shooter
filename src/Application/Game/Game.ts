import * as PIXI from "pixi.js";
import Background from "./Background/Background";
import Player from "./Player/Player";
import Enemy from "./Enemy/Enemy";
import { isColliding } from "../../shared/util";
import StateChanger from "../ApplicationState/StateChanger/StateChanger";
import { Hitbox } from "../../shared/types";
import Score from "./Score/Score";

class Game {
  stage: PIXI.Container;
  background: Background;
  player: Player;
  enemies: Enemy[];
  loader: PIXI.Loader;
  elapsedTime = 0;
  enemyFrequency: number;
  enemySpeed: number;
  stateChanger: StateChanger;
  score: Score;

  constructor(
    stage: PIXI.Container,
    loader: PIXI.Loader,
    enemyFrequency: number,
    enemySpeed: number,
    stateChanger: StateChanger
  ) {
    this.stage = stage;
    this.loader = loader;
    this.enemyFrequency = enemyFrequency;
    this.enemySpeed = enemySpeed;
    this.stateChanger = stateChanger;
    this.setup();
  }

  setup() {
    this.enemies = [];
    this.background = new Background(this.stage, this.loader);
    this.addEnemy();
    this.player = new Player(this.stage, this.loader, this.enemies);
    this.score = new Score(this.stage);
  }

  addEnemy() {
    const enemy = new Enemy(this.stage, this.loader, this.enemySpeed);
    this.enemies.push(enemy);
  }

  removeDestroyedEnemies() {
    this.enemies = this.enemies.filter((enemy) => !enemy.isDestroyed);
  }

  checkProjectileCollisionWithEnemies() {
    this.player.projectiles.forEach((projectile) => {
      this.enemies.forEach((enemy) => {
        const enemyHitbox = enemy.getHitBox();
        if (
          enemyHitbox &&
          isColliding(projectile.getHitBox(), enemy.getHitBox())
        ) {
          projectile.hitEnemy();
          enemy.destroyShip();
          this.score.score += 1;
        }
      });
    });
  }

  checkEnemiesCollisionWithPlayer() {
    const playerHitbox = this.player.getHitBox();

    this.enemies.forEach((enemy) => {
      const enemyHitbox = enemy.getHitBox();
      if (
        enemyHitbox &&
        playerHitbox &&
        isColliding(enemyHitbox, playerHitbox)
      ) {
        this.player.destroyShip(
          this.stateChanger.moveToMenu.bind(this.stateChanger)
        );
      }
    });
  }

  addNewEnemyIfNeeded() {
    if (this.elapsedTime > this.enemyFrequency) {
      this.addEnemy();
      this.elapsedTime = 0;
    }
  }

  loop(delta: number) {
    this.elapsedTime += delta;

    this.background.loop(delta);
    this.player.loop(delta);
    this.score.loop();
    this.enemies.forEach((enemy) => {
      enemy.loop(delta);
    });

    this.removeDestroyedEnemies();
    this.checkProjectileCollisionWithEnemies();
    this.checkEnemiesCollisionWithPlayer();
    this.addNewEnemyIfNeeded();
  }
}

export default Game;
