let streams = [];
let symbolSize = 26;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let x = 0;
  let y = 0;
  for (let i = 0; i <= width / symbolSize; i++) {
    stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);
}

function draw() {
  background(0, 95);

  streams.forEach(function (stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(7, 20));
  this.first = first;

  this.gravity = function () {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

  this.setToRandomSymbol = function () {
    if (frameCount % this.switchInterval === 0) {
      if (round(random(0, 4)) == 1) {
        this.value = String.fromCharCode(
          0x4e00 + round(random(0, 80))
        );
      } else {
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
      }
    }
  }
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(3, 9);

  this.generateSymbols = function (x, y) {
    let first = round(random(0, 4)) == 1;
    for (i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first) {
        fill(0, 255, 65);
      } else {
        fill(0, 143, 17);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.gravity();
      symbol.setToRandomSymbol();
    });
  }
}