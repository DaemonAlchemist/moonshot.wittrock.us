import * as React from 'react';
import { ViewableCelestialObject } from '../../util/sim';
import { useTimer } from '../../util/useTimer';
import { Planet } from '../Planet';
import { ViewportProps } from "./Viewport.d";
import './Viewport.less';

const sun:ViewableCelestialObject = {
    attributes: {mass: 10, radius: 50, name: "Sun"},
    position: {x: 600, y: 600},
    view: {minViewSize: 4, borderColor: "ffff66", color: "ffffaa"}
};

const earth:ViewableCelestialObject = {
    attributes: {mass: 1, radius: 10, name: "Earth"},
    orbit: {parent: sun, e: 0.9, a: 350, w: 0, v0: 0},
    view: {minViewSize: 2, borderColor: "6666ff", color: "aaaaff"}
};

const moon:ViewableCelestialObject = {
    attributes: {mass: 0.1, radius: 10, name: "Earth"},
    orbit: {parent: earth, e: 0.1, a: 20, w: 0, v0: 0},
    view: {minViewSize: 2, borderColor: "66ff66", color: "aaffaa"}
};

const planets:ViewableCelestialObject[] = [sun, earth, moon];

export const ViewportComponent = (props:ViewportProps) => {
    const [t, start] = useTimer(10, 10);

    React.useEffect(start, []);

    return <div className="viewport">
        Viewport component goes here.
        {planets.map(planet =>
            <Planet key={planet.attributes.name} {...planet} zoom={1} time={t} />
        )}
    </div>;
}
