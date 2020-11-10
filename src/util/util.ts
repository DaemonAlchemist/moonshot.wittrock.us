import { G } from "./constants";

export const sci = (num:number, exp:number):number => num * Math.pow(10, exp);
export const vSphere = (r:number):number => 4/3 * Math.PI * r * r * r;
export const getMass = (r:number, d:number) => d * vSphere(r);
export const orbitalSpeed = (M:number, a:number) => Math.sqrt(G * M / a);