const container = document.querySelector('.container');
createCanvas(container.clientWidth, container.clientHeight, container);
background('black')

ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowColor = 'black';

const patternImage = document.querySelector('#img_');
const pattern = ctx.createPattern(patternImage, 'no-repeat');
ctx.strokeStyle = pattern;

class Line {

  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.history = [{ x: this.x, y: this.y }];
    this.lineWidth = Math.floor(Math.random() * 15 + 1);
    this.hue = Math.floor(Math.random() * 360);
    this.maxLength = Math.floor(Math.random() * 150 + 10);
    /*this.speedX = Math.random() * 10- 5;
    this.speedY = 10;*/
    this.lifeSpan = this.maxLength * 3;
    this.breakPoint = this.lifeSpan * 0.85;
    this.timer = 0;
    this.angle = 0;
    this.va = Math.random() * 0.5 - 0.25;
    this.curve = 0.1;
    this.vc = Math.random() * 0.4 - 0.2;

  }

  draw(ctx) {

    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = `hsl(${this.hue},100%,50%)`;
    ctx.beginPath();
    ctx.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 1; i < this.history.length; i++) {
      ctx.lineTo(this.history[i].x, this.history[i].y);
    }
    ctx.stroke();
  }

  update() {
    this.angle += this.va;
    this.curve += this.vc;
    this.timer++;
    if (this.timer < this.lifeSpan) {
      if (this.timer > this.breakPoint) {
        this.va *= -1.12;
      }
      //this.x += this.speedX + Math.random() * 20 - 10;
      //this.y += this.speedY + Math.random() * 20 - 10;
      this.x += Math.sin(this.angle) * this.curve;
      this.y += Math.cos(this.angle) * this.curve;
      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > this.maxLength) {
        this.history.shift();
      }
    } else if (this.history.length <= 1) {
      this.reset();
    } else {
      this.history.shift();
    }
  }
  reset() {
    this.x = Math.floor(Math.random() * this.canvas.width);
    this.y = Math.floor(Math.random() * this.canvas.height);
    this.history = [{ x: this.x, y: this.y }];
    this.timer = 0;
    this.angle = 0;
    this.curve = 0;
    this.va = Math.random() * 0.5 - 0.25;
  }
}

const lines = [];
const numLines = 50;
for (let i = 0; i < numLines; i++) {
  lines.push(new Line(canvas));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach(l => {
    l.draw(ctx)
    l.update();
  });
  requestAnimationFrame(animate);
}

animate();