import { CanvasRenderingContext2D } from "canvas";

function draw(
  ctx: CanvasRenderingContext2D,
  color: string,
  avatarChar: string
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(160, 160, 160, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.font = "190px arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.fillText(avatarChar, 160, 228);
}

export default draw;
