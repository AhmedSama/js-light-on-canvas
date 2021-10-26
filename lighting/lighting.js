var canvas = document.querySelector("canvas");

canvas.width = 1500;
canvas.height = 700;

var c = canvas.getContext("2d");



var bulb = new Image();
bulb.src = "bulb.png";


var background = {
    x:0,
    y:0,
    w:canvas.width,
    h:canvas.height,
    color:"yellow",
    draw:function(){
        c.fillStyle = this.color;
        c.fillRect(this.x,this.y,this.w,this.h);
        c.fill();
    }
}

function Box(x,y,w,h,color){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.draw = function(){
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
        c.fill();
    }
}
function LightBulb(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.draw = function () {
        c.drawImage(bulb,this.x, this.y, this.w, this.h);
    };
}

function distance(x1,y1,x2,y2){
    let z = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return z;
}



var box = new Box(1500 / 2, 700 / 2, 50, 50, "yellow");
var lightBulb = new LightBulb((1500 / 2)-25, (700 / 2)-25, 100, 100);
function light() {
    let Thickness = 20;
    for (let i = 1; i < 700; i += Thickness) {
        for (let j = 1; j < 1500; j += Thickness) {
            let colorObacity =
                distance(lightBulb.x+45, lightBulb.y+50, j, i) / 500;
            let lightBox = new Box(j, i, Thickness, Thickness, "rgba(0,0,0," + colorObacity + ")");
            lightBox.draw();
        }
    }
}

// moving the bulb light
document.addEventListener("keydown",(e)=>{
    if(e.key == "ArrowLeft"){//left
        lightBulb.x -= 10;
    }
    else if(e.key=="ArrowUp"){//up
        lightBulb.y -= 10;
    }
    else if (e.key=="ArrowRight") {//right
        lightBulb.x += 10;
    }
    else if (e.key=="ArrowDown") {//down
        lightBulb.y += 10;
    }
})


function animate(){
    requestAnimationFrame(animate);
    background.draw();
    lightBulb.draw();
    light();
}
animate();