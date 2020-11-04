import * as React from 'react';
import { IPosition } from '../../util/sim';
import { Planet } from '../Planet';
import { ViewportProps } from "./Viewport.d";
import './Viewport.less';

export const ViewportComponent = (props:ViewportProps) => {
    const [offset, setOffset] = React.useState<IPosition>({x: 0, y: 0});
    const [size, setSize] = React.useState<IPosition>({x: 0, y: 0});
    const [center, setCenter] = React.useState<IPosition>(props.center);

    const ref = React.createRef<HTMLDivElement>();
    React.useEffect(() => {
        if(ref.current) {
            const width = ref.current.offsetWidth;
            const height = ref.current.offsetHeight;
            if(width !== size.x || height !== size.y) {
                setSize({x: width, y: height});
            }
        }
    }, [ref, size.x, size.y]);

    React.useEffect(() => {
        setOffset({
            x: size.x / 2 - center.x,
            y: size.y / 2 - center.y,
        })
    }, [size, center]);

    const [dragging, setDragging] = React.useState(false);
    const startDragging = () => {setDragging(true);}
    const stopDragging = () => {setDragging(false);}
    const drag = (e:React.MouseEvent) => {
        if(dragging) {
            setCenter({
                x: center.x - e.movementX,
                y: center.y - e.movementY,
            });
        }
    }

    const [zoom, setZoom] = React.useState(props.zoom);
    const zoomSpeed = 1.2;
    const onZoom = (e:React.WheelEvent) => {
        const up = e.deltaY > 0;
        const mul = up ? 1/zoomSpeed : zoomSpeed;
        setZoom(z => z * mul);
        setCenter(c => ({
            x: c.x * mul,
            y: c.y * mul,
        }));
        setOffset(o => ({
            x: (o.x - size.x/2) / mul + size.x/2,
            y: (o.y - size.y/2) / mul + size.y/2,
        }));
    }

    return <div className={`viewport-container ${props.className}`}>
        <div className="zoom">Zoom: {zoom.toFixed(1)}</div>
        <div
            ref={ref}
            className="viewport"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={drag}
            onWheel={onZoom}
        >
            {props.planets.map(planet =>
                <Planet key={planet.id} {...planet} zoom={zoom} offset={offset} />
            )}
        </div>
    </div>;
}
