let streams = [];
let symbolSize = 26;
let messageString = "There is a hidden message attention to detail is very important";

let message = messageString.split(" "); // split the message array

// loop through the array to reverse every word
for (i = 0; i < message.length; i++) {
  message[i] = message[i].split("").reverse().join("")
}

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
  background(0, 95); // second parameter is for opacity, controlling the blur effect

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
  this.displayMessage = false;

  this.gravity = function () {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

  this.setToRandomSymbol = function () {
    if (frameCount % this.switchInterval === 0) {
      if (round(random(0, 4)) == 1) {
        this.value = String.fromCharCode(
          0x4e00 + round(random(0, 80)) // some random chinese kung fu magic
        );
      } else {
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96)) // some other random signs
        );
      }
    }
  }
}

// TODO: problem with displaying the message in the stream atm: 
// the message is displayed in a single stream, instead of random over the x-axis. Maybe i want to keep some sort of order, because reading is best done from left to right 

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30)); // control the stream length
  this.speed = random(3, 9);

  this.generateSymbols = function (x, y) {
    // first round gets a brighter color
    let first = round(random(0, 4)) == 1;

    // decide if we want to display the message randomly
    let displayMessage = round(random(0, 10)) == 1;
    if (displayMessage) {

      // get a random word from the message array; this is not working properly yet. The words dont seem evenly distributed. 
      // also what would be nice is to loop through the array, display the first 2 words only a few times and then follow by the next 2 etc 
      let word = round(random(1, message.length - 1));
      for (i = 0; i <= message[word].length; i++) {
        symbol = new Symbol(x, y, this.speed, first);
        symbol.value = message[word].charAt(i);
        symbol.displayMessage = true;

        this.symbols.push(symbol);
        y -= symbolSize;
        first = false;
      }
    } else {
      for (i = 0; i <= this.totalSymbols; i++) {
        symbol = new Symbol(x, y, this.speed, first);
        symbol.setToRandomSymbol();
        symbol.displayMessage = false;

        this.symbols.push(symbol);
        y -= symbolSize;
        first = false;
      }
    }
  }
  // maybe make it so the message words arent displayed for the entire time, but sort of get eaten up
  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first || symbol.displayMessage) {
        fill(0, 255, 65);
      } else {
        fill(0, 143, 17);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.gravity();

      // randomize the characters
      if (!symbol.displayMessage) {
        symbol.setToRandomSymbol();
      }
    });
  }
}