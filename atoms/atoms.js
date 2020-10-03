var atoms = [];
var index = 0;
var w = 1024;
var h = 960;

function Atom() {
    if (index == 0)
        this.position = createVector(w/2, h/2);
    else
        this.position = createVector(w*random(1), h*random(1));

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.index = ++index;
    this.color = color(255*random(1), 255*random(1),255*random(1));

    this.update = function() {
        if (this.index == 1)
            return;

        atoms.forEach(element => {
            if (this.index != element.index) {
            var distance = dist(element.position.x, element.position.y, this.position.x, this.position.y) + 0.001;
            var sigma = 200;
            //console.log('position', element.position, element.position);
            //console.log('distance',distance);
            var forceMag = (-24/distance) * (Math.pow(sigma/distance, 12) - Math.pow(sigma/distance, 6));
            var force = p5.Vector.sub(element.position, this.position).normalize().mult(forceMag);
            console.log(forceMag);
            this.acceleration.add(force); 
            }
        });

        this.velocity.add(this.acceleration).limit(5);
        this.acceleration.mult(0);
        this.position.add(this.velocity);
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
    }

    this.show = function() {
        fill(this.color);
        ellipse(this.position.x, this.position.y, 5);
    }
}

function setup() {
    createCanvas(w, h);
    background(125, 125, 125);

    atoms = [];
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
    atoms.push(new Atom());
}

function draw() {
    //background(125, 125, 125);
    atoms.forEach(element => {
        element.update();
    });
    atoms.forEach(element => {
        element.show();
    });
}
