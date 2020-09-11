food = [];
var population = [];

var food = [];
var dead = 0;
var alive = 0;
var mutate = 0;
var index = 0;
var born = 0;
var xoff;
var yoff;
var maxX = 20;
var maxY = 20;
var sizeBlock = 10;
var maxSpeed = 2;
var cx= 10;
var cy = 10;

function Food() {
    this.position = createVector(map(noise(xoff), 0, 1, 10, windowWidth - 10), map(noise(yoff), 0, 1, 10, windowHeight - 10));

    this.show = function () {
        fill(0, 255, 0);
        rect(this.position.x, this.position.y, 5, 5);
    }
}

function arr(a, x, y) {
    if (x < 0 || x >= maxX || y < 0 || y >= maxY)
        return 0;

    return a[x][y];
}

function Block(fitness, position) {
    this.fitness = fitness;
    this.position = position;

    this.show = function () {
        rect(sizeBlock * this.position.x, sizeBlock * this.position.y, sizeBlock, sizeBlock)
    }
}

function Creature2(dna, position) {
    ++alive;
    this.index = ++index;
    this.fitness = 500;
    this.position = position;
    this.velocity = createVector(map(random(1), 0, 1, -5, 5), map(random(1), 0, 1, -5, 5));
    this.acceleration = createVector(0, 0);
    this.blocks = [];
    this.dna = dna;
    this.target = null;
    this.alive = true;
    this.target;
    this.angle = 0;

    for (var x = 0; x < maxX; ++x)
        for (var y = 0; y < maxY; ++y) {
            if (this.dna[x][y] == 1) {
                this.blocks.push(new Block(200, createVector(x, y)));
            }
        }

    this.color = createVector(random(256), random(256), random(256));

    this.mass = function () {
        return this.blocks.length;
    }

    this.center = function () {
        var centerOfGravityThis = createVector(0, 0);
        for (var b = 0; b < this.blocks.length; ++b) {
            centerOfGravityThis.add(createVector(sizeBlock * this.blocks[b].position.x, sizeBlock * this.blocks[b].position.y));
        }
        var factor = (1 / this.blocks.length);
        centerOfGravityThis.mult(factor);
        result = p5.Vector.add(centerOfGravityThis, this.position);

        return result;
    }

    this.size = function() {
       var maxSize = -Infinity;

        for (var b = 0; b < this.blocks.length; ++b) {
            var p = this.blocks[b].position;
            var d = p.dist(createVector(cx, cy))+1;    
            if (d> maxSize)
                maxSize = d;
        }

        var pixels = (maxSize) * (sqrt(cx**2 + cy**2));
        return pixels;
    }

    this.update = function () {
        if (!this.alive)
            return;

        this.fitness -= 0.1;//(0.1 * this.blocks.length * (1 + this.velocity.mag()));
        this.angle += 1;

        if (this.fitness <= 0 || this.blocks.length == 0) {
            ++dead;
            --alive;
            this.fitness == 0;
            this.alive = false;
            food.push(new Food());
            return;
        }

        // Repel and drag other creature
        var choose = -1;
        var record = Infinity;
        for (var c = 0; c < population.length; ++c) {
            if (population[c].index != this.index) {
                var other = population[c];

                var distance = this.center().dist(other.center());

                if (distance < 20 + this.size()) {
                    // REPEL OTHER CREATE
                    var forceMag = 150 * (this.mass() * other.mass()) / (distance ** 2);
                    var force = p5.Vector.sub(other.center(), this.center()).normalize().mult(-1 * forceMag);
                    this.acceleration.add(force.div(this.mass()));

                    // DRAG
                    var dirrectionForce = this.velocity.copy().normalize();
                    var speed = this.velocity.mag();
                    var density = other.mass() / (distance ** 2)
                    var dragForce = dirrectionForce.mult(-1 * 0.01 * density * (speed ** 2));

                    this.acceleration.add(dragForce.div(this.mass()));
                }
            }
        }

        // EAT
        var choose = -1;
        var record = Infinity;

        for (var f = 0; f < food.length; ++f) {
            var d = this.center().dist(food[f].position);
            if (d < record) {
                choose = f;
                record = d;
            }
        }

        if (choose > -1) {
            if (record < 5) {
                this.fitness += 5;
                food.splice(choose, 1);
            } else {
                var targetVelocity = p5.Vector.sub(food[choose].position, this.center()).normalize().mult(maxSpeed);
                var steerForce = p5.Vector.sub(targetVelocity, this.velocity).limit(0.1);
                this.acceleration.add(steerForce.div(this.mass()));
                this.target = food[choose];
            }
        }

        // AIR DRAG
        var dirrectionForce = this.velocity.copy().normalize();
        var speed = this.velocity.mag();
        var density = 0.01;
        var dragForce = dirrectionForce.mult(-1 * density * (speed ** 2));
        this.acceleration.add(dragForce.div(this.mass()));

        // MOVE
        this.velocity.add(this.acceleration).limit(maxSpeed / this.blocks.length);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        // REPRODUCE
        if (random(1) < 0.0005 && this.fitness > 200) {
            ++born;
            //var a = genesToArray(this.dna.genes);
            var x = Math.round(map(random(1), 0, 1, 0, maxX - 1));
            var y = Math.round(map(random(1), 0, 1, 0, maxY - 1));

            var newGenes = [...this.dna];

            if (random(1) > 0.01) {
                if (this.dna[x][y] == 0) {
                    if (false
                        || arr(this.dna, x - 1, y - 1) == 1
                        || arr(this.dna, x - 1, y) == 1
                        || arr(this.dna, x - 1, y + 1) == 1
                        || arr(this.dna, x, y - 1) == 1
                        || arr(this.dna, x, y + 1) == 1
                        || arr(this.dna, x + 1, y - 1) == 1
                        || arr(this.dna, x + 1, y) == 1
                        || arr(this.dna, x + 1, y + 1) == 1) {
                        ++mutate;
                        newGenes[x][y] = 1;
                    }
                } else {
                    var count = 0;
                    count += arr(this.dna, x - 1, y - 1) == 1 ? 1 : 0;
                    count += arr(this.dna, x - 1, y) == 1 ? 1 : 0;
                    count += arr(this.dna, x - 1, y + 1) == 1 ? 1 : 0;
                    count += arr(this.dna, x, y - 1) == 1 ? 1 : 0;
                    count += arr(this.dna, x, y + 1) == 1 ? 1 : 0;
                    count += arr(this.dna, x + 1, y - 1) == 1 ? 1 : 0;
                    count += arr(this.dna, x + 1, y) == 1 ? 1 : 0;
                    count += arr(this.dna, x + 1, y + 1) == 1 ? 1 : 0;

                    if (count == 1 && this.blocks.length > 1) {
                        ++mutate;
                        newGenes[x][y] = 0;
                    }
                }
            }
            this.fitness -= 200;
            var angle = map(random(1), 0, 1, 0, 3.1415);
            var newX = 100 * cos(angle);
            var newY = 100 * sin(angle);
            population.push(new Creature2(newGenes, this.position.copy().add(createVector(newX, newY))));
        }
    }


    this.show = function () {
        fill(255, 0, 0);
        //ellipse(this.center().x, this.center().y, this.size());

        push();
        translate(this.position.x, this.position.y);
        //rotate(this.angle / 3.0);
        //rotate(this.angle);
        //noFill();
        //rect(0, 0, maxX*sizeBlock, maxY*sizeBlock);
        stroke(this.color.x, this.color.y, this.color.z, map(this.fitness, 0, 500, 0, 256))
        fill(this.color.x, this.color.y, this.color.z, map(this.fitness, 0, 500, 0, 256));
        this.blocks.forEach(item => {
            item.show();
        });
        pop();

        //var c = this.center();
        //noFill();
        //stroke(255, 0, 0);
        //ellipse(c.x, c.y, 10);

        if (this.target != null) {
            //stroke(100);
            //fill(255);
            //line(this.position.x, this.position.y, this.target.position.x, this.target.position.y)
        }
    }

}


function setup() {
    createCanvas(windowWidth, windowHeight);
    xoff = map(random(1), 0, 1, 0, 100000);
    yoff = map(random(1), 0, 1, 0, 100000);

    for (var n = 1; n < 5; ++n) {

        var genes = new Array(maxX);
        for (var x = 0; x < maxX; ++x) {
            genes[x] = new Array(maxY);
            for (var y = 0; y < maxY; ++y) {
                genes[x][y] = 0;
            }
        }

        genes[cx][cy] = 1;

        var angle = map(random(1), 0, 1, 0, 360);
        var newX = 200 * cos(angle);
        var newY = 200 * sin(angle);
        population.push(new Creature2(genes, createVector(400, 400).add(createVector(newX, newY))));
    }
    for (var n = 1; n < 20; ++n) {
        food.push(new Food());
    }
}


function draw() {
    background(0);
    console.log("!!!!!dead alive mutate born", dead, alive, mutate, born, population.length, food.length);

    if (random(1) > 0.995) {
        xoff += 0.5;
        yoff += 0.5;
    }
    xoff += 0.01;
    yoff += 0.01;

    for (var n = population.length - 1; n >= 0; --n) {
        if (!population[n].alive) {
            //var o = population[n];
            population.splice(n, 1);
            //delete o;
        }
    }
    if (food.length < alive * 2 && random(1) > 0.1)
        food.push(new Food());

    population.forEach(element => {
        if (element.fitness > 0)
            element.update();
    });
    population.forEach(element => {
        if (element.fitness > 0)
            element.show();
    });
    food.forEach(element => {
        element.show();
    });
}
