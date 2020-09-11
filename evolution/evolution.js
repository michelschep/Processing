food = [];
var population = [];
var sizeBlock = 10;
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

    for (var x = 0; x < maxX; ++x)
        for (var y = 0; y < maxY; ++y) {
            if (this.dna[x][y] == 1) {
                //console.log("PUSH", x, y);
                this.blocks.push(new Block(200, createVector(x, y)));
            }
        }

    //this.color = createVector(map(this.blocks.length, 0, 25, 50, 256), 50, 50);
    this.color = createVector(random(256), random(256), random(256));

    this.update = function () {
        if (!this.alive)
            return;

        this.fitness -= 0.1;//(0.1 * this.blocks.length * (1 + this.velocity.mag()));

        if (this.fitness <= 0 || this.blocks.length == 0) {
            ++dead;
            --alive;
            this.fitness == 0;
            this.alive = false;
            food.push(new Food());
            return;
        }

        var centerOfGravityThis = createVector(0, 0);
        for (var b = 0; b < this.blocks.length; ++b) {
            centerOfGravityThis.add(this.blocks[b].position);
        }
        var factor = (1 / this.blocks.length);
        centerOfGravityThis.mult(factor);
        centerOfGravityThis = p5.Vector.add(centerOfGravityThis, this.position);

        // Repel
        var choose = -1;
        var record = Infinity;
        for (var c = 0; c < population.length; ++c) {
            if (population[c].index != this.index) {
                var other = population[c];

                var centerOfGravityOther = createVector(0, 0);
                for (var b = 0; b < other.blocks.length; ++b) {
                    centerOfGravityOther.add(other.blocks[b].position);
                }

                var factor = (1 / other.blocks.length);
                centerOfGravityOther.mult(factor);
                centerOfGravityOther = p5.Vector.add(centerOfGravityOther, other.position);

                var d = centerOfGravityThis.dist(centerOfGravityOther);

                if (d < record) {
                    choose = c;
                    record = d;
                }
            }
        }

        if (choose > -1 && record < 10) {
            //if (record < 1) {
            //    var angle = random(2 * 3.14);
            //    var desired = p5.Vector.add(this.position, createVector(this.position.x + cos(angle), this.position.y + sin(angle)));
            //    var steer = p5.Vector.sub(desired, this.velocity).normalize().mult(2 * population[choose].blocks.length);
                //this.acceleration.add(steer);
            //} else {
                //var desired = p5.Vector.sub(population[choose].position, this.position).normalize().mult(-50 * population[choose].blocks.length);
                //var steer = p5.Vector.sub(desired, this.velocity).limit(10);
                //this.acceleration.add(steer);
                var v = this.velocity.normalize();
                var m = this.velocity.mag();
                var f = v.mult(-1 * 0.01 * m*m);
                this.acceleration.add(f);
            //}
        }

        // EAT
        var choose = -1;
        var record = Infinity;

        for (var f = 0; f < food.length; ++f) {
            var centerOfGravity = createVector(0, 0);
            for (var b = 0; b < this.blocks.length; ++b) {
                centerOfGravity.add(this.blocks[b].position);
            }
            var factor = (1 / this.blocks.length);
            centerOfGravity.mult(factor);
            var p = p5.Vector.add(centerOfGravity, this.position);

            var d = p.dist(food[f].position);
            if (d < record) {
                choose = f;
                record = d;
            }
        }

        if (choose > -1) {
            if (record < 10) {
                this.fitness += 5;
                food.splice(choose, 1);
            } else {
                var desired = p5.Vector.sub(food[choose].position, this.position).normalize().mult(2);
                var steer = p5.Vector.sub(desired, this.velocity).limit(0.01);
                this.acceleration.add(steer);
            }
        }

        // MOVE
        this.velocity.add(this.acceleration).limit(1/this.blocks.length);
        this.position.add(this.velocity);

        this.acceleration.mult(0);

        if (random(1) < 0.0005 && this.fitness > 200) {
            ++born;
            //var a = genesToArray(this.dna.genes);
            var x = Math.round(map(random(1), 0, 1, 0, maxX-1));
            var y = Math.round(map(random(1), 0, 1, 0, maxY-1));

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
            var newX= 100* cos(angle);
            var newY= 100* sin(angle);
            population.push(new Creature2(newGenes, this.position.copy().add(createVector(newX, newY))));
        }
    }


    this.show = function () {
        push();
        translate(this.position.x, this.position.y);
        fill(this.color.x, this.color.y, this.color.z, map(this.fitness,0, 500, 0, 256));
        this.blocks.forEach(item => {
            item.show();
        });
        pop();

    }

}


function setup() {
    createCanvas(windowWidth, windowHeight);
    xoff = map(random(1), 0, 1, 0, 100000);
    yoff = map(random(1), 0, 1, 0, 100000);

    for (var n = 1; n < 10; ++n) {

        var genes = new Array(maxX);
        for (var x = 0; x < maxX; ++x) {
            genes[x] = new Array(maxY);
            for (var y = 0; y < maxY; ++y) {
                genes[x][y] = 0;
            }
        }

        genes[0][0] = 1;

        var angle = map(random(1), 0, 1, 0, 360);
        var newX= 200* cos(angle);
        var newY= 200* sin(angle);
        population.push(new Creature2(genes, createVector(400, 400).add(createVector(newX, newY))));
    }
    for (var n = 1; n < 200; ++n) {
        food.push(new Food());
    }
}


function draw() {
    background(0);
    console.log("!!!!!dead alive mutate born", dead, alive, mutate, born);

    if (random(1) > 0.995) {
        xoff += 0.5;
        yoff += 0.5;
    }
    xoff += 0.01;
    yoff += 0.01;

    for (var n= population.length-1; n>=0; --n) {
        if (!population[n].alive) {
            var o = population[n];
            population.slice(n, 1);
            delete o;
        }
    }
    if (food.length < alive*2 && random(1) > 0.1)
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
