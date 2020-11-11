import { sci } from "./util";

export const rEarth = sci(6.378, 6); // m
export const dRock = 5514; // kg/m^3
export const rSun = sci(6.957, 8); // kg
export const dGasGiant = 1400; // kg/m^3
export const rJupiter = sci(7, 7);
export const aEarth = sci(1.49, 11);

export const G = sci(6.674, -11);

export const tickInterval = 25;
export const dT = 200;
export const baseSpeed = 1000 / tickInterval * dT;

export const zoomSpeed = 1.2;
