var atoms = [];
var w;
var h;

function setup() {
    w = windowWidth;
    h = windowHeight;

    atoms.push(new Atom(createVector(100, 100)));
    atoms.push(new Atom(createVector(400, 200)));
    createCanvas(w, h);
    background(0);
}

function draw() {
    background(0,0,0);
    atoms.forEach(element => {
        element.update();
    });
    atoms.forEach(element => {
        element.show();
    });
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      isReset = true;
    } else if (keyCode === RIGHT_ARROW) {
      isReset = false;
    }
  }

function Atom(pt) {
    this.position = pt;
    this.angle = 30;
    this.angleVelocity = 0;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.update = function () {
        atoms.forEach(element => {
            var thisGreen = createVector(this.position.x + cos(this.angle)*10, this.position.y + sin(this.angle) * 10);
            var thisRed = createVector(this.position.x - cos(this.angle)*10, this.position.y - sin(this.angle) * 10);

            stroke(255, 0, 0);
            line(thisGreen.x, thisGreen.y, this.position.x + cos(this.angle)*50, this.position.y + sin(this.angle) * 50);
            if (this.index != element.index) {
                var otherGreen = createVector(element.position.x + cos(this.angle)*10, element.position.y + sin(this.angle) * 10);
                //var otherRed = createVector(element.position.x - cos(this.angle)*10, element.position.y - sin(this.angle) * 10);
            
                var distanceGreenGreen = dist(thisGreen.x, thisGreen.y, otherGreen.x, otherGreen.y) + 0.001;

                let angleBetween = v1.angleBetween(v2)
                
                //var force3 = p5.Vector.sub(createVector(w/2, h/2), this.position).normalize().mult(0.000019 * (dist(w/2, h/2, this.position.x, this.position.y) + 0.001));
                //    this.acceleration.add(force2.div(massa));
                //this.acceleration.add(force3);
            }
        });

        //this.velocity.add(this.acceleration).limit(2);
        //this.acceleration.mult(0);
        //this.position.add(this.velocity);

        this.angle += this.angleVelocity;
    }

    this.show = function () {
        strokeWeight(2);  
       
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        noStroke();
        fill(255, 0, 0);
        rect(-20, -10, 20, 20);
        fill(0, 255, 0);
        rect(0, -10, 20, 20);
        pop();
        //ellipse(this.position.x, this.position.y+10, 5, 5);
    }
}