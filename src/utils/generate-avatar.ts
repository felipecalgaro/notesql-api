import { createCanvas } from "canvas";
import fs from "fs";
import colors from "./colors";
import draw from "./draw";

export function generateAvatar(avatarChar: string, filename: string) {
  const width = 320;
  const height = 320;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const color = colors[Math.floor(Math.random() * colors.length)]; // randomly select a color from 'colors' array

  draw(ctx, color, avatarChar);

  const buffer = canvas.toBuffer("image/png");

  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }

  fs.writeFileSync(`uploads/${filename}.png`, buffer);
}
