let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width = 1000;
// canvas.height = 500;

// context.beginPath();
// context.moveTo(0, 0);
// context.lineTo(500, 500);
// context.stroke();

// for (let i = 0; i < 3; i++) {
// let radius = 100;
// let x = Math.floor(Math.random() * (window.innerWidth - 2 * radius)) + radius;
// let y = Math.floor(Math.random() * (window.innerHeight - 2 * radius)) + radius;

// context.beginPath();
// context.arc(x, y, radius, 0, 2 * Math.PI, false);
// context.stroke();
// }

// let x = Math.floor(Math.random() * (window.innerWidth - 2 * radius)) + radius;
// console.log(window.innerWidth);
// console.log(window.innerHeight);
// console.log(canvas);

let mouse = {
    x: undefined,
    y: undefined
};

// let maxRadius = 80
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

let colorArray = [
    // "#00E3CC",
    // "#32A89C",
    // "#009688",
    // "#44E3D3",
    // "#00635A"

    // "#8C376E",
    // "#BF93B8",
    // "#CEF2F2",
    // "#03A696",
    // "#07D99D"

    "#DAFDBA",
    "#9AEBA3",
    "#45C4B0",
    "#13678A",
    "#012030"
];
function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.stroke();
        context.fillStyle = color;
        context.fill();
    }

    this.update = function () {
        if (((this.x + this.radius) >= window.innerWidth) || ((this.x - this.radius) < 0)) {
            this.dx = -this.dx;
        }
        if ((this.y + this.radius) >= window.innerHeight || ((this.y - this.radius) < 0)) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // this.draw();
        // console.log(mouse);
        if (((mouse.x - this.x) <= 50 && (mouse.x - this.x) >= -50) && ((mouse.y - this.y) <= 50 && (mouse.y - this.y) >= -50)) {
            if (this.radius < 70) {
                this.radius += 2;
            }
        }
        else if (this.radius > 4) {
            this.radius--;
        }
    }
};

let circleArray = [];

for (let i = 0; i < 1100; i++) {

    let radius = Math.floor(Math.random() * 80) + 1;
    if (radius < 50) {
        radius += 20;
    }
    let Color = colorArray[Math.floor(Math.random() * colorArray.length)];
    let x = Math.floor(Math.random() * (window.innerWidth - 2 * radius)) + radius;
    let y = Math.floor(Math.random() * (window.innerHeight - 2 * radius)) + radius;
    let dx = Math.floor((Math.random() - 0.5) * 4.5);
    if (dx == 0) {
        dx += 1;
    }
    // if (dx < 0 && dx >= -2) {
    // dx += (-1);
    // }
    // if (dx >= 0 && dx <= 2) {
    // dx += 1;
    // }
    let dy = Math.floor((Math.random() - 0.5) * 4.5);
    if (dy == 0) {
        dy += 1;
    }
    // if (dy < 0 && dy >= -2) {
    // dy += (-1);
    // }
    // if (dy >= 0 && dy <= 2) {
    // dy += 1;
    // }

    circleArray.push(new Circle(x, y, dx, dy, radius, Color));
}

// console.log(circleArray);
animate();

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
        circleArray[i].update();
    }

}
