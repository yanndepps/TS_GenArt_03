// all objects including the simulation behaviour is described
// by this interface
export interface ISimObject {
  // updates the state of the object
  Update(params: MagicParams): void;
  // renders the object to the canvas
  Draw(ctx: CanvasRenderingContext2D): void;
}

export interface MagicParams {
  imageData: ImageData;
  index: number;
  phase: number;
  d: number;
  t: number;
}
