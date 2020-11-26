import { faRocket, faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import * as React from 'react';
import { abs2scr } from '../../util/orbit';
import { IVector, IShip } from '../../util/sim';
import { ShipProps } from "./Ship.d";
import './Ship.less';

const getShipStyle = (ship:IShip, offset:IVector, zoom:number, angle:number):React.CSSProperties => {
    const scrPos = abs2scr(ship.position, offset, zoom);
    const data = {
        left: `${scrPos.x - 10}px`,
        top: `${scrPos.y - 13}px`,
        transform: `rotate(${angle + Math.PI / 4}rad)`,
        transformOrigin: "9px 12px",
    };

    return data;
}

export const ShipComponent = (props:ShipProps) => 
    <div className="ship" style={getShipStyle(props.ship, props.offset, props.zoom, props.angle)}>
        <Icon icon={faRocket} />
        <Icon className="fire" icon={faFireAlt} style={{opacity: props.flameOpacity}} />
    </div>;
    