import { IVector } from "./sim";
import { prop } from "ts-functional";

export const Vector = {
    apply: (f:(...args:number[]) => number, ...vectors:IVector[]):IVector => ({
        x: f(...vectors.map(prop("x"))),
        y: f(...vectors.map(prop("y"))),
    }),
    add: (a:IVector, b:IVector):IVector => ({
        x: a.x + b.x,
        y: a.y + b.y,
    }),
    sub: (a:IVector, b:IVector):IVector => ({
        x: a.x - b.x,
        y: a.y - b.y,
    }),
    mul: (m:number, a:IVector):IVector => ({
        x: m * a.x, 
        y: m * a.y,
    }),
    len: (a:IVector):number => Math.sqrt(a.x * a.x + a.y * a.y),
}