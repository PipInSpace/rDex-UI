const boxHeight = 50;
const canvasX = 200;
const canvasY = 130;
const boxPadding = 5;
const pointsN = 40;

var values = new Array(pointsN);

const start = new Date();

function init() {

    generateNoise(values);
    
    //draw();
    setInterval(() => {
        draw();
    }, 300);
}

function draw() {
    const ctx = document.getElementById("noise-graph-canvas").getContext("2d");

    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, canvasX, canvasY); // clear canvas

    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.strokeStyle = "rgba(0, 153, 255, 1.0)";
    ctx.save();
    ctx.translate(0, 0);
    //ctx.translate(150, 150);

    drawBackBox(ctx);
    drawPoints(ctx);
    drawFrontBox(ctx);
    //generateNoise();
}

function drawBackBox(ctx) {
    ctx.translate(0, 0);
    ctx.strokeStyle = "rgba(43, 57, 50, 0.9)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(boxPadding, (canvasY / 2) - boxHeight / 2);
    ctx.lineTo(canvasX / 2, boxPadding);
    ctx.lineTo(canvasX - boxPadding, (canvasY / 2) - boxHeight / 2);

    ctx.moveTo(boxPadding, (canvasY / 2) + boxHeight / 2);
    ctx.lineTo(canvasX/2, boxHeight);
    ctx.lineTo(canvasX - boxPadding, (canvasY / 2) + boxHeight / 2);

    ctx.moveTo(boxPadding, (canvasY / 2) - boxHeight / 2);
    ctx.lineTo(boxPadding, (canvasY / 2) + boxHeight / 2);
    ctx.moveTo(canvasX / 2, boxPadding);
    ctx.lineTo(canvasX / 2, boxHeight);
    ctx.moveTo(canvasX - boxPadding, (canvasY / 2) - boxHeight / 2);
    ctx.lineTo(canvasX - boxPadding, (canvasY / 2) + boxHeight / 2);

    ctx.stroke();
}

function drawFrontBox(ctx) {
    ctx.translate(0, 0);
    ctx.strokeStyle = "rgba(43, 57, 50, 0.9)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(boxPadding, (canvasY / 2) - boxHeight / 2);
    ctx.lineTo(canvasX / 2, canvasY - boxHeight - boxPadding);
    ctx.lineTo(canvasX - boxPadding, (canvasY / 2) - boxHeight / 2);

    ctx.moveTo(boxPadding, (canvasY / 2) + boxHeight / 2);
    ctx.lineTo(canvasX / 2, canvasY - boxPadding);
    ctx.lineTo(canvasX - boxPadding, (canvasY / 2) + boxHeight / 2);

    ctx.moveTo(canvasX / 2, canvasY - boxHeight);
    ctx.lineTo(canvasX / 2, canvasY - boxPadding);

    ctx.stroke();
    ctx.strokeStyle = "rgba(119, 140, 126, 1.0)";

}

function drawPoints(ctx) {
    ctx.translate(0, 0);

    for (let x = 0; x < pointsN; x++) {
        for (let y = 0; y < pointsN; y++) {
            cxh = (canvasX / 2) - boxPadding;
            cyh = canvasY / 2;
            bhh = boxHeight / 2;

            posX = boxPadding + cxh - cxh * (x / pointsN); //X
            posY = boxHeight + (cyh - bhh) * (x / pointsN);

            posX += cxh * (y / pointsN); //Y
            posY += (cyh - bhh) * (y / pointsN);

            let time = Date.now();
            p1 = pointsN - 1;
            let val = values[Math.trunc(x + time / 100) % p1][Math.trunc(y + time / 200) % p1] - 0.2;
            ctx.fillStyle = "rgba(156, 172, 161, " + val * 3 + ")";
            posY += val * -100 + 10;

            ctx.fillRect(posX, posY,1,1);
        }
    }
}

function generateNoise(values) {
    for (let x = 0; x < pointsN; x++) {
        values[x] = new Array(pointsN);
    }

    for (let ix = 0; ix < pointsN; ix++) {
        for (let y = 0; y < pointsN; y++) {
            values[ix][y] = Math.random();
        }
    }

    p1 = pointsN - 1;
    for (let w = 0; w < 40; w++) {
        for (let i = 0; i < pointsN; i++) {
            for (let j = 0; j < pointsN; j++) {
                if (i - 1 === -1) { id = p1 } else { id = i }
                if (j - 1 === -1) { jd = p1 } else { jd = j }
                values[i][j] = (values[i][j] + values[(i + 1) % p1][j] + values[id][j] + values[i][(j + 1) % p1] + values[i][jd]) / 5;
            }
        }
    }
    
}

init();