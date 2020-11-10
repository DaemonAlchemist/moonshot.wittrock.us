import * as React from 'react';
import { zoomSpeed } from '../../util/constants';
import { getPosition } from '../../util/orbit';
import { IVector } from '../../util/sim';
import { Vector } from '../../util/vector';
import { Planet } from '../Planet';
import { Ship } from '../Ship';
import { ViewportProps } from "./Viewport.d";
import './Viewport.less';

const zoomMul = 0.000000001;

export const ViewportComponent = (props:ViewportProps) => {
    const [offset, setOffset] = React.useState<IVector>({x: 0, y: 0});
    const [size, setSize] = React.useState<IVector>({x: 0, y: 0});
    const [center, setCenter] = React.useState<IVector>(props.center);

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

    const [dragging, setDragging] = React.useState(false);
    const startDragging = () => {setDragging(true);}
    const stopDragging = () => {setDragging(false);}
    const drag = (e:React.MouseEvent) => {
        if(dragging) {
            const newCenter = {
                x: center.x - e.movementX / zoom,
                y: center.y - e.movementY / zoom,
            };
            setCenter(newCenter);
        }
    }

    const [zoom, setZoom] = React.useState(props.zoom);
    const onZoom = (e:React.WheelEvent) => {
        const up = e.deltaY > 0;
        const mul = up ? 1/zoomSpeed : zoomSpeed;
        setZoom(z => z * mul);
    }

    React.useEffect(() => {
        setOffset({
            x: size.x / 2 - center.x * zoom,
            y: size.y / 2 - center.y * zoom,
        })
    }, [size, center, zoom]);

    const [selectedPlanet, setSelectedPlanet] = React.useState(props.initialSelectedPlanetId || "");
    console.log(selectedPlanet);
    const updateSelectedPlanet = (id:string) => {
        setSelectedPlanet(id === selectedPlanet ? "" : id);
    }
    React.useEffect(() => {
        const selectedPlanetCenter = !!selectedPlanet ? Vector.mul(zoomMul, getPosition(props.planets.filter((p => p.id === selectedPlanet))[0], props.time)) : null;
        if(selectedPlanetCenter) {
            setCenter(selectedPlanetCenter);
        }
    }, [props.initialSelectedPlanetId, selectedPlanet, props.planets]);

    const initialCenter = React.useRef(props.center);
    React.useEffect(() => {
        setSelectedPlanet(props.initialSelectedPlanetId || "");
        setZoom(props.zoom);
        setCenter(initialCenter.current);
    }, []);

    return <div className={`viewport-container ${props.className}`}>
        <div className="viewport-zoom">
            {!!selectedPlanet ? `${selectedPlanet} - ` : ""} Zoom: {zoom.toFixed(1)}
        </div>
        <div className="viewport-name">
            {props.name}
        </div>
        <div
            ref={ref}
            className="viewport"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={drag}
            onWheel={onZoom}
        >
            <Ship zoom={zoom * zoomMul} offset={offset} />
            {props.planets.map(planet =>
                <Planet key={planet.id} {...planet} zoom={zoom * zoomMul} offset={offset} onClick={updateSelectedPlanet} />
            )}
        </div>
    </div>;
}
