var atoms = [];
var index = 0;
var laws = [];
var w;
var h;
var numberOfTypes = 5;
var minn = 0;
var maxx = 0;

function setup() {
    w = windowWidth;
    h = windowHeight;
    for (q = 0; q < numberOfTypes; ++q) {
        var range = [];
        for (q2 = 0; q2 < numberOfTypes; ++q2) {
            range.push(map(random(1), 0, 1, -1.1, 1.1));
        }
        laws.push(range);
    }
    laws[0] = [-0, 0, 1, 0, 1];//, 0.5, -0.5]; //steen
    laws[1] = [1, -0,  0, 1, 0];//, 0.5, -0.5]; //papier
    laws[2] = [0, 1, -0, 0, 1];//, 0.5, -0.5]; //schaar
    laws[3] = [1, 0, 1, -0, 0];//, 0.5, -0.5]; //spock
    laws[4] = [0, 1, 0, 1, -0];//, 0.5, -0.5]; //lizard
    // spock
    // lizard

    //laws[3] = [-1, 1, -0.1];//, 0.5, -0.5]; //schaar
    //laws[4] = [-1, 1, -0.1];//, 0.5, -0.5]; //schaar
    console.log(laws);

    for (ww = 1; ww < 100; ++ww) {
        atoms.push(new Atom());
    }

    createCanvas(w, h);
    background(100);
}

function draw() {
    background(0);
    //fill(0);
    //rect(30, 30, 400, 400);

    atoms.forEach(element => {
        element.update();
    });
    atoms.forEach(element => {
        element.show();
    });
}

function Atom() {
    this.history = [];

    var angle = random(1) * 2 * 3.14;
    var r = random(50);
    var x = r * cos(angle);
    var y = r * sin(angle);
    this.position = createVector(random(w), random(h)).add(createVector(x, y)); // w / 2, h / 2
    this.index = index++;
    this.atomType = Math.round(map(random(1), 0, 1, 1, numberOfTypes));
    console.log(this.atomType);

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    var l = laws[this.atomType - 1];
    total = 0;
    for (var e = 0; e < numberOfTypes; ++e) {
        total += Math.abs(l[e]);
    }
    total = total / numberOfTypes;
    if (total > maxx)
        maxx = total;
    if (total < minn)
        minn = total;


    let from = color(255, 0, 0);
    let to = color(0, 255, 0);
    colorMode(RGB); // Try changing to HSB.
    this.color = lerpColor(from, to, map(this.atomType, 1, numberOfTypes, 0, 1));
    /*
    if (total > 0) {
        this.color = color(0, 255, 0);
    } else {
        this.color = color(255, 0, 0);
    }
    */
    
    switch (this.atomType) {
        case 1:
            this.color = color(255, 0, 0);
            break;
        case 2:
            this.color = color(0, 255, 0);
            break;
        case 3:
            this.color = color(0, 0, 255);
            break;
        case 4:
            this.color = color(255, 255, 0);
            break;
        case 5:
            this.color = color(255,0,255);
            break;
    }



    this.update = function () {
        atoms.forEach(element => {
            if (this.index != element.index) {
                var distance = dist(element.position.x, element.position.y, this.position.x, this.position.y) + 0.001;
                var sigma = 250;
                var forceMag1 = (-24 / distance) * (Math.pow(sigma / distance, 12) - Math.pow(sigma / distance, 6));
                //var sign = map(this.atomType * 10 + element.atomType, 11, 55, -0.1, 0.1);
                var sign = laws[this.atomType - 1][element.atomType - 1];
                var forceMag2 = 100/(distance*distance);
                //var force1 = p5.Vector.sub(element.position, this.position).normalize().mult(forceMag1 * 0.00000001);
                var force2 = p5.Vector.sub(element.position, this.position).normalize().mult(sign * forceMag2);
                var force3 = p5.Vector.sub(createVector(w/2, h/2), this.position).normalize().mult(0.000019 * (dist(w/2, h/2, this.position.x, this.position.y) + 0.001));
                //this.acceleration.add(force1);
                if (distance > 200) 
                    this.acceleration.add(force2);
                //this.acceleration.add(force3);
            }
        });

        this.velocity.add(this.acceleration).limit(2);
        this.acceleration.mult(0);
        this.position.add(this.velocity);

        if (this.position.x < 0) {
            //this.velocity.mult(-1000);
            this.position.x = 0;
            this.velocity.mult(0);
        }
        if (this.position.x > w) {
            //this.velocity.mult(-1000);
            this.velocity.mult(0);

            this.position.x = w;
        }
        if (this.position.y < 0) {
            //this.velocity.mult(-1000);
            this.velocity.mult(0);

            this.position.y = 0;
        }
        if (this.position.y > h) {
            //this.velocity.mult(-1000);
            this.velocity.mult(0);
            this.position.y = h;
        }

        //this.history.push(this.position.copy());
        //if (this.history.length > 40)
        //    this.history.shift();
    }

    this.show = function () {
        var total = 0;
        var l = laws[this.atomType - 1];
        for (var e = 0; e < numberOfTypes; ++e) {
            total += Math.abs(l[e]);
        }
        total = total/numberOfTypes;

        let from = color(255, 0, 0);
        let to = color(0, 255, 0);
        colorMode(RGB); // Try changing to HSB.
        //this.color = lerpColor(from, to, map(total, 0, max, 0, 1));
//console.log(total, minn, maxx);
        fill(this.color);
        noStroke();
        //if (random(1) > 0.5)
            ellipse(this.position.x, this.position.y, 5);

            /*
            var uu = 100;
            for (var u=0;u<this.history.length;++u) {
                fill(this.color.r, this.color.g, this.color.b, 2);
                uu = 0.95 * uu;
                ellipse(this.history[u].x, this.history[u].y, 2);
            }
            */
        //else 
        //    rect(this.position.x, this.position.y, 1, 1);
    }
}