import * as React from 'react';
import { getPosition } from '../../util/orbit';
import { IPosition, ViewableCelestialObject } from '../../util/sim';
import { PlanetProps } from "./Planet.d";
import './Planet.less';

const borderWidth = 5;

const getStyle = (planet:ViewableCelestialObject, t:number, offset:IPosition):React.CSSProperties => {
    const position = getPosition(planet, t);
    const data = {
        border: `solid ${borderWidth}px #${planet.view.borderColor}`,
        background: `#${planet.view.color}`,
        borderRadius: `${planet.attributes.radius}px`,
        height: `calc(${planet.attributes.radius * 2}px - 2*${borderWidth}px)`,
        left: `${position.x - planet.attributes.radius + borderWidth + offset.x}px`,
        top: `${position.y - planet.attributes.radius + borderWidth + offset.y}px`,
        width: `calc(${planet.attributes.radius * 2}px - 2*${borderWidth}px)`,
    };

    return data;
}

const getDotStyle = (planet:ViewableCelestialObject, t:number, offset:IPosition):React.CSSProperties => {
    const position = getPosition(planet, t);
    const data = {
        background: `#000000`,
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
