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
var maxSpeed = 100;
var cx = 10;
var cy = 10;
var innerSpace = 1000;
var totalFood = 0;

function Food(mass) {
    this.mass = mass;
    totalFood += mass;

    var r = map(noise(xoff), 0, 1, 0, 600);
    var angle = map(noise(yoff), 0, 1, 0, 360);
    this.position = createVector(windowWidth / 2, windowHeight / 2).add(createVector(r * cos(angle), r * sin(angle)));
    //this.position = createVector(random(200, windowWidth - 200), random(200, windowHeight - 200));
    xoff += 0.02;
    yoff += 0.02;
    this.show = function () {
        fill(0, 0, 255, 80);
        noStroke();
        ellipse(this.position.x, this.position.y, this.mass);
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
        rectMode(CENTER);
        rect(sizeBlock * this.position.x, sizeBlock * this.position.y, sizeBlock, sizeBlock)
    }
}

function Creature2(dna, position) {
    ++alive;
    this.index = ++index;
    this.fitness = 250;
    this.position = position;
    this.velocity = createVector(map(random(1), 0, 1, -5, 5), map(random(1), 0, 1, -5, 5)).limit(maxSpeed);
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
        return this.blocks.length ** 2;
    }

    this.maxSpeed = function () {
        //var scale = 1-map(this.fitness, 0, 250, 0, 1)
        var scale = 1 - map(atan(this.fitness-300), -1.6, 1.6, 0, 1);
        // (atan (x-200) +3)/1.5
        var ms = scale * maxSpeed;
        return ms;
    }

    this.centerRelative = function () {
        var centerOfGravityThis = createVector(0, 0);
        for (var b = 0; b < this.blocks.length; ++b) {
            centerOfGravityThis.add(createVector(sizeBlock * this.blocks[b].position.x, sizeBlock * this.blocks[b].position.y));
        }
        var factor = (1 / this.blocks.length);
        centerOfGravityThis.mult(factor);

        return centerOfGravityThis;
    }

    this.center = function () {
        result = p5.Vector.add(this.centerRelative(), this.position);

        return result;
    }

    this.size = function () {
        var maxSize = -Infinity;

        for (var b = 0; b < this.blocks.length; ++b) {
            var p = this.blocks[b].position;
            var d = p.dist(createVector(cx, cy)) + 1;
            if (d > maxSize)
                maxSize = d;
        }

        var pixels = (maxSize) * (sqrt(cx ** 2 + cy ** 2));
        return pixels;
    }

    this.update = function () {
        //console.log("uppdate");
        if (!this.alive)
            return;

        this.fitness -= (0.22 * (1+sqrt(sqrt(this.blocks.length-1))));//* this.velocity.mag()));
        this.angle += 1;

        if (this.fitness <= 0 || this.blocks.length == 0) {
            ++dead;
            --alive;
            this.fitness == 0;
            this.alive = false;
            return;
        }

        // Repel and drag other creature
        var choose = -1;
        var record = Infinity;
        for (var c = 0; c < population.length; ++c) {
            if (population[c].index != this.index) {
                var other = population[c];

                var distance = this.center().dist(other.center());

                if (distance < this.size() + other.size()) {
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
        //console.log("eat");

        // EAT
        for (var f = food.length - 1; f >= 0; --f) {
            var d = this.center().dist(food[f].position);
            if (d < this.size()) {
                this.fitness += food[f].mass;
                food.splice(f, 1);
            }
        }

        var chooseMass = -1;
        var recordMass = Infinity;

        for (var f = 0; f < food.length; ++f) {
            var d = this.center().dist(food[f].position);
            var dm = d;/// food[f].mass;
            if (dm < recordMass) {
                chooseMass = f;
                recordMass = dm;
            }
        }

        if (chooseMass > -1) {
            var targetVelocity = p5.Vector.sub(food[chooseMass].position, this.center()).normalize().mult(this.maxSpeed());
            var hungry = 1-map(this.fitness, 0, 500, 0, 1);
            var steerForce = p5.Vector.sub(targetVelocity, this.velocity).mult(hungry).limit(0.2);
            var m = this.mass();
            this.acceleration.add(steerForce.div(m));
        }


        // AIR DRAG
        var dirrectionForce = this.velocity.copy().normalize();
        var speed = this.velocity.mag();
        if (speed > 0) {
            var density = 0.015;
            //console.log("air drag mult1");
            var dragForce = dirrectionForce.mult(-1 * density * (speed ** 2) * this.blocks.length);
            //console.log("air drag mult2");
            this.acceleration.add(dragForce.div(this.mass()));
        }

        // OUTER SPACE DRAG
        var dirrectionForce = this.velocity.copy().normalize();
        var speed = this.velocity.mag();
        var center = this.center();
        if (center.x < 10 || center.y < 10 || center.x > windowWidth-10 || center.y > windowHeight-10) {
            var density = 20;
            var dragForce = dirrectionForce.mult(-1 * density * (speed ** 2) * this.blocks.length);
            this.acceleration.add(dragForce.div(this.mass()));
        }

        // NOT HUNGRY MOVE TO CENTER
        var hungry = map(this.fitness, 0, 50, 1, 0);
        var targetVelocity = p5.Vector.sub(createVector(400, 400), this.center()).normalize().mult(this.maxSpeed());
        var steerForce = p5.Vector.sub(targetVelocity, this.velocity).mult(1 - hungry).limit(0.05);
        this.acceleration.add(steerForce.div(this.mass()));

        // MOVE
        //console.log("move");

        this.velocity.add(this.acceleration).limit(this.maxSpeed());
        this.position.add(this.velocity);
        //console.log(this.position.x);
        this.acceleration.mult(0);

        // REPRODUCE
        //console.log("repro");

        if (random(1) < 0.0005 && this.fitness > 250) {
            ++born;
            //var a = genesToArray(this.dna.genes);

            var newGenes = [];
            for (var x1 = 0; x1 < this.dna.length; ++x1) {
                newGenes[x1] = [];
                for (var y1 = 0; y1 < this.dna[x1].length; ++y1) {
                    newGenes[x1][y1] = this.dna[x1][y1];
                }
            }

            if (random(1) > 0.05) {
                var isSuccess = false;
                for (var p = 0; p < 5; ++p) {
                    var x = Math.round(map(random(1), 0, 1, 0, maxX - 1));
                    var y = Math.round(map(random(1), 0, 1, 0, maxY - 1));
                    if (x == cx && y == cy)
                        continue;

                    if (isSuccess) break;
                    var count = 0;
                    count += arr(this.dna, x - 1, y - 1) == 1 ? 1 : 0;
                    count += arr(this.dna, x - 1, y) == 1 ? 1 : 0;
                    count += arr(this.dna, x - 1, y + 1) == 1 ? 1 : 0;
                    count += arr(this.dna, x, y - 1) == 1 ? 1 : 0;
                    count += arr(this.dna, x, y + 1) == 1 ? 1 : 0;
                    count += arr(this.dna, x + 1, y - 1) == 1 ? 1 : 0;
                    count += arr(this.dna, x + 1, y) == 1 ? 1 : 0;
                    count += arr(this.dna, x + 1, y + 1) == 1 ? 1 : 0;

                    if (this.dna[x][y] == 0) {
                        if (count > 0 && random(100) > (100 - 100 / count)) {
                            ++mutate;
                            newGenes[x][y] = 1;
                            isSuccess = true;
                        }
                    } else {
                        if (count == 1 && this.blocks.length > 1) {
                            ++mutate;
                            newGenes[x][y] = 0;
                            isSuccess = true;
                        }
                    }
                }
            }
            this.fitness -= 200;
            population.push(new Creature2(newGenes, randomCenter()));
        }
    }


    this.show = function () {
        var c = lerpColor(color(255, 0, 0), color(0, 255, 0), map(this.fitness, 0, 250, 0, 1));
        if (this.fitness < 100) {
            c = lerpColor(color(255, 0, 0), color(10, 0, 0), map(this.fitness, 0, 100, 0, 1));
        }
        if (this.fitness > 100 && this.fitness < 250)  {
            c = lerpColor(color(255, 255, 0), color(10, 255, 0), map(this.fitness, 100, 250, 0, 1));
        }
        if (this.fitness > 250)  {
            c = lerpColor(color(0, 10, 0), color(0, 255, 0), map(this.fitness, 250, 500, 0, 1));
        }

        push();
        translate(this.position.x, this.position.y);

        // DEBUG
        //noFill();
        //rect(0, 0, maxX * sizeBlock, maxY * sizeBlock)
        //stroke(255, 0, 0, 100);
        //ellipse(this.centerRelative().x, this.centerRelative().y, this.size(), this.size());

        stroke(c);
        fill(c);
        this.blocks.forEach(item => {
            item.show();
        });

        // SHOW center creature
        fill(255, 0, 0);
        rect(this.centerRelative().x, this.centerRelative().y, 2, 2);

        pop();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    xoff = map(random(1), 0, 1, 0, 100000);
    yoff = map(random(1), 0, 1, 0, 100000);

    for (var n = 1; n < 50; ++n) {

        var genes = new Array(maxX);
        for (var x = 0; x < maxX; ++x) {
            genes[x] = new Array(maxY);
            for (var y = 0; y < maxY; ++y) {
                genes[x][y] = 0;
            }
        }

        genes[cx][cy] = 1;

        population.push(new Creature2(genes, randomCenter()));
    }
}


function draw() {
    background(100);
    //fill(0, 0, 255, 10);
    //ellipse(windowWidth / 2, windowHeight / 2, innerSpace);

    total = 0;
    population.forEach(element => {
        total += element.fitness;
    });
    console.log("dead born alive mutate totalFood fitness", dead, born, alive, mutate, totalFood, total / population.length);

    if (random(1) > 0.995) {
        xoff += 10;
        yoff += 10;
    }
    xoff += 0.01;
    yoff += 0.01;

    for (var n = population.length - 1; n >= 0; --n) {
        if (!population[n].alive) {
            population.splice(n, 1);
        }
    }

    var totalNeeded = 0;
    population.forEach(element => {
        if (element.fitness - 500 < 0) {
            totalNeeded += 500 - element.fitness;
        }
    });

    totalFood = 0;
    food.forEach(element => {
        totalFood += element.mass;
    });
    totalNeeded *= (1 - map(population.length, 0, 50, 0, 1));
    if (totalNeeded > totalFood) {
        var produce = totalNeeded - totalFood;
        var spots = 300 - food.length > 0 ? 300 - food.length : 0;
        for (f = 0; f < spots; ++f) {
            var mass = produce / spots > 10 ? 10 : produce / spots;
            food.push(new Food(mass));
        }
    }

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

function randomCenter() {
    var angle = map(random(1), 0, 1, 0, 360);
    var r = random(10, innerSpace / 2);
    var newX = r * cos(angle);
    var newY = r * sin(angle);
    return createVector(windowWidth / 2, windowHeight / 2).add(createVector(newX, newY));
}