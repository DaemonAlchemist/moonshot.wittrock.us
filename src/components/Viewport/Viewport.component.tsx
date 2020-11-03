import { Slider } from 'antd';
import * as React from 'react';
import { IPosition, ViewableCelestialObject } from '../../util/sim';
import { Planet } from '../Planet';
import { ViewportProps } from "./Viewport.d";
import './Viewport.less';

const sun:ViewableCelestialObject = {
    id: "sun",
    attributes: {mass: 10, radius: 50, name: "Sun"},
    position: {x: 0, y: 0},
    view: {minViewSize: 4, borderColor: "ffff66", color: "ffffaa"}
};

const earth:ViewableCelestialObject = {
    id: "earth",
    attributes: {mass: 1, radius: 10, name: "Earth"},
    orbit: {parent: sun, e: 0.9, a: 150, w: 0, v0: 0},
    position: {x: 0, y: 0},
    view: {minViewSize: 2, borderColor: "6666ff", color: "aaaaff"}
};

const moon:ViewableCelestialObject = {
    id: "moon",
    attributes: {mass: 0.1, radius: 10, name: "Moon"},
    orbit: {parent: earth, e: 0.1, a: 20, w: 0, v0: 0},
    position: {x: 0, y: 0},
    view: {minViewSize: 2, borderColor: "66ff66", color: "aaffaa"}
};

const planets:ViewableCelestialObject[] = [sun, earth, moon];

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
            {planets.map(planet =>
                <Planet key={planet.id} {...planet} zoom={props.zoom} time={props.time} offset={offset} />
            )}
        </div>
    </div>;
}
