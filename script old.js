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

sourceCtx.font = "200px Sans-Serif";
sourceCtx.fillStyle = "black";

// Draw the text
var text = "Q72";
sourceCtx.fillText(text, 10, 170);

// Get the image data
var imageData = sourceCtx.getImageData(
  0,
  0,
  sourceCanvas.width,
  sourceCanvas.height
);
var pixels = imageData.data;

// var startTime = new Date().getTime();

// let z = 0;
// let refine = setInterval(function () {
//   if (z > 30000) {
//     clearInterval(refine);
//     console.log("Done!", z);
//     console.log(new Date().getTime() - startTime);
//     console.log(horizCells, vertCells);
//   } else {
//     horizCells = Math.floor(Math.sqrt(Math.random() * z)) + 1;
//     vertCells = Math.floor(Math.sqrt(Math.random() * z)) + 1;
//     for (horiz = 0; horiz < horizCells; horiz++) {
//       for (vert = 0; vert < vertCells; vert++) {
//         outputCtx.fillStyle =
//           "rgb(" +
//           0 +
//           ", " +
//           getPixelValue(
//             pixels,
//             sourceCanvas.width * ((horiz + 0.5) / horizCells),
//             sourceCanvas.height * ((vert + 0.5) / vertCells)
//           ) +
//           ", " +
//           0 +
//           ")";
//         outputCtx.fillRect(
//           (horiz * sourceCanvas.width) / horizCells,
//           (vert * sourceCanvas.height) / vertCells,
//           sourceCanvas.width / horizCells,
//           sourceCanvas.height / vertCells
//         );
//       }
//     }
//     z += 1;
//   }
// }, 16);

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
    const xPercent = event.pageX / totalWidth;
    const yPercent = event.pageY / totalHeight;

    // console.log(
    //   `Mouse position (%): X = ${xPercent.toFixed(2)}, Y = ${yPercent.toFixed(
    //     2
    //   )}`
    // );
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
