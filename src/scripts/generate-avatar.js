const { createCanvas } = require("canvas");
const fs = require("fs");

const colors = [
  "#ff3856",
  "#454f83",
  "#a54170",
  "#325e5e",
  "#764abc",
  "#19376d",
  "#3a1078",
  "#2e4f4f",
  "#790252",
  "#0f3460",
  "#e2703a",
  "#03506f",
  "#007be5",
];

const avatarChar = process.argv[2];
const filename = process.argv[3];

const width = 320;
const height = 320;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

const color = colors[Math.floor(Math.random() * colors.length)]; // randomly select a color from 'colors' array

ctx.fillStyle = color;
ctx.beginPath();
ctx.arc(160, 160, 80, 0, Math.PI * 2, false);
ctx.fill();

ctx.font = "100px 'sans-serif'";
ctx.textAlign = "center";
ctx.fillStyle = "#fff";
ctx.fillText(avatarChar, 160, 196);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync(`uploads/${filename}.png`, buffer);
