const fontSize = 150;
// Get the canvas and context
const sourceCanvas = document.getElementById("sourceCanvas");
const sourceCtx = sourceCanvas.getContext("2d");

const outputCanvas = document.getElementById("outputCanvas");
const outputCtx = outputCanvas.getContext("2d");

var horizCells, vertCells;

function getPixelValue(pixels, x, y) {
  var index = (Math.floor(x) + Math.floor(y) * sourceCanvas.width) * 4;
  return pixels[index + 3];
}

sourceCtx.font = `${fontSize}px Sans-Serif`;
sourceCtx.fillStyle = "black";

// Draw the text
var text = "Q72";
const textWidth = sourceCtx.measureText(text).width;
const textX = (sourceCanvas.width - textWidth) / 2;
const textHeight = sourceCtx.measureText("7").actualBoundingBoxAscent;
const textY = sourceCanvas.height - (sourceCanvas.height - textHeight) / 2;

sourceCtx.fillText(text, textX, textY);

// Get the image data
var imageData = sourceCtx.getImageData(
  0,
  0,
  sourceCanvas.width,
  sourceCanvas.height
);
var pixels = imageData.data;

// Get the size of the window
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

console.log(windowWidth, windowHeight);

console.log(Math.ceil((windowHeight - 400) / 200));
// const addlCanvasModules = Math.ceil((windowHeight - 400) / 200);
const addlCanvasModules = 10;

for (let i = 1; i <= addlCanvasModules; i++) {
  const canvas = document.createElement("canvas");
  canvas.id = `newCanvas${i}`;
  document.body.appendChild(canvas);
  const outputCanvas = document.getElementById(canvas.id);
  const outputCtx = outputCanvas.getContext("2d");
  horizCells = Math.floor(Math.sqrt(Math.random() * i ** 2 * 100)) + 1;
  vertCells = Math.floor(Math.sqrt(Math.random() * i ** 2 * 100)) + 1;
  for (horiz = 0; horiz < horizCells; horiz++) {
    for (vert = 0; vert < vertCells; vert++) {
      outputCtx.fillStyle =
        "rgb(" +
        0 +
        ", " +
        getPixelValue(
          pixels,
          sourceCanvas.width * ((horiz + 0.5) / horizCells),
          sourceCanvas.height * ((vert + 0.5) / vertCells)
        ) +
        ", " +
        0 +
        ")";
      outputCtx.fillRect(
        (horiz * sourceCanvas.width) / horizCells,
        (vert * sourceCanvas.height) / vertCells,
        sourceCanvas.width / horizCells,
        sourceCanvas.height / vertCells
      );
    }
  }
}

let lastTime = 0;
const throttleDuration = 100; // Throttle duration in milliseconds

document.addEventListener("mousemove", (event) => {
  const currentTime = new Date().getTime();

  if (currentTime - lastTime > throttleDuration) {
    lastTime = currentTime;

    // Get the total width and height of the document
    const totalWidth = document.documentElement.scrollWidth;
    const totalHeight = document.documentElement.scrollHeight;

    // Calculate the position as a percentage
    const xPercent = event.pageX / windowWidth;
    const yPercent = event.pageY / windowHeight;

    horizCells = Math.floor(xPercent ** 1.5 * sourceCanvas.width) + 1;
    vertCells = Math.floor(yPercent ** 1.5 * sourceCanvas.height) + 1;
    if (xPercent > 0.97 && yPercent > 0.97) {
      horizCells = sourceCanvas.width;
      vertCells = sourceCanvas.height;
    }
    console.log(xPercent, yPercent, horizCells, vertCells);
    for (horiz = 0; horiz < horizCells; horiz++) {
      for (vert = 0; vert < vertCells; vert++) {
        outputCtx.fillStyle =
          "rgb(" +
          0 +
          ", " +
          getPixelValue(
            pixels,
            sourceCanvas.width * ((horiz + 0.5) / horizCells),
            sourceCanvas.height * ((vert + 0.5) / vertCells)
          ) +
          ", " +
          0 +
          ")";
        outputCtx.fillRect(
          (horiz * sourceCanvas.width) / horizCells,
          (vert * sourceCanvas.height) / vertCells,
          sourceCanvas.width / horizCells,
          sourceCanvas.height / vertCells
        );
      }
    }
  }
});
