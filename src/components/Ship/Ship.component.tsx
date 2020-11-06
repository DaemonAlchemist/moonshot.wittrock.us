import { SendOutlined } from '@ant-design/icons';
import * as React from 'react';
import { ShipProps } from "./Ship.d";
import './Ship.less';
import { IShip, IPosition } from '../../util/sim';
import { abs2scr } from '../../util/orbit';

const getShipStyle = (ship:IShip, offset:IPosition, zoom:number):React.CSSProperties => {
    const scrPos = abs2scr(ship.position, offset, zoom);
    const angle = Math.atan2(ship.velocity.y, ship.velocity.x);
    const data = {
        left: `${scrPos.x - 10}px`,
        top: `${scrPos.y - 13}px`,
        transform: `rotate(${angle}rad)`,
        transformOrigin: "9px 12px",
    };

    return data;
}

export const ShipComponent = (props:ShipProps) => 
    <div className="ship" style={getShipStyle(props.ship, props.offset, props.zoom)}>
        <SendOutlined />
    </div>;
    