populationIndex = 0;
population = [];
maxSpeed = 5;

function food() {
    this.position = createVector(random(windowWidth), random(windowHeight));
    this.type = "food";
    this.mass = 20;

    this.update = function () {
    }

    this.show = function () {
        fill(0, 255, 0, 100);
        stroke(0, 0, 255);
        ellipse(this.position.x, this.position.y, this.mass);
    }
}

function attractor() {
    this.position = createVector(random(windowWidth), random(windowHeight));
    this.type = "attractor";
    this.mass = random(50);

    this.update = function () {
    }

    this.show = function () {
        fill(0, 255, 0, 100);
        stroke(0, 255, 0);
        ellipse(this.position.x, this.position.y, this.mass);
    }
}

function creature() {
    this.type = "animal";
    this.mass = random(50);
    this.index = populationIndex++;
    this.position = createVector(random(windowWidth), random(windowHeight));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.xoff = random(1000);
    this.yoff = random(1000);

    this.update = function () {
        this.xoff += 0.001;
        this.yoff += 0.001;

        population.forEach(element => {
            if (element.type == "attractor") {
                // gravity
                var distance = this.position.dist(element.position);
                var forceMag = (this.mass * element.mass) / (distance ** 2);
                var gravityForce = p5.Vector.sub(element.position, this.position).normalize().mult(forceMag);

                // apply forces
                this.acceleration.add(gravityForce.div(this.mass));

                return;
            }

            if (element.type == "food") {
                var desiredVelocity = p5.Vector.sub(element.position, this.position).normalize().mult(maxSpeed);
                var steerForce = p5.Vector.sub(desiredVelocity, this.velocity);

                // apply forces
                this.acceleration.add(steerForce.div(this.mass));

                return;
            }


            if (element.index == this.index)
                return;

            var distance = this.position.dist(element.position);

            // REPEL
            if (distance < 200) {
                var forceMag = 3 * (this.mass * element.mass) / (distance ** 2);
                var force = p5.Vector.sub(element.position, this.position).normalize().mult(-1 * forceMag);
                this.acceleration.add(force.div(this.mass));
            }

            // drag
            var dirrectionForce = this.velocity.copy().normalize();
            var speed = this.velocity.mag();
            var density = 10000 / (distance ** 2)
            var dragForce = dirrectionForce.mult(-1 * density * (speed ** 2));

            this.acceleration.add(dragForce.div(this.mass));
        });

        // AIR DRAG
        var dirrectionForce = this.velocity.copy().normalize();
        var speed = this.velocity.mag();
        var density = 100;
        var dragForce = dirrectionForce.mult(-1 * density * (speed ** 2));
        this.acceleration.add(dragForce.div(this.mass));

        this.velocity.add(this.acceleration).limit(maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    this.show = function () {
        fill(255, 0, 0);
        stroke(255, 0, 0);
        ellipse(this.position.x, this.position.y, this.mass);
    }
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new creature());
    population.push(new attractor());
    population.push(new attractor());
    population.push(new food());
    //population.push(new food());
    //population.push(new food());
    //population.push(new food());
    //population.push(new food());
}


function draw() {
    background(100);

    population.forEach(element => {
        element.update();
        element.show();
    });
}
