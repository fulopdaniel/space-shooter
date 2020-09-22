export interface Coordinate {
  x: number;
  y: number;
}

export interface Dictionary<T = any> {
  [key: string]: T;
}

export interface Hitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum ApplicationStateEnum {
  SPLASH,
  MENU,
  GAME,
}

export enum DifficultyLevel {
  EASY,
  MEDIUM,
  HARD,
}
