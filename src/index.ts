import { GetRandomInt, GetRandomFloat } from './utils';
import { Simulation } from './simulation';
import { MagicParams } from './isimobject';

function createDrawCanvas(
  imageCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const updateFrameRate = 50;
  const renderFrameRage = 50;

  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  if (!canvas) return;
  canvas.width = width;
  canvas.height = height;
  // get context from the canvas
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  // define the quality of the drawing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // simulation object
  const sim = new Simulation(width, height);
  const imageData = imageCtx.getImageData(0, 0, width, height);
  type NewType = MagicParams;
  const params = <NewType>{
    imageData: imageData,
    phase: 0,
    t: 0,
    d: 0,
  };

  // update drawing loops
  setInterval(() => {
    sim.Update(params);
  }, 1000 / updateFrameRate);

  setInterval(() => {
    sim.Draw(ctx);
  }, 1000 / renderFrameRage);
}

// bootstrapper for the html file
function bootstrapper() {
  const width = 400;
  const height = 400;

  const imageCanvas = document.createElement('canvas');
  document.body.appendChild(imageCanvas);
  imageCanvas.width = width;
  imageCanvas.height = height;
  const ctx = imageCanvas.getContext('2d');
  if (!ctx) return;

  // createe an image element to load the jpg on to
  var image = new window.Image();
  if (!image) return;
  image.crossOrigin = 'Anonymous';
  image.onload = (e) => {
    ctx.drawImage(image, 0, 0, width, height);
    createDrawCanvas(ctx, width, height);
  };

  const images = [
    './assets/hokusai.jpg',
    './assets/gpe.jpg',
    './assets/scarjo.jpg',
    './assets/lion.jpg',
  ];

  image.src = images[GetRandomInt(0, images.length)];
}

bootstrapper();
