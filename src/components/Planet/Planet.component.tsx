import * as React from 'react';
import { getPosition } from '../../util/orbit';
import { IPosition, ViewableCelestialObject } from '../../util/sim';
import { PlanetProps } from "./Planet.d";
import './Planet.less';

const borderWidth = 5;

const getStyle = (planet:ViewableCelestialObject, t:number, offset:IPosition):React.CSSProperties => {
    const position = getPosition(planet, t);
    const size = `${planet.attributes.radius * 2 - 2 * borderWidth}px`;
    const toCenter = planet.attributes.radius - borderWidth;
    const data = {
        border: `solid ${borderWidth}px #${planet.view.borderColor}`,
        background: `#${planet.view.color}`,
        borderRadius: `${planet.attributes.radius}px`,
        height: size,
        left: `${position.x - toCenter + offset.x}px`,
        top: `${position.y - toCenter + offset.y}px`,
        width: size,
    };

    return data;
}

const getDotStyle = (planet:ViewableCelestialObject, t:number, offset:IPosition):React.CSSProperties => {
    const position = getPosition(planet, t);
    const data = {
        background: `#ffffff`,
        height: `2px`,
        left: `${position.x - 1 + offset.x}px`,
        top: `${position.y - 1 + offset.y}px`,
        width: `2px`,
    };

    return data;
}

export const PlanetComponent = (props:PlanetProps) => {
    return <>
        <div className="planet" style={getStyle(props, props.time, props.offset)} />
        <div className="planet" style={getDotStyle(props, props.time, props.offset)} />
    </>;
}
