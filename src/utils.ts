// Utility Functions
// GetRandomFloat returns a random floating point number in a given range
export function GetRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// GetRandomInt returns a random integer number in a given range
export function GetRandomInt(min: number, max: number): number {
  return Math.floor(GetRandomFloat(min, max));
}

// FromPolar returns the cartesian coordinates for
// a given polar coordinate
export function FromPolar(v: number, theta: number): number[] {
  return [v * Math.cos(theta), v * Math.sin(theta)];
}

// relative luminance in colorimetric spaces
export function ToLuma(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// makes sure the value stay in the range min,max
// prettier-ignore
export function Clamp(min: number, max: number, value: number): number {
  return value > max ? max : (value < min ? min : value);
}
