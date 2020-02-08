float x = width/2;
float y = height/2;
float z = 0;
float xoff = 0;
float yoff = 1000;

void setup() {
  size(800, 800, P3D);  
  x = width/2;
  y = height/2;
}
void draw() {
  background(0);
  translate(x, y, z);
  sphere(40);
  float nx = noise(xoff);
  float nxm = map(nx, 0, 1, -0.9, 0.9);
  x += nxm;
  println(nx, nxm);
  y += map(noise(yoff), 0, 1, -0.9, 0.9);  
  xoff += 0.01;
  yoff += 0.01;
}
