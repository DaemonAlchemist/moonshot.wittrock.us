import { aEarth, G } from "./constants";

export const sci = (num:number, exp:number):number => num * Math.pow(10, exp);
export const vSphere = (r:number):number => 4/3 * Math.PI * r * r * r;
export const getMass = (r:number, d:number) => d * vSphere(r);
export const orbitalSpeed = (M:number, a:number) => Math.sqrt(G * M / a);

export const lengthDisplay = (d:number) => {
    if(d > aEarth) {return `${(d/aEarth).toFixed(2)} AU`}
    if(d > 1000000000) {return `${(d/1000000000).toFixed(2)} million km`}
    if(d > 1000000) {return `${(d/1000000).toFixed(2)} thousand km`}
    return `${(d/1000).toFixed(2)} km`;
}
