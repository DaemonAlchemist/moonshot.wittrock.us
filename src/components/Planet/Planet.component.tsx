import * as React from 'react';
import { abs2scr } from '../../util/orbit';
import { IPosition, ViewableCelestialObject } from '../../util/sim';
import { PlanetProps } from "./Planet.d";
import './Planet.less';

const getContainerStyle = (planet:ViewableCelestialObject, t:number, offset:IPosition, zoom:number):React.CSSProperties => {
    const scrPos = abs2scr(planet.position, offset, zoom);
    const displayRadius = Math.max(planet.view.minViewSize , planet.attributes.radius * 2 * zoom);
    const size = `${displayRadius}px`;
    const data = {
        height: size,
        left: `${scrPos.x}px`,
        top: `${scrPos.y}px`,
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
    const scrPos = abs2scr(planet.position, offset, zoom);
    const data = {
        background: `#ffffff`,
        height: `2px`,
        left: `${scrPos.x - 1}px`,
        top: `${scrPos.y - 1}px`,
        width: `2px`,
    };

    return data;
}

export const PlanetComponent = (props:PlanetProps) => {
    React.useEffect(() => {
        props.updatePosition(props.time);
    }, [props.time]);

    const onClick = () => {
        if(props.onClick) {
            props.onClick(props.id);
        }
    }
    
    return <>
        <div className="planet-container" style={getContainerStyle(props, props.time, props.offset, props.zoom)}>
            <div onClick={onClick} style={getPlanetStyle(props, props.zoom)} />
        </div>
        <div className="planet-container" style={getDotStyle(props, props.time, props.offset, props.zoom)} />
    </>;
}
