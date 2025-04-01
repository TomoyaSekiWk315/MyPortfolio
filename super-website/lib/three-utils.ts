import { Vector3, Euler } from 'three';

export const calculateCameraPosition = (distance: number, angle: number): Vector3 => {
  const x = distance * Math.sin(angle);
  const z = distance * Math.cos(angle);
  return new Vector3(x, 0, z);
};

export const createRotationAnimation = (duration: number) => {
  return {
    rotation: new Euler(0, Math.PI * 2, 0),
    duration,
  };
};

export const createFloatAnimation = (amplitude: number, frequency: number) => {
  return {
    y: amplitude,
    duration: 1 / frequency,
  };
}; 