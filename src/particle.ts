import {
  GetRandomFloat,
  GetRandomInt,
  FromPolar,
  ToLuma,
  Clamp,
} from './utils';
import { ISimObject, MagicParams } from './isimobject';

// Particle Constants
const MaxParticleSize = 6;
const MinParticleSize = 1;

export class Particle implements ISimObject {
  // location of this particle
  x = 0;
  y = 0;
  // describe the velocity
  speed = 0;
  theta = 0;
  // size of the particle
  radius = MinParticleSize;
  // how much time left to live
  ttl = 500;
  // how long will this particle live
  lifetime = 500;
  // alpha values
  alpha = 1.0;
  color = 'black';

  constructor(private w: number, private h: number, private palette: string[]) {
    this.reset();
  }

  reset() {
    this.x = GetRandomFloat(0, this.w);
    this.y = GetRandomFloat(0, this.h);

    this.speed = GetRandomFloat(0, 3.0);
    this.theta = GetRandomFloat(0, 2 * Math.PI);

    // this.radius = GetRandomFloat(0.05, 1.0);
    this.radius = 0.0;
    this.lifetime = this.ttl = GetRandomInt(25, 50);

    this.color = this.palette[GetRandomInt(0, this.palette.length)];
    this.ttl = this.lifetime = GetRandomInt(25, 50);
  }

  imageComplementLuma(imageData: ImageData): number {
    const p = Math.floor(this.x) + Math.floor(this.y) * imageData.width;
    // ImageData contains rgba values
    const i = Math.floor(p * 4);
    const r = imageData.data[i + 0];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    // 0 -> 255
    const luma = ToLuma(r, g, b);
    // luma is higher for lighter pixel
    // higher ln means darker
    const ln = 1 - luma / 255.0;
    return ln;
  }

  Update(params: MagicParams) {
    // get the luma (relative brightness) data
    const ln = this.imageComplementLuma(params.imageData);
    const lt = (this.lifetime - this.ttl) / this.lifetime;

    let f = ln;
    this.alpha = ln;

    // compute the delta change
    let dRadius = GetRandomFloat(-MaxParticleSize / 5, MaxParticleSize / 5);
    const i = params.index;
    const r = params.phase;
    // const d = 1 / Math.pow(10, params.d);
    // const d = 0.01;
    const d = params.d;
    const t = params.t;

    // this.x = Math.sin(r + i * d - t) * i + this.w / 2;
    // this.y = Math.cos(r - i * d + t) * i + this.h / 2;
    // this.x = Math.sin(r + this.x * d - t) * i + this.w / 2;
    // this.y = Math.cos(r - this.y * d + t) * i + this.h / 2;
    this.x = Math.cos(r + Math.sin(r + this.x * d - t)) * i + this.w / 2;
    this.y = Math.sin(r - Math.cos(r - this.y * d + t)) * i + this.h / 2;

    // this.x = Clamp(0, this.w - 1, this.x);
    // this.y = Clamp(0, this.h - 1, this.y);

    this.radius += dRadius;
    this.radius = Clamp(MinParticleSize, MaxParticleSize, this.radius) * f;
    if (this.speed < 1.0) {
      this.radius = 0.1;
    }

    // manage particle lifetime
    this.ttl += -1;
    if (this.ttl == 0) {
      this.reset();
    }
  }

  Draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    this.experiment1(ctx);
    ctx.restore();
  }

  experiment1(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    let circle = new Path2D();
    circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill(circle);
  }
}
