let cam;
let tellertje = 0;
let x = 400;
let y = 400;
let currentPlayer = "geel";

function setup() {
  createCanvas(800, 800);
  //cam = createCapture();
  //cam.hide();
  background(0);
}

function draw() {
  x += map(random(1), 0, 1, -2, 2);
  y += map(random(1), 0, 1, -2, 2);
  noStroke();




  //rotateZ(frameCount * 0.01);
  //rotateX(frameCount * 0.01);
  //rotateY(frameCount * 0.01);
  //pass image as texture
  //texture(cam);
  //sphere(200, 200, 200);
  console.log(mouseX, mouseY);
}

function mouseClicked() {

  if (currentPlayer == "geel") {
    fill(255, 255, 0);
    ellipse(mouseX, mouseY, 50, 50);
  }

  /*
  if (mouseX < 400) {
   fill(255, 0, 0);
   ellipse(mouseX, mouseY, 10, 10);  
   } else {
   fill(255, 255, 0);
   ellipse(mouseX, mouseY, 10, 10);
   }
   */

  console.log(mouseX, mouseY);
}
