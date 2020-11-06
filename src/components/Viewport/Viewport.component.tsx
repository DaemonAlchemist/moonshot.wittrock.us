import * as React from 'react';
import { IPosition } from '../../util/sim';
import { Planet } from '../Planet';
import { Ship } from '../Ship';
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

    const [dragging, setDragging] = React.useState(false);
    const startDragging = () => {setDragging(true);}
    const stopDragging = () => {setDragging(false);}
    const drag = (e:React.MouseEvent) => {
        if(dragging) {
            setCenter({
                x: center.x - e.movementX / zoom,
                y: center.y - e.movementY / zoom,
            });
        }
    }

    const [zoom, setZoom] = React.useState(props.zoom);
    const zoomSpeed = 1.2;
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

    const [selectedPlanet, setSelectedPlanet] = React.useState("");
    const updateSelectedPlanet = (id:string) => {
        setSelectedPlanet(id === selectedPlanet ? "" : id);
    }
    const selectedPlanetCenter = !!selectedPlanet ? props.planets.filter((p => p.id === selectedPlanet))[0].position : null;
    if(selectedPlanetCenter) {
        if(selectedPlanetCenter.x !== center.x || selectedPlanetCenter.y !== center.y) {setCenter(selectedPlanetCenter);}
    }

    React.useEffect(() => {
        setSelectedPlanet("");
        setZoom(1);
        setCenter(props.center);
    }, [props.reset, props.center]);

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
            <Ship zoom={zoom} offset={offset} />
            {props.planets.map(planet =>
                <Planet key={planet.id} {...planet} zoom={zoom} offset={offset} onClick={updateSelectedPlanet} />
            )}
        </div>
    </div>;
}
