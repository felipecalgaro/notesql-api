const { createCanvas } = require("canvas");
const fs = require("fs");
const colors = require("./utils/colors");
const draw = require("./utils/draw");

const [, , avatarChar, filename] = process.argv;

const width = 320;
const height = 320;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

const color = colors[Math.floor(Math.random() * colors.length)]; // randomly select a color from 'colors' array

draw(ctx, color, avatarChar);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync(`uploads/${filename}.png`, buffer);
