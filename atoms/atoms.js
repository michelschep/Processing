var atoms = [];
var index = 0;
var w = 1024;
var h = 960;
var start = false;
var fixedAtoms = 36;

function Atom() {
    if (index < 0)
        this.position = createVector(w/2, h/2);
    else {
        var angle = random(1) * 2 * 3.14;
        var r = random(2);
        var x = r * cos(angle);
        var y = r * sin(angle);

        this.position = createVector(w/2, h/2).add(createVector(x, y));
    }

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.index = index++;
    this.color = color(255*random(1), 255*random(1),255*random(1));

    this.update = function() {
        if (this.index < fixedAtoms)
            return;

        atoms.forEach(element => {
            if (this.index != element.index) {
            var distance = dist(element.position.x, element.position.y, this.position.x, this.position.y) + 0.001;
            var sigma = 250;
            //console.log('position', element.position, element.position);
            //console.log('distance',distance);
            var forceMag = (-24/distance) * (Math.pow(sigma/distance, 12) - Math.pow(sigma/distance, 6));
            var force = p5.Vector.sub(element.position, this.position).normalize().mult(forceMag);
            //console.log(forceMag);
            this.acceleration.add(force); 
            }
        });

        this.velocity.add(this.acceleration).limit(4);
        this.acceleration.mult(0);
        this.position.add(this.velocity);
        /*
        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x > w) {
            this.position.x = w;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
        }
        if (this.position.y> h) {
            this.position.y = h;
        }
        */
    }

    this.show = function() {
        fill(this.color);
        noStroke();
        if (this.index < fixedAtoms)
            ellipse(this.position.x, this.position.y, 0);
        else
            ellipse(this.position.x, this.position.y, 0.4);
x
    }
}

async function setup() {
    w = displayWidth;
    h = displayHeight;
    createCanvas(w, h);
    background(0);

    atoms = [];
    var center = createVector(w/2, h/2);

    var angle = 0;
    for (var i=0; i< fixedAtoms; ++i) {
        var x = 450/16 * cos(angle);
        var y = 350/16* sin(angle);
        var a = new Atom();
        a.position = createVector(w/2, h/2).add(createVector(x, y));
        atoms.push(a);    
        angle += 2*3.14/fixedAtoms;
    }

    for (var w1=0;w1<200;++w1) {
        atoms.push(new Atom());
    }

    start = true;
    keyPressed();
}

async function keyPressed() {
    await sleep(7000);
    start = true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function draw() {
    //background(0);
 if (start) {
    atoms.forEach(element => {
        element.update();
    });
    atoms.forEach(element => {
        element.show();
    });
}
}
