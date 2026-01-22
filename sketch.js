let lastLoggedMinute = null;

let xH_cur = null;
let xM_cur = null;
let xS_cur = null;

function setup() {
  createCanvas(800, 600);
  angleMode(RADIANS);
  textFont("system-ui");
}

function draw() {
  const now = new Date();
  const hr = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const ms = now.getMilliseconds();

  if (lastLoggedMinute === null || min !== lastLoggedMinute) {
    console.log(min);
    lastLoggedMinute = min;
  }

  const secSmooth = sec + ms / 1000;
  const minSmooth = min + secSmooth / 60;
  const hr12Smooth = (hr % 12) + minSmooth / 60;

  const hourP = hr12Smooth / 12;
  const minP = minSmooth / 60;
  const secP = secSmooth / 60;

  background(255);

  const railY = height * 0.62;
  const left = 90;
  const right = width - 90;

  const dH = 56;
  const dM = 36;
  const dS = 18;

  const yH = railY;
  const yM = railY - 8;
  const yS = railY + 8;

  const xH_t = lerp(left + dH / 2, right - dH / 2, hourP);
  const xM_t = lerp(left + dM / 2, right - dM / 2, minP);
  const xS_t = lerp(left + dS / 2, right - dS / 2, secP);

  if (xH_cur === null) {
    xH_cur = xH_t;
    xM_cur = xM_t;
    xS_cur = xS_t;
  }

  xH_cur = lerp(xH_cur, xH_t, 0.08);
  xM_cur = lerp(xM_cur, xM_t, 0.18);
  xS_cur = lerp(xS_cur, xS_t, 0.35);

  stroke(0);
  strokeWeight(2);
  line(left, railY, right, railY);

  strokeWeight(4);
  point(left, railY);
  point(right, railY);

  drawBall(xH_cur, yH, dH, 0, 0.010, 0);
  drawBall(xM_cur, yM, dM, 40, 0.040, 1);
  drawBall(xS_cur, yS, dS, 90, 0.120, 2);

  noStroke();
  fill(0, 90);
  textSize(12);
  textAlign(LEFT, CENTER);
  text("big = hour   medium = minute   small = second", left, height - 24);
}

function drawBall(x, y, d, gray, rotSpeed, phase) {
  noStroke();
  fill(gray);
  circle(x, y, d);
  const a = frameCount * rotSpeed + phase;
  const r = d * 0.22;
  const hx = x + r * cos(a);
  const hy = y + r * sin(a);

  fill(255);
  circle(hx, hy, max(3, d * 0.12));
}