let x = 0;
let y = 0;

function setup() {
  createCanvas(1000, 1000);
  background(0);
}

//range −2.1820 < x < 2.6558 and 0 ≤ y < 9.9983.
function drawPoint() {
  stroke(255);
  strokeWeight(1);
  let px = map(x, -2.1820, 2.6558, 0, width);
  let py = map(y, 0, 9.9983, height, 0);
  point(px, py);
  //fill(255, 0, 0);
  //ellipse(px, py, 50, 50);
}

function nextPoint() {
  let nextX;
  let nextY;

  let r = random(1);

  if (r < 0.01) {
    //1
    nextX = 0;
    nextY = 0.16 * y;
  } else if (r < 0.86) {
    //2
    nextX = 0.85 * x + 0.04 * y;
    nextY = -0.04 * x + 0.85 * y + 1.60;
  } else if (r < 0.93) {
    //3
    nextX = 0.20 * x + -0.26 * y;
    nextY = 0.23 * x + 0.22 * y + 1.60;
  } else {
    //4
    nextX = -0.15 * x + 0.28 * y;
    nextY = 0.26 * x + 0.24 * y + 0.44;
  }

  x = nextX;
  y = nextY;
}

function draw() {
  console.log("DRAW");
  
  //background(0);
  //for (let i = 0; i < 1000; i++) {
    drawPoint();
    nextPoint();
  //}
}
