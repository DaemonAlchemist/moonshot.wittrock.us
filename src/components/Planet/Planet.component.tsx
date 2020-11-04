import * as React from 'react';
import { getPosition } from '../../util/orbit';
import { IPosition, ViewableCelestialObject } from '../../util/sim';
import { PlanetProps } from "./Planet.d";
import './Planet.less';

const getContainerStyle = (planet:ViewableCelestialObject, t:number, offset:IPosition, zoom:number):React.CSSProperties => {
    const absPosition = getPosition(planet, t);
    const zoomCenter:IPosition = {x: offset.x / zoom, y: offset.y / zoom};
    const relPos:IPosition = {x: absPosition.x + zoomCenter.x, y: absPosition.y + zoomCenter.y};
    relPos.x = relPos.x * zoom;
    relPos.y = relPos.y * zoom;
    const displayRadius = Math.max(planet.view.minViewSize , planet.attributes.radius * 2 * zoom);
    const size = `${displayRadius}px`;
    const data = {
        height: size,
        left: `${relPos.x}px`,
        top: `${relPos.y}px`,
        width: size,
    };

    return data;
}

const getPlanetStyle = (planet:ViewableCelestialObject, zoom:number):React.CSSProperties => {
    const displayRadius = Math.max(planet.view.minViewSize , planet.attributes.radius * 2 * zoom);
    const size = `${displayRadius}px`;
    const data = {
        background: `#${planet.view.color}`,
        borderRadius: `${displayRadius}px`,
        height: size,
        width: size,
    };

    return data;
}

const getDotStyle = (planet:ViewableCelestialObject, t:number, offset:IPosition, zoom:number):React.CSSProperties => {
    const absPosition = getPosition(planet, t);
    const zoomCenter:IPosition = {x: offset.x / zoom, y: offset.y / zoom};
    const relPos:IPosition = {x: absPosition.x + zoomCenter.x, y: absPosition.y + zoomCenter.y};
    relPos.x = relPos.x * zoom;
    relPos.y = relPos.y * zoom;
    const data = {
        background: `#ffffff`,
        height: `2px`,
        left: `${relPos.x - 1}px`,
        top: `${relPos.y - 1}px`,
        width: `2px`,
    };

    return data;
}

export const PlanetComponent = (props:PlanetProps) => {
    return <>
        <div className="planet-container" style={getContainerStyle(props, props.time, props.offset, props.zoom)}>
            <div style={getPlanetStyle(props, props.zoom)} />
        </div>
        <div className="planet-container" style={getDotStyle(props, props.time, props.offset, props.zoom)} />
    </>;
}
