let rects = [];
let maxYOffset = 50;
const bauhausColors = [
  '#D62828', '#003049', '#F77F00', '#EAE2B7',
  '#F1FAEE', '#000000', '#4361EE', '#FFDD00'
];

function setup() {
    createCanvas(windowWidth, windowHeight);
  
    let lastColor = null;
  
    for (let i = 0; i < 10; i++) {
      let availableColors = bauhausColors.filter(c => c !== lastColor);
      let pickedColor = random(availableColors);
  
      rects.push({
        xFactor: i / 10,
        yFactor: 0.25,
        wFactor: 1 / 10,
        hFactor: 0.95,
        yOffset: 0,
        color: pickedColor
      });
  
      lastColor = pickedColor; // Store last color to avoid repeating
    }
  }

function draw() {
  background(220);

  for (let r of rects) {
    let rectX = r.xFactor * windowWidth;
    let rectW = r.wFactor * windowWidth;
    let rectH = r.hFactor * windowHeight;
    let rectYBase = r.yFactor * windowHeight;

    let centerX = rectX + rectW / 2;
    let distX = abs(mouseX - centerX);

    let targetOffset = map(distX, 0, rectW * 2, maxYOffset, 0);
    targetOffset = constrain(targetOffset, 0, maxYOffset);

    r.yOffset = lerp(r.yOffset, targetOffset, 0.1);

    fill(r.color);
    noStroke();
    rect(rectX, rectYBase + r.yOffset, rectW, rectH);
  }

  circle(mouseX, mouseY, 30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}