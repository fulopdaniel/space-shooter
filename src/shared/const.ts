import { DifficultyLevel } from "./types";

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const DIFFICULTIES = {
  [DifficultyLevel.EASY]: {
    enemyFrequency: 100,
    enemySpeed: 4,
  },
  [DifficultyLevel.MEDIUM]: {
    enemyFrequency: 75,
    enemySpeed: 5,
  },
  [DifficultyLevel.HARD]: {
    enemyFrequency: 40,
    enemySpeed: 6,
  },
};
