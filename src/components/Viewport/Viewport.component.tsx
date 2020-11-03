import { Slider } from 'antd';
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

    return <div className={`viewport-container ${props.className}`}>
        <div className="slider"><Slider /></div>
        <div
            ref={ref}
            className="viewport"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={drag}
        >
            {props.planets.map(planet =>
                <Planet key={planet.id} {...planet} zoom={props.zoom} offset={offset} />
            )}
        </div>
    </div>;
}
