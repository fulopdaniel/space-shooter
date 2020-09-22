import { Hitbox } from "./types";

export const isColliding = (r1: Hitbox, r2: Hitbox) => {
  const r1CenterX = r1.x + r1.width / 2;
  const r1CenterY = r1.y + r1.height / 2;
  const r2CenterX = r2.x + r2.width / 2;
  const r2CenterY = r2.y + r2.height / 2;

  const r1HalfWidth = r1.width / 2;
  const r1HalfHeight = r1.height / 2;
  const r2HalfWidth = r2.width / 2;
  const r2HalfHeight = r2.height / 2;

  let collision = false;

  if (
    Math.abs(r1CenterX - r2CenterX) < r1HalfWidth + r2HalfWidth &&
    Math.abs(r1CenterY - r2CenterY) < r1HalfHeight + r2HalfHeight
  ) {
    collision = true;
  }

  return collision;
};
